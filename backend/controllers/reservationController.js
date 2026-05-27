const db = require('../config/db');
//Επιστρέφει αναλυτικά στοιχεία όλων των κρατήσεων.
//Περιλαμβάνει χρήστη, θέατρο, παράσταση, ώρα προβολής, θέσεις, τιμή και κατάσταση κράτησης.
const getReservationDetails = async (req, res) => {
// Μόνο ο admin μπορεί να δει αναλυτικά όλες τις κρατήσεις.
	if (!req.user || req.user.role !== 'admin') {
		return res.status(403).json({
			message: 'Access forbiten. Admins only.'
		});
	}
  try {
// Ανάκτηση αναλυτικών στοιχείων κρατήσεων με συνδέσεις μεταξύ reservations, users, shows, theatres και seats.	  
    const [rows] = await db.query(`
      SELECT 
        r.reservation_id,
        u.name AS user_name,
        u.email,
        t.name AS theatre_name,
        s.title AS show_title,
        st.show_date,
        st.show_time,
        se.seat_row,
        se.seat_number,
        rs.price,
        r.total_price,
        r.status
      FROM reservation_seats rs
      JOIN reservations r ON rs.reservation_id = r.reservation_id
      JOIN users u ON r.user_id = u.user_id
      JOIN showtimes st ON r.showtime_id = st.showtime_id
      JOIN shows s ON st.show_id = s.show_id
      JOIN theatres t ON s.theatre_id = t.theatre_id
      JOIN seats se ON rs.seat_id = se.seat_id
      ORDER BY r.reservation_id, se.seat_row, se.seat_number
    `);
// Επιστροφή όλων των αναλυτικών κρατήσεων στο frontend ή σε admin χρήση.
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch reservation details',
      error: error.message
    });
  }
};
//Επιστρέφει τις κρατήσεις συγκεκριμένου χρήστη.
//Ο απλός χρήστης μπορεί να δει μόνο τις δικές του κρατήσεις,
//ενώ ο admin μπορεί να δει κρατήσεις οποιουδήποτε χρήστη.
const getReservationsByUserId = async (req, res) => {
// Παίρνουμε το userId από τα route parameters.	
  const { userId } = req.params;
// Παίρνουμε τα στοιχεία του συνδεδεμένου χρήστη από το JWT middleware.  
  const loggedInUserId = req.user.userId;
  const loggedInUserRole = req.user.role;
// Έλεγχος πρόσβασης: μόνο ο ίδιος ο χρήστης ή admin μπορεί να δει αυτές τις κρατήσεις.
  if (loggedInUserRole !== 'admin' && Number(userId) !== loggedInUserId) {
    return res.status(403).json({
      message: 'Access forbidden. You can only view your own reservations.'
    });
  }
  
  try {
// Ανάκτηση κρατήσεων του χρήστη μαζί με θέατρο, παράσταση, showtime και λίστα θέσεων.
//GROUP_CONCAT-- Συνένωση των θέσεων της ίδιας κράτησης σε ένα ενιαίο κείμενο, π.χ. A1, A2.			  
    const [rows] = await db.query(
      `
      SELECT 
        r.reservation_id,
        u.user_id,
        u.name AS user_name,
        u.email,
        t.name AS theatre_name,
        s.title AS show_title,
        st.show_date,
        st.show_time,
        GROUP_CONCAT(
          CONCAT(se.seat_row, se.seat_number)
          ORDER BY se.seat_row, se.seat_number
          SEPARATOR ', '
        ) AS seats,
        r.total_price,
        r.status,
        r.reservation_date
      FROM reservation_seats rs
      JOIN reservations r ON rs.reservation_id = r.reservation_id
      JOIN users u ON r.user_id = u.user_id
      JOIN showtimes st ON r.showtime_id = st.showtime_id
      JOIN shows s ON st.show_id = s.show_id
      JOIN theatres t ON s.theatre_id = t.theatre_id
      JOIN seats se ON rs.seat_id = se.seat_id
      WHERE u.user_id = ?
      GROUP BY 
        r.reservation_id,
        u.user_id,
        u.name,
        u.email,
        t.name,
        s.title,
        st.show_date,
        st.show_time,
        r.total_price,
        r.status,
        r.reservation_date
      ORDER BY r.reservation_date DESC
      `,
      [userId]
    );
// Επιστροφή των κρατήσεων ταξινομημένων από την πιο πρόσφατη προς την παλαιότερη.
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch user reservations',
      error: error.message
    });
  }
};
//Δημιουργεί νέα κράτηση για τον συνδεδεμένο χρήστη.
//Χρησιμοποιεί database transaction ώστε η κράτηση και οι θέσεις της
//να αποθηκευτούν όλες μαζί ή να ακυρωθούν όλες μαζί σε περίπτωση σφάλματος.
const createReservation = async (req, res) => {
// Παίρνουμε το showtime και τις επιλεγμένες θέσεις από το request body.	
    const { showtimeId, seatIds } = req.body;
// Το userId προέρχεται από το JWT middleware και όχι από το frontend.	
	const userId = req.user.userId;
// Έλεγχος ότι υπάρχει showtimeId και τουλάχιστον μία επιλεγμένη θέση.
if (!showtimeId || !Array.isArray(seatIds) || seatIds.length === 0) {
  return res.status(400).json({
    message: 'showtimeId and seatIds are required'
  });
}
// Η connection χρησιμοποιείται για transaction, επειδή η δημιουργία κράτησης απαιτεί πολλά queries.
  let connection;

  try {
// Άνοιγμα ξεχωριστής σύνδεσης και έναρξη transaction.	  
    connection = await db.getConnection();
    await connection.beginTransaction();

    // 1. Βρίσκουμε το showtime και το θέατρο του
    const [showtimeRows] = await connection.query(
      `
      SELECT 
        st.showtime_id,
        st.base_price,
        s.theatre_id
      FROM showtimes st
      JOIN shows s ON st.show_id = s.show_id
      WHERE st.showtime_id = ?
      `,
      [showtimeId]
    );
// Αν το showtime δεν υπάρχει, ακυρώνεται το transaction και επιστρέφεται 404.
    if (showtimeRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Showtime not found' });
    }

    const { base_price, theatre_id } = showtimeRows[0];

    // 2. Ελέγχουμε ότι όλες οι θέσεις ανήκουν στο σωστό θέατρο
	// Δημιουργία placeholders για ασφαλή χρήση πολλών seatIds στο SQL IN clause.
    const seatPlaceholders = seatIds.map(() => '?').join(', ');

    const [seatRows] = await connection.query(
      `
      SELECT seat_id
      FROM seats
      WHERE theatre_id = ?
        AND seat_id IN (${seatPlaceholders})
      `,
      [theatre_id, ...seatIds]
    );
// Αν ο αριθμός έγκυρων θέσεων δεν ταιριάζει, κάποια θέση δεν ανήκει στο σωστό θέατρο.
    if (seatRows.length !== seatIds.length) {
      await connection.rollback();
      return res.status(400).json({
        message: 'One or more seats do not belong to the correct theatre'
      });
    }

    // 3. Ελέγχουμε αν κάποια θέση είναι ήδη κρατημένη για το συγκεκριμένο showtime
    const [reservedRows] = await connection.query(
      `
      SELECT rs.seat_id
      FROM reservations r
      JOIN reservation_seats rs ON r.reservation_id = rs.reservation_id
      WHERE r.showtime_id = ?
        AND r.status = 'ACTIVE'
        AND rs.seat_id IN (${seatPlaceholders})
      `,
      [showtimeId, ...seatIds]
    );
// Αν βρεθούν ήδη ενεργές κρατήσεις για αυτές τις θέσεις, η νέα κράτηση απορρίπτεται.
    if (reservedRows.length > 0) {
      await connection.rollback();
      return res.status(409).json({
        message: 'One or more seats are already reserved',
        reservedSeats: reservedRows.map(row => row.seat_id)
      });
    }

    // 4. Υπολογίζουμε συνολικό κόστος
    const totalPrice = Number(base_price) * seatIds.length;

    // 5. Δημιουργούμε την κύρια κράτηση
    const [reservationResult] = await connection.query(
      `
      INSERT INTO reservations (user_id, showtime_id, total_price, status)
      VALUES (?, ?, ?, 'ACTIVE')
      `,
      [userId, showtimeId, totalPrice]
    );

    const reservationId = reservationResult.insertId;

    // 6. Συνδέουμε τις θέσεις με την κράτηση
    for (const seatId of seatIds) {
      await connection.query(
        `
        INSERT INTO reservation_seats (reservation_id, seat_id, price)
        VALUES (?, ?, ?)
        `,
        [reservationId, seatId, Number(base_price)]
      );
    }
// Οριστικοποίηση του transaction αφού ολοκληρώθηκαν επιτυχώς όλα τα queries.
    await connection.commit();
// Επιστροφή επιτυχούς απάντησης με τα στοιχεία της νέας κράτησης.
    res.status(201).json({
      message: 'Reservation created successfully',
      reservationId,
      userId,
      showtimeId,
      seatIds,
      totalPrice
    });
  } catch (error) {
// Αν υπάρξει σφάλμα, ακυρώνονται όλες οι αλλαγές του transaction.	  
    if (connection) {
      await connection.rollback();
    }

    res.status(500).json({
      message: 'Failed to create reservation',
      error: error.message
    });
  } finally {
// Απελευθέρωση της σύνδεσης ώστε να επιστρέψει στο connection pool.	  
    if (connection) {
      connection.release();
    }
  }
};
//Ακυρώνει μία υπάρχουσα κράτηση.
//Ο χρήστης μπορεί να ακυρώσει μόνο δική του κράτηση,
//ενώ ο admin μπορεί να ακυρώσει οποιαδήποτε κράτηση.
const cancelReservation = async (req, res) => {
// Παίρνουμε το id της κράτησης από τα route parameters.	
  const { id } = req.params;
// Παίρνουμε τα στοιχεία του συνδεδεμένου χρήστη από το JWT middleware.  
  const loggedInUserId = req.user.userId;
  const loggedInUserRole = req.user.role;

  try {
// Αναζήτηση της κράτησης ώστε να ελεγχθεί αν υπάρχει και σε ποιον χρήστη ανήκει.	  
    const [existingRows] = await db.query(
      'SELECT reservation_id, user_id, status FROM reservations WHERE reservation_id = ?',
      [id]
    );
// Αν δεν υπάρχει κράτηση με αυτό το id, επιστρέφεται 404.
    if (existingRows.length === 0) {
      return res.status(404).json({
        message: 'Reservation not found'
      });
    }

    const reservation = existingRows[0];
// Έλεγχος ότι ο χρήστης ακυρώνει δική του κράτηση ή έχει ρόλο admin.
    if (loggedInUserRole !== 'admin' && reservation.user_id !== loggedInUserId) {
      return res.status(403).json({
        message: 'Access forbidden. You can only cancel your own reservations.'
      });
    }
// Αποφυγή ακύρωσης κράτησης που έχει ήδη ακυρωθεί.
    if (reservation.status === 'CANCELLED') {
      return res.status(400).json({
        message: 'Reservation is already cancelled'
      });
    }
// Η κράτηση δεν διαγράφεται από τη βάση, αλλά αλλάζει κατάσταση σε CANCELLED.
    await db.query(
      `
      UPDATE reservations
      SET status = 'CANCELLED'
      WHERE reservation_id = ?
      `,
      [id]
    );
// Επιστροφή επιτυχούς απάντησης με το id της ακυρωμένης κράτησης.
    res.json({
      message: 'Reservation cancelled successfully',
      reservationId: Number(id)
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to cancel reservation',
      error: error.message
    });
  }
};
// Εξαγωγή των reservation controllers για χρήση στα αντίστοιχα routes.
module.exports = {
  getReservationDetails,
  getReservationsByUserId,
  createReservation,
  cancelReservation
};


const db = require('../config/db');
//Επιστρέφει όλες τις θέσεις για ένα συγκεκριμένο showtime.
//Για κάθε θέση υπολογίζει αν είναι ήδη κρατημένη ή διαθέσιμη.
const getSeatsByShowtimeId = async (req, res) => {
// Παίρνουμε το showtimeId από τα route parameters.	
  const { showtimeId } = req.params;

  try {
// Ανάκτηση όλων των θέσεων που ανήκουν στο θέατρο της συγκεκριμένης παράστασης.
// Το πεδίο is_reserved γίνεται 1 όταν υπάρχει ενεργή κράτηση για τη συγκεκριμένη θέση και showtime.	  
    const [rows] = await db.query(
      `
      SELECT 
        se.seat_id,
        se.seat_row,
        se.seat_number,
        se.category,
        CASE
          WHEN EXISTS (
            SELECT 1
            FROM reservations r
            JOIN reservation_seats rs 
              ON rs.reservation_id = r.reservation_id
            WHERE r.showtime_id = st.showtime_id
              AND r.status = 'ACTIVE'
              AND rs.seat_id = se.seat_id
          )
          THEN 1
          ELSE 0
        END AS is_reserved
      FROM showtimes st
      JOIN shows s ON st.show_id = s.show_id
      JOIN seats se ON se.theatre_id = s.theatre_id
      WHERE st.showtime_id = ?
      ORDER BY se.seat_row, se.seat_number
      `,
      [showtimeId]
    );
// Επιστροφή της λίστας θέσεων μαζί με την κατάσταση διαθεσιμότητας.
    res.json(rows);
  } catch (error) {
// Επιστροφή μηνύματος σφάλματος αν αποτύχει η ανάκτηση των θέσεων.	  
    res.status(500).json({
      message: 'Failed to fetch seats',
      error: error.message
    });
  }
};
// Εξαγωγή του seats controller για χρήση στα routes.
module.exports = { getSeatsByShowtimeId };
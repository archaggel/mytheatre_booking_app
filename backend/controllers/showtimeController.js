const db = require('../config/db');
//Επιστρέφει όλες τις διαθέσιμες ημερομηνίες και ώρες
//για μία συγκεκριμένη παράσταση.
const getShowtimesByShowId = async (req, res) => {
// Παίρνουμε το showId από τα route parameters.	
  const { showId } = req.params;

  try {
// Ανάκτηση των showtimes της συγκεκριμένης παράστασης ταξινομημένα ανά ημερομηνία και ώρα.	  
    const [rows] = await db.query(
      `
      SELECT 
        showtime_id,
        show_id,
        show_date,
        show_time,
        hall_name,
        base_price
      FROM showtimes
      WHERE show_id = ?
      ORDER BY show_date, show_time
      `,
      [showId]
    );
// Επιστροφή των showtimes στο frontend σε μορφή JSON.
    res.json(rows);
  } catch (error) {
// Επιστροφή μηνύματος σφάλματος αν αποτύχει η ανάκτηση των showtimes.	  
    res.status(500).json({
      message: 'Failed to fetch showtimes',
      error: error.message
    });
  }
};
// Εξαγωγή του showtimes controller για χρήση στα routes.
module.exports = { getShowtimesByShowId };
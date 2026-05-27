const db = require('../config/db');
//Επιστρέφει τη λίστα όλων των διαθέσιμων θεάτρων.
//Χρησιμοποιείται από το frontend για την αρχική προβολή θεάτρων.
const getTheatres = async (req, res) => {
  try {
    // Ανάκτηση όλων των θεάτρων από τη βάση, ταξινομημένα με βάση το theatre_id.	  
    const [rows] = await db.query('SELECT * FROM theatres ORDER BY theatre_id');
// Επιστροφή της λίστας θεάτρων στο frontend σε μορφή JSON.   
   res.json(rows);
  } catch (error) {
// Επιστροφή μηνύματος σφάλματος αν αποτύχει η ανάκτηση των θεάτρων.	  
    res.status(500).json({
      message: 'Failed to fetch theatres',
      error: error.message
    });
  }
};
// Εξαγωγή του theatres controller για χρήση στα routes.
module.exports = { getTheatres };
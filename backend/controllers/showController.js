const db = require('../config/db');
//Επιστρέφει όλες τις παραστάσεις μαζί με το θέατρο στο οποίο ανήκουν.
//Χρησιμοποιείται από το frontend για την εμφάνιση της λίστας παραστάσεων.
const getShows = async (req, res) => {
  try {
// Ανάκτηση παραστάσεων μαζί με τα βασικά στοιχεία του αντίστοιχου θεάτρου.	  
    const [rows] = await db.query(`
      SELECT 
        s.show_id,
        s.title,
        s.description,
        s.duration,
        s.age_rating,
        t.theatre_id,
        t.name AS theatre_name
      FROM shows s
      JOIN theatres t ON s.theatre_id = t.theatre_id
      ORDER BY s.show_id
    `);
// Επιστροφή της λίστας παραστάσεων σε μορφή JSON.
    res.json(rows);
  } catch (error) {
// Επιστροφή μηνύματος σφάλματος αν αποτύχει η ανάκτηση των παραστάσεων.	  
    res.status(500).json({
      message: 'Failed to fetch shows',
      error: error.message
    });
  }
};
// Εξαγωγή του shows controller για χρήση στα routes.
module.exports = { getShows };
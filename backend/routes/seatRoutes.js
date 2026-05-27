const express = require('express');
const router = express.Router();
const { getSeatsByShowtimeId } = require('../controllers/seatController');
// Επιστρέφει τις θέσεις και τη διαθεσιμότητά τους για συγκεκριμένο showtime.
// Το showtimeId περνάει ως route parameter και χρησιμοποιείται από τον controller.
router.get('/:showtimeId', getSeatsByShowtimeId);
// Εξαγωγή των seat routes για χρήση στο κεντρικό app/server.
module.exports = router;
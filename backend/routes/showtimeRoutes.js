const express = require('express');
const router = express.Router();
const { getShowtimesByShowId } = require('../controllers/showtimeController');
// Επιστρέφει τις διαθέσιμες ημερομηνίες και ώρες για συγκεκριμένη παράσταση.
// Το showId περνάει ως route parameter και χρησιμοποιείται από τον controller.
router.get('/:showId', getShowtimesByShowId);
// Εξαγωγή των showtime routes για χρήση στο κεντρικό app/server.
module.exports = router;
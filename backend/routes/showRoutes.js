const express = require('express');
const router = express.Router();
const { getShows } = require('../controllers/showController');
// Επιστρέφει τη λίστα όλων των παραστάσεων.
// Ο controller μπορεί να χρησιμοποιηθεί από το frontend για προβολή παραστάσεων ανά θέατρο.
router.get('/', getShows);
// Εξαγωγή των show routes για χρήση στο κεντρικό app/server.
module.exports = router;
const express = require('express');
const router = express.Router();
const { getTheatres } = require('../controllers/theatreController');
// Επιστρέφει τη λίστα όλων των διαθέσιμων θεάτρων.
router.get('/', getTheatres);
// Εξαγωγή των theatre routes για χρήση στο κεντρικό app/server.
module.exports = router;
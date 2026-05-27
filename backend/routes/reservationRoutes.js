const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  getReservationDetails,
  getReservationsByUserId,
  createReservation,
  cancelReservation
} = require('../controllers/reservationController');

// Προστατευμένο endpoint για αναλυτική προβολή όλων των κρατήσεων.
// Το authMiddleware απαιτείται ώστε ο controller να ελέγξει αν ο χρήστης είναι admin.
router.get('/details', authMiddleware, getReservationDetails);
// Επιστρέφει τις κρατήσεις συγκεκριμένου χρήστη.
// Ο controller ελέγχει αν ο χρήστης βλέπει δικές του κρατήσεις ή αν είναι admin.
router.get('/user/:userId', authMiddleware, getReservationsByUserId);
// Δημιουργεί νέα κράτηση για τον συνδεδεμένο χρήστη.
router.post('/', authMiddleware, createReservation);
// Ακυρώνει υπάρχουσα κράτηση, εφόσον ανήκει στον χρήστη ή ο χρήστης είναι admin.
router.delete('/:id', authMiddleware, cancelReservation);
// Εξαγωγή των reservation routes για χρήση στο κεντρικό app/server.
module.exports = router;
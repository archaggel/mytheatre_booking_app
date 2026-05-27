const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
// Δημιουργία νέου λογαριασμού χρήστη.
router.post('/register', register);
// Σύνδεση χρήστη και επιστροφή JWT token.
router.post('/login', login);
// Προστατευμένο endpoint προφίλ.
// Εκτελείται μόνο αν το JWT token είναι έγκυρο.
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected profile route accessed successfully',
    user: req.user
  });
});
// Εξαγωγή των authentication routes για χρήση στο κεντρικό app/server.
module.exports = router;
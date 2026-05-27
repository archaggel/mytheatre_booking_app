require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const theatreRoutes = require('./routes/theatreRoutes');
const showRoutes = require('./routes/showRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const seatRoutes = require('./routes/seatRoutes');
const authRoutes = require('./routes/authRoutes');

// Δημιουργία της Express εφαρμογής.
const app = express();
// Ενεργοποίηση CORS ώστε το frontend να μπορεί να επικοινωνεί με το backend.
app.use(cors());
// Επιτρέπει στο backend να διαβάζει JSON δεδομένα από τα request bodies.
app.use(express.json());
// Σύνδεση των βασικών route groups της εφαρμογής.
app.use('/theatres', theatreRoutes);
app.use('/shows', showRoutes);
app.use('/showtimes', showtimeRoutes);
app.use('/reservations', reservationRoutes);
app.use('/seats', seatRoutes);
app.use('/auth', authRoutes);
// Βασικό endpoint ελέγχου ότι το backend λειτουργεί.
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running successfully' });
});
// Δοκιμαστικό endpoint για έλεγχο σύνδεσης με τη βάση δεδομένων.
app.get('/test-db', async (req, res) => {
  try {
// Εκτέλεση απλού query για επιβεβαίωση ότι η βάση απαντά σωστά.	  
    const [rows] = await db.query('SELECT 1 AS test');
    res.json({
      message: 'Database connection successful',
      result: rows
    });
  } catch (error) {
// Επιστροφή σφάλματος αν αποτύχει η σύνδεση με τη βάση.	  
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    });
  }
});
// Εξαγωγή της εφαρμογής για χρήση από το server.js ή για testing.
module.exports = app;
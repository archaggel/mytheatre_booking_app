# Backend - MyTheatre Booking App

## Περιγραφή

Το backend της εφαρμογής MyTheatre έχει υλοποιηθεί με Node.js και Express.js.

Είναι υπεύθυνο για:

- τη διαχείριση των REST API endpoints
- την εγγραφή και σύνδεση χρηστών
- τη δημιουργία JWT token
- τον έλεγχο προστατευμένων routes
- την επικοινωνία με τη MariaDB βάση δεδομένων
- τη δημιουργία και ακύρωση κρατήσεων

---

## Τεχνολογίες

- Node.js
- Express.js
- MariaDB
- mysql2
- bcryptjs
- jsonwebtoken
- dotenv
- cors

---

## Δομή Φακέλων

```txt
backend/
  config/
    db.js

  controllers/
    authController.js
    reservationController.js
    seatController.js
    showController.js
    showtimeController.js
    theatreController.js

  middleware/
    authMiddleware.js

  routes/
    authRoutes.js
    reservationRoutes.js
    seatRoutes.js
    showRoutes.js
    showtimeRoutes.js
    theatreRoutes.js

  app.js
  server.js
  package.json
  package-lock.json
  .env.example
  
  Εγκατάσταση
1. Μετάβαση στον φάκελο backend
cd backend

2. Εγκατάσταση dependencies
npm install

3. Δημιουργία αρχείου .env
Δημιουργήστε αρχείο .env στον φάκελο backend.

Παράδειγμα:
PORT=5000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=mytheatre_booking_db
JWT_SECRET=your_secret_key_here

Το πραγματικό .env δεν περιλαμβάνεται στην παράδοση για λόγους ασφάλειας.

Εκκίνηση Backend
node server.js

Αν ο server ξεκινήσει σωστά, εμφανίζεται:
Server is running on port 5000
Το backend τρέχει στη διεύθυνση:
http://127.0.0.1:5000

Έλεγχος Λειτουργίας
Έλεγχος backend
http://127.0.0.1:5000/

Αναμενόμενη απάντηση:
{
  "message": "Backend is running successfully"
}

Έλεγχος σύνδεσης με τη βάση
http://127.0.0.1:5000/test-db

Αναμενόμενη απάντηση:
{
  "message": "Database connection successful"
}

Βασικά API Endpoints
Authentication

POST /auth/register
POST /auth/login
GET  /auth/profile

Theatres
GET /theatres

Shows
GET /shows

Showtimes
GET /showtimes/:showId

Seats
GET /seats/:showtimeId

Reservations
GET    /reservations/details
GET    /reservations/user/:userId
POST   /reservations
DELETE /reservations/:id

Ασφάλεια
Το backend χρησιμοποιεί JWT authentication.
Μετά από επιτυχημένο login, δημιουργείται JWT token.
Το token χρησιμοποιείται στα protected routes μέσω του Authorization header:
Authorization: Bearer <token>
Οι κωδικοί των χρηστών αποθηκεύονται στη βάση ως bcrypt hashes και όχι ως απλό κείμενο.

Σημείωση
Το backend πρέπει να τρέχει πριν ξεκινήσει το frontend, ώστε η εφαρμογή να μπορεί να
 επικοινωνήσει με τα API endpoints.

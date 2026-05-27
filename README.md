# MyTheatre Booking App

## Μάθημα

CN6035 - Mobile & Distributed Systems

## Τίτλος Εργασίας

Ανάπτυξη Εφαρμογής Κράτησης Θέσεων σε Θεατρικές Παραστάσεις μέσω Κινητής Συσκευής

## Περιγραφή Εφαρμογής

Το MyTheatre είναι μία εφαρμογή κράτησης θέσεων για θεατρικές παραστάσεις.

Η εφαρμογή επιτρέπει στον χρήστη να δημιουργήσει λογαριασμό, να συνδεθεί, να προβάλει διαθέσιμα θέατρα, να επιλέξει παράσταση, να δει διαθέσιμες ημερομηνίες και ώρες, να επιλέξει θέσεις και να δημιουργήσει κράτηση.

Επίσης, ο χρήστης μπορεί να δει το ιστορικό των κρατήσεών του και να ακυρώσει ενεργές κρατήσεις.

Το σύστημα ακολουθεί αρχιτεκτονική κατανεμημένης εφαρμογής:

- Frontend: React Native / Expo
- Backend: Node.js / Express REST API
- Database: MariaDB

## Βασικές Λειτουργίες

- Εγγραφή χρήστη
- Σύνδεση χρήστη με JWT authentication
- Αποθήκευση στοιχείων σύνδεσης τοπικά για demo χρήση
- Προβολή διαθέσιμων θεάτρων
- Προβολή παραστάσεων ανά θέατρο
- Προβολή διαθέσιμων showtimes ανά παράσταση
- Προβολή διαθεσιμότητας θέσεων
- Επιλογή θέσεων
- Δημιουργία κράτησης
- Προβολή κρατήσεων χρήστη
- Ακύρωση ενεργής κράτησης
- Προστατευμένα backend routes με JWT middleware
- Σύνδεση backend με MariaDB βάση δεδομένων

## Τεχνολογίες που Χρησιμοποιήθηκαν

### Frontend

- React Native
- Expo
- React Navigation
- Axios
- JavaScript

### Backend

- Node.js
- Express.js
- JWT authentication
- bcryptjs για hashing κωδικών
- mysql2 για σύνδεση με MariaDB
- dotenv για χρήση environment variables
- cors για επικοινωνία frontend και backend

### Database

- MariaDB Server 12.2.2
- HeidiSQL 12.17.0.7270 για export της βάσης δεδομένων

## Δομή Project

Η εφαρμογή χωρίζεται σε δύο βασικά μέρη: frontend και backend.  
Το frontend είναι υπεύθυνο για την αλληλεπίδραση με τον χρήστη, ενώ το backend διαχειρίζεται τα REST API endpoints, την αυθεντικοποίηση και την επικοινωνία με τη βάση δεδομένων.

```txt
mytheatre_booking_app/
  backend/
    config/
    controllers/
    middleware/
    routes/
    app.js
    server.js
    package.json
    package-lock.json
    .env.example

  frontend/
    assets/
    navigation/
    screens/
    services/
    App.js
    index.js
    app.json
    package.json
    package-lock.json

  database/
    mytheatre_booking_db.sql

  README.md
  .gitignore
  
  ## Οδηγίες Εγκατάστασης Backend

Το backend έχει υλοποιηθεί με Node.js και Express.js και επικοινωνεί με MariaDB βάση δεδομένων.

### 1. Μετάβαση στον φάκελο backend

Από τον κεντρικό φάκελο του project:

```bash
cd backend

2. Εγκατάσταση dependencies

npm install

Η εντολή αυτή εγκαθιστά όλα τα απαραίτητα πακέτα που υπάρχουν στο package.json.

3. Δημιουργία αρχείου .env
Στον φάκελο backend πρέπει να δημιουργηθεί αρχείο .env.
Υπάρχει ήδη αρχείο .env.example ως παράδειγμα των απαραίτητων μεταβλητών.

Παράδειγμα .env:
PORT=5000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=mytheatre_booking_db
JWT_SECRET=your_secret_key_here
Το πραγματικό αρχείο .env δεν περιλαμβάνεται στην παράδοση για λόγους ασφάλειας.

4. Εκκίνηση backend server

node server.js

Αν όλα λειτουργούν σωστά, στο terminal εμφανίζεται μήνυμα:
Server is running on port 5000
Το backend τρέχει στη διεύθυνση:
http://127.0.0.1:5000

Αναμενόμενη απάντηση:
{
  "message": "Backend is running successfully"
}

6. Έλεγχος σύνδεσης με τη βάση δεδομένων

Άνοιγμα στον browser:
http://127.0.0.1:5000/test-db

Αναμενόμενη απάντηση:
{
  "message": "Database connection successful"
}


## Οδηγίες Εγκατάστασης Frontend

Το frontend έχει υλοποιηθεί με React Native και Expo.  
Η εφαρμογή επικοινωνεί με το backend μέσω Axios.

### 1. Μετάβαση στον φάκελο frontend

Από τον κεντρικό φάκελο του project:

```bash
cd frontend

2. Εγκατάσταση dependencies

npm install

Η εντολή αυτή εγκαθιστά όλα τα απαραίτητα frontend πακέτα που υπάρχουν στο package.json.

3. Εκκίνηση Expo frontend

Για εκτέλεση σε web browser:
npx expo start --web

Εναλλακτικά:
npx expo start

και στη συνέχεια επιλογή:
w
για άνοιγμα σε web browser.

4. Διεύθυνση frontend

Η web έκδοση συνήθως ανοίγει στη διεύθυνση:
http://localhost:8081

5. Σύνδεση frontend με backend

Στο αρχείο:
frontend/services/api.js

η βασική διεύθυνση του backend έχει οριστεί ως:
http://127.0.0.1:5000

Για τοπικό web demo στον ίδιο υπολογιστή, αυτή η ρύθμιση λειτουργεί σωστά.
Αν η εφαρμογή εκτελεστεί σε πραγματική κινητή συσκευή μέσω Expo Go, η διεύθυνση 
μπορεί να χρειαστεί να αλλάξει στην τοπική IP του υπολογιστή, για παράδειγμα:
http://192.168.1.20:5000

Οδηγίες Βάσης Δεδομένων

Η βάση δεδομένων της εφαρμογής υλοποιήθηκε σε MariaDB Server 12.2.2 και έγινε export μέσω
 HeidiSQL 12.17.0.7270.
 
 Το SQL export βρίσκεται στον φάκελο:
 database/mytheatre_booking_db.sql
 
 Το αρχείο περιλαμβάνει:

δημιουργία βάσης δεδομένων
δημιουργία πινάκων
primary keys
foreign keys
αρχικά δεδομένα
χρήστες με hashed passwords
θέατρα, παραστάσεις, showtimes, θέσεις και κρατήσεις

Βασικοί Πίνακες

Η βάση δεδομένων περιλαμβάνει τους εξής βασικούς πίνακες:

users
theatres
shows
showtimes
seats
reservations
reservation_seats

Περιγραφή Πινάκων

users
Αποθηκεύει τα στοιχεία των χρηστών της εφαρμογής.

Περιλαμβάνει:

user_id
name
email
password
role
Οι κωδικοί αποθηκεύονται με bcrypt hashing.

theatres
Αποθηκεύει τα διαθέσιμα θέατρα.

Περιλαμβάνει:

theatre_id
NAME
location
DESCRIPTION

shows
Αποθηκεύει τις παραστάσεις και συνδέεται με τον πίνακα theatres.

Περιλαμβάνει:

show_id
theatre_id
title
description
duration
age_rating

showtimes
Αποθηκεύει τις διαθέσιμες ημερομηνίες και ώρες για κάθε παράσταση.

Περιλαμβάνει:

showtime_id
show_id
show_date
show_time
hall_name
base_price

seats
Αποθηκεύει τις θέσεις κάθε θεάτρου.

Περιλαμβάνει:

seat_id
theatre_id
seat_row
seat_number
category

reservations
Αποθηκεύει τις κρατήσεις των χρηστών.

Περιλαμβάνει:

reservation_id
user_id
showtime_id
reservation_date
status
total_price

reservation_seats
Συνδέει κάθε κράτηση με τις επιλεγμένες θέσεις.

Περιλαμβάνει:

reservation_seat_id
reservation_id
seat_id
price


Import της Βάσης Δεδομένων

Για να γίνει import της βάσης:

1.Άνοιγμα του HeidiSQL.
2.Σύνδεση στον MariaDB server.
3.Επιλογή του SQL αρχείου:

database/mytheatre_booking_db.sql

4.κτέλεση του SQL script.
5.Έλεγχος ότι δημιουργήθηκε η βάση:

mytheatre_booking_db

6.Έλεγχος ότι εμφανίζονται οι βασικοί πίνακες:

users
theatres
shows
showtimes
seats
reservations
reservation_seats

Έλεγχος Βάσης μέσω Backend

Αφού τρέξει το backend, μπορεί να γίνει έλεγχος σύνδεσης με τη βάση από τον browser:

http://127.0.0.1:5000/test-db

Αν η σύνδεση είναι σωστή, εμφανίζεται μήνυμα επιτυχίας.


## API Endpoints

Το backend παρέχει REST API endpoints για την επικοινωνία με το frontend.  
Τα endpoints είναι οργανωμένα σε ξεχωριστά route files και controllers.

### Authentication Endpoints

Τα authentication endpoints χρησιμοποιούνται για εγγραφή, σύνδεση και έλεγχο προστατευμένης πρόσβασης.

```txt
POST /auth/register
POST /auth/login
GET  /auth/profile

POST /auth/register

Δημιουργεί νέο χρήστη.

Παράδειγμα request body:
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}

POST /auth/login

Συνδέει υπάρχοντα χρήστη και επιστρέφει JWT token.

Παράδειγμα request body:
{
  "email": "test@example.com",
  "password": "123456"
}

Παράδειγμα response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "userId": 1,
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}

Theatre Endpoints

GET /theatres
Επιστρέφει τη λίστα όλων των διαθέσιμων θεάτρων.

Show Endpoints

GET /shows
Επιστρέφει τη λίστα των διαθέσιμων παραστάσεων μαζί με τα στοιχεία του θεάτρου στο οποίο ανήκουν.

Showtime Endpoints

GET /showtimes/:showId
Επιστρέφει τις διαθέσιμες ημερομηνίες και ώρες για συγκεκριμένη παράσταση.

Παράδειγμα:
GET /showtimes/1

Seat Endpoints

GET /seats/:showtimeId
Επιστρέφει τις θέσεις για συγκεκριμένο showtime και την κατάσταση διαθεσιμότητάς τους.

Το πεδίο is_reserved δείχνει αν μία θέση είναι ήδη κρατημένη:

0 = διαθέσιμη
1 = κρατημένη

Παράδειγμα:
GET /seats/1

Reservation Endpoints

GET    /reservations/details
GET    /reservations/user/:userId
POST   /reservations
DELETE /reservations/:id

Τα reservation endpoints χρησιμοποιούνται για δημιουργία, προβολή και ακύρωση κρατήσεων.

GET /reservations/user/:userId
Επιστρέφει τις κρατήσεις συγκεκριμένου χρήστη.

Παράδειγμα:
GET /reservations/user/1

POST /reservations

Δημιουργεί νέα κράτηση για τον συνδεδεμένο χρήστη.

Παράδειγμα request body:

{
  "showtimeId": 1,
  "seatIds": [1, 2]
}

DELETE /reservations/:id
Ακυρώνει μία υπάρχουσα κράτηση.

Παράδειγμα:
DELETE /reservations/5

Protected Routes

Ορισμένα endpoints είναι προστατευμένα και απαιτούν JWT token.
Το token αποστέλλεται στο Authorization header:

Authorization: Bearer <token>

Προστατευμένα endpoints:

GET    /auth/profile
GET    /reservations/details
GET    /reservations/user/:userId
POST   /reservations
DELETE /reservations/:id

Το backend χρησιμοποιεί authMiddleware για να ελέγχει αν το token είναι έγκυρο πριν επιτρέψει την πρόσβαση.


## Ροή Λειτουργίας Εφαρμογής

Η εφαρμογή λειτουργεί με τη συνεργασία frontend, backend και βάσης δεδομένων.

### 1. Εγγραφή Χρήστη

Ο χρήστης συμπληρώνει όνομα, email και κωδικό στην οθόνη εγγραφής.

Το frontend στέλνει τα στοιχεία στο backend μέσω του endpoint:

```txt
POST /auth/register
Το backend ελέγχει αν το email υπάρχει ήδη, κάνει hash τον κωδικό με bcrypt και 
αποθηκεύει τον νέο χρήστη στη βάση δεδομένων.

2. Σύνδεση Χρήστη

Ο χρήστης συνδέεται με email και password.
Το frontend στέλνει τα στοιχεία στο endpoint:

POST /auth/login

Το backend αναζητά τον χρήστη στη βάση, συγκρίνει τον κωδικό με το αποθηκευμένο 
hashed password και, αν τα στοιχεία είναι σωστά, επιστρέφει JWT token.

Το token χρησιμοποιείται στη συνέχεια για protected requests.


3. Προβολή Θεάτρων

Μετά τη σύνδεση, ο χρήστης μεταφέρεται στην αρχική οθόνη με τη λίστα θεάτρων.
Το frontend καλεί το endpoint:
GET /theatres
και εμφανίζει τα διαθέσιμα θέατρα από τη βάση δεδομένων.

4. Προβολή Παραστάσεων

Όταν ο χρήστης επιλέξει ένα θέατρο, η εφαρμογή εμφανίζει τις παραστάσεις που ανήκουν σε αυτό.
Το frontend καλεί το endpoint:
GET /shows
και φιλτράρει τις παραστάσεις με βάση το επιλεγμένο θέατρο.


5. Προβολή Showtimes

Όταν ο χρήστης επιλέξει μία παράσταση, εμφανίζονται οι διαθέσιμες ημερομηνίες και ώρες.
Το frontend καλεί το endpoint:
GET /showtimes/:showId
Τα showtimes περιλαμβάνουν ημερομηνία, ώρα, αίθουσα και βασική τιμή εισιτηρίου.

6. Επιλογή Θέσεων

Όταν ο χρήστης επιλέξει showtime, εμφανίζονται οι διαθέσιμες και κρατημένες θέσεις.
Το frontend καλεί το endpoint:
GET /seats/:showtimeId
Κάθε θέση επιστρέφεται μαζί με το πεδίο is_reserved, ώστε το frontend να εμφανίζει 
διαφορετικό χρώμα για διαθέσιμες, επιλεγμένες και κρατημένες θέσεις.

7. Δημιουργία Κράτησης

Ο χρήστης επιλέγει μία ή περισσότερες διαθέσιμες θέσεις και πατά το κουμπί κράτησης.
Το frontend στέλνει request στο endpoint:
POST /reservations
Το request περιλαμβάνει:
{
  "showtimeId": 1,
  "seatIds": [1, 2]
}

Το backend ελέγχει:
αν υπάρχει το showtime
αν οι θέσεις ανήκουν στο σωστό θέατρο
αν οι θέσεις είναι ήδη κρατημένες
αν ο χρήστης είναι συνδεδεμένος μέσω JWT
Αν όλα είναι σωστά, δημιουργείται νέα κράτηση στη βάση δεδομένων.

8. Προβολή Κρατήσεων Χρήστη

Ο χρήστης μπορεί να δει τις κρατήσεις του από την οθόνη "Οι Κρατήσεις Μου".
Το frontend καλεί το endpoint:
GET /reservations/user/:userId
Το backend επιστρέφει μόνο τις κρατήσεις του συγκεκριμένου χρήστη, 
εκτός αν ο χρήστης έχει ρόλο admin.

9. Ακύρωση Κράτησης

Ο χρήστης μπορεί να ακυρώσει μία ενεργή κράτηση.
Το frontend στέλνει request στο endpoint:
DELETE /reservations/:id
Η κράτηση δεν διαγράφεται από τη βάση.
Αντίθετα, αλλάζει το πεδίο status σε:
CANCELLED
Με αυτόν τον τρόπο διατηρείται ιστορικό κρατήσεων.


Ασφάλεια
Η εφαρμογή περιλαμβάνει βασικά μέτρα ασφάλειας για authentication και 
προστασία δεδομένων.

Password Hashing
Οι κωδικοί των χρηστών δεν αποθηκεύονται ως απλό κείμενο.
Πριν αποθηκευτούν στη βάση δεδομένων, γίνονται hash με bcrypt.

JWT Authentication
Μετά από επιτυχημένο login, το backend επιστρέφει JWT token.
Το token αποστέλλεται στα protected requests μέσω του Authorization header:
Authorization: Bearer <token>

Protected Routes
Τα protected routes ελέγχονται από το authMiddleware.
Αν το token είναι έγκυρο, το backend αποθηκεύει τα στοιχεία του χρήστη στο:
req.user
και επιτρέπει τη συνέχεια του request.
Αν το token λείπει, είναι άκυρο ή έχει λήξει, το backend επιστρέφει error response.

Έλεγχος Πρόσβασης

Ο απλός χρήστης μπορεί:
να δημιουργήσει δικές του κρατήσεις
να δει μόνο τις δικές του κρατήσεις
να ακυρώσει μόνο δικές του κρατήσεις
Ο admin μπορεί να έχει πρόσβαση σε περισσότερα στοιχεία κρατήσεων, ανάλογα με το route.

Τοπική Αποθήκευση Token

Για το τοπικό demo, το frontend αποθηκεύει το JWT token και τα στοιχεία χρήστη τοπικά, 
ώστε να μπορεί να γίνονται authenticated requests.
Σε production mobile εφαρμογή, η αποθήκευση token θα ήταν προτιμότερο να γίνει με πιο 
ασφαλή μηχανισμό secure storage.

## Πλήρης Εκτέλεση Project

Για να τρέξει ολόκληρη η εφαρμογή, πρέπει να εκτελεστούν πρώτα το backend και μετά το frontend.

### 1. Εκκίνηση Backend

Σε πρώτο terminal:

```bash
cd backend
node server.js
```

Αν όλα λειτουργούν σωστά, εμφανίζεται:

```txt
Server is running on port 5000
```

Έλεγχος backend:

```txt
http://127.0.0.1:5000/
```

Έλεγχος σύνδεσης με βάση δεδομένων:

```txt
http://127.0.0.1:5000/test-db
```

### 2. Εκκίνηση Frontend

Σε δεύτερο terminal:

```bash
cd frontend
npx expo start --web
```

Η εφαρμογή ανοίγει σε web browser, συνήθως στη διεύθυνση:

```txt
http://localhost:8081
```

---

## Demo Account

Για δοκιμή της εφαρμογής μπορεί να χρησιμοποιηθεί λογαριασμός demo.

```txt
Email: testuser@example.com
Password: 123456
```

Σημείωση: Οι κωδικοί στη βάση δεδομένων είναι αποθηκευμένοι ως bcrypt hashes και όχι ως απλό κείμενο.

---

## Σενάριο Demo

Ένα τυπικό σενάριο χρήσης της εφαρμογής είναι:

1. Ο χρήστης κάνει εγγραφή ή σύνδεση.
2. Εμφανίζεται η λίστα διαθέσιμων θεάτρων.
3. Ο χρήστης επιλέγει θέατρο.
4. Εμφανίζονται οι παραστάσεις του θεάτρου.
5. Ο χρήστης επιλέγει παράσταση.
6. Εμφανίζονται οι διαθέσιμες ημερομηνίες και ώρες.
7. Ο χρήστης επιλέγει showtime.
8. Εμφανίζονται οι θέσεις και η διαθεσιμότητά τους.
9. Ο χρήστης επιλέγει θέσεις και δημιουργεί κράτηση.
10. Ο χρήστης μπορεί να δει την κράτηση στην οθόνη "Οι Κρατήσεις Μου".
11. Ο χρήστης μπορεί να ακυρώσει ενεργή κράτηση.

---

## Σημειώσεις Παράδοσης

Στην παράδοση περιλαμβάνονται:

- Ο πηγαίος κώδικας του frontend
- Ο πηγαίος κώδικας του backend
- Το SQL export της βάσης δεδομένων
- Το αρχείο `.env.example`
- Το αρχείο `README.md`
- Το αρχείο `.gitignore`

Δεν περιλαμβάνονται:

- `node_modules`
- `.env`
- προσωρινά αρχεία cache
- build folders

Τα dependencies εγκαθίστανται ξανά με:

```bash
npm install
```

---

## Συμπέρασμα

Η εφαρμογή MyTheatre υλοποιεί ένα ολοκληρωμένο σύστημα κράτησης θέσεων για θεατρικές παραστάσεις.
Το project συνδυάζει React Native frontend, Node.js / Express backend και MariaDB βάση δεδομένων.  
Υποστηρίζει εγγραφή και σύνδεση χρήστη, JWT authentication, προβολή θεάτρων και παραστάσεων, επιλογή showtimes, επιλογή θέσεων, 
δημιουργία κρατήσεων και ακύρωση ενεργών κρατήσεων.
Η υλοποίηση δείχνει τη συνεργασία ενός mobile/web client με REST API και σχεσιακή βάση δεδομένων.
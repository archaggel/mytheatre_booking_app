# Frontend - MyTheatre Booking App

## Περιγραφή

Το frontend της εφαρμογής MyTheatre έχει υλοποιηθεί με React Native και Expo.

Είναι υπεύθυνο για την εμφάνιση των οθονών της εφαρμογής και την επικοινωνία με το backend REST API.

Μέσα από το frontend ο χρήστης μπορεί να:

- κάνει εγγραφή
- κάνει σύνδεση
- δει διαθέσιμα θέατρα
- επιλέξει θέατρο
- δει παραστάσεις
- επιλέξει διαθέσιμη ημερομηνία και ώρα
- δει διαθέσιμες και κρατημένες θέσεις
- επιλέξει θέσεις
- δημιουργήσει κράτηση
- δει τις κρατήσεις του
- ακυρώσει ενεργή κράτηση

---

## Τεχνολογίες

- React Native
- Expo
- React Navigation
- Axios
- JavaScript

---

## Δομή Φακέλων

```txt
frontend/
  assets/
    ui/

  navigation/
    AppNavigator.js

  screens/
    LoginScreen.js
    RegisterScreen.js
    TheatresScreen.js
    ShowsScreen.js
    ShowtimesScreen.js
    SeatsScreen.js
    MyReservationsScreen.js

  services/
    api.js
    authStorage.js

  App.js
  index.js
  app.json
  package.json
  package-lock.json
  
  Εγκατάσταση
  
1. Μετάβαση στον φάκελο frontend
cd frontend

2. Εγκατάσταση dependencies
npm install
Η εντολή αυτή εγκαθιστά όλα τα απαραίτητα frontend πακέτα που ορίζονται στο package.json.

Εκκίνηση Frontend

Για εκτέλεση σε web browser:
npx expo start --web

Εναλλακτικά:
npx expo start

και μετά επιλογή:
w
για άνοιγμα της εφαρμογής σε web browser.

Η εφαρμογή συνήθως ανοίγει στη διεύθυνση:
http://localhost:8081

Σύνδεση με Backend
Το frontend επικοινωνεί με το backend μέσω Axios.
Η βασική διεύθυνση του backend βρίσκεται στο αρχείο:
services/api.js

Για τοπική εκτέλεση σε web browser χρησιμοποιείται:
http://127.0.0.1:5000
Το backend πρέπει να τρέχει πριν γίνει χρήση της εφαρμογής.

Βασικές Οθόνες

LoginScreen
Οθόνη σύνδεσης χρήστη.
Στέλνει email και password στο backend και αποθηκεύει το JWT token μετά από επιτυχημένη σύνδεση.

RegisterScreen
Οθόνη εγγραφής νέου χρήστη.
Στέλνει όνομα, email και password στο backend για δημιουργία λογαριασμού.

TheatresScreen
Αρχική οθόνη μετά το login.
Εμφανίζει τη λίστα διαθέσιμων θεάτρων.

ShowsScreen
Εμφανίζει τις παραστάσεις που αντιστοιχούν στο επιλεγμένο θέατρο.

ShowtimesScreen
Εμφανίζει τις διαθέσιμες ημερομηνίες και ώρες για την επιλεγμένη παράσταση.

SeatsScreen
Εμφανίζει τις θέσεις για συγκεκριμένο showtime.
Οι θέσεις εμφανίζονται με διαφορετικό χρώμα ανάλογα με την κατάστασή τους:
Διαθέσιμη
Επιλεγμένη
Κρατημένη

MyReservationsScreen
Εμφανίζει τις κρατήσεις του συνδεδεμένου χρήστη.
Ο χρήστης μπορεί να ακυρώσει ενεργές κρατήσεις και να επιστρέψει στην αρχική οθόνη.

Services
api.js
Περιέχει όλες τις Axios κλήσεις προς το backend API, όπως:

loginUser
registerUser
getTheatres
getShows
getShowtimes
getSeats
getUserReservations
createReservation
cancelReservation

authStorage.js
Χρησιμοποιείται για την τοπική αποθήκευση του JWT token και των στοιχείων χρήστη κατά 
τη διάρκεια του demo.

Σημαντική Σημείωση
Για τοπικό web demo, το frontend χρησιμοποιεί:
http://127.0.0.1:5000

Αν η εφαρμογή εκτελεστεί σε πραγματική κινητή συσκευή μέσω Expo Go, μπορεί να χρειαστεί αλλαγή της διεύθυνσης 
backend στην τοπική IP του υπολογιστή, για παράδειγμα:
http://192.168.1.20:5000

Σειρά Εκτέλεσης

Πρώτα πρέπει να τρέξει το backend:
cd backend
node server.js

Μετά πρέπει να τρέξει το frontend:
cd frontend
npx expo start --web
const app = require('./app');
// Ορισμός της θύρας λειτουργίας του server.
// Αν δεν υπάρχει PORT στο .env, χρησιμοποιείται προεπιλεγμένα η θύρα 5000.
const PORT = process.env.PORT || 5000;
// Εκκίνηση του Express server στη συγκεκριμένη θύρα.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
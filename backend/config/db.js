const mysql = require('mysql2');
//Δημιουργία connection pool για τη σύνδεση με τη βάση δεδομένων.
//Τα στοιχεία σύνδεσης διαβάζονται από environment variables για λόγους ασφάλειας.
const pool = mysql.createPool({
// Στοιχεία σύνδεσης με τη βάση δεδομένων από το αρχείο .env.
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
// Το pool περιμένει διαθέσιμη σύνδεση όταν όλες οι connections είναι απασχολημένες.  
  waitForConnections: true,
// Μέγιστος αριθμός ταυτόχρονων συνδέσεων προς τη βάση.  
  connectionLimit: 10,
// Χωρίς όριο στην ουρά αναμονής για νέα database requests.  
  queueLimit: 0
});
// Εξαγωγή του pool με Promise API ώστε να χρησιμοποιείται με async/await.
module.exports = pool.promise();
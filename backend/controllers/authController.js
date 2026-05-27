const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Δημιουργεί νέο χρήστη.
//Ελέγχει αν τα απαραίτητα πεδία υπάρχουν, αν το email χρησιμοποιείται ήδη,
//αποθηκεύει hashed password και επιστρέφει το id του νέου χρήστη.
const register = async (req, res) => {
  const { name, email, password } = req.body;
// Έλεγχος ότι έχουν σταλεί όλα τα απαραίτητα στοιχεία εγγραφής.
  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({
      message: 'name, email and password are required'
    });
  }

  try {
// Έλεγχος αν υπάρχει ήδη χρήστης με το ίδιο email.
    const [existingUsers] = await db.query(
      'SELECT user_id FROM users WHERE email = ?',
      [email]
    );
// Αν το email υπάρχει ήδη στη βάση, η εγγραφή σταματά.
    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: 'User with this email already exists'
      });
    }
// Δημιουργία hashed password πριν την αποθήκευση στη βάση δεδομένων.
    const hashedPassword = await bcrypt.hash(password, 10);
// Εισαγωγή νέου χρήστη στη βάση με προκαθορισμένο ρόλο "user".
    const [result] = await db.query(
      `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, 'user')
      `,
      [name, email, hashedPassword]
    );
// Επιστροφή επιτυχούς απάντησης μαζί με το id του νέου χρήστη.
    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to register user'
    });
  }
};
//Συνδέει υπάρχοντα χρήστη.
//Αναζητά τον χρήστη με βάση το email, ελέγχει τον κωδικό
//και επιστρέφει JWT token μαζί με τα βασικά στοιχεία χρήστη.
const login = async (req, res) => {
  const { email, password } = req.body;
// Έλεγχος ότι έχουν σταλεί email και κωδικός.
// Έλεγχος ότι email και κωδικός δεν είναι κενά ή γεμάτα μόνο με κενά.
  if (!email.trim() || !password.trim()) {
    return res.status(400).json({
      message: 'email and password are required'
    });
  }

  try {
// Αναζήτηση χρήστη με βάση το email για τη διαδικασία σύνδεσης.	  
    const [users] = await db.query(
      `
      SELECT user_id, name, email, password, role
      FROM users
      WHERE email = ?
      `,
      [email]
    );
// Αν δεν βρεθεί χρήστης, επιστρέφεται γενικό μήνυμα για λόγους ασφαλείας.
    if (users.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const user = users[0];
// Σύγκριση του κωδικού που έδωσε ο χρήστης με το hashed password της βάσης.
    const isMatch = await bcrypt.compare(password, user.password);
// Αν ο κωδικός δεν ταιριάζει, η σύνδεση απορρίπτεται.
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }
	
// Έλεγχος ότι υπάρχει JWT secret πριν δημιουργηθεί το token.
if (!process.env.JWT_SECRET){
	return res.status(500).json({
		message: "JWT secret is not configured"
	});
}	
// Δημιουργία JWT token με βασικά στοιχεία χρήστη για authenticated requests.
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
// Επιστροφή token και βασικών στοιχείων χρήστη στο frontend.
    res.json({
      message: 'Login successful',
      token,
      user: {
        userId: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to login'   
    });
  }
};
// Εξαγωγή των authentication controllers για χρήση στα routes.
module.exports = { register, login };
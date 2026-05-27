const jwt = require('jsonwebtoken');
//Middleware ελέγχου ταυτότητας.
//Ελέγχει αν το request περιέχει έγκυρο JWT token
//και αποθηκεύει τα στοιχεία του χρήστη στο req.user.
const authMiddleware = (req, res, next) => {
// Ανάκτηση του Authorization header από το request.	
  const authHeader = req.headers.authorization;
// Αν δεν υπάρχει Authorization header, ο χρήστης δεν έχει στείλει token.
  if (!authHeader) {
    return res.status(401).json({
      message: 'Access denied. No token provided.'
    });
  }
// Το header πρέπει να έχει μορφή: Bearer <token>.
  const parts = authHeader.split(' ');
// Έλεγχος σωστής μορφής του Authorization header.
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      message: 'Invalid authorization format.'
    });
  }
// Ανάκτηση του token από το δεύτερο μέρος του header.
  const token = parts[1];

  try {
// Έλεγχος και αποκωδικοποίηση του JWT token με το μυστικό κλειδί του server.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Αποθήκευση των στοιχείων χρήστη στο request για χρήση από τους controllers.	
    req.user = decoded;
// Συνέχιση στο επόμενο middleware ή controller.	
    next();
  } catch (error) {
// Απόρριψη αιτήματος όταν το token είναι άκυρο ή έχει λήξει.	  
    return res.status(403).json({
      message: 'Invalid or expired token.'
    });
  }
};

module.exports = authMiddleware;
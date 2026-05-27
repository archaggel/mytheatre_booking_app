//Αποθηκεύει το JWT token και τα στοιχεία του χρήστη τοπικά.
//Χρησιμοποιείται ώστε η εφαρμογή να θυμάται τον συνδεδεμένο χρήστη.
export const saveAuthData = async (token, user) => {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('auth_user', JSON.stringify(user));
};
//Επιστρέφει το αποθηκευμένο JWT token.
//Το token χρησιμοποιείται σε protected API requests.
export const getToken = async () => {
  return localStorage.getItem('auth_token');
};
//Επιστρέφει τα αποθηκευμένα στοιχεία του χρήστη.
//Τα δεδομένα μετατρέπονται από JSON string σε JavaScript object.
export const getUser = async () => {
  const user = localStorage.getItem('auth_user');
  return user ? JSON.parse(user) : null;
};
//Διαγράφει τα στοιχεία σύνδεσης από την τοπική αποθήκευση.
//Χρησιμοποιείται κατά την αποσύνδεση του χρήστη.
export const clearAuthData = async () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
};
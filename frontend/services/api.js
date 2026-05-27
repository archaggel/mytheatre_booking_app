import axios from 'axios';
// Βασική διεύθυνση του backend server.
// Για emulator ή φυσική συσκευή μπορεί να χρειαστεί αλλαγή από 127.0.0.1 σε IP του υπολογιστή.
const BASE_URL = 'http://127.0.0.1:5000';
// Δημιουργία κοινής Axios instance για όλα τα API requests της εφαρμογής.
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Authentication requests για σύνδεση και εγγραφή χρήστη.
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);
// Public requests για ανάκτηση θεάτρων, παραστάσεων, showtimes και θέσεων.
export const getTheatres = () => api.get('/theatres');
export const getShows = () => api.get('/shows');
export const getShowtimes = (showId) => api.get(`/showtimes/${showId}`);
export const getSeats = (showtimeId) => api.get(`/seats/${showtimeId}`);
// Protected request για ανάκτηση των κρατήσεων συγκεκριμένου χρήστη.
// Το JWT token αποστέλλεται στο Authorization header.
export const getUserReservations = (userId, token) =>
  api.get(`/reservations/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
// Protected request για ανάκτηση των κρατήσεων συγκεκριμένου χρήστη.
// Το JWT token αποστέλλεται στο Authorization header.
export const createReservation = (data, token) =>
  api.post('/reservations', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
// Protected request για ακύρωση κράτησης.
// Επιτρέπεται μόνο αν η κράτηση ανήκει στον χρήστη ή αν ο χρήστης είναι admin.
export const cancelReservation = (reservationId, token) =>
  api.delete(`/reservations/${reservationId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
// Εξαγωγή της Axios instance για πιθανή χρήση σε άλλα αρχεία.
export default api;
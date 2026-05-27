import { registerRootComponent } from 'expo';

import App from './App';

// Εγγραφή του βασικού App component ως αρχικό σημείο εκκίνησης της εφαρμογής.
// Το Expo φροντίζει να λειτουργεί σωστά τόσο σε Expo Go όσο και σε native build.
registerRootComponent(App);

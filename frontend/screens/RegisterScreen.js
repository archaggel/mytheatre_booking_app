import { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { registerUser } from '../services/api';

// Οθόνη εγγραφής νέου χρήστη.
// Επιτρέπει στον χρήστη να δημιουργήσει λογαριασμό με όνομα, email και κωδικό.
export default function RegisterScreen({ navigation }) {
// Τοπική κατάσταση για τα πεδία της φόρμας εγγραφής και την κατάσταση φόρτωσης.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
//Ελέγχει αν έχουν συμπληρωθεί όλα τα πεδία,
//στέλνει τα στοιχεία εγγραφής στο backend
//και επιστρέφει τον χρήστη στην οθόνη σύνδεσης μετά από επιτυχή εγγραφή.
  const handleRegister = async () => {
    try {
// Έλεγχος ότι ο χρήστης έχει συμπληρώσει όλα τα απαραίτητα πεδία.
      if (!name || !email || !password) {
        Alert.alert('Προσοχή', 'Συμπλήρωσε όλα τα πεδία');
        return;
      }

      setLoading(true);
// Αποστολή των στοιχείων εγγραφής στο backend.
      await registerUser({ name, email, password });
	  
// Εμφάνιση μηνύματος επιτυχίας και επιστροφή στην οθόνη σύνδεσης.
      Alert.alert('Επιτυχία', 'Η εγγραφή ολοκληρώθηκε');
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Σφάλμα',
        error?.response?.data?.message || 'Η εγγραφή απέτυχε'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.backgroundTopGlow} />
      <View style={styles.backgroundBottomGlow} />

      <View style={styles.container}>
 
        <View style={styles.brandSection}>
         <Image
		  source={require('../assets/ui/logo.png')}
		  style={styles.logoImage}
		  resizeMode="contain"
		  />
          <Text style={styles.brandTitle}>MyTheatre</Text>
          <Text style={styles.brandSubtitle}>
            Δημιούργησε λογαριασμό και ξεκίνα την εμπειρία σου.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Εγγραφή</Text>
          <Text style={styles.cardDescription}>
            Συμπλήρωσε τα στοιχεία σου για να αποκτήσεις πρόσβαση στις κρατήσεις και τις παραστάσεις.
          </Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Ονοματεπώνυμο</Text>
            <TextInput
              style={styles.input}
              placeholder="Το όνομά σου"
              placeholderTextColor="#8f8f8f"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor="#8f8f8f"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Κωδικός</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#8f8f8f"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
            <Text style={styles.primaryButtonText}>
              {loading ? 'Περιμένετε...' : 'Δημιουργία Λογαριασμού'}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.secondaryLinkWrapper}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryLink}>
              Έχεις ήδη λογαριασμό; <Text style={styles.secondaryLinkAccent}>Σύνδεση</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
// Συγκεντρωμένα styles για τη διάταξη της οθόνης εγγραφής, το λογότυπο, τη φόρμα και τα κουμπιά.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f0b0b',
    position: 'relative',
    overflow: 'hidden'
  },

  backgroundTopGlow: {
    position: 'absolute',
    top: -80,
    left: -40,
    right: -40,
    height: 260,
    backgroundColor: '#4b1116',
    opacity: 0.55,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180
  },

  backgroundBottomGlow: {
    position: 'absolute',
    bottom: -120,
    left: -30,
    right: -30,
    height: 260,
    backgroundColor: '#1c3b36',
    opacity: 0.28,
    borderTopLeftRadius: 220,
    borderTopRightRadius: 220
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30
  },

  brandSection: {
    alignItems: 'center',
    marginBottom: 28
  },

 logoImage:{
	  width: 120,
	  height: 120,
	  marginBottom: 48
  },

  brandTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#f4d089',
    letterSpacing: 0.5,
    marginBottom: 6
  },

  brandSubtitle: {
    fontSize: 14,
    color: '#e7dcc8',
    textAlign: 'center'
  },

  card: {
    backgroundColor: 'rgba(24, 18, 18, 0.92)',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(244, 208, 137, 0.22)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 10
  },

  cardTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8
  },

  cardDescription: {
    fontSize: 14,
    color: '#d0c5b7',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22
  },

  inputWrapper: {
    marginBottom: 16
  },

  inputLabel: {
    color: '#f4d089',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8
  },

  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 15
  },

  primaryButton: {
    backgroundColor: '#6E1F28',
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 8
  },

  primaryButtonText: {
    color: '#F7F3EE',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16
  },

  secondaryLinkWrapper: {
    marginTop: 18
  },

  secondaryLink: {
    textAlign: 'center',
    color: '#d8cfc0',
    fontSize: 14
  },

  secondaryLinkAccent: {
    color: '#f4d089',
    fontWeight: '700'
  }
});
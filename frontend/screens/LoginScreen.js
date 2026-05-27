import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { loginUser } from '../services/api';
import { saveAuthData } from '../services/authStorage';

// Οθόνη σύνδεσης χρήστη.
// Είναι υπεύθυνη για την αποστολή των στοιχείων σύνδεσης και την ενημέρωση της εφαρμογής μετά από επιτυχές login.
export default function LoginScreen({ navigation, onLoginSuccess }) {
// Τοπική κατάσταση για τα πεδία της φόρμας σύνδεσης και την κατάσταση φόρτωσης.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

//Στέλνει τα στοιχεία σύνδεσης του χρήστη στο backend,
//αποθηκεύει το token και τα στοιχεία χρήστη,
//και ενημερώνει την εφαρμογή όταν η σύνδεση είναι επιτυχής.
 
  const handleLogin = async () => {
    try {
      setLoading(true);
// Αποστολή email και κωδικού στο backend endpoint για σύνδεση.
      const response = await loginUser({ email, password });
      const { token, user } = response.data;
// Αποθήκευση του token και των στοιχείων χρήστη για μελλοντικά authenticated requests.
      await saveAuthData(token, user);

      Alert.alert('Επιτυχία', 'Η σύνδεση ολοκληρώθηκε');
// Ενημερώνει το parent component ώστε η εφαρμογή να μεταβεί στην περιοχή του συνδεδεμένου χρήστη.
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
// Εμφανίζει μήνυμα σφάλματος από το backend ή γενικό μήνυμα αποτυχίας σύνδεσης.
      Alert.alert(
        'Σφάλμα',
        error?.response?.data?.message || 'Το login απέτυχε'
      );
    } finally {
      setLoading(false);
    }
  };
// Επιστρέφει τη βασική διάταξη της οθόνης εγγραφής.
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
            Η εμπειρία του θεάτρου, στα χέρια σου.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Σύνδεση</Text>
          <Text style={styles.cardDescription}>
            Συνδέσου για να δεις παραστάσεις, θέσεις και τις κρατήσεις σου.
          </Text>

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

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>
              {loading ? 'Περιμένετε...' : 'Σύνδεση'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryLinkWrapper}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.secondaryLink}>
              Δεν έχεις λογαριασμό; <Text style={styles.secondaryLinkAccent}>Εγγραφή</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Συγκεντρωμένα styles για τη διάταξη της οθόνης, το λογότυπο, την κάρτα φόρμας και τα κουμπιά.
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
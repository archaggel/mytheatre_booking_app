import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { cancelReservation, getUserReservations } from '../services/api';
import { getToken, getUser } from '../services/authStorage';

// Οθόνη που εμφανίζει τις κρατήσεις του συνδεδεμένου χρήστη.
// Επιτρέπει επίσης την ακύρωση ενεργών κρατήσεων.
export default function MyReservationsScreen({navigation}) {
// Τοπική κατάσταση για τη λίστα κρατήσεων και την ένδειξη φόρτωσης.
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
// Φορτώνει τις κρατήσεις μία φορά όταν ανοίγει η οθόνη.
  useEffect(() => {
    loadReservations();
  }, []);
//Ανακτά το token και τα στοιχεία χρήστη από την τοπική αποθήκευση
//και ζητά από το backend τις κρατήσεις του συγκεκριμένου χρήστη.
  const loadReservations = async () => {
    try {
      setLoading(true);
// Ανάκτηση του token και των στοιχείων του συνδεδεμένου χρήστη.
      const token = await getToken();
      const user = await getUser();

      if (!token || !user) {
        Alert.alert('Σφάλμα', 'Δεν βρέθηκαν στοιχεία χρήστη');
        return;
      }
// Αίτημα προς το backend για τις κρατήσεις του χρήστη.
      const response = await getUserReservations(user.userId, token);
      setReservations(response.data);
    } catch (error) {
// Αίτημα προς το backend για τις κρατήσεις του χρήστη.
      Alert.alert('Σφάλμα', 'Δεν φορτώθηκαν οι κρατήσεις');
    } finally {
      setLoading(false);
    }
  };
  
//Ακυρώνει μία κράτηση χρησιμοποιώντας το reservationId
//και στη συνέχεια ανανεώνει τη λίστα κρατήσεων.
  const handleCancel = async (reservationId) => {
    try {
// Ανάκτηση token για την εκτέλεση authenticated αιτήματος ακύρωσης.
      const token = await getToken();

      if (!token) {
        Alert.alert('Σφάλμα', 'Δεν βρέθηκε token');
        return;
      }
// Αποστολή αιτήματος ακύρωσης κράτησης στο backend.
      await cancelReservation(reservationId, token);
      Alert.alert('Επιτυχία', 'Η κράτηση ακυρώθηκε');
	  
// Επαναφόρτωση κρατήσεων ώστε να εμφανιστεί η ενημερωμένη κατάσταση.
      await loadReservations();
    } catch (error) {
      Alert.alert(
        'Σφάλμα',
        error.response?.data?.message || 'Η ακύρωση απέτυχε'
      );
    }
  };
// Δημιουργεί την κάρτα εμφάνισης για κάθε κράτηση της λίστας.
  const renderReservation = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.show_title}</Text>
	  
      <Text style={styles.cardInfo}>Θέατρο: {item.theatre_name}</Text>
	  
      <Text style={styles.cardInfo}>Ημερομηνία: {String(item.show_date).slice(8, 10)}
	  /{String(item.show_date).slice(5, 7)}/
	  {String(item.show_date).slice(0, 4)}
	  </Text>
	  
      <Text style={styles.cardInfo}>Ώρα: {String(item.show_time).slice(0, 5)}</Text>
      <Text style={styles.cardInfo}>Θέσεις: {item.seats}</Text>
	  
      <Text style={styles.cardPrice}>Σύνολο: €{item.total_price}</Text>
	  
    <View style={[styles.statusBadge, item.status === 'ACTIVE' ? styles.statusActive : styles.statusCancelled]}>
	 
	 <Text style={styles.statusBadgeText}>{item.status}</Text>
	</View>
	
      {item.status === 'ACTIVE' && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancel(item.reservation_id)}
        >
          <Text style={styles.buttonText}>Ακύρωση</Text>
        </TouchableOpacity>
      )}
    </View>
  );
// Εμφανίζει φόρτωση, μήνυμα κενής λίστας ή τη λίστα κρατήσεων.
//Λίστα κρατήσεων με μοναδικό key για κάθε reservation_id.
  return (
    <View style={styles.container}>
	<View style={styles.headerSection}>
	<Text style={styles.headerEyebrow}>MyTheatre</Text>
      <Text style={styles.title}>Οι Κρατήσεις Μου</Text>
	</View>  

      {loading ? (
        <Text>Φόρτωση...</Text>
      ) : reservations.length === 0 ? (
        <Text>Δεν υπάρχουν κρατήσεις.</Text>
      ) : (
	  

        <FlatList
          data={reservations}
          keyExtractor={(item) => item.reservation_id.toString()}
          renderItem={renderReservation}
        />
      )}
	  <TouchableOpacity
	  style={styles.homeButton}
	  onPress={()=> navigation.navigate('Theatres')}
	  >
	  <Text style={styles.buttonText}>Αρχική</Text>
	  </TouchableOpacity>
    </View>
  );
}
// Συγκεντρωμένα styles για τη σελίδα κρατήσεων, τις κάρτες, τα κουμπιά και τις ενδείξεις κατάστασης.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2B1E1E'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#D8B15A'
  },
  card: {
	backgroundColor: '#221818',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(244, 208, 137, 0.18)',
    borderRadius: 18,
    marginBottom: 14
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
	color: '#F4D089'
  },
  cardInfo:{
	fontSize: 14,
	color: 	'#E7DCC8',
	marginBottom: 6
  },
  cardPrice: {
	fontSize: 16,
	fontWeight: '700',
	color:  '#F4D089',
	marginTop: 8,
	marginBottom: 6
	  
  },
  cancelButton: {
    backgroundColor: '#6E1F28',
    paddingVertical: 13,
    borderRadius: 14,
    marginTop: 12,
	borderWidth: 1,
	borderColor: 'rgba(244, 208, 137, 0.20)'
  },
  buttonText: {
    color: '#F7F3EE',
    textAlign: 'center',
    fontWeight: '700',
	fontSize: 15
  },
  headerSection: {
	  marginBottom: 18
  },
  headerEyebrow: {
	  fontSize: 13,
	  fontWeight: '700',
	  color: '#c9b79c',
	  textTransform: 'uppercase',
	  letterSpacing: 1.2,
	  marginBottom: 6
   },
  homeButton: {
	backgroundColor: '#2A1F1F',
	paddingVertical: 14,
	borderRadius: 14,
	marginTop: 12,
	borderWidth: 1,
	borderColor: 'rgba(244, 208, 137, 0.28)'
},
   statusBadge: {
	   alignSelf: 'flex-start',
	   paddingHorizontal: 10,
	   paddingVertical: 5,
	   borderRadius: 999,
	   marginTop: 4
   },
   statusActive: {
	   backgroundColor: '#3F8B68'
   },
   statusCancelled: {
	   backgroundColor: '#8E4B4B'
   },
   statusBadgeText: {
	color: '#F7F3EE',
	fontSize: 12,
	fontWeight: '700'	
   }
	
});
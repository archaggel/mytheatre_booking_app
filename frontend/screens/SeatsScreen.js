import { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { createReservation, getSeats } from '../services/api';
import { getToken } from '../services/authStorage';

// Οθόνη επιλογής θέσεων για συγκεκριμένη παράσταση και ώρα προβολής.
// Εμφανίζει τις διαθέσιμες, επιλεγμένες και κρατημένες θέσεις.
export default function SeatsScreen({ route, navigation }) {
// Ανάκτηση των στοιχείων της παράστασης που στάλθηκαν από την προηγούμενη οθόνη.
  const { showtimeId, showTitle } = route.params;
 // Τοπική κατάσταση για τις θέσεις, τις επιλεγμένες θέσεις και τις ενδείξεις φόρτωσης/υποβολής.
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

 // Φορτώνει από το backend τις θέσεις για το συγκεκριμένο showtime
 //και ενημερώνει τη λίστα θέσεων της οθόνης.
  const loadSeats = async () => {
    try {
      setLoading(true);
// Αίτημα στο backend για ανάκτηση των θέσεων του συγκεκριμένου showtime.
      const response = await getSeats(showtimeId);
      setSeats(response.data);
    } catch (error) {
// Εμφάνιση μηνύματος όταν αποτύχει η φόρτωση των θέσεων.
      Alert.alert('Σφάλμα', 'Δεν φορτώθηκαν οι θέσεις');
    } finally {
      setLoading(false);
    }
  };
// Επαναφορτώνει τις θέσεις κάθε φορά που η οθόνη γίνεται ενεργή,
// ώστε να εμφανίζεται η πιο πρόσφατη διαθεσιμότητα.
  useFocusEffect(
    useCallback(() => {
      loadSeats();
    }, [showtimeId])
  );
  
//Επιλέγει ή αποεπιλέγει μία θέση.
//Οι ήδη κρατημένες θέσεις δεν μπορούν να επιλεγούν.
  const toggleSeat = (seatId, isReserved) => {
	  
// Αν η θέση είναι ήδη κρατημένη, δεν επιτρέπεται επιλογή.
    if (Number(isReserved) === 1) return;
// Εναλλαγή επιλογής: αν η θέση υπάρχει ήδη αφαιρείται, αλλιώς προστίθεται.
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };
//Δημιουργεί νέα κράτηση για τις επιλεγμένες θέσεις.
//Χρησιμοποιεί token χρήστη για authenticated αίτημα προς το backend.
  const handleReservation = async () => {
    try {
// Έλεγχος ότι ο χρήστης έχει επιλέξει τουλάχιστον μία θέση.
      if (selectedSeats.length === 0) {
        Alert.alert('Προσοχή', 'Επίλεξε τουλάχιστον μία θέση');
        return;
      }

      setSubmitting(true);
// Ανάκτηση token για την αποστολή authenticated αιτήματος κράτησης.
      const token = await getToken();

      if (!token) {
        Alert.alert('Σφάλμα', 'Δεν βρέθηκε token χρήστη');
        return;
      }
// Αποστολή των επιλεγμένων θέσεων στο backend για δημιουργία κράτησης.
      await createReservation(
        {
          showtimeId,
          seatIds: selectedSeats
        },
        token
      );
// Καθαρισμός επιλογών, ανανέωση διαθεσιμότητας και μετάβαση στις κρατήσεις χρήστη.
      Alert.alert('Επιτυχία', 'Η κράτηση δημιουργήθηκε');
      setSelectedSeats([]);
      await loadSeats();
      navigation.navigate('MyReservations');
    } catch (error) {
      Alert.alert(
        'Σφάλμα',
        error.response?.data?.message || 'Η κράτηση απέτυχε'
      );
    } finally {
      setSubmitting(false);
    }
  };
// Δημιουργεί το κουμπί εμφάνισης για κάθε θέση της λίστας.
  const renderSeat = ({ item }) => {
// Μετατροπή της κατάστασης κράτησης σε boolean τιμή.
    const reserved = Number(item.is_reserved) === 1;
// Έλεγχος αν η συγκεκριμένη θέση έχει επιλεγεί από τον χρήστη.
    const selected = selectedSeats.includes(item.seat_id);

    return (

      <TouchableOpacity
        style={[
          styles.seat,
          reserved && styles.reservedSeat,
          selected && styles.selectedSeat
        ]}
        onPress={() => toggleSeat(item.seat_id, item.is_reserved)}
      >
        <Text style={styles.seatText}>
          {item.seat_row}{item.seat_number}
        </Text>
        <Text style={styles.seatCategory}>{item.category}</Text>
      </TouchableOpacity>
    );
  };
//Επικεφαλίδα οθόνης με όνομα εφαρμογής, τίτλο και τίτλο παράστασης.
  return (
    <View style={styles.container}>

	<View style={styles.headerSection}>
		<Text style={styles.headerEyebrow}>MyTheatre</Text>
		<Text style={styles.title}>Θέσεις</Text>
		<Text style={styles.subtitle}>{showTitle}</Text>
	</View>
	
      {loading ? (
        <Text>Φόρτωση...</Text>
      ) : (
        <>

          <View style={styles.legendContainer}>
			<View style={styles.legendItem}>
				<View style={[styles.legendDot, styles.legendAvailable]} />
				<Text style={styles.legendText}>Διαθέσιμη</Text>
			</View>
			
			<View style={styles.legendItem}>
				<View style={[styles.legendDot, styles.legendSelected]} />
				<Text style={styles.legendText}>Επιλεγμένη</Text>
			</View>
			
			<View style={styles.legendItem}>
				<View style={[styles.legendDot, styles.legendReserved]} />
				<Text style={styles.legendText}>Κρατημένη</Text>
			</View>
		</View>
			
          <FlatList
            data={seats}
            keyExtractor={(item) => item.seat_id.toString()}
            numColumns={4}
            renderItem={renderSeat}
            contentContainerStyle={styles.listContent}
          />

          <TouchableOpacity
		  style={styles.button} onPress={handleReservation}>
            <Text style={styles.buttonText}>
              {submitting ? 'Περιμένετε...' : `Κράτηση (${selectedSeats.length})`}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
// Συγκεντρωμένα styles για την οθόνη παραστάσεων, τις κάρτες, τις εικόνες και την επικεφαλίδα.
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
  subtitle: {
    fontSize: 18,
    color: '#E7DCC8',
	marginTop: 2,
    marginBottom: 12
  },
  
  listContent: {
    paddingBottom: 16
  },
  seat: {
    flex: 1,
    margin: 6,
	paddingVertical: 14,
	paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#3E5678',
    alignItems: 'center',
    minWidth: 70,
	borderWidth: 1,
	borderColor: 'rgba(255,255,255,0.08)'
  },
  reservedSeat: {
    backgroundColor: '#8E4B4B'
  },
  selectedSeat: {
    backgroundColor: '#3F8B68'
  },
  seatText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  seatCategory: {
    fontSize: 11,
    marginTop: 4
  },
  button: {
    backgroundColor: '#6E1F28',
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 12,
	borderWidth: 1,
	borderColor: 'rgba(244, 208, 137, 0.22)'
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
  legendContainer:{
	  flexDirection: 'row',
	  flexWrap: 'wrap',
	  gap: 16,
	  marginBottom: 16
  },
  legendItem:{
	  flexDirection: 'row',
	  alignItems: 'center'
  },
  legendDot: {
	  width: 14,
	  height: 14,
	  borderRadius: 999,
	  marginRight: 8
  },
  legendText:{
	  color: '#F7F3EE',
	  fontSize: 14	  
  },
  legendAvailable:{
	backgroundColor: '#4A6FA5'  
  },
  legendSelected: {
	  backgroundColor: '#3FAE73'
  },
  legendReserved: {
	  backgroundColor: '#B95C5C'
  }
});
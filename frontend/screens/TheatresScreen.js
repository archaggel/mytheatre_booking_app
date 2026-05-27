import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getTheatres } from '../services/api';

// Οθόνη που εμφανίζει τη λίστα των διαθέσιμων θεάτρων.
// Από εδώ ο χρήστης μπορεί να επιλέξει θέατρο, να δει τις κρατήσεις του ή να αποσυνδεθεί.
export default function TheatresScreen({ navigation, onLogout }) {
// Τοπική κατάσταση για τη λίστα θεάτρων και την ένδειξη φόρτωσης.
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
// Φορτώνει τα θέατρα μία φορά όταν ανοίγει η οθόνη.
  useEffect(() => {
    loadTheatres();
  }, []);
//Φορτώνει από το backend τη λίστα των διαθέσιμων θεάτρων
//και ενημερώνει την κατάσταση της οθόνης.
  const loadTheatres = async () => {
    try {
      setLoading(true);
// Αίτημα στο backend για ανάκτηση όλων των διαθέσιμων θεάτρων.
      const response = await getTheatres();
// Αποθήκευση της λίστας θεάτρων στην τοπική κατάσταση.	  
      setTheatres(response.data);
    } catch (error) {
// Εμφάνιση μηνύματος όταν αποτύχει η φόρτωση των θεάτρων.		
      Alert.alert('Σφάλμα', 'Δεν φορτώθηκαν τα θέατρα');
    } finally {
      setLoading(false);
    }
  };
//Εκτελεί αποσύνδεση του χρήστη καλώντας τη συνάρτηση onLogout,
//η οποία διαχειρίζεται τον καθαρισμό των στοιχείων σύνδεσης.
	const handleLogout = async () => {
		if (onLogout) {
			await onLogout();
		}
	};
// Εμφανίζει είτε μήνυμα φόρτωσης είτε τη λίστα θεάτρων με τις διαθέσιμες επιλογές χρήστη.
  return (
    <View style={styles.container}>

	<View style={styles.headerSection}>
	<Text style={styles.headerEyebrow}>MyTheatre</Text>
      <Text style={styles.title}>Θέατρα</Text>
	  <Text style={styles.headerSubtitle}>Ανακάλυψε διαθέσιμα Θέατρα και
	  επίλεξε την εμπειρία που σου ταιριάζει.
	  </Text>
	</View>
	
      {loading ? (
        <Text>Φόρτωση...</Text>
   ) : (
  <FlatList
    data={theatres}
    keyExtractor={(item) => item.theatre_id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Shows', {
            theatreId: item.theatre_id,
            theatreName: item.name || item.NAME
          })
        }
      >
        <View style={styles.cardImageWrapper}>
          <Image
            source={require('../assets/ui/theatre-placeholder.jpg')}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name || item.NAME}</Text>
          <Text style={styles.cardLocation}>{item.location}</Text>
          <Text style={styles.cardDescription}>
            {item.description || item.DESCRIPTION}
          </Text>
        </View>

        <View style={styles.cardArrowWrapper}>
          <Text style={styles.cardArrow}>›</Text>
        </View>
      </TouchableOpacity>
    )}
  />
)}

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('MyReservations')}
      >
        <Text style={styles.buttonText}>Οι Κρατήσεις Μου</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
// Συγκεντρωμένα styles για την οθόνη θεάτρων, τις κάρτες, την επικεφαλίδα και τα κουμπιά.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#312222'
  },
  cardContent: {
	  paddingTop: 14,
	  paddingBottom: 14,
	  paddingLeft: 0,
	  paddingRight: 18,
	  flex: 1,
	  justifyContent: 'center'
  },
  cardImageWrapper: {
	  width: 140,
	  alignSelf: 'stretch',
	  overflow: 'hidden',
	  borderTopLeftRadius: 18,
	  borderBottomLeftRadius: 18,
	  borderTopRightRadius: 12,
	  borderBottomRightRadius: 12,
	  marginRight: 12
	  
  },
  cardLocation:{
	  fontSize: 14,
	  color: '#c9b79c',
	  marginBottom: 6
  },
  cardDescription: {
	  fontSize: 14,
	  color: '#f3eee7',
	  lineHeight: 20
  },
  cardArrowWrapper: {
	  justifyContent: 'center',
	  alignItems: 'center',
	  paddingRight: 16
	  
  },
  cardArrow: {
	  fontSize: 28,
	  color: '#F4D089',
	  fontWeight: '700'
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
  headerSubtitle: {
	  fontSize: 14,
	  color: '#F4D089',
	  lineHeight: 20,
	  marginTop: 6
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#D8B15A'
  },
  card: {
	backgroundColor: '#221818',
    borderWidth: 1,
    borderColor: 'rgba(244, 208, 137, 0.18)',
    borderRadius: 22,
    marginBottom: 14,
	overflow: 'hidden',
	flexDirection: 'row',
	alignItems: 'stretch'
  },
  cardImage:{
	 width: '100%',
	 height: '100%'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
	color: '#F4D089'
  },
  secondaryButton: {
    backgroundColor: '#2A1F1F',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 12,
	borderWidth: 1,
	borderColor: 'rgba(244, 208, 137, 0.28)'
  },
  logoutButton: {
    backgroundColor: '#6E1F28',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
	borderWidth: 1,
	borderColor: 'rgba(244, 208, 137, 0.20)'
  },
  buttonText: {
    color: '#F7F3EE',
    textAlign: 'center',
    fontWeight: '700',
	fontSize: 15
  }
});
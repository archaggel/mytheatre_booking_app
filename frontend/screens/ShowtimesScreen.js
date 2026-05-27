import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getShowtimes } from '../services/api';

// Οθόνη που εμφανίζει τις διαθέσιμες ημερομηνίες και ώρες για μία συγκεκριμένη παράσταση.
// Από εδώ ο χρήστης μπορεί να επιλέξει showtime και να συνεχίσει στην επιλογή θέσεων.
export default function ShowtimesScreen({ route, navigation }) {
// Ανάκτηση των στοιχείων της παράστασης που στάλθηκαν από την προηγούμενη οθόνη.
  const { showId, showTitle } = route.params;
// Τοπική κατάσταση για τη λίστα των showtimes και την ένδειξη φόρτωσης.
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  
// Φορτώνει τα showtimes όταν ανοίγει η οθόνη ή αλλάζει η επιλεγμένη παράσταση.
  useEffect(() => {
    loadShowtimes();
  }, [showId]);
//Φορτώνει από το backend τις διαθέσιμες ώρες προβολής
//για τη συγκεκριμένη παράσταση.
  const loadShowtimes = async () => {
    try {
      setLoading(true);
// Αίτημα στο backend για ανάκτηση των showtimes της επιλεγμένης παράστασης.
      const response = await getShowtimes(showId);
// Αποθήκευση των showtimes στην τοπική κατάσταση της οθόνης.	  
      setShowtimes(response.data);
    } catch (error) {
// Εμφάνιση μηνύματος όταν αποτύχει η φόρτωση των showtimes.		
      Alert.alert('Σφάλμα', 'Δεν φορτώθηκαν τα showtimes');
    } finally {
      setLoading(false);
    }
  };
// Εμφανίζει είτε μήνυμα φόρτωσης είτε τη λίστα διαθέσιμων showtimes.
  return (
    <View style={styles.container}>

	<View style={styles.headerSection}>
      <Text style={styles.headerEyebrow}>MyTheatre</Text>
	  <Text style={styles.title}>Ώρες Παράστασης</Text>
      <Text style={styles.subtitle}>{showTitle}</Text>
	</View>	
	
      {loading ? (
        <Text>Φόρτωση...</Text>
      ) : (

        <FlatList
          data={showtimes}
          keyExtractor={(item) => item.showtime_id.toString()}
          renderItem={({ item }) => (

            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('Seats', {
                  showtimeId: item.showtime_id,
                  showTitle
                })
              }
            >
		
              <Text style={styles.showtimeDate}>
			  Ημερομηνία: {String(item.show_date).slice(8, 10)}
						/{String(item.show_date).slice(5, 7)}/
						{String(item.show_date).slice(0, 4)}
			  </Text>
			  
		  
			 <View style={styles.infoRow}>
              <Text style={styles.showtimeInfo}>Ώρα: {String(item.show_time).slice(0, 5)}</Text>
			  <Text style={styles.showtimeInfo}>Αίθουσα: {item.hall_name}</Text>
			</View>
			
              <Text style={styles.showtimePrice}>
			  Τιμή: €{item.base_price}
			  </Text>
			  
			  <View style={styles.cardArrowWrapper}>
			  <Text style={styles.cardArrow}>›</Text>
			  </View>
			  
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
// Συγκεντρωμένα styles για την οθόνη showtimes, τις κάρτες, την επικεφαλίδα και τις πληροφορίες προβολής.
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
    marginTop: 2,
    color: '#E7DCC8'
  },
  card: {  
	backgroundColor: '#221818',
	borderWidth: 1,
	borderColor: 'rgba(244, 208, 137, 0.18)',
	borderRadius: 18,
	marginBottom: 14,
    paddingTop: 16,
	paddingBottom: 16,
	paddingLeft: 16,
	paddingRight: 48
    
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
  showtimeDate: {
	fontSize: 17,
	fontWeight: '700',
	color: '#F4D089',
	marginBottom: 10
  },
  showtimeInfo: {
	fontSize: 14,
	color: '#E7DCC8',
	marginBottom: 6
  },
   showtimePrice: {
	fontSize: 18,
	fontWeight: '700',
	color: 	'#F4D089',
	marginTop: 4
  },
  cardArrowWrapper: {
	  position: 'absolute',
	  right: 16,
	  top: '50%',
	  transform: [{translateY: -14 }]
  },
  cardArrow: {
	  fontSize: 28,
	  color: '#F4D089',
	  fontWeight: '700'
  },
  infoRow: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  gap: 16,
	  marginBottom: 10
  }
  
});
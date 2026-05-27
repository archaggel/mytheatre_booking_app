import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getShows } from '../services/api';

// Οθόνη που εμφανίζει τις παραστάσεις ενός συγκεκριμένου θεάτρου.
// Ο χρήστης μπορεί να επιλέξει παράσταση για να δει τις διαθέσιμες ώρες προβολής.
export default function ShowsScreen({ route, navigation }) {
// Ανάκτηση του θεάτρου που επιλέχθηκε από την προηγούμενη οθόνη.
  const { theatreId, theatreName } = route.params;
// Τοπική κατάσταση για τη λίστα παραστάσεων και την ένδειξη φόρτωσης.
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
// Φορτώνει ξανά τις παραστάσεις αν αλλάξει το επιλεγμένο θέατρο.
  useEffect(() => {
    loadShows();
  }, [theatreId]);
//Φορτώνει όλες τις παραστάσεις από το backend
//και κρατά μόνο όσες ανήκουν στο επιλεγμένο θέατρο.
  const loadShows = async () => {
    try {
      setLoading(true);
// Αίτημα στο backend για ανάκτηση των διαθέσιμων παραστάσεων.
      const response = await getShows();
	  
// Φιλτράρισμα παραστάσεων με βάση το theatreId του επιλεγμένου θεάτρου.
      const filteredShows = response.data.filter(
        (show) => Number(show.theatre_id) === Number(theatreId)
      );

      setShows(filteredShows);
    } catch (error) {
// Εμφάνιση μηνύματος όταν αποτύχει η φόρτωση των παραστάσεων.
      Alert.alert('Σφάλμα', 'Δεν φορτώθηκαν οι παραστάσεις');
    } finally {
      setLoading(false);
    }
  };
// Εμφανίζει είτε μήνυμα φόρτωσης είτε τη λίστα παραστάσεων του θεάτρου.
  return (

    <View style={styles.container}>
	<View style={styles.headerSection}>
	<Text style={styles.headerEyebrow}>MyTheatre</Text>
      <Text style={styles.title}>Παραστάσεις</Text>
      <Text style={styles.subtitle}>{theatreName}</Text>
	</View>
	
      {loading ? (
        <Text>Φόρτωση...</Text>
      ) : (
<FlatList
  data={shows}
  keyExtractor={(item) => item.show_id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Showtimes', {
          showId: item.show_id,
          showTitle: item.title
        })
      }
    >
      <View style={styles.posterImageWrapper}>
        <Image
          source={require('../assets/ui/poster-placeholder.jpg')}
          style={styles.posterImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.durationText}>
            Διάρκεια: {item.duration} λεπτά
          </Text>

          <View style={styles.ageBadge}>
            <Text style={styles.ageBadgeText}>{item.age_rating}</Text>
          </View>
        </View>

        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>

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
// Συγκεντρωμένα styles για την οθόνη παραστάσεων, τις κάρτες, τις εικόνες και την επικεφαλίδα.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#312222'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
	color: '#D8B15A'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    color: '#D8B15A'
  },
  card: {
    backgroundColor: '#221818',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(244, 208, 137, 0.18)',
    borderRadius: 18,
    marginBottom: 14,
	overflow: 'hidden',
	alignItems: 'stretch'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
	color: '#F4D089',
	marginBottom: 8
  },
  cardContent: {
	  flex: 1,
	  paddingTop: 14,
	  paddingBottom: 14,
	  paddingLeft: 14,
	  paddingRight: 16,
	  justifyContent: 'center'
  },
  cardDescription: {
	  fontSize: 14,
	  color: '#E7DCC8',
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
  posterImage: {
	  width: '100%',
	  height: '100%'
  },
  posterImageWrapper: {
	  width: 120,
	  height: 180,
	  overflow: 'hidden',
	  borderTopLeftRadius: 18,
	  borderBottomLeftRadius: 18,
	  borderTopRightRadius: 12,
	  borderBottomRightRadius: 12,
	  marginRight: 12
  },
  metaRow: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  marginBottom: 10,
	  gap: 8
  },
  durationText: {
	  fontSize: 14,
	  color: '#E7DCC8',
	  marginRight: 10
  },
  ageBadge: {
	  backgroundColor: '#6E1F28',
	  paddingHorizontal: 10,
	  paddingVertical: 4,
	  borderRadius: 999,
	  borderWidth: 1,
	  borderColor: 'rgba(244, 208, 137, 0.28)'
  },
  ageBadgeText: {
	  color: '#F7F3EE',
	  fontSize: 13,
	  fontWeight: '700'
  },
  headerSection:{
	  marginBottom: 18
  },
  headerEyebrow: {
	  fontSize: 13,
	  fontWeight: '700',
	  color: '#c9b79c',
	  textTransform: 'uppercase',
	  letterSpacing: 1.2,
	  marginBottom: 6
  }
});
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TheatresScreen from '../screens/TheatresScreen';
import ShowsScreen from '../screens/ShowsScreen';
import ShowtimesScreen from '../screens/ShowtimesScreen';
import SeatsScreen from '../screens/SeatsScreen';
import MyReservationsScreen from '../screens/MyReservationsScreen';

import { clearAuthData, getToken, getUser } from '../services/authStorage';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      const user = await getUser();

      if (token && user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await clearAuthData();
    setIsAuthenticated(false);
  };

  if (isCheckingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1f6feb" />
        <Text style={styles.loadingText}>Έλεγχος σύνδεσης...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" options={{ title: 'Σύνδεση',headerStyle: {
				backgroundColor: '#1E1616'
			},
			headerTintColor: '#F4D089',
			headerTitleStyle: {
				fontWeight: '700'
			}
			}}>
              {(props) => (
                <LoginScreen
                  {...props}
                  onLoginSuccess={handleLoginSuccess}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: 'Εγγραφή',headerStyle: {
				backgroundColor: '#1E1616'
			},
			headerTintColor: '#F4D089',
			headerTitleStyle: {
				fontWeight: '700'
			} }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Theatres" options={{ title: 'Θέατρα', headerStyle: {
				backgroundColor: '#1E1616'
			},
			headerTintColor: '#F4D089',
			headerTitleStyle: {
				fontWeight: '700'
			}
			
			}}
			>
              {(props) => (
                <TheatresScreen
                  {...props}
                  onLogout={handleLogout}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Shows"
              component={ShowsScreen}
              options={{ title: 'Παραστάσεις',headerStyle: {
				backgroundColor: '#1E1616'
			},
			headerTintColor: '#F4D089',
			headerTitleStyle: {
				fontWeight: '700'
			} }}
            />
            <Stack.Screen
              name="Showtimes"
              component={ShowtimesScreen}
              options={{ title: 'Ώρες Παράστασης',headerStyle: {
				backgroundColor: '#1E1616'
			},
			headerTintColor: '#F4D089',
			headerTitleStyle: {
				fontWeight: '700'
			} }}
            />
            <Stack.Screen
              name="Seats"
              component={SeatsScreen}
              options={{ title: 'Θέσεις',headerStyle: {
				backgroundColor: '#1E1616'
			},
			headerTintColor: '#F4D089',
			headerTitleStyle: {
				fontWeight: '700'
			} }}
            />
            <Stack.Screen
              name="MyReservations"
              component={MyReservationsScreen}
              options={{ title: 'Οι Κρατήσεις Μου',headerStyle: {
				backgroundColor: '#1E1616'
			},
			headerTintColor: '#F4D089',
			headerTitleStyle: {
				fontWeight: '700'
			} }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16
  }
});
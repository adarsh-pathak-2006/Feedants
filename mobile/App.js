import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import CompetitionDetailsScreen from './src/screens/CompetitionDetailsScreen';
import { loginUser, getCompetitions } from './src/api/competitionApi';
import { setAuthToken } from './src/api/client';
import { colors } from './src/constants/colors';

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState(null);
  const [appState, setAppState] = useState({
    competitionId: null,
    userId: null
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsInitializing(true);
        
        // 1. Login with demo credentials to get token and user ID
        const loginRes = await loginUser('demo@feedants.com', 'demo123');
        const token = loginRes.data.token;
        const userId = loginRes.data.user._id;
        
        // Set token for future requests
        setAuthToken(token);
        
        // 2. Fetch competitions to get the ID of the seeded competition
        const compsRes = await getCompetitions({ limit: 1 });
        
        if (!compsRes.data || compsRes.data.length === 0) {
          throw new Error('No competitions found. Did you run the seed script?');
        }
        
        const competitionId = compsRes.data[0]._id;
        
        // 3. Update state to render the screen
        setAppState({
          competitionId,
          userId
        });
      } catch (error) {
        console.error('Initialization error:', error);
        setInitError(
          error.message || 
          'Failed to connect to backend. Make sure the server is running on port 5000 and seed data is populated.'
        );
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  if (isInitializing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Connecting to Feedants API...</Text>
      </View>
    );
  }

  if (initError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>App Initialization Failed</Text>
        <Text style={styles.errorDetailText}>{initError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <CompetitionDetailsScreen 
        competitionId={appState.competitionId}
        userId={appState.userId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.neutral.textSecondary,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.error.main,
    marginBottom: 8,
  },
  errorDetailText: {
    fontSize: 14,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
  }
});

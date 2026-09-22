import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  Text,
  Alert,
  SafeAreaView
} from 'react-native';

import { useCompetition } from '../hooks/useCompetition';
import { registerForCompetition } from '../api/competitionApi';
import { setAuthToken } from '../api/client';
import { colors } from '../constants/colors';

// Components
import HeaderBar from '../components/HeaderBar';
import CompetitionHeader from '../components/CompetitionHeader';
import JudgeCard from '../components/JudgeCard';
import CountdownTimer from '../components/CountdownTimer';
import ImportantDates from '../components/ImportantDates';
import PreviousWinners from '../components/PreviousWinners';
import TabSection from '../components/TabSection';
import RewardsTable from '../components/RewardsTable';
import ReferralSection from '../components/ReferralSection';
import BottomNavBar from '../components/BottomNavBar';
import { 
  DisclaimerBanner, 
  PaymentInfo, 
  TestimonialsTeaser, 
  AdBanner, 
  SubmitButton 
} from '../components/MiscComponents';

const CompetitionDetailsScreen = ({ competitionId, userId }) => {
  const [language, setLanguage] = useState('en');
  const [isRegistering, setIsRegistering] = useState(false);

  const { 
    competition, 
    isRegistered, 
    loading, 
    error, 
    refetch 
  } = useCompetition(competitionId, userId);

  // Fetch actual IDs on mount (for demo purposes)
  useEffect(() => {
    // Handled in App.js now
  }, []);

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      await registerForCompetition(competition._id, userId);
      Alert.alert('Success', 'Successfully registered for the competition!');
      refetch(); // Refresh data
    } catch (err) {
      Alert.alert('Registration Failed', err.message || 'Something went wrong');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleAction = () => {
    if (!competition) return;

    if (competition.currentPhase === 'upcoming') {
      Alert.alert('Info', 'Registration has not started yet.');
    } else if (competition.currentPhase === 'registration_open') {
      if (isRegistered) {
        Alert.alert('Info', 'You are already registered! Wait for submission to open.');
      } else {
        handleRegister();
      }
    } else if (competition.currentPhase === 'submission_open') {
      if (isRegistered) {
        Alert.alert('Upload', 'Opening upload submission modal...');
      } else {
        Alert.alert('Info', 'You must be registered to upload a submission.');
      }
    } else {
      Alert.alert('Info', 'Action not available at this time.');
    }
  };

  const getButtonState = () => {
    if (!competition) return { label: 'Loading...', disabled: true, status: '' };

    if (isRegistering) {
      return { label: 'Processing...', disabled: true, status: '' };
    }

    if (isRegistered) {
      if (competition.currentPhase === 'submission_open') {
        return { label: 'Upload Submission', disabled: false, status: 'Registered' };
      }
      return { label: 'Registered', disabled: true, status: 'Waiting for next phase' };
    }

    if (competition.currentPhase === 'registration_open') {
      return { label: 'Register Now', disabled: false, status: `${competition.availableSpots} spots left` };
    }

    return { label: 'Closed', disabled: true, status: '' };
  };

  const handlePlayVideo = (url) => {
    Alert.alert('Play Video', `Opening video URL: ${url}`);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  if (error || !competition) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Competition not found'}</Text>
      </View>
    );
  }

  const btnState = getButtonState();

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar 
        onBack={() => {}} 
        language={language} 
        onToggleLanguage={setLanguage} 
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <CompetitionHeader 
          competition={competition} 
          isRegistered={isRegistered} 
        />
        
        <JudgeCard 
          judge={competition.judge} 
          onPlayVideo={handlePlayVideo} 
        />
        
        {competition.currentPhase === 'registration_open' && (
          <CountdownTimer targetDate={competition.dates.registrationEnd} />
        )}
        
        <ImportantDates dates={competition.dates} />
        
        <PreviousWinners 
          winners={competition.previousWinners} 
          onPlayVideo={handlePlayVideo} 
        />
        
        <TabSection competition={competition} />
        
        <RewardsTable rewards={competition.rewards} />
        
        <DisclaimerBanner text={competition.disclaimer} />
        
        <PaymentInfo 
          refundPolicy={competition.refundPolicy}
          paymentGateway={competition.paymentGateway}
          onPlayVideo={() => handlePlayVideo('payment_info_url')}
        />
        
        <ReferralSection 
          referralLink={competition.referralLink}
          referralBonus={competition.referralBonus}
          onCopyLink={() => Alert.alert('Copied', 'Link copied to clipboard')}
          onReferNow={() => Alert.alert('Refer', 'Opening share options...')}
        />
        
        <TestimonialsTeaser onPress={() => Alert.alert('Testimonials', 'Opening testimonials...')} />
        
        <AdBanner />
        
      </ScrollView>

      <SubmitButton 
        label={btnState.label}
        status={btnState.status}
        disabled={btnState.disabled}
        onPress={handleAction}
      />

      <BottomNavBar activeTab="competitions" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140, // Space for SubmitButton and BottomNavBar
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral.background,
  },
  errorText: {
    color: colors.error.main,
    fontSize: 16,
  },
});

export default CompetitionDetailsScreen;

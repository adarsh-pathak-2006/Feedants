import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Play } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

const PreviousWinners = ({ winners, onPlayVideo }) => {
  if (!winners || winners.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Previous Winners</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {winners.map((winner, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: winner.photoUrl }} 
                style={styles.image} 
                resizeMode="cover"
              />
              {winner.videoUrl && (
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={() => onPlayVideo(winner.videoUrl)}
                >
                  <Play size={16} color={colors.neutral.white} fill={colors.neutral.white} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name} numberOfLines={1}>{winner.name}</Text>
              <Text style={styles.position}>{winner.position}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    marginRight: spacing.sm,
    width: 180,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  imageContainer: {
    position: 'relative',
    marginRight: spacing.sm,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  playButton: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.neutral.white,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
    marginBottom: 2,
  },
  position: {
    fontSize: typography.fontSize.xs,
    color: colors.primary.main,
  },
});

export default PreviousWinners;

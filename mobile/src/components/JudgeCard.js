import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Play } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

const JudgeCard = ({ judge, onPlayVideo }) => {
  if (!judge) return null;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image 
          source={{ uri: judge.photoUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoSection}>
          <Text style={styles.label}>Judge</Text>
          <Text style={styles.name}>{judge.name}</Text>
          <Text style={styles.title}>{judge.title}</Text>
          <Text style={styles.experience}>{judge.experience}</Text>
        </View>
      </View>
      
      {judge.introVideoUrl && (
        <View style={styles.rightSection}>
          <TouchableOpacity 
            style={styles.playButton} 
            onPress={() => onPlayVideo(judge.introVideoUrl)}
          >
            <Play size={20} color={colors.primary.main} fill={colors.primary.main} />
          </TouchableOpacity>
          <Text style={styles.videoText}>Intro Video</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral.white,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.base,
  },
  infoSection: {
    flex: 1,
  },
  label: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.textSecondary,
    marginBottom: 2,
  },
  name: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
    marginBottom: 2,
  },
  title: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.textSecondary,
    marginBottom: 2,
  },
  experience: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.textTertiary,
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spacing.base,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  videoText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.textSecondary,
  },
});

export default JudgeCard;

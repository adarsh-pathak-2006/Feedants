import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, Users, CheckCircle2 } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';
import { formatCurrency } from '../utils/formatters';

const CompetitionHeader = ({ competition, isRegistered }) => {
  if (!competition) return null;

  const availableSpots = Math.max(0, competition.totalSpots - competition.bookedSpots);
  const progressPercent = (competition.bookedSpots / competition.totalSpots) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{competition.title}</Text>
        {isRegistered && (
          <View style={styles.registeredBadge}>
            <CheckCircle2 size={14} color={colors.primary.main} style={{ marginRight: 4 }} />
            <Text style={styles.registeredText}>Registered</Text>
          </View>
        )}
      </View>

      <View style={styles.tagsContainer}>
        {competition.tags?.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {competition.certificateEnabled && (
          <View style={styles.transparentTag}>
            <Trophy size={14} color={colors.primary.main} />
            <Text style={styles.certificateText}>Winners get certificate</Text>
          </View>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Prize Pool</Text>
          <Text style={styles.statValuePrimary}>{formatCurrency(competition.prizePool)}</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Entry Fee</Text>
          <Text style={styles.statValue}>{formatCurrency(competition.entryFee)}</Text>
        </View>

        <View style={styles.spotsBox}>
          <View style={styles.spotsHeader}>
            <Users size={16} color={colors.primary.main} style={{ marginRight: 4 }} />
            <Text style={styles.spotsTitle}>Only {availableSpots} spots left</Text>
          </View>
          
          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${progressPercent}%` }
              ]} 
            />
          </View>
          
          <Text style={styles.spotsCount}>
            {competition.bookedSpots} / {competition.totalSpots} Booked
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    paddingBottom: spacing.base,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
    flex: 1,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.light,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
  },
  registeredText: {
    color: colors.primary.main,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  tag: {
    backgroundColor: colors.neutral.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  tagText: {
    color: colors.neutral.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  transparentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
  },
  certificateText: {
    color: colors.primary.main,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    color: colors.neutral.textSecondary,
    fontSize: typography.fontSize.xs,
    marginBottom: 4,
  },
  statValuePrimary: {
    color: colors.primary.main,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
  },
  statValue: {
    color: colors.neutral.textPrimary,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
  },
  spotsBox: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  spotsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  spotsTitle: {
    color: colors.primary.main,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: colors.primary.light,
    borderRadius: 2,
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 2,
  },
  spotsCount: {
    color: colors.neutral.textSecondary,
    fontSize: typography.fontSize.xs,
    alignSelf: 'flex-start',
  },
});

export default CompetitionHeader;

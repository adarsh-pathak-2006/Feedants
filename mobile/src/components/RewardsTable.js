import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, Medal, Star } from 'lucide-react-native';
import { formatCurrency } from '../utils/formatters';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

const RewardsTable = ({ rewards }) => {
  if (!rewards || rewards.length === 0) return null;

  const renderIcon = (iconType, position) => {
    switch (iconType) {
      case 'trophy':
        return <Trophy size={20} color={colors.rewards.gold} fill={colors.rewards.gold} />;
      case 'medal-silver':
        return <Medal size={20} color={colors.rewards.silver} fill={colors.rewards.silver} />;
      case 'medal-bronze':
        return <Medal size={20} color={colors.rewards.bronze} fill={colors.rewards.bronze} />;
      case 'star':
      default:
        // Top 5 get slightly different stars or just default stars
        return <Star size={20} color={colors.primary.main} fill="transparent" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rewards</Text>
        <Text style={styles.subtitle}>(All Positions)</Text>
      </View>

      <View style={styles.tableContainer}>
        {rewards.map((reward, index) => (
          <View 
            key={index} 
            style={[
              styles.row, 
              index !== rewards.length - 1 && styles.borderBottom
            ]}
          >
            <View style={styles.leftSection}>
              <View style={styles.iconContainer}>
                {renderIcon(reward.icon, reward.position)}
              </View>
              <Text style={styles.label}>{reward.label}</Text>
            </View>
            <Text style={styles.amount}>{formatCurrency(reward.amount)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.sm,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
    marginRight: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.textSecondary,
  },
  tableContainer: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral.textPrimary,
  },
  amount: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },
});

export default RewardsTable;

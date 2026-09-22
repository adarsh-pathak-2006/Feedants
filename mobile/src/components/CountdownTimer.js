import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Hourglass, Timer } from 'lucide-react-native';
import { useCountdown } from '../hooks/useCountdown';
import { formatCountdownString } from '../utils/formatters';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

const CountdownTimer = ({ targetDate, label = "Registration closes in" }) => {
  const { totalMilliseconds, isExpired } = useCountdown(targetDate);
  
  const timeString = isExpired 
    ? "Registration Closed" 
    : formatCountdownString(totalMilliseconds);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Hourglass size={16} color={colors.primary.main} />
        <Text style={styles.labelText}>{label}</Text>
      </View>
      
      <Text style={[styles.timeText, isExpired && styles.expiredText]}>
        {timeString}
      </Text>
      
      {!isExpired && (
        <View style={styles.rightSection}>
          <Timer size={16} color={colors.primary.main} style={{ marginRight: 4 }} />
          <Text style={styles.hurryText}>Hurry up!</Text>
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
    backgroundColor: colors.primary.light,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.textPrimary,
    fontWeight: typography.fontWeight.medium,
    marginLeft: spacing.sm,
  },
  timeText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
    textAlign: 'center',
    flex: 1,
  },
  expiredText: {
    color: colors.error.main,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hurryText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.main,
    fontWeight: typography.fontWeight.medium,
  },
});

export default CountdownTimer;

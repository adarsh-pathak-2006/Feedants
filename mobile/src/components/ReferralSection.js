import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Megaphone } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';
import { formatCurrency } from '../utils/formatters';

const ReferralSection = ({ referralLink, referralBonus, onCopyLink, onReferNow }) => {
  if (!referralLink) return null;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Megaphone size={28} color={colors.primary.main} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Refer & Earn more discount</Text>
        
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.linkText} numberOfLines={1}>
              {referralLink}
            </Text>
            <TouchableOpacity style={styles.copyButton} onPress={() => onCopyLink(referralLink)}>
              <Text style={styles.copyButtonText}>Copy Link</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.referNowContainer}>
            <TouchableOpacity style={styles.referButton} onPress={onReferNow}>
              <Text style={styles.referButtonText}>Refer Now</Text>
            </TouchableOpacity>
            <Text style={styles.bonusText}>
              You earn <Text style={styles.bonusAmount}>{formatCurrency(referralBonus)}</Text> for every signup
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary.light,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.lg,
  },
  iconContainer: {
    marginRight: spacing.sm,
    marginTop: spacing.xs,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.md,
    height: 40,
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  linkText: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    fontSize: typography.fontSize.sm,
    color: colors.neutral.textSecondary,
  },
  copyButton: {
    paddingHorizontal: spacing.sm,
    height: '100%',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: colors.neutral.border,
  },
  copyButtonText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.main,
  },
  referNowContainer: {
    alignItems: 'center',
    width: 120,
  },
  referButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    width: '100%',
    alignItems: 'center',
    marginBottom: 4,
  },
  referButtonText: {
    color: colors.neutral.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  bonusText: {
    fontSize: 9,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
  },
  bonusAmount: {
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },
});

export default ReferralSection;

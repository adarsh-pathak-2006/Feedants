import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Info, Play, Shield, MessageSquare, Megaphone, ChevronRight } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

export const DisclaimerBanner = ({ text }) => {
  if (!text) return null;
  
  return (
    <View style={styles.disclaimerContainer}>
      <Info size={16} color={colors.primary.main} style={{ marginRight: spacing.sm }} />
      <Text style={styles.disclaimerText}>
        <Text style={styles.disclaimerBold}>Disclaimer: </Text>
        {text}
      </Text>
    </View>
  );
};

export const PaymentInfo = ({ refundPolicy, paymentGateway, onPlayVideo }) => {
  return (
    <View style={styles.paymentContainer}>
      <View style={styles.paymentLeft}>
        <TouchableOpacity style={styles.playButton} onPress={onPlayVideo}>
          <Play size={20} color={colors.primary.main} fill={colors.primary.main} />
        </TouchableOpacity>
        <View>
          <Text style={styles.paymentTitle}>How will you receive</Text>
          <Text style={styles.paymentTitle}>prize money?</Text>
          <Text style={styles.paymentLink}>Watch video to know more</Text>
        </View>
      </View>
      
      <View style={styles.paymentRight}>
        <View style={styles.paymentFeatureRow}>
          <Shield size={16} color={colors.neutral.textPrimary} style={{ marginRight: 6 }} />
          <Text style={styles.paymentFeatureText}>
            {refundPolicy ? 'Refund policy' : 'No refund'}
          </Text>
        </View>
        <View style={styles.paymentFeatureRow}>
          <Shield size={16} color={colors.neutral.textPrimary} style={{ marginRight: 6 }} />
          <Text style={styles.paymentFeatureText}>Secure payments powered by</Text>
        </View>
        <Text style={styles.gatewayText}>{paymentGateway}</Text>
      </View>
    </View>
  );
};

export const TestimonialsTeaser = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.testimonialsContainer} onPress={onPress}>
      <View style={styles.testimonialsLeft}>
        <MessageSquare size={20} color={colors.neutral.textPrimary} style={{ marginRight: spacing.sm }} />
        <View>
          <Text style={styles.testimonialsTitle}>Hear From Our Users</Text>
          <Text style={styles.testimonialsSubtitle}>See what participants say about Feedants</Text>
        </View>
      </View>
      <ChevronRight size={20} color={colors.neutral.textSecondary} />
    </TouchableOpacity>
  );
};

export const AdBanner = () => {
  return (
    <View style={styles.adContainer}>
      <Megaphone size={16} color={colors.neutral.textSecondary} style={{ marginRight: 6 }} />
      <Text style={styles.adText}>Ad Here</Text>
    </View>
  );
};

export const SubmitButton = ({ onPress, status, label, disabled }) => {
  return (
    <View style={styles.submitContainer}>
      <TouchableOpacity 
        style={[
          styles.submitButton,
          disabled && styles.submitButtonDisabled
        ]} 
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.submitButtonText}>{label}</Text>
        {status && <Text style={styles.submitButtonSubtext}>{status}</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Disclaimer
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.surface,
    padding: spacing.md,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.sm,
  },
  disclaimerText: {
    flex: 1,
    fontSize: typography.fontSize.xs,
    color: colors.neutral.textPrimary,
  },
  disclaimerBold: {
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },
  
  // Payment Info
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral.white,
    padding: spacing.base,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: colors.neutral.border,
    paddingRight: spacing.sm,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  paymentTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
  },
  paymentLink: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.textSecondary,
    marginTop: 2,
  },
  paymentRight: {
    flex: 1,
    paddingLeft: spacing.sm,
    justifyContent: 'center',
  },
  paymentFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  paymentFeatureText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.textPrimary,
  },
  gatewayText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: '#0358A7', // Razorpay blue approx
    fontStyle: 'italic',
    marginLeft: 22,
  },
  
  // Testimonials
  testimonialsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral.white,
    padding: spacing.base,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.lg,
  },
  testimonialsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialsTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
  },
  testimonialsSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.textSecondary,
    marginTop: 2,
  },
  
  // Ad Banner
  adContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.background,
    padding: spacing.md,
    marginHorizontal: spacing.sm,
    marginBottom: 80, // Space for fixed bottom button
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderStyle: 'dashed',
  },
  adText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.textSecondary,
  },
  
  // Submit Button
  submitContainer: {
    position: 'absolute',
    bottom: 60, // Above bottom nav
    left: 0,
    right: 0,
    backgroundColor: colors.neutral.white,
    padding: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  submitButton: {
    backgroundColor: colors.primary.main,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.neutral.textDisabled,
  },
  submitButtonText: {
    color: colors.neutral.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  submitButtonSubtext: {
    color: colors.neutral.white,
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
});

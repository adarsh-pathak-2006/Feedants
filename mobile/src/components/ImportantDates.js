import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CalendarDays, Send, Upload, Trophy } from 'lucide-react-native';
import { formatDate, formatTime } from '../utils/formatters';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

const ImportantDates = ({ dates }) => {
  if (!dates) return null;

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.sectionTitle}>Important Dates</Text>
      
      <View style={styles.gridContainer}>
        {/* Register Before */}
        <View style={[styles.cell, styles.cellRightBorder, styles.cellBottomBorder]}>
          <CalendarDays size={24} color={colors.primary.main} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Register Before</Text>
            <Text style={styles.date}>{formatDate(dates.registrationEnd)}</Text>
            <Text style={styles.time}>{formatTime(dates.registrationEnd)}</Text>
          </View>
        </View>

        {/* Submission Starts */}
        <View style={[styles.cell, styles.cellBottomBorder]}>
          <Send size={24} color={colors.primary.main} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Submission Starts</Text>
            <Text style={styles.date}>{formatDate(dates.submissionStart)}</Text>
            <Text style={styles.time}>{formatTime(dates.submissionStart)}</Text>
          </View>
        </View>

        {/* Submission Ends */}
        <View style={[styles.cell, styles.cellRightBorder]}>
          <Upload size={24} color={colors.primary.main} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Submission Ends</Text>
            <Text style={styles.date}>{formatDate(dates.submissionEnd)}</Text>
            <Text style={styles.time}>{formatTime(dates.submissionEnd)}</Text>
          </View>
        </View>

        {/* Result Date */}
        <View style={styles.cell}>
          <Trophy size={24} color={colors.primary.main} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Result Date</Text>
            <Text style={styles.date}>{formatDate(dates.resultDate)}</Text>
            <Text style={styles.time}>{formatTime(dates.resultDate)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: spacing.sm,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
    marginBottom: spacing.sm,
  },
  gridContainer: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    overflow: 'hidden',
  },
  cell: {
    width: '50%',
    flexDirection: 'row',
    padding: spacing.base,
    alignItems: 'flex-start',
  },
  cellRightBorder: {
    borderRightWidth: 1,
    borderRightColor: colors.neutral.border,
  },
  cellBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  icon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.textSecondary,
    marginBottom: 4,
  },
  date: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
    marginBottom: 2,
  },
  time: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.textPrimary,
  },
});

export default ImportantDates;

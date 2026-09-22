import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

const TabSection = ({ competition }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [expanded, setExpanded] = useState(false);

  if (!competition) return null;

  const tabs = [
    { id: 'about', label: 'About Competition', content: competition.about },
    { id: 'judging', label: 'Judging Parameters', content: competition.judgingParameters },
    { id: 'rules', label: 'Rules & Eligibility', content: competition.rulesAndEligibility },
  ];

  const activeContent = tabs.find(t => t.id === activeTab)?.content || '';
  
  // Simple logic to determine if we should show "View more"
  const shouldTruncate = activeContent.length > 150 && !expanded;
  const displayContent = shouldTruncate 
    ? activeContent.substring(0, 150) + '...' 
    : activeContent;

  return (
    <View style={styles.container}>
      <View style={styles.tabHeader}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => {
              setActiveTab(tab.id);
              setExpanded(false);
            }}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === tab.id && styles.activeTabText
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{displayContent}</Text>
        
        {activeContent.length > 150 && (
          <TouchableOpacity 
            style={styles.viewMoreButton}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.viewMoreText}>
              {expanded ? 'View less' : 'View more'}
            </Text>
            <ChevronDown 
              size={16} 
              color={colors.primary.main} 
              style={{ 
                transform: [{ rotate: expanded ? '180deg' : '0deg' }],
                marginLeft: 4
              }} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    overflow: 'hidden',
  },
  tabHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary.main,
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral.textSecondary,
  },
  activeTabText: {
    color: colors.primary.main,
    fontWeight: typography.fontWeight.bold,
  },
  contentContainer: {
    padding: spacing.base,
  },
  contentText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.textSecondary,
    lineHeight: 22,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  viewMoreText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.main,
  },
});

export default TabSection;

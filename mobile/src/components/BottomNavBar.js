import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Home, Search, PlusSquare, Trophy, User } from 'lucide-react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing } from '../constants/spacing';

const BottomNavBar = ({ activeTab = 'competitions', onTabPress }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'add', label: '', icon: PlusSquare, isCenter: true },
    { id: 'competitions', label: 'Competitions', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          if (tab.isCenter) {
            return (
              <TouchableOpacity 
                key={tab.id} 
                style={styles.centerTab}
                onPress={() => onTabPress && onTabPress(tab.id)}
              >
                <View style={styles.centerIconContainer}>
                  <Icon size={24} color={colors.neutral.white} />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity 
              key={tab.id} 
              style={styles.tab}
              onPress={() => onTabPress && onTabPress(tab.id)}
            >
              <Icon 
                size={24} 
                color={isActive ? colors.primary.main : colors.neutral.iconLight} 
                style={styles.icon}
              />
              <Text 
                style={[
                  styles.label, 
                  isActive && styles.activeLabel
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.neutral.white,
    paddingHorizontal: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20, // Elevate it slightly
    borderWidth: 4,
    borderColor: colors.neutral.white,
  },
  icon: {
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    color: colors.neutral.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  activeLabel: {
    color: colors.primary.main,
    fontWeight: typography.fontWeight.bold,
  },
});

export default BottomNavBar;

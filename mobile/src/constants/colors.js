/**
 * Feedants Design System - Color Tokens
 * Based on the Feedants brand palette from the design reference
 */
export const colors = {
  // Primary brand colors
  primary: {
    main: '#0D7377',      // Teal - primary brand color
    dark: '#0A5C5E',      // Darker teal for pressed states
    light: '#E8F5F5',     // Light teal background
    surface: '#F0FAFA',   // Very light teal surface
  },

  // Secondary / accent
  secondary: {
    main: '#1B2A4A',      // Dark navy - secondary color
    dark: '#0F1D35',      // Darker navy
    light: '#2A3D5F',     // Lighter navy
  },

  // Status colors
  success: {
    main: '#0D7377',      // Uses teal for success/registered state
    light: '#E8F5F5',
    text: '#0D7377',
  },

  warning: {
    main: '#F5A623',
    light: '#FFF4E1',
    text: '#B87A00',
  },

  error: {
    main: '#E74C3C',
    light: '#FDE8E8',
    text: '#C0392B',
  },

  // Neutral palette
  neutral: {
    white: '#FFFFFF',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    border: '#E8ECF0',
    divider: '#F0F2F5',
    textPrimary: '#1A1A2E',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    textDisabled: '#D1D5DB',
    icon: '#6B7280',
    iconLight: '#9CA3AF',
  },

  // Reward icons
  rewards: {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
    star: '#9CA3AF',
  },

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.08)',
};

export default colors;

// Design System Index - Export all design system components and utilities
// Civic App - Material Design 3 Implementation

// Core tokens and themes
import designTokens from './tokens';
import responsiveUtils from './responsive';
import { 
  ThemeProvider, 
  useTheme, 
  useThemedStyles, 
  createThemedStyles
} from './ThemeProvider';

export { default as tokens } from './tokens';
export { 
  primaryColors,
  secondaryColors,
  tertiaryColors,
  errorColors,
  neutralColors,
  neutralVariantColors,
  lightTheme,
  darkTheme,
  typography,
  spacing,
  borderRadius,
  elevation,
  breakpoints,
  componentTokens,
  motion,
  iconSizes,
  zIndex
} from './tokens';

// Responsive utilities
export { default as responsive } from './responsive';
export {
  getScreenDimensions,
  widthPercentageToDP,
  heightPercentageToDP,
  responsiveFontSize,
  getCurrentBreakpoint,
  isBreakpoint,
  isMinBreakpoint,
  platformValue,
  responsiveSpacing,
  getContainerPadding,
  getGridColumns,
  getSafeAreaInsets,
  getResponsiveTypography,
  getComponentSize,
  responsiveSpaceAround,
  isTabletOrLarger,
  isMobile,
  getOptimalImageSize
} from './responsive';

// Theme provider and utilities
export { 
  ThemeProvider,
  useTheme,
  useThemedStyles,
  withTheme,
  createThemedStyles,
  commonStyles,
  THEME_MODES
} from './ThemeProvider';

// Quick access to commonly used values
export const COLORS = {
  PRIMARY: '#2979ff',
  PRIMARY_LIGHT: '#4d8cff',
  PRIMARY_DARK: '#003f96',
  SURFACE: '#ffffff',
  BACKGROUND: '#ffffff',
  ERROR: '#ba1a1a',
  SUCCESS: '#007d54',
  WARNING: '#ff8f00',
  INFO: '#2979ff',
};

export const SIZES = {
  HEADER_HEIGHT: 64,
  TAB_BAR_HEIGHT: 80,
  FAB_SIZE: 56,
  BUTTON_HEIGHT: {
    SMALL: 32,
    MEDIUM: 40,
    LARGE: 56,
  },
  ICON: {
    SMALL: 16,
    MEDIUM: 24,
    LARGE: 32,
  },
};

export const SPACING_SHORTCUTS = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
};

export const RADIUS = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  ROUND: 9999,
};

// Utility functions for quick styling
export const createQuickStyles = (theme) => ({
  // Layout utilities
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  spaceAround: {
    justifyContent: 'space-around',
  },
  
  flex1: {
    flex: 1,
  },
  
  // Margin utilities
  m: (size) => ({ margin: theme.spacing[size] || size }),
  mt: (size) => ({ marginTop: theme.spacing[size] || size }),
  mb: (size) => ({ marginBottom: theme.spacing[size] || size }),
  ml: (size) => ({ marginLeft: theme.spacing[size] || size }),
  mr: (size) => ({ marginRight: theme.spacing[size] || size }),
  mx: (size) => ({ 
    marginLeft: theme.spacing[size] || size,
    marginRight: theme.spacing[size] || size,
  }),
  my: (size) => ({ 
    marginTop: theme.spacing[size] || size,
    marginBottom: theme.spacing[size] || size,
  }),
  
  // Padding utilities
  p: (size) => ({ padding: theme.spacing[size] || size }),
  pt: (size) => ({ paddingTop: theme.spacing[size] || size }),
  pb: (size) => ({ paddingBottom: theme.spacing[size] || size }),
  pl: (size) => ({ paddingLeft: theme.spacing[size] || size }),
  pr: (size) => ({ paddingRight: theme.spacing[size] || size }),
  px: (size) => ({ 
    paddingLeft: theme.spacing[size] || size,
    paddingRight: theme.spacing[size] || size,
  }),
  py: (size) => ({ 
    paddingTop: theme.spacing[size] || size,
    paddingBottom: theme.spacing[size] || size,
  }),
  
  // Background utilities
  bgPrimary: {
    backgroundColor: theme.colors.primary,
  },
  
  bgSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  
  bgSurface: {
    backgroundColor: theme.colors.surface,
  },
  
  bgError: {
    backgroundColor: theme.colors.error,
  },
  
  // Text utilities
  textPrimary: {
    color: theme.colors.primary,
  },
  
  textSecondary: {
    color: theme.colors.secondary,
  },
  
  textOnSurface: {
    color: theme.colors.onSurface,
  },
  
  textError: {
    color: theme.colors.error,
  },
  
  // Typography utilities
  h1: theme.typography.displayLarge,
  h2: theme.typography.displayMedium,
  h3: theme.typography.displaySmall,
  h4: theme.typography.headlineLarge,
  h5: theme.typography.headlineMedium,
  h6: theme.typography.headlineSmall,
  
  title1: theme.typography.titleLarge,
  title2: theme.typography.titleMedium,
  title3: theme.typography.titleSmall,
  
  body1: theme.typography.bodyLarge,
  body2: theme.typography.bodyMedium,
  body3: theme.typography.bodySmall,
  
  label1: theme.typography.labelLarge,
  label2: theme.typography.labelMedium,
  label3: theme.typography.labelSmall,
  
  // Border utilities
  borderRadius: (size) => ({ 
    borderRadius: theme.borderRadius[size] || size 
  }),
  
  // Shadow utilities
  shadow1: theme.elevation.level1,
  shadow2: theme.elevation.level2,
  shadow3: theme.elevation.level3,
  shadow4: theme.elevation.level4,
  shadow5: theme.elevation.level5,
});

// Quick style creation helper
export const createStyles = (styleFunction) => {
  return (theme) => {
    const utils = createQuickStyles(theme);
    return styleFunction(theme, utils);
  };
};

// Export default design system object
export default {
  tokens: designTokens,
  responsive: responsiveUtils,
  ThemeProvider,
  useTheme,
  useThemedStyles,
  createThemedStyles,
  createStyles,
  createQuickStyles,
  COLORS,
  SIZES,
  SPACING_SHORTCUTS,
  RADIUS,
};
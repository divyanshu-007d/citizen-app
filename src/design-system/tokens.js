// Design Tokens - Material Design 3 Implementation
// Civic App - Consistent design across Android, iOS, and Web

/**
 * Core Color Palette
 * Primary: #2979ff (Royal Blue) - Visible in both dark and light modes
 * Following Material Design 3 color system
 */

// Primary Color System (Royal Blue #2979ff)
export const primaryColors = {
  primary0: '#000000',
  primary10: '#001947',
  primary20: '#002e6b',
  primary25: '#003689',
  primary30: '#003f96',
  primary35: '#0047a3',
  primary40: '#2979ff', // Main Primary Color
  primary50: '#4d8cff',
  primary60: '#6699ff',
  primary70: '#80a6ff',
  primary80: '#99b3ff',
  primary90: '#b3c0ff',
  primary95: '#ccccff',
  primary98: '#e6e6ff',
  primary99: '#f3f3ff',
  primary100: '#ffffff',
};

// Secondary Color System (Complementary to Royal Blue)
export const secondaryColors = {
  secondary0: '#000000',
  secondary10: '#1a1c2e',
  secondary20: '#2f3349',
  secondary25: '#3a3d56',
  secondary30: '#454763',
  secondary35: '#515471',
  secondary40: '#5d617f',
  secondary50: '#757a99',
  secondary60: '#8f94b3',
  secondary70: '#a9aece',
  secondary80: '#c4c9ea',
  secondary90: '#e0e2ff',
  secondary95: '#f0f0ff',
  secondary98: '#f9f9ff',
  secondary99: '#fcfcff',
  secondary100: '#ffffff',
};

// Tertiary Color System (Green for success states)
export const tertiaryColors = {
  tertiary0: '#000000',
  tertiary10: '#002114',
  tertiary20: '#003825',
  tertiary25: '#004930',
  tertiary30: '#005a3c',
  tertiary35: '#006b48',
  tertiary40: '#007d54',
  tertiary50: '#009f6b',
  tertiary60: '#2bc383',
  tertiary70: '#56dd9c',
  tertiary80: '#7ef9b6',
  tertiary90: '#a6ffd0',
  tertiary95: '#c8ffe0',
  tertiary98: '#e8fff0',
  tertiary99: '#f4fff8',
  tertiary100: '#ffffff',
};

// Error Color System
export const errorColors = {
  error0: '#000000',
  error10: '#410002',
  error20: '#690005',
  error25: '#7f0007',
  error30: '#93000a',
  error35: '#a80710',
  error40: '#ba1a1a',
  error50: '#de3730',
  error60: '#ff5449',
  error70: '#ff897d',
  error80: '#ffb4ab',
  error90: '#ffdad6',
  error95: '#ffedea',
  error98: '#fff8f7',
  error99: '#fffbff',
  error100: '#ffffff',
};

// Neutral Color System
export const neutralColors = {
  neutral0: '#000000',
  neutral10: '#1a1c1e',
  neutral12: '#1e2023',
  neutral17: '#272a2d',
  neutral20: '#2f3133',
  neutral22: '#333538',
  neutral24: '#373a3d',
  neutral25: '#3a3d40',
  neutral30: '#46494c',
  neutral35: '#525558',
  neutral40: '#5e6165',
  neutral50: '#777a7e',
  neutral60: '#919499',
  neutral70: '#abaeb3',
  neutral80: '#c6c9ce',
  neutral87: '#dde0e5',
  neutral90: '#e2e5ea',
  neutral92: '#e8ebf0',
  neutral94: '#eef1f6',
  neutral95: '#f1f4f9',
  neutral96: '#f4f7fc',
  neutral98: '#fafcff',
  neutral99: '#fcfeff',
  neutral100: '#ffffff',
};

// Neutral Variant Color System
export const neutralVariantColors = {
  neutralVariant0: '#000000',
  neutralVariant10: '#16191d',
  neutralVariant20: '#2b2e32',
  neutralVariant25: '#363a3e',
  neutralVariant30: '#424649',
  neutralVariant35: '#4e5255',
  neutralVariant40: '#5a5e62',
  neutralVariant50: '#72767a',
  neutralVariant60: '#8c9094',
  neutralVariant70: '#a7aaaf',
  neutralVariant80: '#c2c5ca',
  neutralVariant90: '#dee1e6',
  neutralVariant95: '#eceff4',
  neutralVariant98: '#f6f9fe',
  neutralVariant99: '#fafcff',
  neutralVariant100: '#ffffff',
};

/**
 * Light Theme Colors
 */
export const lightTheme = {
  // Primary
  primary: primaryColors.primary40,
  onPrimary: primaryColors.primary100,
  primaryContainer: primaryColors.primary90,
  onPrimaryContainer: primaryColors.primary10,

  // Secondary
  secondary: secondaryColors.secondary40,
  onSecondary: secondaryColors.secondary100,
  secondaryContainer: secondaryColors.secondary90,
  onSecondaryContainer: secondaryColors.secondary10,

  // Tertiary
  tertiary: tertiaryColors.tertiary40,
  onTertiary: tertiaryColors.tertiary100,
  tertiaryContainer: tertiaryColors.tertiary90,
  onTertiaryContainer: tertiaryColors.tertiary10,

  // Error
  error: errorColors.error40,
  onError: errorColors.error100,
  errorContainer: errorColors.error90,
  onErrorContainer: errorColors.error10,

  // Background
  background: neutralColors.neutral99,
  onBackground: neutralColors.neutral10,

  // Surface
  surface: neutralColors.neutral99,
  onSurface: neutralColors.neutral10,
  surfaceVariant: neutralVariantColors.neutralVariant90,
  onSurfaceVariant: neutralVariantColors.neutralVariant30,

  // Outline
  outline: neutralVariantColors.neutralVariant50,
  outlineVariant: neutralVariantColors.neutralVariant80,

  // Shadow & Scrim
  shadow: neutralColors.neutral0,
  scrim: neutralColors.neutral0,

  // Surface Containers
  surfaceContainer: neutralColors.neutral94,
  surfaceContainerHigh: neutralColors.neutral92,
  surfaceContainerHighest: neutralColors.neutral90,
  surfaceContainerLow: neutralColors.neutral96,
  surfaceContainerLowest: neutralColors.neutral100,

  // Inverse
  inverseSurface: neutralColors.neutral20,
  onInverseSurface: neutralColors.neutral95,
  inversePrimary: primaryColors.primary80,
};

/**
 * Dark Theme Colors
 */
export const darkTheme = {
  // Primary
  primary: primaryColors.primary80,
  onPrimary: primaryColors.primary20,
  primaryContainer: primaryColors.primary30,
  onPrimaryContainer: primaryColors.primary90,

  // Secondary
  secondary: secondaryColors.secondary80,
  onSecondary: secondaryColors.secondary20,
  secondaryContainer: secondaryColors.secondary30,
  onSecondaryContainer: secondaryColors.secondary90,

  // Tertiary
  tertiary: tertiaryColors.tertiary80,
  onTertiary: tertiaryColors.tertiary20,
  tertiaryContainer: tertiaryColors.tertiary30,
  onTertiaryContainer: tertiaryColors.tertiary90,

  // Error
  error: errorColors.error80,
  onError: errorColors.error20,
  errorContainer: errorColors.error30,
  onErrorContainer: errorColors.error90,

  // Background
  background: neutralColors.neutral10,
  onBackground: neutralColors.neutral90,

  // Surface
  surface: neutralColors.neutral10,
  onSurface: neutralColors.neutral90,
  surfaceVariant: neutralVariantColors.neutralVariant30,
  onSurfaceVariant: neutralVariantColors.neutralVariant80,

  // Outline
  outline: neutralVariantColors.neutralVariant60,
  outlineVariant: neutralVariantColors.neutralVariant30,

  // Shadow & Scrim
  shadow: neutralColors.neutral0,
  scrim: neutralColors.neutral0,

  // Surface Containers
  surfaceContainer: neutralColors.neutral12,
  surfaceContainerHigh: neutralColors.neutral17,
  surfaceContainerHighest: neutralColors.neutral22,
  surfaceContainerLow: neutralColors.neutral10,
  surfaceContainerLowest: neutralColors.neutral0,

  // Inverse
  inverseSurface: neutralColors.neutral90,
  onInverseSurface: neutralColors.neutral20,
  inversePrimary: primaryColors.primary40,
};

/**
 * Typography Scale - Material Design 3
 * Responsive typography that works across platforms
 */
export const typography = {
  // Display - Large headlines
  displayLarge: {
    fontFamily: 'System', // Will be platform-specific
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
    fontWeight: '400',
  },
  displayMedium: {
    fontFamily: 'System',
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
    fontWeight: '400',
  },
  displaySmall: {
    fontFamily: 'System',
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
    fontWeight: '400',
  },

  // Headline - Section headers
  headlineLarge: {
    fontFamily: 'System',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
    fontWeight: '400',
  },
  headlineMedium: {
    fontFamily: 'System',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
    fontWeight: '400',
  },
  headlineSmall: {
    fontFamily: 'System',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
    fontWeight: '400',
  },

  // Title - Subsection headers
  titleLarge: {
    fontFamily: 'System',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
    fontWeight: '400',
  },
  titleMedium: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: '500',
  },
  titleSmall: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: '500',
  },

  // Body - Main content
  bodyLarge: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: '400',
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: '400',
  },

  // Label - UI elements
  labelLarge: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: '500',
  },
  labelMedium: {
    fontFamily: 'System',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  labelSmall: {
    fontFamily: 'System',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
};

/**
 * Spacing Scale - Consistent spacing system
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

/**
 * Border Radius Scale
 */
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
};

/**
 * Elevation/Shadow Scale
 */
export const elevation = {
  level0: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  level2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  level3: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  level4: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  level5: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
};

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
  sm: 576,  // Small phones
  md: 768,  // Large phones / Small tablets
  lg: 992,  // Tablets
  xl: 1200, // Small desktops
  xxl: 1400, // Large desktops
};

/**
 * Component-specific tokens
 */
export const componentTokens = {
  button: {
    height: {
      small: 32,
      medium: 40,
      large: 56,
    },
    borderRadius: borderRadius.xl,
    paddingHorizontal: {
      small: spacing.md,
      medium: spacing.lg,
      large: spacing.xl,
    },
  },
  card: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  input: {
    height: 56,
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  fab: {
    size: 56,
    borderRadius: borderRadius.md,
  },
  appBar: {
    height: 64,
    paddingHorizontal: spacing.md,
  },
  bottomNavigation: {
    height: 80,
  },
  listItem: {
    minHeight: 56,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
};

/**
 * Animation tokens
 */
export const motion = {
  easing: {
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    emphasized_decelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    emphasized_accelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  },
  duration: {
    short1: 50,
    short2: 100,
    short3: 150,
    short4: 200,
    medium1: 250,
    medium2: 300,
    medium3: 350,
    medium4: 400,
    long1: 450,
    long2: 500,
    long3: 550,
    long4: 600,
    extraLong1: 700,
    extraLong2: 800,
    extraLong3: 900,
    extraLong4: 1000,
  },
};

/**
 * Icon sizes
 */
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
};

/**
 * Z-index scale
 */
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

export default {
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
  zIndex,
};
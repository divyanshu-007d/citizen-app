// Responsive utilities for cross-platform consistency
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { breakpoints } from './tokens';

/**
 * Get current device dimensions
 */
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

/**
 * Responsive width calculation
 * @param {number} percentage - Percentage of screen width (0-100)
 * @returns {number} - Calculated width
 */
export const widthPercentageToDP = (percentage) => {
  const { width } = getScreenDimensions();
  return PixelRatio.roundToNearestPixel((width * percentage) / 100);
};

/**
 * Responsive height calculation
 * @param {number} percentage - Percentage of screen height (0-100)
 * @returns {number} - Calculated height
 */
export const heightPercentageToDP = (percentage) => {
  const { height } = getScreenDimensions();
  return PixelRatio.roundToNearestPixel((height * percentage) / 100);
};

/**
 * Responsive font size based on screen size
 * @param {number} size - Base font size
 * @returns {number} - Responsive font size
 */
export const responsiveFontSize = (size) => {
  const { width } = getScreenDimensions();
  const scale = width / 375; // Base width (iPhone X)
  const newSize = size * scale;
  
  // Ensure minimum readable size
  return Math.max(newSize, size * 0.8);
};

/**
 * Get current breakpoint
 * @returns {string} - Current breakpoint name
 */
export const getCurrentBreakpoint = () => {
  const { width } = getScreenDimensions();
  
  if (width >= breakpoints.xxl) return 'xxl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  return 'sm';
};

/**
 * Check if current screen size matches breakpoint
 * @param {string} breakpoint - Breakpoint to check
 * @returns {boolean} - Whether current screen matches breakpoint
 */
export const isBreakpoint = (breakpoint) => {
  const { width } = getScreenDimensions();
  
  switch (breakpoint) {
    case 'sm':
      return width < breakpoints.md;
    case 'md':
      return width >= breakpoints.md && width < breakpoints.lg;
    case 'lg':
      return width >= breakpoints.lg && width < breakpoints.xl;
    case 'xl':
      return width >= breakpoints.xl && width < breakpoints.xxl;
    case 'xxl':
      return width >= breakpoints.xxl;
    default:
      return false;
  }
};

/**
 * Check if screen size is at least the specified breakpoint
 * @param {string} breakpoint - Minimum breakpoint
 * @returns {boolean} - Whether screen is at least this size
 */
export const isMinBreakpoint = (breakpoint) => {
  const { width } = getScreenDimensions();
  return width >= breakpoints[breakpoint];
};

/**
 * Platform-specific values
 * @param {object} values - Object with platform-specific values
 * @returns {any} - Value for current platform
 */
export const platformValue = (values) => {
  return Platform.select(values);
};

/**
 * Get responsive spacing based on screen size
 * @param {number} baseSpacing - Base spacing value
 * @returns {number} - Responsive spacing
 */
export const responsiveSpacing = (baseSpacing) => {
  const currentBreakpoint = getCurrentBreakpoint();
  
  const multipliers = {
    sm: 0.8,
    md: 1,
    lg: 1.2,
    xl: 1.4,
    xxl: 1.6,
  };
  
  return baseSpacing * multipliers[currentBreakpoint];
};

/**
 * Responsive horizontal padding for containers
 * @returns {number} - Responsive padding value
 */
export const getContainerPadding = () => {
  const currentBreakpoint = getCurrentBreakpoint();
  
  const paddings = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  };
  
  return paddings[currentBreakpoint];
};

/**
 * Get number of columns for grid layouts
 * @param {object} options - Grid configuration options
 * @returns {number} - Number of columns
 */
export const getGridColumns = (options = {}) => {
  const {
    sm = 1,
    md = 2,
    lg = 3,
    xl = 4,
    xxl = 5,
  } = options;
  
  const currentBreakpoint = getCurrentBreakpoint();
  
  const columns = {
    sm,
    md,
    lg,
    xl,
    xxl,
  };
  
  return columns[currentBreakpoint];
};

/**
 * Safe area utilities for different platforms
 */
export const getSafeAreaInsets = () => {
  // This would typically use react-native-safe-area-context
  // For now, providing default values
  const defaultInsets = {
    top: Platform.OS === 'ios' ? 44 : 24,
    bottom: Platform.OS === 'ios' ? 34 : 0,
    left: 0,
    right: 0,
  };
  
  return defaultInsets;
};

/**
 * Typography responsive utilities
 */
export const getResponsiveTypography = (baseTypography) => {
  const { fontSize, lineHeight, ...rest } = baseTypography;
  
  return {
    ...rest,
    fontSize: responsiveFontSize(fontSize),
    lineHeight: responsiveFontSize(lineHeight),
  };
};

/**
 * Component size variants based on screen size
 */
export const getComponentSize = (variants = {}) => {
  const {
    sm = 'small',
    md = 'medium',
    lg = 'large',
    xl = 'large',
    xxl = 'large',
  } = variants;
  
  const currentBreakpoint = getCurrentBreakpoint();
  
  const sizes = {
    sm,
    md,
    lg,
    xl,
    xxl,
  };
  
  return sizes[currentBreakpoint];
};

/**
 * Responsive margins and paddings
 */
export const responsiveSpaceAround = (baseValue) => {
  const multiplier = getCurrentBreakpoint() === 'sm' ? 0.75 : 1;
  return baseValue * multiplier;
};

/**
 * Check if device is tablet size or larger
 */
export const isTabletOrLarger = () => {
  return isMinBreakpoint('lg');
};

/**
 * Check if device is mobile size
 */
export const isMobile = () => {
  return !isMinBreakpoint('lg');
};

/**
 * Get optimal image size for current screen
 */
export const getOptimalImageSize = (aspectRatio = 1) => {
  const { width } = getScreenDimensions();
  const containerPadding = getContainerPadding();
  const availableWidth = width - (containerPadding * 2);
  
  return {
    width: availableWidth,
    height: availableWidth / aspectRatio,
  };
};

export default {
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
  getOptimalImageSize,
};
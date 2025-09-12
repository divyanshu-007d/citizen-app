// Theme Provider and Context for Material Design 3
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, typography, spacing, borderRadius, elevation, componentTokens, motion, iconSizes, zIndex } from './tokens';
import responsiveUtils from './responsive';

/**
 * Theme Context
 */
const ThemeContext = createContext(null);

/**
 * Theme modes
 */
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

/**
 * Get complete theme object
 */
const getThemeObject = (isDark, mode) => {
  const colorScheme = isDark ? darkTheme : lightTheme;
  
  return {
    colors: colorScheme,
    typography,
    spacing,
    borderRadius,
    elevation,
    componentTokens,
    motion,
    iconSizes,
    zIndex,
    responsive: responsiveUtils,
    isDark,
    mode,
  };
};

/**
 * Theme Provider Component
 */
export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(THEME_MODES.SYSTEM);
  const [isLoading, setIsLoading] = useState(true);

  // Determine if dark mode should be active
  const isDarkMode = themeMode === THEME_MODES.SYSTEM 
    ? systemColorScheme === 'dark'
    : themeMode === THEME_MODES.DARK;

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update status bar when theme changes
  useEffect(() => {
    StatusBar.setBarStyle(
      isDarkMode ? 'light-content' : 'dark-content',
      true
    );
  }, [isDarkMode]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme_preference');
      if (savedTheme && Object.values(THEME_MODES).includes(savedTheme)) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (mode) => {
    try {
      await AsyncStorage.setItem('theme_preference', mode);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  const setTheme = (mode) => {
    setThemeMode(mode);
    saveThemePreference(mode);
  };

  const toggleTheme = () => {
    const newMode = isDarkMode ? THEME_MODES.LIGHT : THEME_MODES.DARK;
    setTheme(newMode);
  };

  const theme = getThemeObject(isDarkMode, themeMode);

  const contextValue = {
    theme,
    themeMode,
    isDarkMode,
    isLoading,
    setTheme,
    toggleTheme,
    THEME_MODES,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

/**
 * Hook to get styled components with current theme
 */
export const useThemedStyles = (styleFunction) => {
  const { theme } = useTheme();
  return styleFunction(theme);
};

/**
 * Higher-order component to provide theme to class components
 */
export const withTheme = (Component) => {
  return function ThemedComponent(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};

/**
 * Utility function to create responsive styles
 */
export const createThemedStyles = (styleFunction) => {
  return (theme) => {
    const styles = styleFunction(theme);
    
    // Apply responsive modifications if needed
    const responsiveStyles = {};
    Object.keys(styles).forEach(key => {
      const style = styles[key];
      responsiveStyles[key] = {
        ...style,
        // Add responsive properties if they exist
        ...(style.fontSize && { fontSize: theme.responsive.responsiveFontSize(style.fontSize) }),
        ...(style.padding && { padding: theme.responsive.responsiveSpacing(style.padding) }),
        ...(style.margin && { margin: theme.responsive.responsiveSpacing(style.margin) }),
      };
    });
    
    return responsiveStyles;
  };
};

/**
 * Predefined themed styles for common patterns
 */
export const commonStyles = (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.responsive.getSafeAreaInsets().top,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.elevation.level2,
  },
  
  section: {
    paddingHorizontal: theme.responsive.getContainerPadding(),
    paddingVertical: theme.spacing.md,
  },
  
  divider: {
    height: 1,
    backgroundColor: theme.colors.outline,
    marginVertical: theme.spacing.sm,
  },
  
  shadow: theme.elevation.level2,
  
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.componentTokens.button.borderRadius,
    height: theme.componentTokens.button.height.medium,
    paddingHorizontal: theme.componentTokens.button.paddingHorizontal.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  primaryButtonText: {
    ...theme.typography.labelLarge,
    color: theme.colors.onPrimary,
  },
  
  secondaryButton: {
    backgroundColor: theme.colors.secondaryContainer,
    borderRadius: theme.componentTokens.button.borderRadius,
    height: theme.componentTokens.button.height.medium,
    paddingHorizontal: theme.componentTokens.button.paddingHorizontal.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  secondaryButtonText: {
    ...theme.typography.labelLarge,
    color: theme.colors.onSecondaryContainer,
  },
  
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: theme.componentTokens.button.borderRadius,
    height: theme.componentTokens.button.height.medium,
    paddingHorizontal: theme.componentTokens.button.paddingHorizontal.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  outlinedButtonText: {
    ...theme.typography.labelLarge,
    color: theme.colors.primary,
  },
  
  textInput: {
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.componentTokens.input.borderRadius,
    height: theme.componentTokens.input.height,
    paddingHorizontal: theme.componentTokens.input.paddingHorizontal,
    paddingVertical: theme.componentTokens.input.paddingVertical,
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurfaceVariant,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  
  textInputFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  
  label: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.xs,
  },
  
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  
  fab: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
    width: theme.componentTokens.fab.size,
    height: theme.componentTokens.fab.size,
    borderRadius: theme.componentTokens.fab.borderRadius,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.elevation.level3,
  },
  
  appBar: {
    height: theme.componentTokens.appBar.height,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.componentTokens.appBar.paddingHorizontal,
    ...theme.elevation.level1,
  },
  
  appBarTitle: {
    ...theme.typography.titleLarge,
    color: theme.colors.onSurface,
    marginLeft: theme.spacing.md,
  },
  
  listItem: {
    minHeight: theme.componentTokens.listItem.minHeight,
    paddingHorizontal: theme.componentTokens.listItem.paddingHorizontal,
    paddingVertical: theme.componentTokens.listItem.paddingVertical,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  
  listItemText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurface,
    flex: 1,
  },
  
  listItemSecondaryText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
});

export default ThemeProvider;
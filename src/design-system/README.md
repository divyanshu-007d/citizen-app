# Civic App Design System
## Material Design 3 Implementation for Cross-Platform React Native App

### Overview
This design system provides a comprehensive set of design tokens, components, and utilities based on Material Design 3 principles. It ensures consistency across Android, iOS, and Web platforms with full support for dark/light themes and responsive design.

### Key Features
- 🎨 **Material Design 3** - Latest design system from Google
- 🌈 **Royal Blue Primary** - #2979ff primary color optimized for accessibility
- 🌙 **Dark/Light Themes** - Automatic theme switching support
- 📱 **Responsive Design** - Works seamlessly across all screen sizes
- 🌍 **Multi-language Support** - RTL and LTR text direction support
- ♿ **Accessibility** - WCAG 2.1 AA compliant components
- 🚀 **Performance Optimized** - Efficient rendering and minimal re-renders

### Primary Color System
Our primary color is **Royal Blue (#2979ff)** which provides excellent contrast in both light and dark modes:

- **Light Mode**: #2979ff on white backgrounds
- **Dark Mode**: #80a6ff on dark backgrounds
- **High Contrast**: Automatically adjusted for accessibility

### File Structure
```
src/design-system/
├── index.js              # Main export file
├── tokens.js             # Design tokens (colors, typography, spacing)
├── responsive.js         # Responsive utilities
├── ThemeProvider.js      # Theme context and provider
└── README.md            # This documentation
```

### Quick Start

#### 1. Setup Theme Provider
```jsx
import { ThemeProvider } from './src/design-system';

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

#### 2. Use Theme in Components
```jsx
import { useTheme, useThemedStyles } from './src/design-system';

const MyComponent = () => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
};

const createStyles = (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    ...theme.typography.headlineMedium,
    color: theme.colors.onBackground,
  },
});
```

#### 3. Use Quick Styling Utilities
```jsx
import { createStyles } from './src/design-system';

const MyComponent = () => {
  const styles = useThemedStyles(createStyles);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
    </View>
  );
};

const createStyles = (theme, utils) => ({
  container: {
    ...utils.flex1,
    ...utils.bgSurface,
    ...utils.px('md'),
    ...utils.py('lg'),
  },
  title: {
    ...utils.h4,
    ...utils.textOnSurface,
    ...utils.mb('md'),
  },
});
```

### Design Tokens

#### Colors
```jsx
// Primary colors
theme.colors.primary          // #2979ff
theme.colors.onPrimary        // White/Dark contrast
theme.colors.primaryContainer // Light primary background
theme.colors.onPrimaryContainer // Text on primary container

// Surface colors
theme.colors.surface          // Card/surface background
theme.colors.onSurface        // Text on surface
theme.colors.surfaceVariant   // Subtle surface variation
theme.colors.onSurfaceVariant // Text on surface variant

// Background
theme.colors.background       // App background
theme.colors.onBackground     // Text on background
```

#### Typography
```jsx
// Display (Large headlines)
theme.typography.displayLarge   // 57px
theme.typography.displayMedium  // 45px
theme.typography.displaySmall   // 36px

// Headlines
theme.typography.headlineLarge  // 32px
theme.typography.headlineMedium // 28px
theme.typography.headlineSmall  // 24px

// Titles
theme.typography.titleLarge     // 22px
theme.typography.titleMedium    // 16px
theme.typography.titleSmall     // 14px

// Body text
theme.typography.bodyLarge      // 16px
theme.typography.bodyMedium     // 14px
theme.typography.bodySmall      // 12px

// Labels
theme.typography.labelLarge     // 14px (buttons, tabs)
theme.typography.labelMedium    // 12px (smaller buttons)
theme.typography.labelSmall     // 11px (captions)
```

#### Spacing
```jsx
theme.spacing.xs    // 4px
theme.spacing.sm    // 8px
theme.spacing.md    // 16px
theme.spacing.lg    // 24px
theme.spacing.xl    // 32px
theme.spacing.xxl   // 48px
theme.spacing.xxxl  // 64px
```

#### Border Radius
```jsx
theme.borderRadius.xs   // 4px
theme.borderRadius.sm   // 8px
theme.borderRadius.md   // 12px
theme.borderRadius.lg   // 16px
theme.borderRadius.xl   // 20px
theme.borderRadius.xxl  // 28px
theme.borderRadius.full // 9999px (fully rounded)
```

#### Elevation/Shadow
```jsx
theme.elevation.level0  // No shadow
theme.elevation.level1  // Subtle shadow
theme.elevation.level2  // Card shadow
theme.elevation.level3  // FAB shadow
theme.elevation.level4  // Navigation shadow
theme.elevation.level5  // Modal shadow
```

### Responsive Design

#### Breakpoints
```jsx
theme.responsive.getCurrentBreakpoint() // 'sm', 'md', 'lg', 'xl', 'xxl'
theme.responsive.isMinBreakpoint('md')  // Boolean
theme.responsive.isTabletOrLarger()     // Boolean
theme.responsive.isMobile()             // Boolean
```

#### Responsive Utilities
```jsx
// Responsive dimensions
theme.responsive.widthPercentageToDP(50)  // 50% of screen width
theme.responsive.heightPercentageToDP(30) // 30% of screen height

// Responsive spacing
theme.responsive.responsiveSpacing(16)    // Scales based on screen size
theme.responsive.getContainerPadding()    // Optimal container padding

// Responsive typography
theme.responsive.responsiveFontSize(16)   // Scales font size
theme.responsive.getResponsiveTypography(theme.typography.bodyLarge)
```

### Component Tokens
```jsx
// Buttons
theme.componentTokens.button.height.small     // 32px
theme.componentTokens.button.height.medium    // 40px
theme.componentTokens.button.height.large     // 56px
theme.componentTokens.button.borderRadius     // 20px

// Cards
theme.componentTokens.card.borderRadius       // 12px
theme.componentTokens.card.padding           // 16px

// Input fields
theme.componentTokens.input.height           // 56px
theme.componentTokens.input.borderRadius     // 4px

// FAB (Floating Action Button)
theme.componentTokens.fab.size               // 56px
theme.componentTokens.fab.borderRadius       // 16px
```

### Animation/Motion
```jsx
// Easing curves
theme.motion.easing.emphasized    // cubic-bezier(0.2, 0, 0, 1)
theme.motion.easing.standard      // cubic-bezier(0.4, 0, 0.2, 1)

// Durations
theme.motion.duration.short1      // 50ms
theme.motion.duration.short4      // 200ms
theme.motion.duration.medium1     // 250ms
theme.motion.duration.long1       // 450ms
```

### Theme Switching
```jsx
const { toggleTheme, setTheme, themeMode, isDarkMode } = useTheme();

// Toggle between light and dark
toggleTheme();

// Set specific theme
setTheme('light');   // Force light mode
setTheme('dark');    // Force dark mode
setTheme('system');  // Follow system setting
```

### Common Style Patterns
```jsx
// Pre-defined common styles
const styles = useThemedStyles((theme) => ({
  // Use common patterns
  container: theme.commonStyles.container,
  safeArea: theme.commonStyles.safeArea,
  card: theme.commonStyles.card,
  primaryButton: theme.commonStyles.primaryButton,
  textInput: theme.commonStyles.textInput,
  
  // Custom styles
  customStyle: {
    backgroundColor: theme.colors.surface,
    ...theme.elevation.level2,
  },
}));
```

### Platform-Specific Values
```jsx
// Use different values for different platforms
const styles = {
  container: {
    paddingTop: theme.responsive.platformValue({
      ios: 20,
      android: 16,
      web: 24,
      default: 16,
    }),
  },
};
```

### Best Practices

#### 1. Always Use Theme Colors
```jsx
// ✅ Good
backgroundColor: theme.colors.surface

// ❌ Bad
backgroundColor: '#ffffff'
```

#### 2. Use Semantic Color Names
```jsx
// ✅ Good
color: theme.colors.onSurface      // Adapts to theme
color: theme.colors.error          // Semantic meaning

// ❌ Bad
color: theme.colors.neutral20      // Too specific
```

#### 3. Use Typography Tokens
```jsx
// ✅ Good
...theme.typography.bodyLarge

// ❌ Bad
fontSize: 16,
lineHeight: 24,
```

#### 4. Use Spacing Tokens
```jsx
// ✅ Good
padding: theme.spacing.md

// ❌ Bad
padding: 16
```

#### 5. Use Responsive Utilities
```jsx
// ✅ Good
fontSize: theme.responsive.responsiveFontSize(16)
padding: theme.responsive.getContainerPadding()

// ❌ Bad
fontSize: 16  // Won't scale properly
```

### Accessibility Features

- **High Contrast Support**: Colors automatically adjust for better contrast
- **Large Text Support**: Typography scales with system settings
- **Focus Indicators**: Clear focus states for keyboard navigation
- **Screen Reader Support**: Semantic color names and proper contrast ratios
- **Touch Targets**: Minimum 44pt touch targets on all interactive elements

### Performance Tips

1. **Use `useThemedStyles`** instead of creating styles inline
2. **Memoize style functions** that don't depend on props
3. **Use responsive utilities** for adaptive layouts
4. **Leverage common styles** for consistent patterns

### Development Tools

- **Theme Inspector**: Use `console.log(theme)` to inspect current theme
- **Responsive Testing**: Use `theme.responsive.getCurrentBreakpoint()`
- **Color Contrast Checker**: Built-in contrast validation in development

### Migration Guide

If migrating from an existing design system:

1. **Replace hard-coded colors** with theme colors
2. **Update typography** to use theme typography tokens
3. **Replace spacing values** with theme spacing tokens
4. **Add responsive utilities** for better cross-platform support
5. **Wrap app** with `ThemeProvider`

### Contributing

When adding new design tokens:

1. Follow Material Design 3 guidelines
2. Ensure accessibility compliance
3. Test in both light and dark themes
4. Add responsive variants where appropriate
5. Update documentation
// src/components/common/Button.js
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../design-system';

/**
 * Enhanced Material Design 3 Button Component
 * Professional, government-grade styling with full accessibility support
 * 
 * @param {Object} props
 * @param {string} props.variant - 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal'
 * @param {string} props.size - 'small' | 'medium' | 'large'
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.loading - Whether to show a loading indicator
 * @param {Function} props.onPress - Function to call when button is pressed
 * @param {React.ReactNode} props.leftIcon - Icon to show on the left side
 * @param {React.ReactNode} props.rightIcon - Icon to show on the right side
 * @param {string} props.title - Button text
 * @param {Object} props.style - Custom container styles
 * @param {Object} props.textStyle - Custom text styles
 */
const Button = ({
  variant = 'filled',
  size = 'medium',
  disabled = false,
  loading = false,
  onPress,
  leftIcon,
  rightIcon,
  title,
  style,
  textStyle,
  ...rest
}) => {
  const { theme } = useTheme();
  
  // Create dynamic styles based on variant and theme
  const buttonStyles = getButtonStyles(theme, variant, size, disabled);
  
  return (
    <TouchableOpacity
      style={[buttonStyles.container, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      accessibilityLabel={title}
      {...rest}
    >
      <View style={buttonStyles.content}>
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={buttonStyles.activityIndicatorColor}
            style={buttonStyles.loader}
          />
        ) : (
          <>
            {leftIcon && (
              <View style={buttonStyles.iconLeft}>
                {leftIcon}
              </View>
            )}
            
            {title && (
              <Text style={[buttonStyles.text, textStyle]} numberOfLines={1}>
                {title}
              </Text>
            )}
            
            {rightIcon && (
              <View style={buttonStyles.iconRight}>
                {rightIcon}
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Get dynamic styles based on variant, theme, and state
const getButtonStyles = (theme, variant, size, disabled) => {
  // Define sizes with proper Material Design 3 proportions
  const sizes = {
    small: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.componentTokens.button.borderRadius,
      minHeight: theme.componentTokens.button.height.small,
    },
    medium: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.buttonPadding,
      borderRadius: theme.componentTokens.button.borderRadius,
      minHeight: theme.componentTokens.button.height.medium,
    },
    large: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.componentTokens.button.borderRadius,
      minHeight: theme.componentTokens.button.height.large,
    },
  };

  // Base styles for all buttons
  const baseStyles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      ...sizes[size],
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...theme.typography.labelLarge,
      fontWeight: '500',
      textAlign: 'center',
    },
    iconLeft: {
      marginRight: theme.spacing.componentGap,
    },
    iconRight: {
      marginLeft: theme.spacing.componentGap,
    },
    loader: {
      // No additional styling needed
    },
  };

  // Variant specific styles following Material Design 3
  const variantStyles = {
    filled: {
      container: {
        backgroundColor: disabled 
          ? theme.colors.surfaceVariant 
          : theme.colors.primary,
        ...theme.elevation.level0,
      },
      text: {
        color: disabled 
          ? theme.colors.onSurfaceVariant 
          : theme.colors.onPrimary,
      },
      activityIndicatorColor: disabled 
        ? theme.colors.onSurfaceVariant 
        : theme.colors.onPrimary,
    },
    
    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled 
          ? theme.colors.surfaceVariant 
          : theme.colors.outline,
      },
      text: {
        color: disabled 
          ? theme.colors.onSurfaceVariant 
          : theme.colors.primary,
      },
      activityIndicatorColor: disabled 
        ? theme.colors.onSurfaceVariant 
        : theme.colors.primary,
    },
    
    text: {
      container: {
        backgroundColor: 'transparent',
        paddingHorizontal: theme.spacing.sm,
        ...theme.elevation.level0,
      },
      text: {
        color: disabled 
          ? theme.colors.onSurfaceVariant 
          : theme.colors.primary,
      },
      activityIndicatorColor: disabled 
        ? theme.colors.onSurfaceVariant 
        : theme.colors.primary,
    },
    
    elevated: {
      container: {
        backgroundColor: disabled 
          ? theme.colors.surfaceVariant 
          : theme.colors.surface,
        ...theme.elevation.level1,
      },
      text: {
        color: disabled 
          ? theme.colors.onSurfaceVariant 
          : theme.colors.primary,
      },
      activityIndicatorColor: disabled 
        ? theme.colors.onSurfaceVariant 
        : theme.colors.primary,
    },
    
    tonal: {
      container: {
        backgroundColor: disabled 
          ? theme.colors.surfaceVariant 
          : theme.colors.secondaryContainer,
        ...theme.elevation.level0,
      },
      text: {
        color: disabled 
          ? theme.colors.onSurfaceVariant 
          : theme.colors.onSecondaryContainer,
      },
      activityIndicatorColor: disabled 
        ? theme.colors.onSurfaceVariant 
        : theme.colors.onSecondaryContainer,
    },
  };

  // Merge base styles with variant-specific styles
  return {
    container: {
      ...baseStyles.container,
      ...variantStyles[variant]?.container,
    },
    content: baseStyles.content,
    text: {
      ...baseStyles.text,
      ...variantStyles[variant]?.text,
    },
    iconLeft: baseStyles.iconLeft,
    iconRight: baseStyles.iconRight,
    loader: baseStyles.loader,
    activityIndicatorColor: variantStyles[variant]?.activityIndicatorColor,
  };
};

export default Button;

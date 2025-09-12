// src/components/common/Button.js
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../design-system';

/**
 * Button Component following Material Design 3
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
      activeOpacity={0.7}
      {...rest}
    >
      {leftIcon && !loading && (
        <View style={buttonStyles.iconLeft}>
          {leftIcon}
        </View>
      )}
      
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={buttonStyles.activityIndicatorColor}
        />
      ) : (
        <Text style={[buttonStyles.text, textStyle]}>
          {title}
        </Text>
      )}
      
      {rightIcon && !loading && (
        <View style={buttonStyles.iconRight}>
          {rightIcon}
        </View>
      )}
    </TouchableOpacity>
  );
};

// Get dynamic styles based on variant, theme, and state
const getButtonStyles = (theme, variant, size, disabled) => {
  // Define sizes
  const sizes = {
    small: {
      paddingVertical: theme.spacing.xxs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.small,
      minHeight: 32,
      ...theme.typography.labelSmall,
    },
    medium: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.medium,
      minHeight: 40,
      ...theme.typography.labelMedium,
    },
    large: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.borderRadius.large,
      minHeight: 48,
      ...theme.typography.labelLarge,
    },
  };

  // Base styles for all buttons
  const baseStyles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...sizes[size],
    },
    text: {
      textAlign: 'center',
      fontWeight: '600',
    },
    iconLeft: {
      marginRight: theme.spacing.xs,
    },
    iconRight: {
      marginLeft: theme.spacing.xs,
    },
  };

  // Variant specific styles
  const variantStyles = {
    filled: {
      container: {
        backgroundColor: disabled ? theme.colors.disabledContainer : theme.colors.primary40,
        ...theme.elevation.level1,
      },
      text: {
        color: disabled ? theme.colors.disabledText : theme.colors.onPrimary,
      },
      activityIndicatorColor: disabled ? theme.colors.disabledText : theme.colors.onPrimary,
    },
    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled ? theme.colors.disabledContainer : theme.colors.primary40,
      },
      text: {
        color: disabled ? theme.colors.disabledText : theme.colors.primary40,
      },
      activityIndicatorColor: disabled ? theme.colors.disabledText : theme.colors.primary40,
    },
    text: {
      container: {
        backgroundColor: 'transparent',
        paddingHorizontal: theme.spacing.sm,
      },
      text: {
        color: disabled ? theme.colors.disabledText : theme.colors.primary40,
      },
      activityIndicatorColor: disabled ? theme.colors.disabledText : theme.colors.primary40,
    },
    elevated: {
      container: {
        backgroundColor: disabled ? theme.colors.disabledContainer : theme.colors.surfaceContainerLow,
        ...theme.elevation.level2,
      },
      text: {
        color: disabled ? theme.colors.disabledText : theme.colors.primary40,
      },
      activityIndicatorColor: disabled ? theme.colors.disabledText : theme.colors.primary40,
    },
    tonal: {
      container: {
        backgroundColor: disabled ? theme.colors.disabledContainer : theme.colors.secondaryContainer,
      },
      text: {
        color: disabled ? theme.colors.disabledText : theme.colors.onSecondaryContainer,
      },
      activityIndicatorColor: disabled ? theme.colors.disabledText : theme.colors.onSecondaryContainer,
    },
  };

  // Combine and return the styles
  return {
    container: {...baseStyles.container, ...variantStyles[variant].container},
    text: {...baseStyles.text, ...variantStyles[variant].text},
    iconLeft: baseStyles.iconLeft,
    iconRight: baseStyles.iconRight,
    activityIndicatorColor: variantStyles[variant].activityIndicatorColor,
  };
};

export default Button;

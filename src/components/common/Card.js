// src/components/common/Card.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../design-system';

/**
 * Enhanced Card Component following Material Design 3
 * Professional card with proper elevation and spacing for civic applications
 * 
 * @param {Object} props
 * @param {string} props.variant - 'elevated' | 'filled' | 'outlined'
 * @param {React.ReactNode} props.children - Content of the card
 * @param {Object} props.style - Custom styles for the card
 * @param {boolean} props.interactive - Whether the card is interactive/touchable
 */
const Card = ({ 
  variant = 'elevated', 
  children, 
  style, 
  interactive = false,
  ...rest 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, variant, interactive);

  return (
    <View 
      style={[styles.card, style]} 
      accessible={interactive}
      accessibilityRole={interactive ? "button" : "none"}
      {...rest}
    >
      {children}
    </View>
  );
};

const createStyles = (theme, variant, interactive) => {
  const baseStyle = {
    borderRadius: theme.componentTokens.card.borderRadius,
    padding: theme.componentTokens.card.padding,
    width: '100%',
    overflow: 'hidden',
  };

  const variantStyles = {
    elevated: {
      backgroundColor: theme.colors.surfaceContainerLow,
      ...theme.elevation.level1,
    },
    filled: {
      backgroundColor: theme.colors.surfaceContainerHighest,
      ...theme.elevation.level0,
    },
    outlined: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      ...theme.elevation.level0,
    },
  };

  // Add interactive state styling
  const interactiveStyle = interactive ? {
    // Subtle visual cue for interactive cards
    transform: [{ scale: 1 }], // Enables transform animations
  } : {};

  return StyleSheet.create({
    card: {
      ...baseStyle,
      ...variantStyles[variant],
      ...interactiveStyle,
    },
  });
};

export default Card;
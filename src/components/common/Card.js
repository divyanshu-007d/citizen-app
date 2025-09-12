// src/components/common/Card.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../design-system';

/**
 * Card Component following Material Design 3
 * 
 * @param {Object} props
 * @param {string} props.variant - 'elevated' | 'filled' | 'outlined'
 * @param {React.ReactNode} props.children - Content of the card
 * @param {Object} props.style - Custom styles for the card
 */
const Card = ({ variant = 'elevated', children, style, ...rest }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, variant);

  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
};

const createStyles = (theme, variant) => {
  const baseStyle = {
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    width: '100%',
  };

  const variantStyles = {
    elevated: {
      backgroundColor: theme.colors.surfaceContainerLow,
      ...theme.elevation.level1,
    },
    filled: {
      backgroundColor: theme.colors.surfaceContainer,
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  };

  return StyleSheet.create({
    card: {
      ...baseStyle,
      ...variantStyles[variant],
    },
  });
};

export default Card;
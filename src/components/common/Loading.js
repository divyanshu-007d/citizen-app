// src/components/common/Loading.js
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../design-system';

/**
 * Loading Component
 * 
 * @param {Object} props
 * @param {string} props.size - 'small' | 'large'
 * @param {string} props.text - Text to display below the indicator
 */
const Loading = ({ size = 'large', text }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={theme.colors.primary40} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
});

export default Loading;

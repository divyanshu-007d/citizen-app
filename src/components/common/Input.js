// src/components/common/Input.js
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../design-system';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * Enhanced Input Component following Material Design 3
 * Professional input with proper accessibility and validation for civic applications
 * 
 * @param {Object} props
 * @param {string} props.label - The label for the input
 * @param {string} props.value - The value of the input
 * @param {Function} props.onChangeText - Function to call when text changes
 * @param {string} props.placeholder - The placeholder text
 * @param {boolean} props.error - Whether there is an error
 * @param {string} props.errorMessage - The error message to display
 * @param {string} props.helperText - Helper text to show below input
 * @param {boolean} props.secureTextEntry - Whether to hide the text
 * @param {React.ReactNode} props.leftIcon - Icon to show on the left
 * @param {React.ReactNode} props.rightIcon - Icon to show on the right
 * @param {string} props.keyboardType - The keyboard type
 * @param {boolean} props.required - Whether the field is required
 */
const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error = false,
  errorMessage,
  helperText,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  keyboardType = 'default',
  required = false,
  multiline = false,
  numberOfLines = 1,
  ...rest
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const styles = createStyles(theme, error, isFocused, multiline);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.iconLeft}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessible={true}
          accessibilityLabel={label}
          accessibilityHint={helperText || errorMessage}
          {...rest}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility} 
            style={styles.iconRight}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            <FontAwesome5 
              name={isPasswordVisible ? 'eye-slash' : 'eye'} 
              size={theme.iconSizes.sm} 
              color={theme.colors.onSurfaceVariant} 
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <View style={styles.iconRight}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {/* Helper text or error message */}
      {(error && errorMessage) ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        helperText && <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const createStyles = (theme, error, isFocused, multiline) => StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.sectionGap,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.componentGap,
    fontWeight: '500',
  },
  required: {
    color: theme.colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    backgroundColor: theme.colors.surfaceContainerHighest,
    borderRadius: theme.componentTokens.input.borderRadius || theme.borderRadius.xs,
    borderWidth: 1,
    borderColor: error 
      ? theme.colors.error 
      : isFocused 
        ? theme.colors.primary 
        : theme.colors.outline,
    paddingHorizontal: theme.componentTokens.input.paddingHorizontal || theme.spacing.md,
    paddingVertical: multiline 
      ? theme.spacing.sm 
      : theme.componentTokens.input.paddingVertical || theme.spacing.sm,
    minHeight: multiline ? 80 : (theme.componentTokens.input.height || theme.spacing.minTouchTarget),
  },
  input: {
    flex: 1,
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurface,
    padding: 0, // Remove default padding
    textAlignVertical: 'center',
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: theme.spacing.xs,
  },
  iconLeft: {
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    marginLeft: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xs, // Better touch target
  },
  helperText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.md,
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.md,
  },
});

export default Input;

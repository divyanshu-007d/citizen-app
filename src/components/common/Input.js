// src/components/common/Input.js
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../design-system';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * Input Component following Material Design 3
 * 
 * @param {Object} props
 * @param {string} props.label - The label for the input
 * @param {string} props.value - The value of the input
 * @param {Function} props.onChangeText - Function to call when text changes
 * @param {string} props.placeholder - The placeholder text
 * @param {boolean} props.error - Whether there is an error
 * @param {string} props.errorMessage - The error message to display
 * @param {boolean} props.secureTextEntry - Whether to hide the text
 * @param {React.ReactNode} props.leftIcon - Icon to show on the left
 * @param {React.ReactNode} props.rightIcon - Icon to show on the right
 * @param {string} props.keyboardType - The keyboard type
 */
const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error = false,
  errorMessage,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  keyboardType = 'default',
  ...rest
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const styles = createStyles(theme, error, isFocused);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.neutral60}
          secureTextEntry={!isPasswordVisible}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconRight}>
            <FontAwesome5 
              name={isPasswordVisible ? 'eye-slash' : 'eye'} 
              size={18} 
              color={theme.colors.neutral60} 
            />
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && (
          <View style={styles.iconRight}>{rightIcon}</View>
        )}
      </View>
      {error && errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const createStyles = (theme, error, isFocused) => StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    marginBottom: theme.spacing.xxs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: error 
      ? theme.colors.error 
      : isFocused 
      ? theme.colors.primary40 
      : theme.colors.border,
    height: 50,
  },
  input: {
    flex: 1,
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
  },
  iconLeft: {
    paddingLeft: theme.spacing.md,
  },
  iconRight: {
    paddingRight: theme.spacing.md,
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    marginTop: theme.spacing.xxs,
  },
});

export default Input;

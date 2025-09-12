// src/screens/auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../design-system';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    // Simulate API call and directly login
    setTimeout(() => {
      setLoading(false);
      // Navigate to main app (assuming you have a main navigator)
      // For now, we'll show an alert that login was successful
      Alert.alert('Login Successful', 'Welcome to Citizen App!', [
        {
          text: 'OK',
          onPress: () => {
            // TODO: Navigate to main app when main navigation is ready
            console.log('User logged in successfully');
          }
        }
      ]);
    }, 1500);
  };

  const handleRegister = () => {
    // Direct login instead of register
    handleLogin();
  };

  const handleSocialLogin = (provider) => {
    // Direct login instead of social auth
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Login Successful', `Welcome via ${provider}!`, [
        {
          text: 'OK',
          onPress: () => {
            console.log(`User logged in via ${provider}`);
          }
        }
      ]);
    }, 1000);
  };

  const handleGuestLogin = () => {
    // Direct guest login
    Alert.alert('Guest Login', 'Welcome as Guest!', [
      {
        text: 'OK',
        onPress: () => {
          console.log('User logged in as guest');
        }
      }
    ]);
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo and Title */}
          <View style={styles.header}>
            <FontAwesome5 
              name="city" 
              size={60} 
              color={theme.colors.primary40} 
              style={styles.logo}
            />
            <Text style={styles.title}>Citizen App</Text>
            <Text style={styles.subtitle}>
              Report civic issues and make your city better
            </Text>
          </View>

          {/* Login Form */}
          <Card style={styles.loginCard}>
            <Text style={styles.loginTitle}>Login to Continue</Text>
            
            <Input
              label="Phone Number (Optional)"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number or leave blank"
              keyboardType="phone-pad"
              leftIcon={
                <FontAwesome5 
                  name="phone" 
                  size={18} 
                  color={theme.colors.neutral60} 
                />
              }
              maxLength={10}
            />

            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <Button
              title="New User? Join Now"
              variant="text"
              onPress={handleRegister}
              style={styles.registerButton}
            />
          </Card>

          {/* Social Login Options */}
          <View style={styles.socialLogin}>
            <Text style={styles.orText}>Or continue with</Text>
            
            <View style={styles.socialButtons}>
              <Button
                title="Google"
                variant="outlined"
                leftIcon={
                  <FontAwesome5 
                    name="google" 
                    size={16} 
                    color={theme.colors.primary40} 
                  />
                }
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Google')}
              />
              
              <Button
                title="Facebook"
                variant="outlined"
                leftIcon={
                  <FontAwesome5 
                    name="facebook-f" 
                    size={16} 
                    color={theme.colors.primary40} 
                  />
                }
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Facebook')}
              />
            </View>
          </View>

          {/* Guest Access */}
          <Button
            title="Continue as Guest"
            variant="text"
            onPress={handleGuestLogin}
            style={styles.guestButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logo: {
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.headlineLarge,
    color: theme.colors.primary40,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    textAlign: 'center',
    opacity: 0.7,
  },
  loginCard: {
    marginBottom: theme.spacing.lg,
  },
  loginTitle: {
    ...theme.typography.titleLarge,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  loginButton: {
    marginTop: theme.spacing.sm,
  },
  registerButton: {
    marginTop: theme.spacing.sm,
  },
  socialLogin: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  orText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.6,
    marginBottom: theme.spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  guestButton: {
    alignSelf: 'center',
  },
});

export default LoginScreen;
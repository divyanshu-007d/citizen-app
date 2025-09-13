// src/screens/auth/LoginScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../design-system';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Animation values for floating elements
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation for background elements
    const createFloatingAnimation = (animatedValue, duration) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = createFloatingAnimation(float1, 8000);
    const animation2 = createFloatingAnimation(float2, 6000);
    const animation3 = createFloatingAnimation(float3, 7000);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    
    // Simulate API call and directly login
    setTimeout(() => {
      setLoading(false);
      // Login user with phone number if provided
      login({ 
        phoneNumber: phoneNumber || null,
        loginMethod: 'phone',
        timestamp: new Date().toISOString()
      });
    }, 1500);
  };

  const handleRegister = () => {
    // Direct login instead of register
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        loginMethod: 'registration',
        timestamp: new Date().toISOString()
      });
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    // Direct login instead of social auth
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        loginMethod: provider.toLowerCase(),
        provider: provider,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  };

  const handleGuestLogin = () => {
    // Direct guest login
    login({
      loginMethod: 'guest',
      isGuest: true,
      timestamp: new Date().toISOString()
    });
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={[
          theme.colors.primary + '20',
          theme.colors.secondary + '15',
          theme.colors.tertiary + '10',
          theme.colors.background
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradientBackground}
      >
        {/* Animated Floating Elements for Visual Interest */}
        <Animated.View 
          style={[
            styles.floatingElement, 
            styles.element1,
            {
              transform: [{
                translateY: float1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30],
                }),
              }],
              opacity: float1.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.floatingElement, 
            styles.element2,
            {
              transform: [{
                translateY: float2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 25],
                }),
              }],
              opacity: float2.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.floatingElement, 
            styles.element3,
            {
              transform: [{
                translateY: float3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              }],
              opacity: float3.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0.7],
              }),
            }
          ]}
        />
        
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <View style={styles.content}>
              {/* Modern Header */}
              <View style={styles.header}>
                <Text style={styles.brandTitle}>Janta</Text>
                {/* <Text style={styles.brandSubtitle}>
                  Your Voice, Your City
                </Text> */}
                {/* <Text style={styles.brandDescription}>
                  Connect with your community and make a difference
                </Text> */}
              </View>

              {/* Glassmorphism Login Card */}
              <BlurView intensity={80} tint="light" style={styles.glassCard}>
                <View style={styles.cardOverlay}>
                  <Text style={styles.loginTitle}>Welcome Back</Text>
                  <Text style={styles.loginSubtitle}>Sign in to continue</Text>
                  
                  <View style={styles.formContainer}>
                    <Input
                      label="Phone Number"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      leftIcon={
                        <FontAwesome5 
                          name="phone" 
                          size={theme.iconSizes.sm} 
                          color={theme.colors.primary} 
                        />
                      }
                      maxLength={10}
                      style={styles.input}
                    />

                    <Button
                      title="Sign In"
                      onPress={handleLogin}
                      loading={loading}
                      style={styles.primaryButton}
                      size="large"
                    />

                    {/* <TouchableOpacity 
                      onPress={handleRegister}
                      style={styles.registerLink}
                    >
                      <Text style={styles.registerText}>
                        New to Janta? <Text style={styles.registerHighlight}>Join Now</Text>
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </BlurView>

              {/* Social Login Section */}
              <View style={styles.socialSection}>
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Or continue with</Text>
                  <View style={styles.dividerLine} />
                </View>
                
                <View style={styles.socialButtons}>
                  <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => handleSocialLogin('Google')}
                  >
                    <BlurView intensity={60} tint="light" style={styles.socialButtonBlur}>
                      <FontAwesome5 
                        name="google" 
                        size={theme.iconSizes.md} 
                        color="#4285F4" 
                      />
                      <Text style={styles.socialButtonText}>Google</Text>
                    </BlurView>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => handleSocialLogin('Facebook')}
                  >
                    <BlurView intensity={60} tint="light" style={styles.socialButtonBlur}>
                      <FontAwesome5 
                        name="facebook-f" 
                        size={theme.iconSizes.md} 
                        color="#1877F2" 
                      />
                      <Text style={styles.socialButtonText}>Facebook</Text>
                    </BlurView>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Guest Access */}
              <TouchableOpacity 
                onPress={handleGuestLogin}
                style={styles.guestButton}
              >
                <BlurView intensity={40} tint="light" style={styles.guestButtonBlur}>
                  <FontAwesome5 
                    name="user-friends" 
                    size={theme.iconSizes.sm} 
                    color={theme.colors.onSurfaceVariant} 
                  />
                  <Text style={styles.guestButtonText}>Continue as Guest</Text>
                </BlurView>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    position: 'relative',
  },
  
  // Floating background elements
  floatingElement: {
    position: 'absolute',
    borderRadius: theme.borderRadius.full,
    opacity: 0.1,
  },
  element1: {
    width: 200,
    height: 200,
    backgroundColor: theme.colors.primary,
    top: height * 0.1,
    right: -50,
  },
  element2: {
    width: 150,
    height: 150,
    backgroundColor: theme.colors.tertiary,
    top: height * 0.6,
    left: -30,
  },
  element3: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.secondary,
    top: height * 0.8,
    right: width * 0.3,
  },
  
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.screenPadding,
    paddingVertical: theme.spacing.lg,
    justifyContent: 'center',
  },
  
  // Modern Header
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
    paddingTop: theme.spacing.xl,
  },
  brandTitle: {
    ...theme.typography.displayMedium,
    fontWeight: '800',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.sm,
    letterSpacing: -1,
    textAlign: 'center',
  },
  brandSubtitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  brandDescription: {
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: theme.spacing.lg,
  },
  
  // Glassmorphism Card
  glassCard: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: theme.spacing.xxl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: theme.spacing.xl,
    backdropFilter: 'blur(20px)',
  },
  loginTitle: {
    ...theme.typography.headlineMedium,
    color: theme.colors.onSurface,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  loginSubtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
  
  formContainer: {
    gap: theme.spacing.lg,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  primaryButton: {
    width: '100%',
    marginTop: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    alignSelf: 'stretch',
    ...theme.elevation.level2,
  },
  registerLink: {
    alignSelf: 'center',
    paddingVertical: theme.spacing.sm,
  },
  registerText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  registerHighlight: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  
  // Social Login Section
  socialSection: {
    marginBottom: theme.spacing.xxl,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.outlineVariant,
    opacity: 0.5,
  },
  dividerText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.xs,
  },
  
  socialButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  socialButton: {
    flex: 1,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  socialButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    gap: theme.spacing.sm,
  },
  socialButtonText: {
    ...theme.typography.labelLarge,
    color: theme.colors.onSurface,
    fontWeight: '600',
  },
  
  // Guest Button
  guestButton: {
    alignSelf: 'center',
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  guestButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    gap: theme.spacing.sm,
  },
  guestButtonText: {
    ...theme.typography.labelMedium,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '500',
  },
});

export default LoginScreen;
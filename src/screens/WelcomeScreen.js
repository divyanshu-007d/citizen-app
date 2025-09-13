// src/screens/WelcomeScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Image,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../design-system';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentSlide, setCurrentSlide] = useState(0);

  const onboardingSlides = [
    {
      icon: 'mobile-alt',
      title: 'Report Issues Instantly',
      subtitle: 'One-tap reporting with photo evidence. Help your community by reporting civic issues quickly and efficiently.',
    },
    {
      icon: 'users',
      title: 'Community Powered',
      subtitle: 'Join thousands of citizens working together to create positive change in your neighborhood and city.',
    },
    {
      icon: 'chart-line',
      title: 'Track Real Progress',
      subtitle: 'Monitor the status of your reports and see measurable impact through government response tracking.',
    },
    {
      icon: 'award',
      title: 'Civic Recognition',
      subtitle: 'Earn badges and recognition for your contributions to community improvement and civic engagement.',
    }
  ];

  const styles = createStyles(theme);

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    // Here you would typically update the app's language context
  };

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const handleGuestMode = () => {
    Alert.alert(
      'Browse as Guest', 
      'You can explore civic reports without creating an account. However, you\'ll need to sign in to submit your own reports.',
      [
        { text: 'Continue as Guest', onPress: () => navigation.navigate('Main') },
        { text: 'Sign In Instead', style: 'cancel' }
      ]
    );
  };

  const handleSkipTutorial = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentSlide === 0 ? (
        // Enhanced Language Selection Slide
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <FontAwesome5 
                name="city" 
                size={theme.iconSizes.xxl} 
                color={theme.colors.primary} 
              />
            </View>
            <Text style={styles.appName}>Civic Connect</Text>
            <Text style={styles.tagline}>
              Empowering citizens, building better communities
            </Text>
          </View>

          {/* Language Selection Card */}
          <Card variant="elevated" style={styles.languageCard}>
            <Text style={styles.sectionTitle}>Choose Your Language</Text>
            <Text style={styles.sectionSubtitle}>
              Select your preferred language for the best experience
            </Text>

            <View style={styles.languageGrid}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    selectedLanguage === lang.code && styles.selectedLanguage
                  ]}
                  onPress={() => handleLanguageSelect(lang.code)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityState={{ selected: selectedLanguage === lang.code }}
                  accessibilityLabel={`Select ${lang.name} language`}
                >
                  <Text style={[
                    styles.languageText,
                    selectedLanguage === lang.code && styles.selectedLanguageText
                  ]}>
                    {lang.nativeName}
                  </Text>
                  {lang.name !== lang.nativeName && (
                    <Text style={[
                      styles.languageSubtext,
                      selectedLanguage === lang.code && styles.selectedLanguageSubtext
                    ]}>
                      {lang.name}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              title="Continue"
              onPress={nextSlide}
              style={styles.primaryButton}
              size="large"
            />
            <Button
              title="Skip Tutorial"
              variant="text"
              onPress={handleSkipTutorial}
              style={styles.skipButton}
            />
          </View>
        </View>
      ) : (
        // Enhanced Onboarding Slides
        <View style={styles.content}>
          {/* Skip Button */}
          <TouchableOpacity 
            style={styles.skipButtonTop} 
            onPress={handleSkipTutorial}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Skip tutorial"
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {/* Slide Content */}
          <View style={styles.slideContent}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <FontAwesome5 
                  name={onboardingSlides[currentSlide - 1].icon} 
                  size={theme.iconSizes.xxl} 
                  color={theme.colors.primary} 
                />
              </View>
            </View>

            <Text style={styles.slideTitle}>
              {onboardingSlides[currentSlide - 1].title}
            </Text>
            <Text style={styles.slideSubtitle}>
              {onboardingSlides[currentSlide - 1].subtitle}
            </Text>
          </View>

          {/* Enhanced Slide Indicators */}
          <View style={styles.indicators}>
            {onboardingSlides.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  (currentSlide - 1) === index && styles.activeIndicator
                ]}
                onPress={() => setCurrentSlide(index + 1)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Go to slide ${index + 1}`}
              />
            ))}
          </View>

          {/* Enhanced Navigation */}
          <View style={styles.slideNavigation}>
            <View style={styles.navButtonContainer}>
              {currentSlide > 1 && (
                <Button
                  title="Previous"
                  variant="outlined"
                  onPress={prevSlide}
                  style={styles.navButton}
                />
              )}
            </View>
            
            <View style={styles.navButtonContainer}>
              {currentSlide < onboardingSlides.length ? (
                <Button
                  title="Next"
                  onPress={nextSlide}
                  style={styles.navButton}
                />
              ) : (
                <Button
                  title="Get Started"
                  onPress={handleGetStarted}
                  style={styles.navButton}
                  size="large"
                />
              )}
            </View>
          </View>

          {/* Guest Mode Option on Last Slide */}
          {currentSlide === onboardingSlides.length && (
            <View style={styles.guestModeContainer}>
              <Button
                title="Browse as Guest"
                variant="text"
                onPress={handleGuestMode}
                style={styles.guestButton}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.screenPadding,
    justifyContent: 'space-between',
  },
  
  // Logo section styles
  logoSection: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.elevation.level1,
  },
  appName: {
    ...theme.typography.headlineLarge,
    color: theme.colors.onSurface,
    fontWeight: '700',
    marginTop: theme.spacing.lg,
  },
  tagline: {
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  },
  
  // Language selection styles
  languageCard: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.titleLarge,
    color: theme.colors.onSurface,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionSubtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  languageOption: {
    width: '48%',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.outlineVariant,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    minHeight: theme.spacing.minTouchTarget,
    justifyContent: 'center',
  },
  selectedLanguage: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryContainer,
    ...theme.elevation.level1,
  },
  languageText: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedLanguageText: {
    color: theme.colors.onPrimaryContainer,
  },
  languageSubtext: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  selectedLanguageSubtext: {
    color: theme.colors.onPrimaryContainer,
  },
  
  // Action buttons
  actionButtons: {
    gap: theme.spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  skipButton: {
    alignSelf: 'center',
  },
  
  // Onboarding slides styles
  skipButtonTop: {
    alignSelf: 'flex-end',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  skipText: {
    ...theme.typography.labelLarge,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  iconContainer: {
    marginBottom: theme.spacing.xxl,
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.elevation.level2,
  },
  slideTitle: {
    ...theme.typography.headlineMedium,
    color: theme.colors.onSurface,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  slideSubtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.sm,
  },
  
  // Indicators
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.onSurfaceVariant,
    opacity: 0.4,
  },
  activeIndicator: {
    backgroundColor: theme.colors.primary,
    opacity: 1,
    width: 24,
  },
  
  // Navigation
  slideNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  navButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  navButton: {
    minWidth: 120,
  },
  
  // Guest mode
  guestModeContainer: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  guestButton: {
    // Additional styling if needed
  },
});

export default WelcomeScreen;

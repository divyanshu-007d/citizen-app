// src/screens/WelcomeScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  Alert 
} from 'react-native';
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
      subtitle: 'One-tap reporting with AI assistance. Just point, click, and report civic issues in your area.',
    },
    {
      icon: 'users',
      title: 'Community Powered',
      subtitle: 'Join thousands of citizens working together to make your city better through collective action.',
    },
    {
      icon: 'trophy',
      title: 'Earn Rewards',
      subtitle: 'Get points and badges for reporting issues. Climb the leaderboard and become a civic champion.',
    },
    {
      icon: 'eye',
      title: 'Track Progress',
      subtitle: 'Monitor the status of your reports and see how your contributions make a real difference.',
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
    Alert.alert('Guest Mode', 'Guest mode will be available soon! You can browse complaints but cannot submit reports.');
  };

  const handleSkipTutorial = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentSlide === 0 ? (
        // Language Selection Slide
        <View style={styles.content}>
          <View style={styles.logoSection}>
            <FontAwesome5 
              name="city" 
              size={80} 
              color={theme.colors.primary40} 
            />
            <Text style={styles.appName}>Citizen App</Text>
            <Text style={styles.tagline}>Making cities better, together</Text>
          </View>

          <Card style={styles.languageCard}>
            <Text style={styles.sectionTitle}>Choose Your Language</Text>
            <Text style={styles.sectionSubtitle}>
              आपकी भाषा चुनें | ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ
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
                >
                  <Text style={[
                    styles.languageText,
                    selectedLanguage === lang.code && styles.selectedLanguageText
                  ]}>
                    {lang.nativeName}
                  </Text>
                  <Text style={[
                    styles.languageSubtext,
                    selectedLanguage === lang.code && styles.selectedLanguageText
                  ]}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <View style={styles.actionButtons}>
            <Button
              title="Continue"
              onPress={nextSlide}
              style={styles.primaryButton}
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
        // Onboarding Slides
        <View style={styles.content}>
          <TouchableOpacity style={styles.skipButtonTop} onPress={handleSkipTutorial}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <View style={styles.slideContent}>
            <View style={styles.iconContainer}>
              <FontAwesome5 
                name={onboardingSlides[currentSlide - 1].icon} 
                size={120} 
                color={theme.colors.primary40} 
              />
            </View>

            <Text style={styles.slideTitle}>
              {onboardingSlides[currentSlide - 1].title}
            </Text>
            <Text style={styles.slideSubtitle}>
              {onboardingSlides[currentSlide - 1].subtitle}
            </Text>
          </View>

          {/* Slide Indicators */}
          <View style={styles.indicators}>
            {onboardingSlides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  (currentSlide - 1) === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.slideNavigation}>
            {currentSlide > 1 && (
              <Button
                title="Previous"
                variant="outlined"
                onPress={prevSlide}
                style={styles.navButton}
              />
            )}
            
            <View style={styles.spacer} />
            
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
              />
            )}
          </View>
        </View>
      )}

      {/* Guest Mode Option */}
      {currentSlide === 0 && (
        <View style={styles.guestSection}>
          <Button
            title="Continue as Guest"
            variant="text"
            onPress={handleGuestMode}
            leftIcon={<FontAwesome5 name="user" size={16} color={theme.colors.primary40} />}
          />
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
    padding: theme.spacing.lg,
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: theme.spacing.xxl,
  },
  appName: {
    ...theme.typography.headlineLarge,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginTop: theme.spacing.lg,
  },
  tagline: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  languageCard: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.titleLarge,
    color: theme.colors.text,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionSubtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageOption: {
    width: '48%',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  selectedLanguage: {
    borderColor: theme.colors.primary40,
    backgroundColor: theme.colors.primary40 + '10',
  },
  languageText: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
  },
  languageSubtext: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.6,
    marginTop: theme.spacing.xxs,
  },
  selectedLanguageText: {
    color: theme.colors.primary40,
  },
  actionButtons: {
    marginTop: 'auto',
  },
  primaryButton: {
    marginBottom: theme.spacing.md,
  },
  skipButton: {
    alignSelf: 'center',
  },
  skipButtonTop: {
    alignSelf: 'flex-end',
    padding: theme.spacing.sm,
  },
  skipText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary40,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing.xxl,
  },
  slideTitle: {
    ...theme.typography.headlineMedium,
    color: theme.colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  slideSubtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 24,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.neutral40,
    marginHorizontal: theme.spacing.xs,
  },
  activeIndicator: {
    backgroundColor: theme.colors.primary40,
    width: 24,
  },
  slideNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    flex: 1,
  },
  spacer: {
    width: theme.spacing.md,
  },
  guestSection: {
    alignItems: 'center',
    paddingBottom: theme.spacing.lg,
  },
});

export default WelcomeScreen;

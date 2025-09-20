// src/screens/settings/LanguageSettings.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../design-system';
import Card from '../../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const LanguageSettings = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('IN');

  const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
  ];

  const regions = [
    { code: 'IN', name: 'India', native: 'भारत' },
    { code: 'US', name: 'United States', native: 'United States' },
    { code: 'GB', name: 'United Kingdom', native: 'United Kingdom' },
    { code: 'CA', name: 'Canada', native: 'Canada' },
    { code: 'AU', name: 'Australia', native: 'Australia' },
  ];

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    const language = languages.find(lang => lang.code === languageCode);
    Alert.alert(
      'Language Changed',
      `Language has been set to ${language.native}. The app will restart to apply changes.`,
      [
        { text: 'Cancel', onPress: () => setSelectedLanguage(selectedLanguage) },
        { text: 'Apply', onPress: () => applyLanguageChange(languageCode) }
      ]
    );
  };

  const handleRegionSelect = (regionCode) => {
    setSelectedRegion(regionCode);
    const region = regions.find(reg => reg.code === regionCode);
    Alert.alert(
      'Region Changed',
      `Region has been set to ${region.name}. This will affect date, time, and number formats.`,
      [
        { text: 'OK' }
      ]
    );
  };

  const applyLanguageChange = (languageCode) => {
    // In a real app, this would trigger a language change
    Alert.alert('Success', 'Language preference saved. Restart the app to see changes.');
  };

  const downloadLanguagePack = (languageCode) => {
    Alert.alert(
      'Download Language Pack',
      'This will download additional language resources for offline use.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download', 
          onPress: () => Alert.alert('Success', 'Language pack downloaded successfully!')
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={[
          theme.colors.primary + '08',
          theme.colors.secondary + '05',
          theme.colors.background
        ]}
        locations={[0, 0.5, 1]}
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Glassmorphism Header */}
          <BlurView intensity={80} tint="light" style={styles.headerBlur}>
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={styles.backButtonContainer}
              >
                <BlurView intensity={30} tint="light" style={styles.backButton}>
                  <FontAwesome5 name="chevron-left" size={18} color={theme.colors.primary} />
                </BlurView>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Language Settings</Text>
              <View style={styles.placeholder} />
            </View>
          </BlurView>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Current Language */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interface Language</Text>
              <BlurView intensity={80} tint="light" style={styles.currentLanguageCardBlur}>
                <View style={styles.currentLanguageCard}>
                  <View style={styles.currentLanguageContent}>
                    <Text style={styles.currentLanguageFlag}>
                      {languages.find(lang => lang.code === selectedLanguage)?.flag}
                    </Text>
                    <View style={styles.currentLanguageText}>
                      <Text style={styles.currentLanguageName}>
                        {languages.find(lang => lang.code === selectedLanguage)?.native}
                      </Text>
                      <Text style={styles.currentLanguageSubtitle}>Current language</Text>
                    </View>
                  </View>
                  <BlurView intensity={30} tint="light" style={styles.checkIconContainer}>
                    <FontAwesome5 name="check-circle" size={18} color={theme.colors.success} />
                  </BlurView>
                </View>
              </BlurView>
            </View>

            {/* Available Languages */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Available Languages</Text>
              <BlurView intensity={80} tint="light" style={styles.sectionCardBlur}>
                <View style={styles.sectionCard}>
                  {languages.map((language, index) => (
                    <TouchableOpacity
                      key={language.code}
                      style={[
                        styles.languageItem,
                        index === languages.length - 1 && styles.lastItem
                      ]}
                      onPress={() => handleLanguageSelect(language.code)}
                    >
                      <View style={styles.languageContent}>
                        <Text style={styles.languageFlag}>{language.flag}</Text>
                        <View style={styles.languageText}>
                          <Text style={styles.languageName}>{language.native}</Text>
                          <Text style={styles.languageEnglishName}>{language.name}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.languageActions}>
                        {selectedLanguage === language.code ? (
                          <BlurView intensity={30} tint="light" style={styles.selectedIconContainer}>
                            <FontAwesome5 name="check-circle" size={18} color={theme.colors.success} />
                          </BlurView>
                        ) : (
                          <View style={styles.actionButtons}>
                            <TouchableOpacity
                              style={styles.downloadButtonContainer}
                              onPress={() => downloadLanguagePack(language.code)}
                            >
                              <BlurView intensity={30} tint="light" style={styles.downloadButton}>
                                <FontAwesome5 name="download" size={14} color={theme.colors.primary} />
                              </BlurView>
                            </TouchableOpacity>
                            <BlurView intensity={30} tint="light" style={styles.unselectedIconContainer}>
                              <FontAwesome5 name="circle" size={18} color={theme.colors.onSurfaceVariant} />
                            </BlurView>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </BlurView>
            </View>

            {/* Region Settings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Region & Format</Text>
              <Text style={styles.sectionDescription}>
                Choose your region to set date, time, and number formats
              </Text>
              <BlurView intensity={80} tint="light" style={styles.sectionCardBlur}>
                <View style={styles.sectionCard}>
                  {regions.map((region, index) => (
                    <TouchableOpacity
                      key={region.code}
                      style={[
                        styles.regionItem,
                        index === regions.length - 1 && styles.lastItem
                      ]}
                      onPress={() => handleRegionSelect(region.code)}
                    >
                      <View style={styles.regionContent}>
                        <Text style={styles.regionName}>{region.name}</Text>
                        <Text style={styles.regionNative}>{region.native}</Text>
                      </View>
                      
                      {selectedRegion === region.code ? (
                        <BlurView intensity={30} tint="light" style={styles.selectedIconContainer}>
                          <FontAwesome5 name="check-circle" size={18} color={theme.colors.success} />
                        </BlurView>
                      ) : (
                        <BlurView intensity={30} tint="light" style={styles.unselectedIconContainer}>
                          <FontAwesome5 name="circle" size={18} color={theme.colors.onSurfaceVariant} />
                        </BlurView>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </BlurView>
            </View>

            {/* Language Features */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Language Features</Text>
              <BlurView intensity={80} tint="light" style={styles.featuresCardBlur}>
                <View style={styles.featuresCard}>
                  <View style={styles.featureItem}>
                    <BlurView intensity={30} tint="light" style={styles.featureIconContainer}>
                      <FontAwesome5 name="microphone" size={16} color={theme.colors.primary} />
                    </BlurView>
                    <Text style={styles.featureText}>Voice input in your language</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <BlurView intensity={30} tint="light" style={styles.featureIconContainer}>
                      <FontAwesome5 name="font" size={16} color={theme.colors.primary} />
                    </BlurView>
                    <Text style={styles.featureText}>Native text rendering</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <BlurView intensity={30} tint="light" style={styles.featureIconContainer}>
                      <FontAwesome5 name="globe" size={16} color={theme.colors.primary} />
                    </BlurView>
                    <Text style={styles.featureText}>Localized content</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <BlurView intensity={30} tint="light" style={styles.featureIconContainer}>
                      <FontAwesome5 name="calendar-alt" size={16} color={theme.colors.primary} />
                    </BlurView>
                    <Text style={styles.featureText}>Regional date formats</Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {/* Help Section */}
            <BlurView intensity={80} tint="light" style={styles.helpCardBlur}>
              <View style={styles.helpCard}>
                <View style={styles.helpHeader}>
                  <BlurView intensity={30} tint="light" style={styles.helpIconContainer}>
                    <FontAwesome5 name="question-circle" size={18} color={theme.colors.primary} />
                  </BlurView>
                  <Text style={styles.helpTitle}>Need Help?</Text>
                </View>
                <Text style={styles.helpText}>
                  If your language is not available or you notice translation issues, 
                  please contact our support team. We are continuously working to add more languages.
                </Text>
                <TouchableOpacity 
                  style={styles.helpButtonContainer}
                  onPress={() => Alert.alert('Contact Support', 'Email: language-support@citizenapp.com')}
                >
                  <BlurView intensity={60} tint="light" style={styles.helpButton}>
                    <Text style={styles.helpButtonText}>Request New Language</Text>
                  </BlurView>
                </TouchableOpacity>
              </View>
            </BlurView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerBlur: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primary + '10',
    backgroundColor: theme.colors.surface + '40',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  backButtonContainer: {
    borderRadius: theme.spacing.lg,
    overflow: 'hidden',
  },
  backButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  headerTitle: {
    fontSize: theme.typography.titleLarge.fontSize,
    fontWeight: theme.typography.titleLarge.fontWeight,
    color: theme.colors.onSurface,
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 42,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.titleMedium.fontSize,
    fontWeight: theme.typography.titleMedium.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.md,
    marginLeft: theme.spacing.sm,
  },
  sectionDescription: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.md,
    marginLeft: theme.spacing.sm,
    lineHeight: theme.typography.bodySmall.fontSize * 1.4,
  },
  sectionCardBlur: {
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primary + '10',
    backgroundColor: theme.colors.surface + '40',
  },
  sectionCard: {
    paddingVertical: theme.spacing.xs,
  },
  currentLanguageCardBlur: {
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '50',
  },
  currentLanguageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  currentLanguageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currentLanguageFlag: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  currentLanguageText: {
    flex: 1,
  },
  currentLanguageName: {
    fontSize: theme.typography.titleMedium.fontSize,
    fontWeight: theme.typography.titleMedium.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
  },
  currentLanguageSubtitle: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.primary,
    fontWeight: theme.typography.labelMedium.fontWeight,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline + '20',
    minHeight: 64,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageFlag: {
    fontSize: 20,
    marginRight: theme.spacing.md,
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    fontSize: theme.typography.bodyLarge.fontSize,
    fontWeight: theme.typography.labelLarge.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
  },
  languageEnglishName: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.onSurfaceVariant,
    lineHeight: theme.typography.bodySmall.fontSize * 1.4,
  },
  languageActions: {
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  downloadButtonContainer: {
    borderRadius: theme.spacing.sm,
    overflow: 'hidden',
  },
  downloadButton: {
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  checkIconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.success + '30',
    backgroundColor: theme.colors.surface + '60',
  },
  selectedIconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.success + '30',
    backgroundColor: theme.colors.surface + '60',
  },
  unselectedIconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.outline + '20',
    backgroundColor: theme.colors.surface + '40',
  },
  regionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline + '20',
    minHeight: 64,
  },
  regionContent: {
    flex: 1,
  },
  regionName: {
    fontSize: theme.typography.bodyLarge.fontSize,
    fontWeight: theme.typography.labelLarge.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
  },
  regionNative: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.onSurfaceVariant,
    lineHeight: theme.typography.bodySmall.fontSize * 1.4,
  },
  featuresCardBlur: {
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primary + '08',
    backgroundColor: theme.colors.surface + '30',
  },
  featuresCard: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  featureIconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  featureText: {
    fontSize: theme.typography.bodyMedium.fontSize,
    color: theme.colors.onSurface,
    flex: 1,
  },
  helpCardBlur: {
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primary + '08',
    backgroundColor: theme.colors.surface + '30',
  },
  helpCard: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  helpIconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '15',
    backgroundColor: theme.colors.surface + '50',
  },
  helpTitle: {
    fontSize: theme.typography.titleMedium.fontSize,
    fontWeight: theme.typography.titleMedium.fontWeight,
    color: theme.colors.onSurface,
  },
  helpText: {
    fontSize: theme.typography.bodyMedium.fontSize,
    color: theme.colors.onSurfaceVariant,
    lineHeight: theme.typography.bodyMedium.fontSize * 1.5,
    marginBottom: theme.spacing.lg,
  },
  helpButtonContainer: {
    borderRadius: theme.spacing.lg,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  helpButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '50',
  },
  helpButtonText: {
    fontSize: theme.typography.labelMedium.fontSize,
    fontWeight: theme.typography.labelMedium.fontWeight,
    color: theme.colors.primary,
  },
});

export default LanguageSettings;


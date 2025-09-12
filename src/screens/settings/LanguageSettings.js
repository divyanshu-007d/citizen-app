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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Current Language */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interface Language</Text>
          <Card style={styles.currentLanguageCard}>
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
            <FontAwesome5 name="check-circle" size={20} color={theme.colors.success} />
          </Card>
        </View>

        {/* Available Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Languages</Text>
          <Card style={styles.sectionCard}>
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
                    <FontAwesome5 name="check-circle" size={20} color={theme.colors.success} />
                  ) : (
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={styles.downloadButton}
                        onPress={() => downloadLanguagePack(language.code)}
                      >
                        <FontAwesome5 name="download" size={14} color={theme.colors.primary40} />
                      </TouchableOpacity>
                      <FontAwesome5 name="circle" size={20} color={theme.colors.neutral40} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Region Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Region & Format</Text>
          <Text style={styles.sectionDescription}>
            Choose your region to set date, time, and number formats
          </Text>
          <Card style={styles.sectionCard}>
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
                  <FontAwesome5 name="check-circle" size={20} color={theme.colors.success} />
                ) : (
                  <FontAwesome5 name="circle" size={20} color={theme.colors.neutral40} />
                )}
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Language Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language Features</Text>
          <Card style={styles.featuresCard}>
            <View style={styles.featureItem}>
              <FontAwesome5 name="microphone" size={16} color={theme.colors.primary40} />
              <Text style={styles.featureText}>Voice input in your language</Text>
            </View>
            <View style={styles.featureItem}>
              <FontAwesome5 name="font" size={16} color={theme.colors.primary40} />
              <Text style={styles.featureText}>Native text rendering</Text>
            </View>
            <View style={styles.featureItem}>
              <FontAwesome5 name="globe" size={16} color={theme.colors.primary40} />
              <Text style={styles.featureText}>Localized content</Text>
            </View>
            <View style={styles.featureItem}>
              <FontAwesome5 name="calendar-alt" size={16} color={theme.colors.primary40} />
              <Text style={styles.featureText}>Regional date formats</Text>
            </View>
          </Card>
        </View>

        {/* Help Section */}
        <Card style={styles.helpCard}>
          <View style={styles.helpHeader}>
            <FontAwesome5 name="question-circle" size={20} color={theme.colors.primary40} />
            <Text style={styles.helpTitle}>Need Help?</Text>
          </View>
          <Text style={styles.helpText}>
            If your language is not available or you notice translation issues, 
            please contact our support team. We are continuously working to add more languages.
          </Text>
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('Contact Support', 'Email: language-support@citizenapp.com')}
          >
            <Text style={styles.helpButtonText}>Request New Language</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.titleLarge,
    color: theme.colors.text,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  sectionDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  sectionCard: {
    paddingVertical: 0,
  },
  currentLanguageCard: {
    backgroundColor: theme.colors.primary40 + '10',
    borderWidth: 1,
    borderColor: theme.colors.primary40 + '30',
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
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
  },
  currentLanguageSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    marginTop: theme.spacing.xxs,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
  },
  languageEnglishName: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xxs,
  },
  languageActions: {
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButton: {
    marginRight: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
  regionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  regionContent: {
    flex: 1,
  },
  regionName: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
  },
  regionNative: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xxs,
  },
  featuresCard: {
    backgroundColor: theme.colors.primary40 + '05',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  helpCard: {
    backgroundColor: theme.colors.neutral10 + '50',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  helpTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  helpText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  helpButton: {
    backgroundColor: theme.colors.primary40 + '20',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.small,
    alignSelf: 'flex-start',
  },
  helpButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    fontWeight: '600',
  },
});

export default LanguageSettings;


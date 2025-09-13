// src/screens/settings/SettingsScreen.js
import React from 'react';
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

const SettingsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile Settings',
          subtitle: 'Edit personal information',
          icon: 'user-edit',
          screen: 'EditProfile'
        },
        {
          id: 'security',
          title: 'Security',
          subtitle: 'Password and biometric settings',
          icon: 'shield-alt',
          screen: 'SecuritySettings'
        },
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Notifications',
          subtitle: 'Manage alert preferences',
          icon: 'bell',
          screen: 'NotificationSettings'
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'Change interface language',
          icon: 'language',
          screen: 'LanguageSettings'
        },
        {
          id: 'privacy',
          title: 'Privacy',
          subtitle: 'Control data sharing',
          icon: 'user-shield',
          screen: 'PrivacySettings'
        },
        {
          id: 'location',
          title: 'Location Services',
          subtitle: 'Manage GPS preferences',
          icon: 'map-marker-alt',
          action: 'location'
        },
      ]
    },
    {
      title: 'Data & Storage',
      items: [
        {
          id: 'data-usage',
          title: 'Data Usage',
          subtitle: 'Offline/online preferences',
          icon: 'database',
          action: 'data'
        },
        {
          id: 'cache',
          title: 'Clear Cache',
          subtitle: 'Free up storage space',
          icon: 'broom',
          action: 'cache'
        },
        {
          id: 'export',
          title: 'Export Data',
          subtitle: 'Download your personal data',
          icon: 'download',
          action: 'export'
        },
      ]
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & FAQ',
          subtitle: 'Get help and support',
          icon: 'question-circle',
          action: 'help'
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          subtitle: 'Help us improve the app',
          icon: 'comment-alt',
          action: 'feedback'
        },
        {
          id: 'about',
          title: 'About',
          subtitle: 'App version and legal info',
          icon: 'info-circle',
          action: 'about'
        },
      ]
    },
    {
      title: 'Account Management',
      items: [
        {
          id: 'delete',
          title: 'Delete Account',
          subtitle: 'Permanently delete your account',
          icon: 'trash-alt',
          action: 'delete',
          danger: true
        },
      ]
    }
  ];

  const handleItemPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else if (item.action) {
      handleAction(item.action);
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case 'location':
        Alert.alert('Location Services', 'Manage your location sharing preferences and GPS settings.');
        break;
      case 'data':
        Alert.alert('Data Usage', 'Configure offline mode and data usage preferences.');
        break;
      case 'cache':
        Alert.alert(
          'Clear Cache',
          'This will clear temporary files and free up storage space. Continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', onPress: () => Alert.alert('Success', 'Cache cleared successfully') }
          ]
        );
        break;
      case 'export':
        Alert.alert('Export Data', 'Your data export will be prepared and sent to your email address.');
        break;
      case 'help':
        Alert.alert('Help & Support', 'Contact us at support@citizenapp.com or call 1800-123-456');
        break;
      case 'feedback':
        Alert.alert('Send Feedback', 'Thank you for helping us improve! Please email your feedback to feedback@citizenapp.com');
        break;
      case 'about':
        Alert.alert('About Citizen App', 'Version 1.0.0\nDeveloped for better civic engagement\n\n© 2024 Citizen App Team');
        break;
      case 'delete':
        Alert.alert(
          'Delete Account',
          'This action cannot be undone. All your data will be permanently deleted.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Delete', 
              style: 'destructive', 
              onPress: () => Alert.alert('Account Deleted', 'Your account has been scheduled for deletion.')
            }
          ]
        );
        break;
    }
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
              <Text style={styles.headerTitle}>Settings</Text>
              <View style={styles.placeholder} />
            </View>
          </BlurView>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {settingsSections.map((section, sectionIndex) => (
              <View key={section.title} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <BlurView intensity={80} tint="light" style={styles.sectionCardBlur}>
                  <View style={styles.sectionCard}>
                    {section.items.map((item, itemIndex) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.settingsItem,
                          itemIndex === section.items.length - 1 && styles.lastItem
                        ]}
                        onPress={() => handleItemPress(item)}
                      >
                        <View style={styles.itemLeft}>
                          <BlurView intensity={30} tint="light" style={[
                            styles.itemIcon,
                            item.danger && styles.dangerIcon
                          ]}>
                            <FontAwesome5 
                              name={item.icon} 
                              size={18} 
                              color={item.danger ? theme.colors.error : theme.colors.primary} 
                            />
                          </BlurView>
                          <View style={styles.itemContent}>
                            <Text style={[
                              styles.itemTitle,
                              item.danger && styles.dangerText
                            ]}>
                              {item.title}
                            </Text>
                            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                          </View>
                        </View>
                        <FontAwesome5 
                          name="chevron-right" 
                          size={14} 
                          color={theme.colors.onSurfaceVariant} 
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </BlurView>
              </View>
            ))}

            {/* App Version */}
            <BlurView intensity={60} tint="light" style={styles.versionSectionBlur}>
              <View style={styles.versionSection}>
                <FontAwesome5 name="mobile-alt" size={24} color={theme.colors.primary} />
                <Text style={styles.versionText}>Janta App v1.2.0</Text>
                <Text style={styles.buildText}>Build 2024.09.13 • Made with ❤️ for India</Text>
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
  // Glassmorphism Header
  headerBlur: {
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary + '10',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface + '80',
  },
  backButtonContainer: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant + '60',
  },
  headerTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    fontWeight: '700',
  },
  placeholder: {
    width: 36,
  },
  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  // Section Styling
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  sectionCardBlur: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  sectionCard: {
    backgroundColor: theme.colors.surface + '80',
    paddingVertical: 0,
  },
  // Settings Items
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline + '20',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  dangerIcon: {
    backgroundColor: theme.colors.error + '10',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  dangerText: {
    color: theme.colors.error,
  },
  itemSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  // Version Section
  versionSectionBlur: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  versionSection: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface + '60',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  versionText: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
  },
  buildText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default SettingsScreen;


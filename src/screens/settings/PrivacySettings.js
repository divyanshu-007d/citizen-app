// src/screens/settings/PrivacySettings.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Alert,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../design-system';
import Card from '../../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const PrivacySettings = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [settings, setSettings] = useState({
    // Location Privacy
    shareLocation: true,
    preciseLocation: false,
    locationHistory: false,
    
    // Profile Visibility
    profileVisibility: 'friends', // public, friends, private
    showRealName: false,
    showContactInfo: false,
    
    // Activity Privacy
    showComplaintHistory: true,
    showVotingActivity: false,
    showBadges: true,
    
    // Data Sharing
    analyticsSharing: true,
    governmentDataSharing: true,
    thirdPartySharing: false,
    
    // Communication
    allowMessages: true,
    allowFriendRequests: true,
    showOnlineStatus: false,
  });

  const toggleSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const showProfileVisibilityOptions = () => {
    Alert.alert(
      'Profile Visibility',
      'Who can see your profile information?',
      [
        { text: 'Public', onPress: () => toggleSetting('profileVisibility', 'public') },
        { text: 'Friends Only', onPress: () => toggleSetting('profileVisibility', 'friends') },
        { text: 'Private', onPress: () => toggleSetting('profileVisibility', 'private') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showDataExport = () => {
    Alert.alert(
      'Export Personal Data',
      'We will prepare a copy of all your data and send it to your email address within 30 days.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Request Export', onPress: () => Alert.alert('Success', 'Data export requested. You will receive an email confirmation.') }
      ]
    );
  };

  const showDataDeletion = () => {
    Alert.alert(
      'Delete Personal Data',
      'This will permanently delete all your personal data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Confirmation Required', 'Please contact support to proceed with data deletion for security reasons.')
        }
      ]
    );
  };

  const privacySections = [
    {
      title: 'Location Privacy',
      items: [
        {
          key: 'shareLocation',
          title: 'Share Location with Complaints',
          subtitle: 'Include your location in complaint reports',
          type: 'switch'
        },
        {
          key: 'preciseLocation',
          title: 'Share Precise Location',
          subtitle: 'Use exact GPS coordinates instead of general area',
          type: 'switch',
          disabled: !settings.shareLocation
        },
        {
          key: 'locationHistory',
          title: 'Store Location History',
          subtitle: 'Keep track of your location for better recommendations',
          type: 'switch'
        }
      ]
    },
    {
      title: 'Profile Visibility',
      items: [
        {
          key: 'profileVisibility',
          title: 'Profile Visibility',
          subtitle: `Currently: ${settings.profileVisibility.charAt(0).toUpperCase() + settings.profileVisibility.slice(1)}`,
          type: 'select',
          action: showProfileVisibilityOptions
        },
        {
          key: 'showRealName',
          title: 'Show Real Name',
          subtitle: 'Display your real name instead of username',
          type: 'switch'
        },
        {
          key: 'showContactInfo',
          title: 'Show Contact Information',
          subtitle: 'Allow others to see your phone/email',
          type: 'switch'
        }
      ]
    },
    {
      title: 'Activity Privacy',
      items: [
        {
          key: 'showComplaintHistory',
          title: 'Show Complaint History',
          subtitle: 'Others can see complaints you have filed',
          type: 'switch'
        },
        {
          key: 'showVotingActivity',
          title: 'Show Voting Activity',
          subtitle: 'Others can see which complaints you upvoted',
          type: 'switch'
        },
        {
          key: 'showBadges',
          title: 'Show Badges & Achievements',
          subtitle: 'Display your civic engagement badges',
          type: 'switch'
        }
      ]
    },
    {
      title: 'Data Sharing',
      items: [
        {
          key: 'analyticsSharing',
          title: 'Share Analytics Data',
          subtitle: 'Help improve the app with usage analytics',
          type: 'switch'
        },
        {
          key: 'governmentDataSharing',
          title: 'Share with Government',
          subtitle: 'Allow sharing aggregated data with authorities',
          type: 'switch'
        },
        {
          key: 'thirdPartySharing',
          title: 'Third-party Data Sharing',
          subtitle: 'Share data with partner organizations',
          type: 'switch'
        }
      ]
    },
    {
      title: 'Communication',
      items: [
        {
          key: 'allowMessages',
          title: 'Allow Direct Messages',
          subtitle: 'Other users can send you messages',
          type: 'switch'
        },
        {
          key: 'allowFriendRequests',
          title: 'Allow Friend Requests',
          subtitle: 'Others can send you friend requests',
          type: 'switch'
        },
        {
          key: 'showOnlineStatus',
          title: 'Show Online Status',
          subtitle: 'Others can see when you are online',
          type: 'switch'
        }
      ]
    }
  ];

  const renderSettingItem = (item) => {
    const isDisabled = item.disabled;
    
    return (
      <TouchableOpacity
        key={item.key}
        style={[styles.settingItem, isDisabled && styles.disabledItem]}
        onPress={item.action || (() => {})}
        disabled={isDisabled}
      >
        <View style={styles.itemContent}>
          <Text style={[styles.itemTitle, isDisabled && styles.disabledText]}>
            {item.title}
          </Text>
          <Text style={[styles.itemSubtitle, isDisabled && styles.disabledText]}>
            {item.subtitle}
          </Text>
        </View>
        
        {item.type === 'switch' && (
          <Switch
            value={settings[item.key]}
            onValueChange={(value) => toggleSetting(item.key, value)}
            thumbColor={settings[item.key] ? theme.colors.primary : theme.colors.surface}
            trackColor={{ 
              false: theme.colors.surfaceVariant, 
              true: theme.colors.primary + '40' 
            }}
            disabled={isDisabled}
          />
        )}
        
        {item.type === 'select' && (
          <TouchableOpacity 
            onPress={item.action}
            style={styles.actionButtonContainer}
          >
            <BlurView intensity={30} tint="light" style={styles.actionButton}>
              <FontAwesome5 
                name="chevron-right" 
                size={14} 
                color={theme.colors.primary} 
              />
            </BlurView>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
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
              <Text style={styles.headerTitle}>Privacy Settings</Text>
              <View style={styles.placeholder} />
            </View>
          </BlurView>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {privacySections.map((section, index) => (
              <View key={section.title} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <BlurView intensity={80} tint="light" style={styles.sectionCardBlur}>
                  <View style={styles.sectionCard}>
                    {section.items.map((item, itemIndex) => (
                      <View key={item.key}>
                        {renderSettingItem(item)}
                        {itemIndex < section.items.length - 1 && <View style={styles.separator} />}
                      </View>
                    ))}
                  </View>
                </BlurView>
              </View>
            ))}

            {/* Data Management Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Data Management</Text>
              <BlurView intensity={80} tint="light" style={styles.sectionCardBlur}>
                <View style={styles.sectionCard}>
                  <TouchableOpacity style={styles.settingItem} onPress={showDataExport}>
                    <View style={styles.itemLeft}>
                      <BlurView intensity={30} tint="light" style={styles.actionIcon}>
                        <FontAwesome5 name="download" size={16} color={theme.colors.primary} />
                      </BlurView>
                      <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>Export My Data</Text>
                        <Text style={styles.itemSubtitle}>Download a copy of all your personal data</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  
                  <View style={styles.separator} />
                  
                  <TouchableOpacity style={styles.settingItem} onPress={showDataDeletion}>
                    <View style={styles.itemLeft}>
                      <BlurView intensity={30} tint="light" style={[styles.actionIcon, styles.dangerIcon]}>
                        <FontAwesome5 name="trash-alt" size={16} color={theme.colors.error} />
                      </BlurView>
                      <View style={styles.itemContent}>
                        <Text style={[styles.itemTitle, styles.dangerText]}>Delete My Data</Text>
                        <Text style={styles.itemSubtitle}>Permanently delete all personal data</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>

            {/* Privacy Policy Link */}
            <TouchableOpacity 
              style={styles.policyButtonContainer}
              onPress={() => Alert.alert(
                'Privacy Policy', 
                'View full privacy policy at: https://citizenapp.com/privacy\n\nWould you like to open this link in your browser?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Open Browser', onPress: () => Linking.openURL('https://citizenapp.com/privacy') }
                ]
              )}
            >
              <BlurView intensity={60} tint="light" style={styles.policyButton}>
                <FontAwesome5 name="shield-alt" size={18} color={theme.colors.primary} />
                <Text style={styles.policyButtonText}>Read Privacy Policy</Text>
                <FontAwesome5 name="external-link-alt" size={14} color={theme.colors.primary} />
              </BlurView>
            </TouchableOpacity>

            {/* Info Section */}
            <BlurView intensity={80} tint="light" style={styles.infoCardBlur}>
              <View style={styles.infoCard}>
                <View style={styles.infoHeader}>
                  <BlurView intensity={30} tint="light" style={styles.infoIconContainer}>
                    <FontAwesome5 name="info-circle" size={18} color={theme.colors.primary} />
                  </BlurView>
                  <Text style={styles.infoTitle}>Your Privacy Matters</Text>
                </View>
                <Text style={styles.infoText}>
                  We are committed to protecting your privacy and giving you control over your personal information. 
                  These settings help you customize how your data is used and shared.
                </Text>
                <Text style={styles.infoText}>
                  Some settings may affect app functionality. For example, disabling location sharing may limit 
                  your ability to report location-based complaints effectively.
                </Text>
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    minHeight: 64,
  },
  disabledItem: {
    opacity: 0.5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  dangerIcon: {
    borderColor: theme.colors.error + '20',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: theme.typography.bodyLarge.fontSize,
    fontWeight: theme.typography.labelLarge.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
  },
  itemSubtitle: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.onSurfaceVariant,
    lineHeight: theme.typography.bodySmall.fontSize * 1.4,
  },
  disabledText: {
    opacity: 0.5,
  },
  dangerText: {
    color: theme.colors.error,
  },
  switchContainer: {
    borderRadius: theme.spacing.lg,
    overflow: 'hidden',
  },
  switchBlur: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.primary + '15',
    backgroundColor: theme.colors.surface + '50',
  },
  actionButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.outline + '20',
    marginHorizontal: theme.spacing.lg,
  },
  policyButtonContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
  },
  policyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '50',
    gap: theme.spacing.sm,
  },
  policyButtonText: {
    fontSize: theme.typography.labelLarge.fontSize,
    fontWeight: theme.typography.labelLarge.fontWeight,
    color: theme.colors.primary,
    marginHorizontal: theme.spacing.sm,
  },
  infoCardBlur: {
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primary + '08',
    backgroundColor: theme.colors.surface + '30',
  },
  infoCard: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  infoIconContainer: {
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
  infoTitle: {
    fontSize: theme.typography.titleMedium.fontSize,
    fontWeight: theme.typography.titleMedium.fontWeight,
    color: theme.colors.onSurface,
  },
  infoText: {
    fontSize: theme.typography.bodyMedium.fontSize,
    color: theme.colors.onSurfaceVariant,
    lineHeight: theme.typography.bodyMedium.fontSize * 1.5,
    marginBottom: theme.spacing.md,
  },
});

export default PrivacySettings;


// src/screens/settings/PrivacySettings.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
            thumbColor={theme.colors.primary40}
            trackColor={{ 
              false: theme.colors.neutral20, 
              true: theme.colors.primary40 + '40' 
            }}
            disabled={isDisabled}
          />
        )}
        
        {item.type === 'select' && (
          <TouchableOpacity 
            onPress={item.action}
            style={styles.actionButton}
          >
            <FontAwesome5 
              name="chevron-right" 
              size={16} 
              color={theme.colors.text} 
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {privacySections.map((section, index) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View key={item.key}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <Card style={styles.sectionCard}>
            <TouchableOpacity style={styles.settingItem} onPress={showDataExport}>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>Export My Data</Text>
                <Text style={styles.itemSubtitle}>Download a copy of all your personal data</Text>
              </View>
              <FontAwesome5 name="download" size={16} color={theme.colors.primary40} />
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <TouchableOpacity style={styles.settingItem} onPress={showDataDeletion}>
              <View style={styles.itemContent}>
                <Text style={[styles.itemTitle, styles.dangerText]}>Delete My Data</Text>
                <Text style={styles.itemSubtitle}>Permanently delete all personal data</Text>
              </View>
              <FontAwesome5 name="trash-alt" size={16} color={theme.colors.error} />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Privacy Policy Link */}
        <TouchableOpacity 
          style={styles.policyButton}
          onPress={() => Alert.alert('Privacy Policy', 'View full privacy policy at: https://citizenapp.com/privacy')}
        >
          <FontAwesome5 name="shield-alt" size={16} color={theme.colors.primary40} />
          <Text style={styles.policyButtonText}>Read Privacy Policy</Text>
          <FontAwesome5 name="external-link-alt" size={12} color={theme.colors.primary40} />
        </TouchableOpacity>

        {/* Info Section */}
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <FontAwesome5 name="info-circle" size={20} color={theme.colors.primary40} />
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
  sectionCard: {
    paddingVertical: 0,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  disabledItem: {
    opacity: 0.5,
  },
  itemContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  itemTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xxs,
  },
  itemSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
  },
  disabledText: {
    opacity: 0.5,
  },
  dangerText: {
    color: theme.colors.error,
  },
  actionButton: {
    padding: theme.spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  },
  policyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary40 + '20',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.lg,
  },
  policyButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary40,
    fontWeight: '600',
    marginHorizontal: theme.spacing.sm,
  },
  infoCard: {
    backgroundColor: theme.colors.primary40 + '05',
    borderWidth: 1,
    borderColor: theme.colors.primary40 + '20',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  infoTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.primary40,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
});

export default PrivacySettings;


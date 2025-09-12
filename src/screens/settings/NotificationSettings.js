// src/screens/settings/NotificationSettings.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { useTheme } from '../../design-system';
import Card from '../../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const NotificationSettings = ({ navigation }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [settings, setSettings] = useState({
    // Push Notifications
    pushNotifications: true,
    complaintUpdates: true,
    communityMessages: true,
    governmentAnnouncements: true,
    nearbyIncidents: true,
    
    // Email Notifications
    emailNotifications: false,
    weeklyDigest: true,
    monthlyReport: false,
    
    // Sound & Vibration
    soundEnabled: true,
    vibrationEnabled: true,
    
    // Quiet Hours
    quietHoursEnabled: false,
    quietStart: '22:00',
    quietEnd: '08:00',
    
    // Priority Filters
    emergencyOnly: false,
    priorityFilter: 'all', // all, high, critical
  });

  const toggleSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const showTimeSelector = (type) => {
    Alert.alert('Time Selection', `Select ${type} time for quiet hours (feature coming soon)`);
  };

  const notificationSections = [
    {
      title: 'Push Notifications',
      items: [
        {
          key: 'pushNotifications',
          title: 'Enable Push Notifications',
          subtitle: 'Receive notifications on your device',
          type: 'switch'
        },
        {
          key: 'complaintUpdates',
          title: 'Complaint Updates',
          subtitle: 'Status changes on your complaints',
          type: 'switch',
          disabled: !settings.pushNotifications
        },
        {
          key: 'communityMessages',
          title: 'Community Messages',
          subtitle: 'Comments and replies on complaints',
          type: 'switch',
          disabled: !settings.pushNotifications
        },
        {
          key: 'governmentAnnouncements',
          title: 'Government Announcements',
          subtitle: 'Official updates and announcements',
          type: 'switch',
          disabled: !settings.pushNotifications
        },
        {
          key: 'nearbyIncidents',
          title: 'Nearby Incidents',
          subtitle: 'New complaints in your area',
          type: 'switch',
          disabled: !settings.pushNotifications
        }
      ]
    },
    {
      title: 'Email Notifications',
      items: [
        {
          key: 'emailNotifications',
          title: 'Enable Email Notifications',
          subtitle: 'Receive notifications via email',
          type: 'switch'
        },
        {
          key: 'weeklyDigest',
          title: 'Weekly Digest',
          subtitle: 'Summary of community activity',
          type: 'switch',
          disabled: !settings.emailNotifications
        },
        {
          key: 'monthlyReport',
          title: 'Monthly Report',
          subtitle: 'Detailed statistics and progress',
          type: 'switch',
          disabled: !settings.emailNotifications
        }
      ]
    },
    {
      title: 'Sound & Vibration',
      items: [
        {
          key: 'soundEnabled',
          title: 'Notification Sound',
          subtitle: 'Play sound for notifications',
          type: 'switch'
        },
        {
          key: 'vibrationEnabled',
          title: 'Vibration',
          subtitle: 'Vibrate for notifications',
          type: 'switch'
        }
      ]
    },
    {
      title: 'Quiet Hours',
      items: [
        {
          key: 'quietHoursEnabled',
          title: 'Enable Quiet Hours',
          subtitle: 'Reduce notifications during specified hours',
          type: 'switch'
        },
        {
          key: 'quietStart',
          title: 'Quiet Hours Start',
          subtitle: settings.quietStart,
          type: 'time',
          disabled: !settings.quietHoursEnabled,
          action: () => showTimeSelector('start')
        },
        {
          key: 'quietEnd',
          title: 'Quiet Hours End',
          subtitle: settings.quietEnd,
          type: 'time',
          disabled: !settings.quietHoursEnabled,
          action: () => showTimeSelector('end')
        }
      ]
    },
    {
      title: 'Priority Filters',
      items: [
        {
          key: 'emergencyOnly',
          title: 'Emergency Only',
          subtitle: 'Only receive emergency notifications',
          type: 'switch'
        },
        {
          key: 'priorityFilter',
          title: 'Priority Filter',
          subtitle: `Currently: ${settings.priorityFilter.charAt(0).toUpperCase() + settings.priorityFilter.slice(1)}`,
          type: 'select',
          action: () => showPriorityOptions()
        }
      ]
    }
  ];

  const showPriorityOptions = () => {
    Alert.alert(
      'Priority Filter',
      'Choose notification priority level:',
      [
        { text: 'All Notifications', onPress: () => toggleSetting('priorityFilter', 'all') },
        { text: 'High Priority Only', onPress: () => toggleSetting('priorityFilter', 'high') },
        { text: 'Critical Only', onPress: () => toggleSetting('priorityFilter', 'critical') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

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
        
        {(item.type === 'time' || item.type === 'select') && (
          <TouchableOpacity 
            onPress={item.action}
            disabled={isDisabled}
            style={styles.actionButton}
          >
            <FontAwesome5 
              name="chevron-right" 
              size={16} 
              color={isDisabled ? theme.colors.neutral40 : theme.colors.text} 
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
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notificationSections.map((section, index) => (
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

        {/* Test Notification Button */}
        <TouchableOpacity 
          style={styles.testButton}
          onPress={() => Alert.alert('Test Notification', 'Test notification sent successfully!')}
        >
          <FontAwesome5 name="bell" size={16} color={theme.colors.primary40} />
          <Text style={styles.testButtonText}>Send Test Notification</Text>
        </TouchableOpacity>

        {/* Info Section */}
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <FontAwesome5 name="info-circle" size={20} color={theme.colors.primary40} />
            <Text style={styles.infoTitle}>About Notifications</Text>
          </View>
          <Text style={styles.infoText}>
            Notifications help you stay informed about your complaints and community updates. 
            You can customize which types of notifications you receive and when you receive them.
          </Text>
          <Text style={styles.infoText}>
            Emergency notifications will always be delivered regardless of your settings to 
            ensure important safety information reaches you.
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
  actionButton: {
    padding: theme.spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary40 + '20',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.lg,
  },
  testButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary40,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
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

export default NotificationSettings;
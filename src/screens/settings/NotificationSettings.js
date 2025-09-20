// src/screens/settings/NotificationSettings.js
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
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../design-system';
import Card from '../../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const NotificationSettings = ({ navigation }) => {
  const { theme } = useTheme();
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
          <View style={styles.switchContainer}>
            <BlurView intensity={30} tint="light" style={styles.switchBlur}>
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
            </BlurView>
          </View>
        )}
        
        {(item.type === 'time' || item.type === 'select') && (
          <TouchableOpacity 
            onPress={item.action}
            disabled={isDisabled}
            style={styles.actionButtonContainer}
          >
            <BlurView intensity={30} tint="light" style={styles.actionButton}>
              <FontAwesome5 
                name="chevron-right" 
                size={14} 
                color={isDisabled ? theme.colors.onSurfaceVariant : theme.colors.primary} 
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
              <Text style={styles.headerTitle}>Notification Settings</Text>
              <View style={styles.placeholder} />
            </View>
          </BlurView>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {notificationSections.map((section, index) => (
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

            {/* Test Notification Button */}
            <TouchableOpacity 
              style={styles.testButtonContainer}
              onPress={() => Alert.alert('Test Notification', 'Test notification sent successfully!')}
            >
              <BlurView intensity={60} tint="light" style={styles.testButton}>
                <FontAwesome5 name="bell" size={18} color={theme.colors.primary} />
                <Text style={styles.testButtonText}>Send Test Notification</Text>
              </BlurView>
            </TouchableOpacity>

            {/* Info Section */}
            <BlurView intensity={80} tint="light" style={styles.infoCardBlur}>
              <View style={styles.infoCard}>
                <View style={styles.infoHeader}>
                  <BlurView intensity={30} tint="light" style={styles.infoIconContainer}>
                    <FontAwesome5 name="info-circle" size={18} color={theme.colors.primary} />
                  </BlurView>
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
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    marginRight: theme.spacing.md,
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
  actionButtonContainer: {
    borderRadius: theme.spacing.md,
    overflow: 'hidden',
  },
  actionButton: {
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.outline + '20',
    marginHorizontal: theme.spacing.lg,
  },
  testButtonContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
  },
  testButton: {
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
  testButtonText: {
    fontSize: theme.typography.labelLarge.fontSize,
    fontWeight: theme.typography.labelLarge.fontWeight,
    color: theme.colors.primary,
    marginLeft: theme.spacing.sm,
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

export default NotificationSettings;

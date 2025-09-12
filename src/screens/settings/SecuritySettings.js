// src/screens/settings/SecuritySettings.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Alert,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../design-system';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { FontAwesome5 } from '@expo/vector-icons';

const SecuritySettings = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [settings, setSettings] = useState({
    biometricLogin: true,
    twoFactorAuth: false,
    autoLock: true,
    autoLockTimer: 5, // minutes
    showNotificationContent: false,
    requireAuthForActions: true,
    sessionTimeout: 30, // minutes
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const toggleSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    
    Alert.alert('Success', 'Password changed successfully');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordChange(false);
  };

  const showAutoLockOptions = () => {
    Alert.alert(
      'Auto-lock Timer',
      'Choose when to automatically lock the app:',
      [
        { text: '1 minute', onPress: () => toggleSetting('autoLockTimer', 1) },
        { text: '5 minutes', onPress: () => toggleSetting('autoLockTimer', 5) },
        { text: '15 minutes', onPress: () => toggleSetting('autoLockTimer', 15) },
        { text: '30 minutes', onPress: () => toggleSetting('autoLockTimer', 30) },
        { text: 'Never', onPress: () => toggleSetting('autoLockTimer', 0) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showSessionTimeoutOptions = () => {
    Alert.alert(
      'Session Timeout',
      'Choose session timeout duration:',
      [
        { text: '15 minutes', onPress: () => toggleSetting('sessionTimeout', 15) },
        { text: '30 minutes', onPress: () => toggleSetting('sessionTimeout', 30) },
        { text: '1 hour', onPress: () => toggleSetting('sessionTimeout', 60) },
        { text: '4 hours', onPress: () => toggleSetting('sessionTimeout', 240) },
        { text: '24 hours', onPress: () => toggleSetting('sessionTimeout', 1440) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const setupTwoFactor = () => {
    Alert.alert(
      'Two-Factor Authentication',
      'Choose your preferred 2FA method:',
      [
        { text: 'SMS', onPress: () => Alert.alert('SMS 2FA', 'SMS-based 2FA setup will be implemented') },
        { text: 'Authenticator App', onPress: () => Alert.alert('Authenticator 2FA', 'Authenticator app setup will be implemented') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const viewLoginHistory = () => {
    Alert.alert(
      'Login History',
      'Recent login attempts:\n\n• Today, 2:30 PM - Mobile App (Current)\n• Yesterday, 6:45 PM - Mobile App\n• 3 days ago, 10:15 AM - Web Browser\n\nNo suspicious activity detected.'
    );
  };

  const securitySections = [
    {
      title: 'Authentication',
      items: [
        {
          key: 'biometricLogin',
          title: 'Biometric Login',
          subtitle: 'Use fingerprint or face recognition',
          type: 'switch'
        },
        {
          key: 'twoFactorAuth',
          title: 'Two-Factor Authentication',
          subtitle: 'Add an extra layer of security',
          type: 'switch',
          action: () => settings.twoFactorAuth ? null : setupTwoFactor()
        }
      ]
    },
    {
      title: 'App Security',
      items: [
        {
          key: 'autoLock',
          title: 'Auto-Lock',
          subtitle: 'Automatically lock app when inactive',
          type: 'switch'
        },
        {
          key: 'autoLockTimer',
          title: 'Auto-Lock Timer',
          subtitle: `Lock after ${settings.autoLockTimer === 0 ? 'Never' : settings.autoLockTimer + ' minutes'}`,
          type: 'select',
          disabled: !settings.autoLock,
          action: showAutoLockOptions
        },
        {
          key: 'showNotificationContent',
          title: 'Show Notification Content',
          subtitle: 'Display notification details on lock screen',
          type: 'switch'
        },
        {
          key: 'requireAuthForActions',
          title: 'Require Auth for Actions',
          subtitle: 'Authenticate for sensitive operations',
          type: 'switch'
        }
      ]
    },
    {
      title: 'Session Management',
      items: [
        {
          key: 'sessionTimeout',
          title: 'Session Timeout',
          subtitle: `Automatically logout after ${settings.sessionTimeout < 60 ? settings.sessionTimeout + ' minutes' : (settings.sessionTimeout / 60) + ' hours'}`,
          type: 'select',
          action: showSessionTimeoutOptions
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
        disabled={isDisabled && !item.action}
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
            onValueChange={(value) => {
              toggleSetting(item.key, value);
              if (item.action) item.action();
            }}
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
        <Text style={styles.headerTitle}>Security Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Password</Text>
          <Card style={styles.passwordCard}>
            <TouchableOpacity 
              style={styles.passwordItem}
              onPress={() => setShowPasswordChange(!showPasswordChange)}
            >
              <View style={styles.passwordIcon}>
                <FontAwesome5 name="key" size={16} color={theme.colors.primary40} />
              </View>
              <View style={styles.passwordContent}>
                <Text style={styles.passwordTitle}>Change Password</Text>
                <Text style={styles.passwordSubtitle}>Last changed 30 days ago</Text>
              </View>
              <FontAwesome5 
                name={showPasswordChange ? "chevron-up" : "chevron-down"} 
                size={16} 
                color={theme.colors.text} 
              />
            </TouchableOpacity>
            
            {showPasswordChange && (
              <View style={styles.passwordForm}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Current Password"
                  placeholderTextColor={theme.colors.text + '60'}
                  value={passwordForm.currentPassword}
                  onChangeText={(text) => setPasswordForm(prev => ({ ...prev, currentPassword: text }))}
                  secureTextEntry
                />
                <TextInput
                  style={styles.passwordInput}
                  placeholder="New Password"
                  placeholderTextColor={theme.colors.text + '60'}
                  value={passwordForm.newPassword}
                  onChangeText={(text) => setPasswordForm(prev => ({ ...prev, newPassword: text }))}
                  secureTextEntry
                />
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm New Password"
                  placeholderTextColor={theme.colors.text + '60'}
                  value={passwordForm.confirmPassword}
                  onChangeText={(text) => setPasswordForm(prev => ({ ...prev, confirmPassword: text }))}
                  secureTextEntry
                />
                <View style={styles.passwordButtons}>
                  <Button
                    title="Cancel"
                    variant="outlined"
                    onPress={() => {
                      setShowPasswordChange(false);
                      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    style={styles.passwordButton}
                  />
                  <Button
                    title="Change Password"
                    onPress={handlePasswordChange}
                    style={styles.passwordButton}
                  />
                </View>
              </View>
            )}
          </Card>
        </View>

        {/* Security Settings */}
        {securitySections.map((section, index) => (
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

        {/* Security Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Actions</Text>
          <Card style={styles.sectionCard}>
            <TouchableOpacity style={styles.actionItem} onPress={viewLoginHistory}>
              <View style={styles.actionIcon}>
                <FontAwesome5 name="history" size={16} color={theme.colors.primary40} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Login History</Text>
                <Text style={styles.actionSubtitle}>View recent login attempts</Text>
              </View>
              <FontAwesome5 name="chevron-right" size={16} color={theme.colors.text} />
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => Alert.alert('Logout All Devices', 'This will sign you out of all other devices where you are currently logged in.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout All', onPress: () => Alert.alert('Success', 'Logged out of all other devices') }
              ])}
            >
              <View style={styles.actionIcon}>
                <FontAwesome5 name="sign-out-alt" size={16} color={theme.colors.warning} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Logout All Devices</Text>
                <Text style={styles.actionSubtitle}>Sign out from all other devices</Text>
              </View>
              <FontAwesome5 name="chevron-right" size={16} color={theme.colors.text} />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Security Tips */}
        <Card style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <FontAwesome5 name="shield-alt" size={20} color={theme.colors.success} />
            <Text style={styles.tipsTitle}>Security Tips</Text>
          </View>
          <Text style={styles.tipsText}>
            • Use a strong, unique password with at least 8 characters
          </Text>
          <Text style={styles.tipsText}>
            • Enable two-factor authentication for extra security
          </Text>
          <Text style={styles.tipsText}>
            • Keep your app updated to the latest version
          </Text>
          <Text style={styles.tipsText}>
            • Don't share your login credentials with anyone
          </Text>
          <Text style={styles.tipsText}>
            • Log out when using shared devices
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
  passwordCard: {
    paddingVertical: 0,
  },
  passwordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  passwordIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary40 + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  passwordContent: {
    flex: 1,
  },
  passwordTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
  },
  passwordSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xxs,
  },
  passwordForm: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  passwordInput: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.small,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  passwordButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  passwordButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
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
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary40 + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
  },
  actionSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xxs,
  },
  tipsCard: {
    backgroundColor: theme.colors.success + '05',
    borderWidth: 1,
    borderColor: theme.colors.success + '20',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  tipsTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.success,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  tipsText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: theme.spacing.xs,
  },
});

export default SecuritySettings;


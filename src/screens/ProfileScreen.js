// src/screens/ProfileScreen.js
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
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [user] = useState({
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john.doe@email.com',
    location: 'Bangalore, Karnataka',
    joinDate: 'March 2024',
    points: 950,
    badge: 'Active Citizen',
    level: 2,
    complaints: 15,
    resolved: 12,
    upvotes: 87
  });

  const styles = createStyles(theme);

  const menuItems = [
    { id: 'edit-profile', title: 'Edit Profile', icon: 'user-edit', screen: 'EditProfile' },
    { id: 'achievements', title: 'My Achievements', icon: 'trophy', screen: 'Achievements' },
    { id: 'complaints', title: 'My Complaints', icon: 'file-alt', screen: 'Complaints' },
    { id: 'settings', title: 'Settings', icon: 'cog', screen: 'Settings' },
    { id: 'notifications', title: 'Notifications', icon: 'bell', screen: 'NotificationSettings' },
    { id: 'help', title: 'Help & Support', icon: 'question-circle', action: 'help' },
    { id: 'about', title: 'About App', icon: 'info-circle', action: 'about' },
    { id: 'logout', title: 'Logout', icon: 'sign-out-alt', action: 'logout', danger: true },
  ];

  const handleMenuPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else if (item.action) {
      switch (item.action) {
        case 'help':
          Alert.alert('Help & Support', 'Contact us at support@citizenapp.com or call 1800-123-456');
          break;
        case 'about':
          Alert.alert('About Citizen App', 'Version 1.0.0\nMade with ❤️ for better communities');
          break;
        case 'logout':
          Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Login') }
            ]
          );
          break;
      }
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Pradhan Mantri': return theme.colors.error;
      case 'Mahapaur': return theme.colors.primary40;
      case 'Mukhiya': return theme.colors.warning;
      case 'Active Citizen': return theme.colors.success;
      case 'Citizen': return theme.colors.neutral60;
      default: return theme.colors.neutral60;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <FontAwesome5 name="user" size={32} color={theme.colors.neutral60} />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <FontAwesome5 name="edit" size={16} color={theme.colors.primary40} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userLocation}>{user.location}</Text>
            
            <View style={styles.badgeContainer}>
              <FontAwesome5 
                name="certificate" 
                size={16} 
                color={getBadgeColor(user.badge)} 
              />
              <Text style={[styles.badgeText, { color: getBadgeColor(user.badge) }]}>
                {user.badge}
              </Text>
            </View>

            <Text style={styles.joinDate}>Joined {user.joinDate}</Text>
          </View>
        </Card>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <FontAwesome5 name="star" size={24} color={theme.colors.primary40} />
            <Text style={styles.statNumber}>{user.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </Card>

          <Card style={styles.statCard}>
            <FontAwesome5 name="file-alt" size={24} color={theme.colors.success} />
            <Text style={styles.statNumber}>{user.complaints}</Text>
            <Text style={styles.statLabel}>Reports</Text>
          </Card>

          <Card style={styles.statCard}>
            <FontAwesome5 name="check-circle" size={24} color={theme.colors.warning} />
            <Text style={styles.statNumber}>{user.resolved}</Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </Card>
        </View>

        {/* Menu Items */}
        <Card style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem
              ]}
              onPress={() => handleMenuPress(item)}
            >
              <View style={styles.menuItemLeft}>
                <FontAwesome5 
                  name={item.icon} 
                  size={20} 
                  color={item.danger ? theme.colors.error : theme.colors.text} 
                />
                <Text style={[
                  styles.menuItemText,
                  item.danger && { color: theme.colors.error }
                ]}>
                  {item.title}
                </Text>
              </View>
              <FontAwesome5 
                name="chevron-right" 
                size={16} 
                color={theme.colors.neutral40} 
              />
            </TouchableOpacity>
          ))}
        </Card>

        {/* Quick Actions */}
        <Card style={styles.quickActionsCard}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsRow}>
            <Button
              title="Report Issue"
              variant="filled"
              size="small"
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Report')}
            />
            
            <Button
              title="View Map"
              variant="outlined"
              size="small"
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Map')}
            />
          </View>
        </Card>

        {/* App Version */}
        <Text style={styles.versionText}>
          Citizen App v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  profileHeader: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    ...theme.typography.headlineSmall,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  userLocation: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: theme.spacing.sm,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  badgeText: {
    ...theme.typography.labelLarge,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  joinDate: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.6,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.lg,
  },
  statNumber: {
    ...theme.typography.titleLarge,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
  },
  menuCard: {
    marginBottom: theme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  quickActionsCard: {
    marginBottom: theme.spacing.lg,
  },
  quickActionsTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  quickActionsRow: {
    flexDirection: 'row',
  },
  quickActionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  versionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.5,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
});

export default ProfileScreen;


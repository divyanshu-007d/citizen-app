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
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [user] = useState({
    name: 'Samriddhi Singh',
    phone: '+91 9876543210',
    email: 'samriddhi.singh@email.com',
    location: 'New Delhi, India',
    joinDate: 'March 2024',
    points: 1250,
    badge: 'Active Citizen',
    level: 3,
    complaints: 18,
    resolved: 15,
    upvotes: 142,
    rank: 8,
    achievements: 6
  });

  const styles = createStyles(theme);

  const menuItems = [
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
              <Text style={styles.headerTitle}>Profile</Text>
              <TouchableOpacity style={styles.headerButton}>
                <BlurView intensity={30} tint="light" style={styles.headerButtonBlur}>
                  <FontAwesome5 name="cog" size={18} color={theme.colors.primary} />
                </BlurView>
              </TouchableOpacity>
            </View>
          </BlurView>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Profile Header with Glassmorphism */}
            <BlurView intensity={80} tint="light" style={styles.profileCardBlur}>
              <View style={styles.profileCard}>
                <View style={styles.profileHeader}>
                  <BlurView intensity={40} tint="light" style={styles.avatar}>
                    <FontAwesome5 name="user" size={28} color={theme.colors.primary} />
                  </BlurView>
                  <TouchableOpacity style={styles.editButtonContainer}>
                    <BlurView intensity={50} tint="light" style={styles.editButton}>
                      <FontAwesome5 name="edit" size={14} color={theme.colors.primary} />
                    </BlurView>
                  </TouchableOpacity>
                </View>

                <View style={styles.profileInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <View style={styles.locationContainer}>
                    <FontAwesome5 name="map-marker-alt" size={12} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.userLocation}>{user.location}</Text>
                  </View>
                  
                  <BlurView intensity={30} tint="light" style={styles.badgeContainer}>
                    <FontAwesome5 
                      name="certificate" 
                      size={14} 
                      color={getBadgeColor(user.badge)} 
                    />
                    <Text style={[styles.badgeText, { color: getBadgeColor(user.badge) }]}>
                      {user.badge}
                    </Text>
                  </BlurView>

                  <Text style={styles.joinDate}>Member since {user.joinDate}</Text>
                </View>
              </View>
            </BlurView>

            {/* Stats Grid with Glassmorphism */}
            <View style={styles.statsContainer}>
              <View style={styles.statsRow}>
                <TouchableOpacity style={styles.statCardContainer}>
                  <BlurView intensity={70} tint="light" style={styles.statCard}>
                    <FontAwesome5 name="star" size={20} color={theme.colors.primary} />
                    <Text style={styles.statNumber}>{user.points}</Text>
                    <Text style={styles.statLabel}>Points</Text>
                  </BlurView>
                </TouchableOpacity>

                <TouchableOpacity style={styles.statCardContainer}>
                  <BlurView intensity={70} tint="light" style={styles.statCard}>
                    <FontAwesome5 name="trophy" size={20} color={theme.colors.tertiary} />
                    <Text style={styles.statNumber}>#{user.rank}</Text>
                    <Text style={styles.statLabel}>Rank</Text>
                  </BlurView>
                </TouchableOpacity>
              </View>

              <View style={styles.statsRow}>
                <TouchableOpacity style={styles.statCardContainer}>
                  <BlurView intensity={70} tint="light" style={styles.statCard}>
                    <FontAwesome5 name="file-alt" size={20} color={theme.colors.error} />
                    <Text style={styles.statNumber}>{user.complaints}</Text>
                    <Text style={styles.statLabel}>Reports</Text>
                  </BlurView>
                </TouchableOpacity>

                <TouchableOpacity style={styles.statCardContainer}>
                  <BlurView intensity={70} tint="light" style={styles.statCard}>
                    <FontAwesome5 name="check-circle" size={20} color={theme.colors.secondary} />
                    <Text style={styles.statNumber}>{user.resolved}</Text>
                    <Text style={styles.statLabel}>Resolved</Text>
                  </BlurView>
                </TouchableOpacity>
              </View>
            </View>

            {/* Menu Items with Glassmorphism */}
            <BlurView intensity={80} tint="light" style={styles.menuCardBlur}>
              <View style={styles.menuCard}>
                <Text style={styles.menuCardTitle}>Account & Settings</Text>
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
                      <BlurView intensity={25} tint="light" style={styles.menuIconContainer}>
                        <FontAwesome5 
                          name={item.icon} 
                          size={16} 
                          color={item.danger ? theme.colors.error : theme.colors.primary} 
                        />
                      </BlurView>
                      <Text style={[
                        styles.menuItemText,
                        item.danger && { color: theme.colors.error }
                      ]}>
                        {item.title}
                      </Text>
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

            {/* Quick Actions with Glassmorphism */}
            <BlurView intensity={80} tint="light" style={styles.quickActionsBlur}>
              <View style={styles.quickActionsCard}>
                <Text style={styles.quickActionsTitle}>Quick Actions</Text>
                
                <View style={styles.quickActionsGrid}>
                  <TouchableOpacity 
                    style={styles.quickActionContainer}
                    onPress={() => navigation.navigate('Report')}
                  >
                    <BlurView intensity={40} tint="light" style={styles.quickActionButton}>
                      <FontAwesome5 name="plus-circle" size={24} color={theme.colors.primary} />
                      <Text style={styles.quickActionText}>Report Issue</Text>
                    </BlurView>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.quickActionContainer}
                    onPress={() => navigation.navigate('Map')}
                  >
                    <BlurView intensity={40} tint="light" style={styles.quickActionButton}>
                      <FontAwesome5 name="map" size={24} color={theme.colors.secondary} />
                      <Text style={styles.quickActionText}>View Map</Text>
                    </BlurView>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.quickActionContainer}
                    onPress={() => navigation.navigate('Leaderboard')}
                  >
                    <BlurView intensity={40} tint="light" style={styles.quickActionButton}>
                      <FontAwesome5 name="trophy" size={24} color={theme.colors.tertiary} />
                      <Text style={styles.quickActionText}>Leaderboard</Text>
                    </BlurView>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.quickActionContainer}
                    onPress={() => navigation.navigate('Achievements')}
                  >
                    <BlurView intensity={40} tint="light" style={styles.quickActionButton}>
                      <FontAwesome5 name="medal" size={24} color={theme.colors.error} />
                      <Text style={styles.quickActionText}>Achievements</Text>
                    </BlurView>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>

            {/* App Version */}
            <Text style={styles.versionText}>
              Janta App v1.2.0 • Made with ❤️ for India
            </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface + '80',
  },
  headerTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    fontWeight: '700',
  },
  headerButton: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  headerButtonBlur: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant + '60',
  },
  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  // Profile Card with Glassmorphism
  profileCardBlur: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface + '80',
    padding: theme.spacing.lg,
  },
  profileHeader: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant + '60',
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  editButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface + '90',
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  userLocation: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant + '40',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  badgeText: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
  },
  joinDate: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  // Stats Grid with Glassmorphism
  statsContainer: {
    marginBottom: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.md,
  },
  statCardContainer: {
    flex: 1,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface + '70',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  statNumber: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '700',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  // Menu Card with Glassmorphism
  menuCardBlur: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  menuCard: {
    backgroundColor: theme.colors.surface + '80',
    padding: theme.spacing.lg,
  },
  menuCardTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline + '20',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant + '50',
    marginRight: theme.spacing.md,
  },
  menuItemText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    flex: 1,
  },
  // Quick Actions with Glassmorphism
  quickActionsBlur: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  quickActionsCard: {
    backgroundColor: theme.colors.surface + '80',
    padding: theme.spacing.lg,
  },
  quickActionsTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  quickActionContainer: {
    flex: 1,
    minWidth: '45%',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant + '60',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  quickActionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Version Text
  versionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});

export default ProfileScreen;


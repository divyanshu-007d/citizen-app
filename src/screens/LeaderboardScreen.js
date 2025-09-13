// src/screens/LeaderboardScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image,
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

// Mock leaderboard data
const mockLeaderboardData = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    points: 2850,
    badge: 'Mahapaur',
    level: 4,
    complaints: 45,
    resolved: 38,
    upvotes: 234,
    avatar: null
  },
  {
    id: '2',
    name: 'Priya Sharma',
    points: 2100,
    badge: 'Mukhiya',
    level: 3,
    complaints: 32,
    resolved: 28,
    upvotes: 189,
    avatar: null
  },
  {
    id: '3',
    name: 'Arun Singh',
    points: 1850,
    badge: 'Mukhiya',
    level: 3,
    complaints: 28,
    resolved: 25,
    upvotes: 156,
    avatar: null
  },
  {
    id: '4',
    name: 'Kavya Reddy',
    points: 1650,
    badge: 'Active Citizen',
    level: 2,
    complaints: 24,
    resolved: 20,
    upvotes: 142,
    avatar: null
  },
  {
    id: '5',
    name: 'Mohit Gupta',
    points: 1420,
    badge: 'Active Citizen',
    level: 2,
    complaints: 21,
    resolved: 18,
    upvotes: 128,
    avatar: null
  },
];

const LeaderboardScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('City');
  const [leaderboardData] = useState(mockLeaderboardData);

  const tabs = ['Neighborhood', 'City', 'State'];

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

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'Pradhan Mantri': return 'crown';
      case 'Mahapaur': return 'medal';
      case 'Mukhiya': return 'star';
      case 'Active Citizen': return 'certificate';
      case 'Citizen': return 'user';
      default: return 'user';
    }
  };

  const styles = createStyles(theme);

  const renderLeaderboardItem = ({ item, index }) => (
    <TouchableOpacity style={styles.itemCardContainer}>
      <BlurView intensity={60} tint="light" style={styles.itemCardBlur}>
        <View style={[styles.itemCard, index < 3 && styles.topThreeCard]}>
          <View style={styles.itemContent}>
            <View style={styles.rankSection}>
              <BlurView intensity={30} tint="light" style={[styles.rankBadge, index < 3 && styles.topRankBadge]}>
                <Text style={[styles.rankText, index < 3 && styles.topRankText]}>
                  {index + 1}
                </Text>
              </BlurView>
              {index < 3 && (
                <FontAwesome5 
                  name={index === 0 ? 'trophy' : index === 1 ? 'medal' : 'award'} 
                  size={16} 
                  color={index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'}
                  style={styles.trophyIcon}
                />
              )}
            </View>

            <View style={styles.avatarSection}>
              <BlurView intensity={25} tint="light" style={styles.avatar}>
                <FontAwesome5 name="user" size={20} color={theme.colors.primary} />
              </BlurView>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <View style={styles.badgeContainer}>
                <BlurView intensity={20} tint="light" style={styles.badgeBackground}>
                  <FontAwesome5 
                    name={getBadgeIcon(item.badge)} 
                    size={12} 
                    color={getBadgeColor(item.badge)} 
                  />
                  <Text style={[styles.badgeText, { color: getBadgeColor(item.badge) }]}>
                    {item.badge}
                  </Text>
                </BlurView>
              </View>
            </View>

            <View style={styles.statsSection}>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>{item.points}</Text>
                <Text style={styles.pointsLabel}>points</Text>
              </View>
            </View>
          </View>

          {/* Expanded Stats */}
          <View style={styles.expandedStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{item.complaints}</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{item.resolved}</Text>
              <Text style={styles.statLabel}>Resolved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{item.upvotes}</Text>
              <Text style={styles.statLabel}>Upvotes</Text>
            </View>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

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
              <Text style={styles.title}>Leaderboard</Text>
              <TouchableOpacity>
                <FontAwesome5 name="info-circle" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </BlurView>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Tab Navigation with Glassmorphism */}
            <View style={styles.tabContainer}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.filterTab,
                    selectedTab === tab && styles.activeFilterTab
                  ]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <BlurView 
                    intensity={selectedTab === tab ? 60 : 40} 
                    tint="light" 
                    style={styles.filterTabBlur}
                  >
                    <Text style={[
                      styles.tabText,
                      selectedTab === tab && styles.activeTabText
                    ]}>
                      {tab}
                    </Text>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </View>

            {/* Your Rank Card with Glassmorphism */}
            <BlurView intensity={80} tint="light" style={styles.yourRankBlurCard}>
              <View style={styles.yourRankCardOverlay}>
                <View style={styles.yourRankHeader}>
                  <FontAwesome5 name="user-circle" size={24} color={theme.colors.primary} />
                  <Text style={styles.yourRankTitle}>Your Rank</Text>
                </View>
                <View style={styles.yourRankStats}>
                  <View style={styles.yourRankItem}>
                    <Text style={styles.yourRankNumber}>8th</Text>
                    <Text style={styles.yourRankLabel}>Position</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.yourRankItem}>
                    <Text style={styles.yourRankNumber}>950</Text>
                    <Text style={styles.yourRankLabel}>Points</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.yourRankItem}>
                    <Text style={styles.yourRankNumber}>Citizen</Text>
                    <Text style={styles.yourRankLabel}>Badge</Text>
                  </View>
                </View>
              </View>
            </BlurView>

            {/* Leaderboard List */}
            <View style={styles.leaderboardSection}>
              <Text style={styles.sectionTitle}>
                Top Contributors ({leaderboardData.length})
              </Text>
              
              {leaderboardData.map((item, index) => (
                <View key={item.id}>
                  {renderLeaderboardItem({ item, index })}
                </View>
              ))}
            </View>

            {/* Badge Progress with Glassmorphism */}
            <BlurView intensity={80} tint="light" style={styles.progressBlurCard}>
              <View style={styles.progressCardOverlay}>
                <Text style={styles.progressTitle}>Next Badge Progress</Text>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primary + '80']}
                    style={[styles.progressFill, { width: '60%' }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
                <Text style={styles.progressText}>
                  50 more points to reach "Active Citizen" badge
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
  title: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    fontWeight: '700',
  },
  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  // Glassmorphism Tab Navigation
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  filterTab: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  activeFilterTab: {
    transform: [{ scale: 1.02 }],
  },
  filterTabBlur: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface + '60',
  },
  tabText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  // Your Rank Glassmorphism Card
  yourRankBlurCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  yourRankCardOverlay: {
    backgroundColor: theme.colors.surface + '80',
    padding: theme.spacing.lg,
  },
  yourRankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  yourRankTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  yourRankStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  yourRankItem: {
    alignItems: 'center',
    flex: 1,
  },
  yourRankNumber: {
    ...theme.typography.titleSmall,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  yourRankLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: theme.colors.outline + '30',
    marginHorizontal: theme.spacing.sm,
  },
  // Leaderboard Section
  leaderboardSection: {
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  // Glassmorphism Leaderboard Items
  itemCardContainer: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  itemCardBlur: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  itemCard: {
    backgroundColor: theme.colors.surface + '80',
    padding: theme.spacing.md,
  },
  topThreeCard: {
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
    backgroundColor: theme.colors.primary + '08',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  rankSection: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    minWidth: 48,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant + '80',
  },
  topRankBadge: {
    backgroundColor: theme.colors.primary + '20',
  },
  rankText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '700',
  },
  topRankText: {
    color: theme.colors.primary,
  },
  trophyIcon: {
    marginTop: theme.spacing.xs,
  },
  avatarSection: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant + '60',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
  },
  badgeBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceVariant + '40',
  },
  badgeText: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  statsSection: {
    alignItems: 'center',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsText: {
    ...theme.typography.titleSmall,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  pointsLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  expandedStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline + '20',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...theme.typography.labelMedium,
    color: theme.colors.onSurface,
    fontWeight: '700',
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
  },
  // Progress Card Glassmorphism
  progressBlurCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xxxl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  progressCardOverlay: {
    backgroundColor: theme.colors.surface + '80',
    padding: theme.spacing.lg,
  },
  progressTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default LeaderboardScreen;


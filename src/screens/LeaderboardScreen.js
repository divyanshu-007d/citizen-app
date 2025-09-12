// src/screens/LeaderboardScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <Card style={[styles.itemCard, index < 3 && styles.topThreeCard]}>
      <View style={styles.itemContent}>
        <View style={styles.rankSection}>
          <View style={[styles.rankBadge, index < 3 && styles.topRankBadge]}>
            <Text style={[styles.rankText, index < 3 && styles.topRankText]}>
              {index + 1}
            </Text>
          </View>
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
          <View style={styles.avatar}>
            <FontAwesome5 name="user" size={24} color={theme.colors.neutral60} />
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <View style={styles.badgeContainer}>
            <FontAwesome5 
              name={getBadgeIcon(item.badge)} 
              size={14} 
              color={getBadgeColor(item.badge)} 
            />
            <Text style={[styles.badgeText, { color: getBadgeColor(item.badge) }]}>
              {item.badge}
            </Text>
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
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.resolved}</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.upvotes}</Text>
          <Text style={styles.statLabel}>Upvotes</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <TouchableOpacity>
          <FontAwesome5 name="info-circle" size={24} color={theme.colors.primary40} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Your Rank Card */}
      <Card style={styles.yourRankCard}>
        <View style={styles.yourRankHeader}>
          <FontAwesome5 name="user-circle" size={24} color={theme.colors.primary40} />
          <Text style={styles.yourRankTitle}>Your Rank</Text>
        </View>
        <View style={styles.yourRankStats}>
          <View style={styles.yourRankItem}>
            <Text style={styles.yourRankNumber}>8th</Text>
            <Text style={styles.yourRankLabel}>Position</Text>
          </View>
          <View style={styles.yourRankItem}>
            <Text style={styles.yourRankNumber}>950</Text>
            <Text style={styles.yourRankLabel}>Points</Text>
          </View>
          <View style={styles.yourRankItem}>
            <Text style={styles.yourRankNumber}>Active Citizen</Text>
            <Text style={styles.yourRankLabel}>Badge</Text>
          </View>
        </View>
      </Card>

      {/* Leaderboard List */}
      <FlatList
        data={leaderboardData}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Badge Progress */}
      <Card style={styles.progressCard}>
        <Text style={styles.progressTitle}>Next Badge Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
        <Text style={styles.progressText}>
          50 more points to reach "Mukhiya" badge
        </Text>
      </Card>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.headlineSmall,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  tab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: theme.colors.primary40,
  },
  tabText: {
    ...theme.typography.labelMedium,
    color: theme.colors.text,
  },
  activeTabText: {
    color: theme.colors.onPrimary,
  },
  yourRankCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  yourRankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  yourRankTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  yourRankStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  yourRankItem: {
    alignItems: 'center',
  },
  yourRankNumber: {
    ...theme.typography.titleMedium,
    color: theme.colors.primary40,
    fontWeight: 'bold',
  },
  yourRankLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xxs,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  itemCard: {
    marginBottom: theme.spacing.md,
  },
  topThreeCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary40 + '30',
    backgroundColor: theme.colors.primary40 + '05',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  rankSection: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRankBadge: {
    backgroundColor: theme.colors.primary40,
  },
  rankText: {
    ...theme.typography.labelMedium,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  topRankText: {
    color: theme.colors.onPrimary,
  },
  trophyIcon: {
    marginTop: theme.spacing.xxs,
  },
  avatarSection: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xxs,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    ...theme.typography.titleMedium,
    color: theme.colors.primary40,
    fontWeight: 'bold',
  },
  pointsLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.6,
  },
  expandedStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...theme.typography.labelLarge,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.6,
    marginTop: theme.spacing.xxs,
  },
  progressCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  progressTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary40,
    borderRadius: 4,
  },
  progressText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
  },
});

export default LeaderboardScreen;


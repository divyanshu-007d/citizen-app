// src/screens/AchievementsScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const AchievementsScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [activeTab, setActiveTab] = useState('earned'); // earned, available, stats
  
  const [userStats] = useState({
    totalPoints: 2350,
    currentLevel: 8,
    nextLevelPoints: 2500,
    complaintsResolved: 15,
    upvotesReceived: 127,
    commentsPosted: 43,
    badgesEarned: 12,
    streak: 7, // consecutive days active
    rank: 145, // out of all users
    joinDate: new Date('2024-01-15')
  });

  const badges = [
    // Earned Badges
    {
      id: 1,
      name: 'First Complaint',
      description: 'Filed your first complaint',
      icon: 'flag',
      color: theme.colors.primary40,
      rarity: 'common',
      points: 50,
      isEarned: true,
      earnedDate: new Date('2024-01-16'),
      category: 'milestone'
    },
    {
      id: 2,
      name: 'Active Citizen',
      description: 'Filed 10 complaints',
      icon: 'medal',
      color: theme.colors.success,
      rarity: 'uncommon',
      points: 200,
      isEarned: true,
      earnedDate: new Date('2024-03-20'),
      category: 'milestone'
    },
    {
      id: 3,
      name: 'Community Helper',
      description: 'Received 50 upvotes',
      icon: 'heart',
      color: theme.colors.error,
      rarity: 'rare',
      points: 300,
      isEarned: true,
      earnedDate: new Date('2024-05-12'),
      category: 'community'
    },
    {
      id: 4,
      name: 'Problem Solver',
      description: 'Had 5 complaints resolved',
      icon: 'check-circle',
      color: theme.colors.success,
      rarity: 'uncommon',
      points: 250,
      isEarned: true,
      earnedDate: new Date('2024-04-08'),
      category: 'impact'
    },
    {
      id: 5,
      name: 'Night Owl',
      description: 'Filed a complaint after 11 PM',
      icon: 'moon',
      color: theme.colors.info,
      rarity: 'common',
      points: 75,
      isEarned: true,
      earnedDate: new Date('2024-02-03'),
      category: 'quirky'
    },
    {
      id: 6,
      name: 'Photo Journalist',
      description: 'Attached photos to 20 complaints',
      icon: 'camera',
      color: theme.colors.warning,
      rarity: 'uncommon',
      points: 150,
      isEarned: true,
      earnedDate: new Date('2024-06-15'),
      category: 'engagement'
    },
    {
      id: 7,
      name: 'Streak Master',
      description: 'Active for 7 consecutive days',
      icon: 'fire',
      color: theme.colors.error,
      rarity: 'rare',
      points: 400,
      isEarned: true,
      earnedDate: new Date('2024-07-22'),
      category: 'engagement'
    },
    {
      id: 8,
      name: 'Civic Champion',
      description: 'Reached level 5',
      icon: 'trophy',
      color: theme.colors.warning,
      rarity: 'epic',
      points: 500,
      isEarned: true,
      earnedDate: new Date('2024-08-10'),
      category: 'milestone'
    },
    {
      id: 9,
      name: 'Local Legend',
      description: 'Top 10 in your city',
      icon: 'star',
      color: theme.colors.warning,
      rarity: 'legendary',
      points: 1000,
      isEarned: true,
      earnedDate: new Date('2024-09-01'),
      category: 'achievement'
    },
    {
      id: 10,
      name: 'Early Bird',
      description: 'Filed a complaint before 6 AM',
      icon: 'sun',
      color: theme.colors.warning,
      rarity: 'common',
      points: 75,
      isEarned: true,
      earnedDate: new Date('2024-03-15'),
      category: 'quirky'
    },
    {
      id: 11,
      name: 'Mentor',
      description: 'Helped 5 new users',
      icon: 'graduation-cap',
      color: theme.colors.info,
      rarity: 'rare',
      points: 350,
      isEarned: true,
      earnedDate: new Date('2024-08-25'),
      category: 'community'
    },
    {
      id: 12,
      name: 'Speed Demon',
      description: 'Filed 5 complaints in one day',
      icon: 'bolt',
      color: theme.colors.error,
      rarity: 'uncommon',
      points: 200,
      isEarned: true,
      earnedDate: new Date('2024-07-03'),
      category: 'engagement'
    },
    
    // Available Badges (Not Earned)
    {
      id: 13,
      name: 'Veteran Citizen',
      description: 'File 25 complaints',
      icon: 'shield-alt',
      color: theme.colors.primary40,
      rarity: 'rare',
      points: 500,
      isEarned: false,
      progress: 15,
      target: 25,
      category: 'milestone'
    },
    {
      id: 14,
      name: 'Super Helper',
      description: 'Receive 100 upvotes',
      icon: 'thumbs-up',
      color: theme.colors.success,
      rarity: 'epic',
      points: 600,
      isEarned: false,
      progress: 67,
      target: 100,
      category: 'community'
    },
    {
      id: 15,
      name: 'Resolution Expert',
      description: 'Have 20 complaints resolved',
      icon: 'award',
      color: theme.colors.warning,
      rarity: 'epic',
      points: 750,
      isEarned: false,
      progress: 15,
      target: 20,
      category: 'impact'
    },
    {
      id: 16,
      name: 'Marathon Streaker',
      description: 'Active for 30 consecutive days',
      icon: 'calendar-alt',
      color: theme.colors.error,
      rarity: 'legendary',
      points: 1200,
      isEarned: false,
      progress: 7,
      target: 30,
      category: 'engagement'
    },
    {
      id: 17,
      name: 'City Guardian',
      description: 'Top 5 in your city',
      icon: 'crown',
      color: theme.colors.warning,
      rarity: 'legendary',
      points: 1500,
      isEarned: false,
      progress: 10,
      target: 5,
      category: 'achievement'
    },
    {
      id: 18,
      name: 'Commentator',
      description: 'Post 100 comments',
      icon: 'comments',
      color: theme.colors.info,
      rarity: 'rare',
      points: 400,
      isEarned: false,
      progress: 43,
      target: 100,
      category: 'community'
    }
  ];

  const tabs = [
    { key: 'earned', label: 'Earned', icon: 'trophy' },
    { key: 'available', label: 'Available', icon: 'lock' },
    { key: 'stats', label: 'Stats', icon: 'chart-bar' }
  ];

  const rarityColors = {
    common: theme.colors.neutral40,
    uncommon: theme.colors.success,
    rare: theme.colors.info,
    epic: theme.colors.warning,
    legendary: theme.colors.error
  };

  const getEarnedBadges = () => badges.filter(badge => badge.isEarned);
  const getAvailableBadges = () => badges.filter(badge => !badge.isEarned);

  const getLevelProgress = () => {
    const currentLevelBase = (userStats.currentLevel - 1) * 300;
    const pointsInCurrentLevel = userStats.totalPoints - currentLevelBase;
    const pointsNeededForLevel = 300; // Each level needs 300 points
    return (pointsInCurrentLevel / pointsNeededForLevel) * 100;
  };

  const getTimeActive = () => {
    const now = new Date();
    const diffTime = Math.abs(now - userStats.joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
  };

  const shareAchievement = (badge) => {
    Alert.alert(
      'Share Achievement',
      `Share your "${badge.name}" badge with friends?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => Alert.alert('Shared!', 'Achievement shared successfully!') }
      ]
    );
  };

  const renderBadge = ({ item }) => {
    const progressPercentage = item.progress && item.target 
      ? (item.progress / item.target) * 100 
      : 0;

    return (
      <TouchableOpacity
        style={[
          styles.badgeCard,
          !item.isEarned && styles.lockedBadge
        ]}
        onPress={() => item.isEarned && shareAchievement(item)}
      >
        <View style={styles.badgeHeader}>
          <View style={[
            styles.badgeIcon,
            { backgroundColor: item.color + '20' },
            !item.isEarned && styles.lockedIcon
          ]}>
            <FontAwesome5 
              name={item.isEarned ? item.icon : 'lock'} 
              size={24} 
              color={item.isEarned ? item.color : theme.colors.neutral40} 
            />
          </View>
          <View style={[
            styles.rarityBadge,
            { backgroundColor: rarityColors[item.rarity] + '20' }
          ]}>
            <Text style={[
              styles.rarityText,
              { color: rarityColors[item.rarity] }
            ]}>
              {item.rarity.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={[
          styles.badgeName,
          !item.isEarned && styles.lockedText
        ]}>
          {item.name}
        </Text>
        
        <Text style={[
          styles.badgeDescription,
          !item.isEarned && styles.lockedText
        ]}>
          {item.description}
        </Text>

        <View style={styles.badgeFooter}>
          <View style={styles.badgePoints}>
            <FontAwesome5 name="coins" size={12} color={theme.colors.warning} />
            <Text style={styles.pointsText}>{item.points} pts</Text>
          </View>
          
          {item.isEarned ? (
            <Text style={styles.earnedDate}>
              Earned {item.earnedDate.toLocaleDateString()}
            </Text>
          ) : (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                {item.progress}/{item.target}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${progressPercentage}%` }
                  ]} 
                />
              </View>
            </View>
          )}
        </View>

        {item.isEarned && (
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => shareAchievement(item)}
          >
            <FontAwesome5 name="share-alt" size={14} color={theme.colors.primary40} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const renderStats = () => (
    <ScrollView style={styles.statsContainer}>
      {/* Level Progress */}
      <Card style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <View style={styles.levelIcon}>
            <FontAwesome5 name="level-up-alt" size={24} color={theme.colors.primary40} />
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>Level {userStats.currentLevel}</Text>
            <Text style={styles.levelSubtitle}>Civic Contributor</Text>
          </View>
          <Text style={styles.totalPoints}>{userStats.totalPoints.toLocaleString()} pts</Text>
        </View>
        
        <View style={styles.levelProgressContainer}>
          <View style={styles.levelProgressBar}>
            <View 
              style={[
                styles.levelProgressFill,
                { width: `${getLevelProgress()}%` }
              ]} 
            />
          </View>
          <Text style={styles.levelProgressText}>
            {userStats.nextLevelPoints - userStats.totalPoints} pts to Level {userStats.currentLevel + 1}
          </Text>
        </View>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <FontAwesome5 name="trophy" size={20} color={theme.colors.warning} />
          <Text style={styles.statNumber}>{userStats.badgesEarned}</Text>
          <Text style={styles.statLabel}>Badges Earned</Text>
        </Card>
        
        <Card style={styles.statCard}>
          <FontAwesome5 name="fire" size={20} color={theme.colors.error} />
          <Text style={styles.statNumber}>{userStats.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </Card>
        
        <Card style={styles.statCard}>
          <FontAwesome5 name="chart-line" size={20} color={theme.colors.success} />
          <Text style={styles.statNumber}>#{userStats.rank}</Text>
          <Text style={styles.statLabel}>City Rank</Text>
        </Card>
        
        <Card style={styles.statCard}>
          <FontAwesome5 name="calendar" size={20} color={theme.colors.info} />
          <Text style={styles.statNumber}>{getTimeActive()}</Text>
          <Text style={styles.statLabel}>Active Since</Text>
        </Card>
      </View>

      {/* Detailed Stats */}
      <Card style={styles.detailedStats}>
        <Text style={styles.detailedStatsTitle}>Detailed Statistics</Text>
        
        <View style={styles.statRow}>
          <View style={styles.statRowLeft}>
            <FontAwesome5 name="file-alt" size={16} color={theme.colors.primary40} />
            <Text style={styles.statRowLabel}>Complaints Filed</Text>
          </View>
          <Text style={styles.statRowValue}>25</Text>
        </View>
        
        <View style={styles.statRow}>
          <View style={styles.statRowLeft}>
            <FontAwesome5 name="check-circle" size={16} color={theme.colors.success} />
            <Text style={styles.statRowLabel}>Complaints Resolved</Text>
          </View>
          <Text style={styles.statRowValue}>{userStats.complaintsResolved}</Text>
        </View>
        
        <View style={styles.statRow}>
          <View style={styles.statRowLeft}>
            <FontAwesome5 name="arrow-up" size={16} color={theme.colors.success} />
            <Text style={styles.statRowLabel}>Upvotes Received</Text>
          </View>
          <Text style={styles.statRowValue}>{userStats.upvotesReceived}</Text>
        </View>
        
        <View style={styles.statRow}>
          <View style={styles.statRowLeft}>
            <FontAwesome5 name="comment" size={16} color={theme.colors.info} />
            <Text style={styles.statRowLabel}>Comments Posted</Text>
          </View>
          <Text style={styles.statRowValue}>{userStats.commentsPosted}</Text>
        </View>
        
        <View style={styles.statRow}>
          <View style={styles.statRowLeft}>
            <FontAwesome5 name="percentage" size={16} color={theme.colors.warning} />
            <Text style={styles.statRowLabel}>Resolution Rate</Text>
          </View>
          <Text style={styles.statRowValue}>
            {Math.round((userStats.complaintsResolved / 25) * 100)}%
          </Text>
        </View>
      </Card>

      {/* Recent Achievements */}
      <Card style={styles.recentAchievements}>
        <Text style={styles.recentTitle}>Recent Achievements</Text>
        {getEarnedBadges()
          .sort((a, b) => b.earnedDate - a.earnedDate)
          .slice(0, 3)
          .map((badge) => (
            <View key={badge.id} style={styles.recentBadge}>
              <View style={[styles.recentBadgeIcon, { backgroundColor: badge.color + '20' }]}>
                <FontAwesome5 name={badge.icon} size={16} color={badge.color} />
              </View>
              <View style={styles.recentBadgeInfo}>
                <Text style={styles.recentBadgeName}>{badge.name}</Text>
                <Text style={styles.recentBadgeDate}>
                  {badge.earnedDate.toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
      </Card>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'earned':
        return (
          <FlatList
            data={getEarnedBadges()}
            renderItem={renderBadge}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.badgesList}
          />
        );
      case 'available':
        return (
          <FlatList
            data={getAvailableBadges()}
            renderItem={renderBadge}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.badgesList}
          />
        );
      case 'stats':
        return renderStats();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{getEarnedBadges().length}</Text>
          <Text style={styles.summaryLabel}>Earned</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{getAvailableBadges().length}</Text>
          <Text style={styles.summaryLabel}>Available</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>Level {userStats.currentLevel}</Text>
          <Text style={styles.summaryLabel}>Current</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <FontAwesome5 
              name={tab.icon} 
              size={16} 
              color={activeTab === tab.key ? theme.colors.primary40 : theme.colors.neutral40} 
            />
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    ...theme.typography.titleMedium,
    color: theme.colors.primary40,
    fontWeight: '600',
  },
  summaryLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary40,
  },
  tabText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.neutral40,
    marginLeft: theme.spacing.xs,
  },
  activeTabText: {
    color: theme.colors.primary40,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  // Badges List
  badgesList: {
    padding: theme.spacing.md,
  },
  badgeCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    margin: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  lockedBadge: {
    opacity: 0.7,
    backgroundColor: theme.colors.neutral10,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIcon: {
    backgroundColor: theme.colors.neutral20,
  },
  rarityBadge: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.small,
  },
  rarityText: {
    ...theme.typography.bodySmall,
    fontSize: 10,
    fontWeight: '600',
  },
  badgeName: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  badgeDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    lineHeight: 18,
    marginBottom: theme.spacing.sm,
  },
  lockedText: {
    opacity: 0.5,
  },
  badgeFooter: {
    marginTop: 'auto',
  },
  badgePoints: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  pointsText: {
    ...theme.typography.bodySmall,
    color: theme.colors.warning,
    marginLeft: theme.spacing.xs,
    fontWeight: '600',
  },
  earnedDate: {
    ...theme.typography.bodySmall,
    color: theme.colors.success,
    fontSize: 11,
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: theme.colors.neutral20,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary40,
    borderRadius: 2,
  },
  shareButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
  // Stats
  statsContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  levelCard: {
    marginBottom: theme.spacing.lg,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  levelIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary40 + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
  },
  levelSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    marginTop: theme.spacing.xs,
  },
  totalPoints: {
    ...theme.typography.titleMedium,
    color: theme.colors.warning,
    fontWeight: '600',
  },
  levelProgressContainer: {
    marginTop: theme.spacing.sm,
  },
  levelProgressBar: {
    height: 8,
    backgroundColor: theme.colors.neutral20,
    borderRadius: 4,
    marginBottom: theme.spacing.xs,
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary40,
    borderRadius: 4,
  },
  levelProgressText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    margin: theme.spacing.xs,
    paddingVertical: theme.spacing.md,
  },
  statNumber: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  detailedStats: {
    marginBottom: theme.spacing.lg,
  },
  detailedStatsTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statRowLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  statRowValue: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    fontWeight: '600',
  },
  recentAchievements: {
    marginBottom: theme.spacing.lg,
  },
  recentTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  recentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  recentBadgeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  recentBadgeInfo: {
    flex: 1,
  },
  recentBadgeName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    fontWeight: '600',
  },
  recentBadgeDate: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
  },
});

export default AchievementsScreen;
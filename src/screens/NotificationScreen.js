// src/screens/NotificationScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Alert,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const NotificationScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [activeTab, setActiveTab] = useState('all'); // all, unread, mentions, complaints
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'complaint_update',
      title: 'Complaint Status Updated',
      message: 'Your complaint "Road repair needed urgently" has been marked as In Progress.',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isRead: false,
      icon: 'file-alt',
      color: theme.colors.primary40,
      complaintId: 123
    },
    {
      id: 2,
      type: 'upvote',
      title: 'Someone upvoted your complaint',
      message: 'Priya Singh upvoted your complaint about street lighting.',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isRead: false,
      icon: 'arrow-up',
      color: theme.colors.success,
      userId: 'priya-singh'
    },
    {
      id: 3,
      type: 'comment',
      title: 'New comment on your complaint',
      message: 'Amit Kumar: "I have the same issue in my area. +1 for urgent action."',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: true,
      icon: 'comment',
      color: theme.colors.info,
      complaintId: 123
    },
    {
      id: 4,
      type: 'government_response',
      title: 'Government Response',
      message: 'Municipal Corporation has responded to your water supply complaint.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: false,
      icon: 'building',
      color: theme.colors.warning,
      complaintId: 456
    },
    {
      id: 5,
      type: 'badge_earned',
      title: 'Achievement Unlocked!',
      message: 'You earned the "Active Citizen" badge for filing 10 complaints.',
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      isRead: true,
      icon: 'trophy',
      color: theme.colors.warning,
      badgeId: 'active-citizen'
    },
    {
      id: 6,
      type: 'nearby_incident',
      title: 'Incident Near You',
      message: 'New complaint filed about traffic signal malfunction, 0.5 km from your location.',
      timestamp: new Date(Date.now() - 25200000), // 7 hours ago
      isRead: true,
      icon: 'map-marker-alt',
      color: theme.colors.error,
      location: 'Main Street Junction'
    },
    {
      id: 7,
      type: 'system',
      title: 'App Update Available',
      message: 'Update to version 2.1 for improved performance and new features.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isRead: false,
      icon: 'download',
      color: theme.colors.primary40
    },
    {
      id: 8,
      type: 'resolution',
      title: 'Complaint Resolved',
      message: 'Your complaint about garbage collection has been marked as resolved.',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      isRead: true,
      icon: 'check-circle',
      color: theme.colors.success,
      complaintId: 789
    }
  ]);

  const tabs = [
    { key: 'all', label: 'All', icon: 'bell' },
    { key: 'unread', label: 'Unread', icon: 'bell-slash' },
    { key: 'mentions', label: 'Mentions', icon: 'at' },
    { key: 'complaints', label: 'Complaints', icon: 'file-alt' }
  ];

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'mentions':
        return notifications.filter(n => ['comment', 'upvote'].includes(n.type));
      case 'complaints':
        return notifications.filter(n => 
          ['complaint_update', 'comment', 'government_response', 'resolution'].includes(n.type)
        );
      default:
        return notifications;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return timestamp.toLocaleDateString();
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    Alert.alert(
      'Mark All as Read',
      'Are you sure you want to mark all notifications as read?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Mark All', 
          onPress: () => {
            setNotifications(prev => 
              prev.map(notification => ({ ...notification, isRead: true }))
            );
          }
        }
      ]
    );
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Clear All Notifications',
      'This will permanently delete all notifications. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => setNotifications([])
        }
      ]
    );
  };

  const handleNotificationPress = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    // Navigate based on notification type
    switch (notification.type) {
      case 'complaint_update':
      case 'comment':
      case 'government_response':
      case 'resolution':
        if (notification.complaintId) {
          navigation.navigate('ComplaintDetails', { complaintId: notification.complaintId });
        }
        break;
      case 'badge_earned':
        navigation.navigate('Achievements');
        break;
      case 'nearby_incident':
        navigation.navigate('Map', { location: notification.location });
        break;
      case 'upvote':
        // Could navigate to user profile or complaint
        break;
      case 'system':
        // Handle system notifications
        if (notification.message.includes('Update')) {
          Alert.alert('App Update', 'Redirecting to app store...');
        }
        break;
    }
  };

  const deleteNotification = (notificationId) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setNotifications(prev => 
              prev.filter(notification => notification.id !== notificationId)
            );
          }
        }
      ]
    );
  };

  const getNotificationPriority = (type) => {
    const highPriority = ['government_response', 'resolution', 'complaint_update'];
    const mediumPriority = ['comment', 'upvote', 'nearby_incident'];
    
    if (highPriority.includes(type)) return 'high';
    if (mediumPriority.includes(type)) return 'medium';
    return 'low';
  };

  const renderNotification = ({ item }) => {
    const priority = getNotificationPriority(item.type);
    
    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !item.isRead && styles.unreadNotification,
          priority === 'high' && styles.highPriorityNotification
        ]}
        onPress={() => handleNotificationPress(item)}
        onLongPress={() => deleteNotification(item.id)}
      >
        <View style={styles.notificationContent}>
          <View style={[styles.notificationIcon, { backgroundColor: item.color + '20' }]}>
            <FontAwesome5 name={item.icon} size={16} color={item.color} />
          </View>
          
          <View style={styles.notificationText}>
            <View style={styles.notificationHeader}>
              <Text style={[styles.notificationTitle, !item.isRead && styles.unreadTitle]}>
                {item.title}
              </Text>
              <Text style={styles.notificationTime}>
                {getTimeAgo(item.timestamp)}
              </Text>
            </View>
            
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>
            
            {priority === 'high' && (
              <View style={styles.priorityBadge}>
                <FontAwesome5 name="exclamation" size={10} color={theme.colors.error} />
                <Text style={styles.priorityText}>High Priority</Text>
              </View>
            )}
          </View>
          
          {!item.isRead && (
            <View style={styles.unreadIndicator} />
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => deleteNotification(item.id)}
        >
          <FontAwesome5 name="trash-alt" size={12} color={theme.colors.error} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <FontAwesome5 name="bell-slash" size={48} color={theme.colors.neutral40} />
      <Text style={styles.emptyStateTitle}>No notifications</Text>
      <Text style={styles.emptyStateText}>
        You're all caught up! We'll notify you when something new happens.
      </Text>
    </View>
  );

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('NotificationSettings')}
        >
          <FontAwesome5 name="cog" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Stats and Actions */}
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsNumber}>{notifications.length}</Text>
          <Text style={styles.statsLabel}>Total</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={[styles.statsNumber, unreadCount > 0 && { color: theme.colors.primary40 }]}>
            {unreadCount}
          </Text>
          <Text style={styles.statsLabel}>Unread</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <FontAwesome5 name="check" size={14} color={
              unreadCount > 0 ? theme.colors.primary40 : theme.colors.neutral40
            } />
            <Text style={[
              styles.actionText,
              unreadCount === 0 && { color: theme.colors.neutral40 }
            ]}>
              Mark All Read
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={clearAllNotifications}
          >
            <FontAwesome5 name="trash" size={14} color={theme.colors.error} />
            <Text style={[styles.actionText, { color: theme.colors.error }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContent}
      >
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
              size={14} 
              color={activeTab === tab.key ? theme.colors.primary40 : theme.colors.neutral40} 
            />
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
            {tab.key === 'unread' && unreadCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notifications List */}
      <View style={styles.notificationsList}>
        {filteredNotifications.length > 0 ? (
          <FlatList
            data={filteredNotifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          renderEmptyState()
        )}
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
  settingsButton: {
    padding: theme.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsNumber: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
  },
  statsLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  actionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    marginLeft: theme.spacing.xs,
    fontWeight: '600',
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tabContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeTab: {
    backgroundColor: theme.colors.primary40 + '20',
    borderColor: theme.colors.primary40,
  },
  tabText: {
    ...theme.typography.bodySmall,
    color: theme.colors.neutral40,
    marginLeft: theme.spacing.xs,
  },
  activeTabText: {
    color: theme.colors.primary40,
    fontWeight: '600',
  },
  badgeContainer: {
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.xs,
  },
  badgeText: {
    ...theme.typography.bodySmall,
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  notificationCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary40,
  },
  highPriorityNotification: {
    borderLeftColor: theme.colors.error,
    backgroundColor: theme.colors.error + '05',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing.md,
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  notificationText: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  notificationTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notificationTime: {
    ...theme.typography.bodySmall,
    color: theme.colors.neutral40,
  },
  notificationMessage: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.8,
    lineHeight: 18,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.error + '20',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.small,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.xs,
  },
  priorityText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary40,
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
  },
  deleteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptyStateText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default NotificationScreen;


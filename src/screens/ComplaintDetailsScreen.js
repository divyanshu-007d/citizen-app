// src/screens/ComplaintDetailsScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Dimensions,
  FlatList,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../design-system';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mock complaint data
const mockComplaintData = {
  id: '1',
  title: 'Broken Street Light on MG Road',
  description: 'The street light near the bus stop on MG Road has been non-functional for the past week. This is causing safety issues for pedestrians, especially women and elderly people walking in the evening. The area becomes very dark after sunset, making it difficult to navigate and potentially dangerous.',
  category: 'Infrastructure',
  status: 'In Progress',
  priority: 'Medium',
  upvotes: 47,
  hasUserVoted: false,
  location: 'MG Road, Near Bus Stop, Bangalore',
  coordinates: { latitude: 12.9716, longitude: 77.5946 },
  images: [
    'https://via.placeholder.com/400x300/666/fff?text=Broken+Street+Light+1',
    'https://via.placeholder.com/400x300/666/fff?text=Broken+Street+Light+2',
    'https://via.placeholder.com/400x300/666/fff?text=Location+View',
  ],
  submittedBy: {
    name: 'Rajesh Kumar',
    badge: 'Active Citizen',
    joinDate: 'March 2024'
  },
  submittedAt: '2024-09-10T10:30:00Z',
  statusHistory: [
    {
      status: 'Submitted',
      date: '2024-09-10T10:30:00Z',
      description: 'Complaint submitted by citizen',
      icon: 'file-alt'
    },
    {
      status: 'Acknowledged',
      date: '2024-09-11T14:15:00Z',
      description: 'Complaint acknowledged by BESCOM',
      icon: 'check-circle'
    },
    {
      status: 'In Progress',
      date: '2024-09-12T09:00:00Z',
      description: 'Repair team assigned and dispatched',
      icon: 'tools',
      current: true
    }
  ],
  comments: [
    {
      id: '1',
      user: 'Priya Sharma',
      text: 'I face the same issue daily while returning from work. This needs urgent attention.',
      timestamp: '2024-09-11T16:20:00Z',
      upvotes: 12
    },
    {
      id: '2',
      user: 'Arun Singh',
      text: 'There are actually 3 more street lights in this area that are not working. Should we report them separately?',
      timestamp: '2024-09-12T11:45:00Z',
      upvotes: 8
    }
  ]
};

const ComplaintDetailsScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { complaintId } = route.params || { complaintId: '1' };
  
  const [complaint] = useState(mockComplaintData);
  const [hasUserVoted, setHasUserVoted] = useState(complaint.hasUserVoted);
  const [upvotes, setUpvotes] = useState(complaint.upvotes);
  const [isFollowing, setIsFollowing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(complaint.comments);

  const styles = createStyles(theme);

  const handleUpvote = () => {
    if (hasUserVoted) {
      setUpvotes(upvotes - 1);
      setHasUserVoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setHasUserVoted(true);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this civic issue: ${complaint.title}\n\nLocation: ${complaint.location}\n\nHelp by upvoting on Citizen App!`,
        url: `citizenapp://complaint/${complaint.id}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share complaint');
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    Alert.alert(
      isFollowing ? 'Unfollowed' : 'Following',
      isFollowing 
        ? 'You will no longer receive updates about this complaint'
        : 'You will receive notifications when this complaint is updated'
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      user: 'You',
      text: newComment,
      timestamp: new Date().toISOString(),
      upvotes: 0
    };

    setComments([...comments, comment]);
    setNewComment('');
    Alert.alert('Comment Added', 'Your comment has been posted');
  };

  const handleReportIssue = () => {
    Alert.alert(
      'Report Issue',
      'What would you like to report about this complaint?',
      [
        { text: 'Spam', onPress: () => Alert.alert('Reported', 'Thank you for reporting spam') },
        { text: 'Inappropriate Content', onPress: () => Alert.alert('Reported', 'Thank you for reporting inappropriate content') },
        { text: 'False Information', onPress: () => Alert.alert('Reported', 'Thank you for reporting false information') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted': return theme.colors.neutral60;
      case 'Acknowledged': return theme.colors.warning;
      case 'In Progress': return theme.colors.primary40;
      case 'Resolved': return theme.colors.success;
      default: return theme.colors.neutral60;
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const renderImage = ({ item, index }) => (
    <TouchableOpacity style={styles.imageContainer}>
      <View style={styles.imagePlaceholder}>
        <FontAwesome5 name="image" size={40} color={theme.colors.neutral40} />
        <Text style={styles.imageText}>Image {index + 1}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderStatusItem = ({ item }) => (
    <View style={styles.statusItem}>
      <View style={[styles.statusIcon, item.current && styles.currentStatusIcon]}>
        <FontAwesome5 
          name={item.icon} 
          size={16} 
          color={item.current ? theme.colors.onPrimary : theme.colors.primary40} 
        />
      </View>
      <View style={styles.statusContent}>
        <Text style={[styles.statusTitle, item.current && styles.currentStatusTitle]}>
          {item.status}
        </Text>
        <Text style={styles.statusDescription}>{item.description}</Text>
        <Text style={styles.statusDate}>{formatTimeAgo(item.date)}</Text>
      </View>
    </View>
  );

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <View style={styles.commentUser}>
          <FontAwesome5 name="user-circle" size={20} color={theme.colors.neutral60} />
          <Text style={styles.commentUserName}>{item.user}</Text>
        </View>
        <Text style={styles.commentTime}>{formatTimeAgo(item.timestamp)}</Text>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>
      <TouchableOpacity style={styles.commentUpvote}>
        <FontAwesome5 name="arrow-up" size={14} color={theme.colors.primary40} />
        <Text style={styles.commentUpvoteText}>{item.upvotes}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesome5 name="chevron-left" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complaint Details</Text>
          <TouchableOpacity onPress={handleReportIssue} style={styles.reportButton}>
            <FontAwesome5 name="flag" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Image Carousel */}
        <View style={styles.imageCarousel}>
          <FlatList
            data={complaint.images}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.imageList}
          />
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>1 / {complaint.images.length}</Text>
          </View>
        </View>

        {/* Complaint Information */}
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View style={styles.infoMeta}>
              <Text style={styles.complaintTitle}>{complaint.title}</Text>
              <Text style={styles.complaintLocation}>{complaint.location}</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(complaint.status) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(complaint.status) }]}>
                {complaint.status}
              </Text>
            </View>
          </View>

          <Text style={styles.complaintDescription}>{complaint.description}</Text>

          <View style={styles.complaintMeta}>
            <Text style={styles.metaText}>
              Category: <Text style={styles.metaValue}>{complaint.category}</Text>
            </Text>
            <Text style={styles.metaText}>
              Priority: <Text style={styles.metaValue}>{complaint.priority}</Text>
            </Text>
            <Text style={styles.metaText}>
              Submitted: <Text style={styles.metaValue}>{formatTimeAgo(complaint.submittedAt)}</Text>
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, hasUserVoted && styles.activeActionButton]}
              onPress={handleUpvote}
            >
              <FontAwesome5 
                name="arrow-up" 
                size={18} 
                color={hasUserVoted ? theme.colors.onPrimary : theme.colors.primary40} 
              />
              <Text style={[
                styles.actionButtonText,
                hasUserVoted && styles.activeActionButtonText
              ]}>
                {upvotes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <FontAwesome5 name="share-alt" size={18} color={theme.colors.primary40} />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, isFollowing && styles.activeActionButton]}
              onPress={handleFollow}
            >
              <FontAwesome5 
                name={isFollowing ? "bell" : "bell-slash"} 
                size={18} 
                color={isFollowing ? theme.colors.onPrimary : theme.colors.primary40} 
              />
              <Text style={[
                styles.actionButtonText,
                isFollowing && styles.activeActionButtonText
              ]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Status Timeline */}
        <Card style={styles.timelineCard}>
          <Text style={styles.sectionTitle}>Status Timeline</Text>
          <FlatList
            data={complaint.statusHistory}
            renderItem={renderStatusItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </Card>

        {/* Comments Section */}
        <Card style={styles.commentsCard}>
          <Text style={styles.sectionTitle}>Community Discussion ({comments.length})</Text>
          
          {/* Add Comment */}
          <View style={styles.addComment}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor={theme.colors.neutral60}
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <Button
              title="Post"
              size="small"
              onPress={handleAddComment}
              disabled={!newComment.trim()}
            />
          </View>

          {/* Comments List */}
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.commentSeparator} />}
          />
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
  scrollContent: {
    paddingBottom: theme.spacing.xl,
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
  reportButton: {
    padding: theme.spacing.sm,
  },
  imageCarousel: {
    height: 250,
    position: 'relative',
  },
  imageList: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: 250,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainer,
  },
  imageText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.neutral60,
    marginTop: theme.spacing.sm,
  },
  imageCounter: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
  },
  imageCounterText: {
    ...theme.typography.bodySmall,
    color: 'white',
  },
  infoCard: {
    margin: theme.spacing.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  infoMeta: {
    flex: 1,
  },
  complaintTitle: {
    ...theme.typography.titleLarge,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  complaintLocation: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  statusText: {
    ...theme.typography.labelMedium,
    fontWeight: '600',
  },
  complaintDescription: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  complaintMeta: {
    marginBottom: theme.spacing.lg,
  },
  metaText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: theme.spacing.xs,
  },
  metaValue: {
    fontWeight: '600',
    opacity: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.primary40,
  },
  activeActionButton: {
    backgroundColor: theme.colors.primary40,
  },
  actionButtonText: {
    ...theme.typography.labelMedium,
    color: theme.colors.primary40,
    marginLeft: theme.spacing.xs,
    fontWeight: '600',
  },
  activeActionButtonText: {
    color: theme.colors.onPrimary,
  },
  timelineCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.lg,
  },
  statusItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary40 + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  currentStatusIcon: {
    backgroundColor: theme.colors.primary40,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
  },
  currentStatusTitle: {
    color: theme.colors.primary40,
  },
  statusDescription: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
  },
  statusDate: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.5,
    marginTop: theme.spacing.xs,
  },
  commentsCard: {
    marginHorizontal: theme.spacing.lg,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginRight: theme.spacing.sm,
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    maxHeight: 100,
  },
  commentItem: {
    paddingVertical: theme.spacing.md,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  commentUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentUserName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  commentTime: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.5,
  },
  commentText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  commentUpvote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentUpvoteText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    marginLeft: theme.spacing.xs,
  },
  commentSeparator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
});

export default ComplaintDetailsScreen;


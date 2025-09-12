// src/screens/ChatScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FontAwesome5 } from '@expo/vector-icons';

const ChatScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [activeTab, setActiveTab] = useState('support'); // support, faq, chat
  const [supportCategory, setSupportCategory] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const supportCategories = [
    {
      id: 'technical',
      title: 'Technical Issues',
      description: 'App crashes, login problems, sync issues',
      icon: 'cog',
      color: theme.colors.primary40
    },
    {
      id: 'complaint',
      title: 'Complaint Help',
      description: 'How to file, track, or update complaints',
      icon: 'file-alt',
      color: theme.colors.warning
    },
    {
      id: 'account',
      title: 'Account & Profile',
      description: 'Profile settings, privacy, data management',
      icon: 'user',
      color: theme.colors.success
    },
    {
      id: 'general',
      title: 'General Inquiries',
      description: 'Features, billing, partnerships',
      icon: 'question-circle',
      color: theme.colors.info
    }
  ];

  const faqData = [
    {
      id: 1,
      question: 'How do I file a new complaint?',
      answer: 'Tap the "+" button on the home screen, fill in the complaint details, add photos if needed, and submit. You\'ll receive a tracking number for follow-ups.',
      category: 'complaint'
    },
    {
      id: 2,
      question: 'Why is my complaint status not updating?',
      answer: 'Complaint status updates depend on the concerned department. Typically, acknowledgment happens within 48 hours, and resolution can take 7-30 days depending on the issue.',
      category: 'complaint'
    },
    {
      id: 3,
      question: 'How do I change my location?',
      answer: 'Go to Profile > Settings > Location Settings. You can update your default location or allow the app to use your current GPS location.',
      category: 'account'
    },
    {
      id: 4,
      question: 'Can I delete my account?',
      answer: 'Yes, go to Profile > Settings > Privacy Settings > Delete Account. Note that this action is permanent and cannot be undone.',
      category: 'account'
    },
    {
      id: 5,
      question: 'App keeps crashing, what should I do?',
      answer: 'Try restarting the app. If the issue persists, clear the app cache or reinstall the app. Contact support if problems continue.',
      category: 'technical'
    },
    {
      id: 6,
      question: 'How do I earn badges and points?',
      answer: 'File complaints, vote on others\' complaints, provide updates, and engage with the community. Different actions earn different points.',
      category: 'general'
    },
    {
      id: 7,
      question: 'Is my personal data safe?',
      answer: 'Yes, we use encryption and follow strict data protection guidelines. You can control data sharing in Privacy Settings.',
      category: 'general'
    },
    {
      id: 8,
      question: 'How do I report inappropriate content?',
      answer: 'Tap the three dots on any complaint or comment and select "Report". Our team reviews all reports within 24 hours.',
      category: 'general'
    }
  ];

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: 'Hello! How can I help you today?',
      sender: 'support',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      senderName: 'Support Agent'
    }
  ]);

  const filteredFAQs = searchQuery 
    ? faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData;

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      senderName: 'You'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    // Auto-reply after 2 seconds
    setTimeout(() => {
      const replies = [
        'Thank you for contacting us. I understand your concern.',
        'Let me help you with that. Can you provide more details?',
        'I\'ve noted your request. Our team will look into this.',
        'That\'s a great question. Here\'s what I can help you with...'
      ];
      
      const autoReply = {
        id: Date.now() + 1,
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: 'support',
        timestamp: new Date(),
        senderName: 'Support Agent'
      };
      
      setChatMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  const attachFile = () => {
    Alert.alert(
      'Attach File',
      'Choose file type:',
      [
        { text: 'Photo', onPress: () => Alert.alert('File Attached', 'Photo attachment feature coming soon') },
        { text: 'Document', onPress: () => Alert.alert('File Attached', 'Document attachment feature coming soon') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const renderTabHeader = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'support' && styles.activeTab]}
        onPress={() => setActiveTab('support')}
      >
        <FontAwesome5 name="headset" size={16} color={activeTab === 'support' ? theme.colors.primary40 : theme.colors.text} />
        <Text style={[styles.tabText, activeTab === 'support' && styles.activeTabText]}>
          Support
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
        onPress={() => setActiveTab('faq')}
      >
        <FontAwesome5 name="question" size={16} color={activeTab === 'faq' ? theme.colors.primary40 : theme.colors.text} />
        <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>
          FAQ
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
        onPress={() => setActiveTab('chat')}
      >
        <FontAwesome5 name="comments" size={16} color={activeTab === 'chat' ? theme.colors.primary40 : theme.colors.text} />
        <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
          Live Chat
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSupportCategories = () => (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>How can we help you?</Text>
      <Text style={styles.sectionDescription}>
        Choose a category that best describes your inquiry
      </Text>
      
      {supportCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryCard}
          onPress={() => {
            setSupportCategory(category.id);
            setActiveTab('chat');
          }}
        >
          <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
            <FontAwesome5 name={category.icon} size={24} color={category.color} />
          </View>
          <View style={styles.categoryContent}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color={theme.colors.text} />
        </TouchableOpacity>
      ))}
      
      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.quickActionButtons}>
          <TouchableOpacity style={styles.quickActionButton}>
            <FontAwesome5 name="phone" size={16} color={theme.colors.primary40} />
            <Text style={styles.quickActionText}>Call Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <FontAwesome5 name="envelope" size={16} color={theme.colors.primary40} />
            <Text style={styles.quickActionText}>Email Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFAQs = () => (
    <View style={styles.faqContainer}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color={theme.colors.text} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search FAQs..."
          placeholderTextColor={theme.colors.text + '60'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <FontAwesome5 name="times" size={16} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.faqList}>
        {filteredFAQs.map((faq) => (
          <Card key={faq.id} style={styles.faqCard}>
            <TouchableOpacity 
              style={styles.faqItem}
              onPress={() => Alert.alert(faq.question, faq.answer)}
            >
              <View style={styles.faqContent}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqPreview} numberOfLines={2}>
                  {faq.answer}
                </Text>
              </View>
              <FontAwesome5 name="chevron-right" size={16} color={theme.colors.text} />
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
    </View>
  );

  const renderChatMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.supportMessage
    ]}>
      {item.sender === 'support' && (
        <View style={styles.supportAvatar}>
          <FontAwesome5 name="headset" size={12} color={theme.colors.primary40} />
        </View>
      )}
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.supportBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'user' ? styles.userMessageText : styles.supportMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={styles.messageTime}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const renderChat = () => (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <View style={styles.agentInfo}>
          <View style={styles.agentAvatar}>
            <FontAwesome5 name="headset" size={16} color={theme.colors.primary40} />
          </View>
          <View>
            <Text style={styles.agentName}>Support Agent</Text>
            <Text style={styles.agentStatus}>Online • Avg. response: 2 min</Text>
          </View>
        </View>
        {supportCategory && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>
              {supportCategories.find(cat => cat.id === supportCategory)?.title}
            </Text>
          </View>
        )}
      </View>

      <FlatList
        data={chatMessages}
        renderItem={renderChatMessage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
        inverted={false}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton} onPress={attachFile}>
          <FontAwesome5 name="paperclip" size={16} color={theme.colors.text} />
        </TouchableOpacity>
        <TextInput
          style={styles.messageInput}
          placeholder="Type your message..."
          placeholderTextColor={theme.colors.text + '60'}
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, newMessage.trim() && styles.sendButtonActive]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <FontAwesome5 name="paper-plane" size={16} color={
            newMessage.trim() ? theme.colors.primary40 : theme.colors.text + '60'
          } />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'support':
        return renderSupportCategories();
      case 'faq':
        return renderFAQs();
      case 'chat':
        return renderChat();
      default:
        return renderSupportCategories();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      {renderTabHeader()}
      
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
    paddingHorizontal: theme.spacing.sm,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary40,
  },
  tabText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  activeTabText: {
    color: theme.colors.primary40,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  // Support Categories
  categoriesContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.titleLarge,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  sectionDescription: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: theme.spacing.lg,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  categoryDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
  },
  quickActions: {
    marginTop: theme.spacing.xl,
  },
  quickActionsTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  quickActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary40 + '20',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    marginHorizontal: theme.spacing.xs,
  },
  quickActionText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary40,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  // FAQ
  faqContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchInput: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  faqList: {
    flex: 1,
  },
  faqCard: {
    marginBottom: theme.spacing.sm,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
  },
  faqContent: {
    flex: 1,
  },
  faqQuestion: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  faqPreview: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    lineHeight: 18,
  },
  // Chat
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary40 + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  agentName: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
  },
  agentStatus: {
    ...theme.typography.bodySmall,
    color: theme.colors.success,
    marginTop: theme.spacing.xxs,
  },
  categoryBadge: {
    backgroundColor: theme.colors.primary40 + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
  },
  categoryBadgeText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    fontWeight: '600',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: theme.spacing.xs,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  supportMessage: {
    justifyContent: 'flex-start',
  },
  supportAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.primary40 + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.xs,
  },
  userBubble: {
    backgroundColor: theme.colors.primary40,
    marginLeft: 'auto',
  },
  supportBubble: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  messageText: {
    ...theme.typography.bodyMedium,
    lineHeight: 20,
  },
  userMessageText: {
    color: theme.colors.background,
  },
  supportMessageText: {
    color: theme.colors.text,
  },
  messageTime: {
    ...theme.typography.bodySmall,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
    fontSize: 11,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  attachButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  messageInput: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    maxHeight: 100,
  },
  sendButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  sendButtonActive: {
    backgroundColor: theme.colors.primary40 + '20',
    borderRadius: theme.borderRadius.small,
  },
});

export default ChatScreen;
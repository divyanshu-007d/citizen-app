// src/screens/ReportScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert,
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../design-system';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const categories = [
  { id: 'roads', name: 'Roads & Transport', icon: 'road' },
  { id: 'water', name: 'Water Supply', icon: 'tint' },
  { id: 'electricity', name: 'Electricity', icon: 'bolt' },
  { id: 'sanitation', name: 'Sanitation', icon: 'trash' },
  { id: 'safety', name: 'Public Safety', icon: 'shield-alt' },
  { id: 'other', name: 'Other', icon: 'ellipsis-h' },
];

const ReportScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const styles = createStyles(theme);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleImagePicker = () => {
    Alert.alert(
      'Add Photo',
      'Choose an option:',
      [
        { text: 'Camera', onPress: () => Alert.alert('Feature Coming Soon', 'Camera integration will be available soon!') },
        { text: 'Gallery', onPress: () => Alert.alert('Feature Coming Soon', 'Gallery picker will be available soon!') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleLocationPicker = () => {
    Alert.alert('Feature Coming Soon', 'Location picker will be available soon!');
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your complaint');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success!',
        'Your complaint has been submitted successfully. You will receive updates on its progress.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setTitle('');
              setDescription('');
              setSelectedCategory(null);
              setLocation('');
              setImages([]);
              navigation.navigate('Home');
            }
          }
        ]
      );
    }, 2000);
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
        locations={[0, 0.4, 1]}
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Glassmorphism Header */}
          <BlurView intensity={80} tint="light" style={styles.headerBlur}>
            <View style={styles.header}>
              <Text style={styles.title}>Report an Issue</Text>
              <Text style={styles.subtitle}>Help make your community better</Text>
            </View>
          </BlurView>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActionsGrid}>
                <TouchableOpacity 
                  style={styles.quickActionContainer}
                  onPress={() => Alert.alert('Feature Coming Soon', 'Voice report will be available soon!')}
                >
                  <BlurView intensity={80} tint="light" style={styles.quickActionBlur}>
                    <View style={styles.quickActionButton}>
                      <BlurView intensity={30} tint="light" style={styles.quickActionIconContainer}>
                        <FontAwesome5 name="microphone" size={24} color={theme.colors.primary} />
                      </BlurView>
                      <Text style={styles.quickActionText}>Voice Report</Text>
                      <Text style={styles.quickActionSubtext}>Speak your complaint</Text>
                    </View>
                  </BlurView>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickActionContainer}
                  onPress={() => Alert.alert('Feature Coming Soon', 'Camera report will be available soon!')}
                >
                  <BlurView intensity={80} tint="light" style={styles.quickActionBlur}>
                    <View style={styles.quickActionButton}>
                      <BlurView intensity={30} tint="light" style={styles.quickActionIconContainer}>
                        <FontAwesome5 name="camera" size={24} color={theme.colors.primary} />
                      </BlurView>
                      <Text style={styles.quickActionText}>Quick Photo</Text>
                      <Text style={styles.quickActionSubtext}>Capture & report</Text>
                    </View>
                  </BlurView>
                </TouchableOpacity>
              </View>
            </View>

            {/* Report Form */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Complaint Details</Text>
              <BlurView intensity={80} tint="light" style={styles.formCardBlur}>
                <View style={styles.formCard}>
                  <Input
                    label="Title *"
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Brief title of the issue"
                    leftIcon={<FontAwesome5 name="edit" size={18} color={theme.colors.primary} />}
                  />

                  <Input
                    label="Description *"
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Describe the issue in detail"
                    multiline={true}
                    numberOfLines={4}
                    leftIcon={<FontAwesome5 name="align-left" size={18} color={theme.colors.primary} />}
                  />

                  {/* Category Selection */}
                  <Text style={styles.fieldLabel}>Category *</Text>
                  <View style={styles.categoryGrid}>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        style={styles.categoryButtonContainer}
                        onPress={() => handleCategorySelect(category)}
                      >
                        <BlurView 
                          intensity={selectedCategory?.id === category.id ? 60 : 40} 
                          tint="light" 
                          style={[
                            styles.categoryButton,
                            selectedCategory?.id === category.id && styles.selectedCategoryBlur
                          ]}
                        >
                          <BlurView intensity={30} tint="light" style={[
                            styles.categoryIconContainer,
                            selectedCategory?.id === category.id && styles.selectedCategoryIcon
                          ]}>
                            <FontAwesome5 
                              name={category.icon} 
                              size={18} 
                              color={selectedCategory?.id === category.id ? theme.colors.surface : theme.colors.primary} 
                            />
                          </BlurView>
                          <Text style={[
                            styles.categoryText,
                            selectedCategory?.id === category.id && styles.selectedCategoryText
                          ]}>
                            {category.name}
                          </Text>
                        </BlurView>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Location */}
                  <Text style={styles.fieldLabel}>Location</Text>
                  <TouchableOpacity style={styles.locationButtonContainer} onPress={handleLocationPicker}>
                    <BlurView intensity={60} tint="light" style={styles.locationButton}>
                      <BlurView intensity={30} tint="light" style={styles.locationIconContainer}>
                        <FontAwesome5 name="map-marker-alt" size={18} color={theme.colors.primary} />
                      </BlurView>
                      <Text style={styles.locationText}>
                        {location || 'Tap to set location'}
                      </Text>
                      <BlurView intensity={30} tint="light" style={styles.chevronContainer}>
                        <FontAwesome5 name="chevron-right" size={14} color={theme.colors.primary} />
                      </BlurView>
                    </BlurView>
                  </TouchableOpacity>

                  {/* Images */}
                  <Text style={styles.fieldLabel}>Photos (Optional)</Text>
                  <TouchableOpacity style={styles.imageButtonContainer} onPress={handleImagePicker}>
                    <BlurView intensity={60} tint="light" style={styles.imageButton}>
                      <BlurView intensity={30} tint="light" style={styles.imageIconContainer}>
                        <FontAwesome5 name="camera" size={24} color={theme.colors.primary} />
                      </BlurView>
                      <Text style={styles.imageButtonText}>Add Photos</Text>
                      <Text style={styles.imageSubtext}>Max 5 photos</Text>
                    </BlurView>
                  </TouchableOpacity>

                  {/* Priority Level */}
                  <Text style={styles.fieldLabel}>Priority Level</Text>
                  <View style={styles.priorityGrid}>
                    {['Low', 'Medium', 'High'].map((priority) => (
                      <TouchableOpacity
                        key={priority}
                        style={styles.priorityButtonContainer}
                        onPress={() => Alert.alert('Auto-Detection', 'Priority will be automatically determined by AI')}
                      >
                        <BlurView intensity={50} tint="light" style={styles.priorityButton}>
                          <Text style={styles.priorityText}>{priority}</Text>
                        </BlurView>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.priorityNote}>
                    Priority will be automatically determined based on your report
                  </Text>
                </View>
              </BlurView>
            </View>

            {/* Submit Button */}
            <View style={styles.submitButtonContainer}>
              <BlurView intensity={80} tint="light" style={styles.submitButtonBlur}>
                <Button
                  title="Submit Complaint"
                  onPress={handleSubmit}
                  loading={loading}
                  style={styles.submitButton}
                />
              </BlurView>
            </View>

            {/* AI Assistant Hint */}
            <BlurView intensity={80} tint="light" style={styles.aiHintCardBlur}>
              <View style={styles.aiHintCard}>
                <View style={styles.aiHint}>
                  <BlurView intensity={30} tint="light" style={styles.aiIconContainer}>
                    <FontAwesome5 name="robot" size={20} color={theme.colors.primary} />
                  </BlurView>
                  <View style={styles.aiHintContent}>
                    <Text style={styles.aiHintTitle}>AI Voice Assistant</Text>
                    <Text style={styles.aiHintText}>
                      Try our AI Voice Assistant for faster reporting!
                    </Text>
                  </View>
                </View>
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
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primary + '10',
    backgroundColor: theme.colors.surface + '40',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.headlineMedium.fontSize,
    fontWeight: theme.typography.headlineMedium.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.bodyLarge.fontSize,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: theme.typography.bodyLarge.fontSize * 1.4,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
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
  quickActionsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  quickActionContainer: {
    flex: 1,
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
  },
  quickActionBlur: {
    borderWidth: 1,
    borderColor: theme.colors.primary + '15',
    backgroundColor: theme.colors.surface + '40',
  },
  quickActionButton: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  quickActionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  quickActionText: {
    fontSize: theme.typography.labelLarge.fontSize,
    fontWeight: theme.typography.labelLarge.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  quickActionSubtext: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  formCardBlur: {
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primary + '10',
    backgroundColor: theme.colors.surface + '40',
  },
  formCard: {
    padding: theme.spacing.lg,
  },
  fieldLabel: {
    fontSize: theme.typography.bodyMedium.fontSize,
    fontWeight: theme.typography.labelLarge.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  categoryButtonContainer: {
    width: '48%',
    borderRadius: theme.spacing.lg,
    overflow: 'hidden',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '15',
    backgroundColor: theme.colors.surface + '30',
  },
  selectedCategoryBlur: {
    borderColor: theme.colors.primary + '30',
    backgroundColor: theme.colors.primary + '15',
  },
  categoryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '50',
  },
  selectedCategoryIcon: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: theme.typography.bodySmall.fontSize,
    fontWeight: theme.typography.labelMedium.fontWeight,
    color: theme.colors.onSurface,
    flex: 1,
    flexWrap: 'wrap',
  },
  selectedCategoryText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.labelLarge.fontWeight,
  },
  locationButtonContainer: {
    borderRadius: theme.spacing.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary + '15',
    backgroundColor: theme.colors.surface + '40',
  },
  locationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  locationText: {
    fontSize: theme.typography.bodyMedium.fontSize,
    color: theme.colors.onSurface,
    flex: 1,
  },
  chevronContainer: {
    width: 28,
    height: 28,
    borderRadius: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  imageButtonContainer: {
    borderRadius: theme.spacing.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
  },
  imageButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary + '20',
    borderStyle: 'dashed',
    backgroundColor: theme.colors.surface + '30',
  },
  imageIconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '60',
  },
  imageButtonText: {
    fontSize: theme.typography.bodyLarge.fontSize,
    fontWeight: theme.typography.labelLarge.fontWeight,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  imageSubtext: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.onSurfaceVariant,
  },
  priorityGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  priorityButtonContainer: {
    flex: 1,
    borderRadius: theme.spacing.md,
    overflow: 'hidden',
  },
  priorityButton: {
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary + '15',
    backgroundColor: theme.colors.surface + '40',
  },
  priorityText: {
    fontSize: theme.typography.labelMedium.fontSize,
    fontWeight: theme.typography.labelMedium.fontWeight,
    color: theme.colors.onSurface,
  },
  priorityNote: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
    lineHeight: theme.typography.bodySmall.fontSize * 1.4,
  },
  submitButtonContainer: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
  },
  submitButtonBlur: {
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '20',
    backgroundColor: theme.colors.surface + '50',
  },
  submitButton: {
    margin: 0,
  },
  aiHintCardBlur: {
    borderRadius: theme.spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primary + '08',
    backgroundColor: theme.colors.surface + '30',
  },
  aiHintCard: {
    padding: theme.spacing.lg,
  },
  aiHint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '15',
    backgroundColor: theme.colors.surface + '50',
  },
  aiHintContent: {
    flex: 1,
  },
  aiHintTitle: {
    fontSize: theme.typography.titleSmall.fontSize,
    fontWeight: theme.typography.titleSmall.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
  },
  aiHintText: {
    fontSize: theme.typography.bodyMedium.fontSize,
    color: theme.colors.onSurfaceVariant,
    lineHeight: theme.typography.bodyMedium.fontSize * 1.4,
  },
});

export default ReportScreen;


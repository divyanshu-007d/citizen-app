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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Report an Issue</Text>
          <Text style={styles.subtitle}>Help make your community better</Text>
        </View>

        {/* Quick Actions */}
        <Card style={styles.quickActionsCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => Alert.alert('Feature Coming Soon', 'Voice report will be available soon!')}
            >
              <FontAwesome5 name="microphone" size={24} color={theme.colors.primary40} />
              <Text style={styles.quickActionText}>Voice Report</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => Alert.alert('Feature Coming Soon', 'Camera report will be available soon!')}
            >
              <FontAwesome5 name="camera" size={24} color={theme.colors.primary40} />
              <Text style={styles.quickActionText}>Quick Photo</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Report Form */}
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Complaint Details</Text>

          <Input
            label="Title *"
            value={title}
            onChangeText={setTitle}
            placeholder="Brief title of the issue"
            leftIcon={<FontAwesome5 name="edit" size={18} color={theme.colors.neutral60} />}
          />

          <Input
            label="Description *"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the issue in detail"
            multiline={true}
            numberOfLines={4}
            leftIcon={<FontAwesome5 name="align-left" size={18} color={theme.colors.neutral60} />}
          />

          {/* Category Selection */}
          <Text style={styles.fieldLabel}>Category *</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory?.id === category.id && styles.selectedCategory
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <FontAwesome5 
                  name={category.icon} 
                  size={20} 
                  color={selectedCategory?.id === category.id ? theme.colors.onPrimary : theme.colors.primary40} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory?.id === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Location */}
          <Text style={styles.fieldLabel}>Location</Text>
          <TouchableOpacity style={styles.locationButton} onPress={handleLocationPicker}>
            <FontAwesome5 name="map-marker-alt" size={18} color={theme.colors.primary40} />
            <Text style={styles.locationText}>
              {location || 'Tap to set location'}
            </Text>
            <FontAwesome5 name="chevron-right" size={16} color={theme.colors.neutral60} />
          </TouchableOpacity>

          {/* Images */}
          <Text style={styles.fieldLabel}>Photos (Optional)</Text>
          <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
            <FontAwesome5 name="camera" size={24} color={theme.colors.primary40} />
            <Text style={styles.imageButtonText}>Add Photos</Text>
            <Text style={styles.imageSubtext}>Max 5 photos</Text>
          </TouchableOpacity>

          {/* Priority Level */}
          <Text style={styles.fieldLabel}>Priority Level</Text>
          <View style={styles.priorityButtons}>
            {['Low', 'Medium', 'High'].map((priority) => (
              <TouchableOpacity
                key={priority}
                style={styles.priorityButton}
                onPress={() => Alert.alert('Auto-Detection', 'Priority will be automatically determined by AI')}
              >
                <Text style={styles.priorityText}>{priority}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.priorityNote}>
            Priority will be automatically determined based on your report
          </Text>
        </Card>

        {/* Submit Button */}
        <Button
          title="Submit Complaint"
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />

        {/* AI Assistant Hint */}
        <Card style={styles.aiHintCard}>
          <View style={styles.aiHint}>
            <FontAwesome5 name="robot" size={20} color={theme.colors.primary40} />
            <Text style={styles.aiHintText}>
              💡 Try our AI Voice Assistant for faster reporting!
            </Text>
          </View>
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
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.headlineMedium,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
  },
  quickActionsCard: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.primary40 + '10',
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  quickActionText: {
    ...theme.typography.labelMedium,
    color: theme.colors.primary40,
    marginTop: theme.spacing.xs,
    fontWeight: '600',
  },
  formCard: {
    marginBottom: theme.spacing.lg,
  },
  fieldLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  categoryButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    marginRight: '2%',
    borderRadius: theme.borderRadius.medium,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: 'transparent',
  },
  selectedCategory: {
    backgroundColor: theme.colors.primary40,
    borderColor: theme.colors.primary40,
  },
  categoryText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  selectedCategoryText: {
    color: theme.colors.onPrimary,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  locationText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  imageButton: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    marginBottom: theme.spacing.md,
  },
  imageButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary40,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
  },
  imageSubtext: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.6,
    marginTop: theme.spacing.xs,
  },
  priorityButtons: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  priorityButton: {
    flex: 1,
    padding: theme.spacing.sm,
    marginRight: theme.spacing.xs,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.surfaceContainer,
    alignItems: 'center',
  },
  priorityText: {
    ...theme.typography.labelMedium,
    color: theme.colors.text,
  },
  priorityNote: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  submitButton: {
    marginBottom: theme.spacing.lg,
  },
  aiHintCard: {
    marginBottom: theme.spacing.lg,
  },
  aiHint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiHintText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
});

export default ReportScreen;


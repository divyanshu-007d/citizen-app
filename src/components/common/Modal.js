// src/components/common/Modal.js
import React from 'react';
import { Modal as RNModal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../design-system';
import Card from './Card';

/**
 * Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {Function} props.onClose - Function to call when modal should be closed
 * @param {React.ReactNode} props.children - Content of the modal
 * @param {string} props.animationType - 'slide' | 'fade' | 'none'
 */
const Modal = ({ visible, onClose, children, animationType = 'fade' }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Card style={styles.modalContent}>
              {children}
            </Card>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const createStyles = (theme) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
  },
});

export default Modal;

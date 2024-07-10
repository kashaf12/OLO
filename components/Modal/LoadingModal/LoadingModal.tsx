import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';

import { LoadingModalProps } from './LocationModal.types';
import styles from './styles';

function LoadingModal({
  modalVisible = false,
  color,
  title,
  darkMode = false,
  modalStyle,
  textStyle,
}: LoadingModalProps) {
  return (
    <Modal animationType="fade" transparent visible={modalVisible} statusBarTranslucent>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, darkMode && { backgroundColor: '#121212' }, modalStyle]}>
          <ActivityIndicator size="large" color={color} />
          <Text style={[styles.modalText, darkMode && { color: 'white' }, textStyle]}>
            {title ? title + ' ' : ''}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
export default React.memo(LoadingModal);

import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, View, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';

import { UploadImageModalProps } from './UploadImageModal.types';
import styles from './styles';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

function UploadImageModal({
  onBackPress = () => null,
  onCameraPress = () => null,
  onGalleryPress = () => null,
  onRemovePress = () => null,
  isLoading = false,
  modalVisible = false,
}: UploadImageModalProps) {
  return (
    <Modal animationType="slide" transparent visible={modalVisible}>
      <Pressable onPress={onBackPress} style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextDefault H4 bold>
            Profile Photo
          </TextDefault>
          {isLoading && <ActivityIndicator size={scale(70)} color={COLORS.buttonbackground} />}
          {!isLoading && (
            <View style={styles.buttonsRow}>
              <TouchableOpacity onPress={onCameraPress} style={styles.button}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={30}
                  color={COLORS.buttonbackground}
                />
                <TextDefault H5 bolder>
                  Camera
                </TextDefault>
              </TouchableOpacity>
              <TouchableOpacity onPress={onGalleryPress} style={styles.button}>
                <MaterialCommunityIcons
                  name="image-outline"
                  size={30}
                  color={COLORS.buttonbackground}
                />
                <TextDefault H5 bolder>
                  Gallery
                </TextDefault>
              </TouchableOpacity>
              <TouchableOpacity onPress={onRemovePress} style={styles.button}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={30}
                  color={COLORS.errorColor}
                />
                <TextDefault H5 bolder style={{ color: COLORS.errorColor }}>
                  Remove
                </TextDefault>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

export default React.memo(UploadImageModal);

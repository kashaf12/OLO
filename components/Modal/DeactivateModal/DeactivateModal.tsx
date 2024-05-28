import React from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';

import { DeactivateModalProps } from './DeactivateModal.types';
import styles from './styles';
import { TextDefault } from '../../Text';

import { alignment } from '@/utils';

function DeactivateModal(props: DeactivateModalProps) {
  return (
    <Modal animationType="slide" transparent visible={props.modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextDefault bolder H4 style={{ width: '100%' }}>
            Deactivate account
          </TextDefault>
          <TextDefault style={alignment.MTmedium}>
            Are you sure you want to deactive your account? this action cannot be undone
          </TextDefault>
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.button} onPress={props.onModalToggle}>
              <View style={styles.buttonText}>
                <TextDefault bold H5>
                  Cancel
                </TextDefault>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.onModalToggle}>
              <View style={styles.buttonText}>
                <TextDefault bold H5>
                  Deactivate
                </TextDefault>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default React.memo(DeactivateModal);

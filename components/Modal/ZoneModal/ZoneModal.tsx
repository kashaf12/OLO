import { Entypo } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Modal,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ZoneModalProps } from './ZoneModal.types';
import styles from './styles';
import { ModalHeader } from '../../Header';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

function ZoneModal({ visible, onModalToggle, error, data, setZone, location }: ZoneModalProps) {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <SafeAreaView edges={['top', 'bottom']} style={[styles.safeAreaViewStyles, styles.flex]}>
        <KeyboardAvoidingView
          style={[styles.flex]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.flex, styles.mainContainer]}>
            <ModalHeader closeModal={onModalToggle} title="Location" />
            <View style={styles.body}>
              <TextDefault textColor={COLORS.fontSecondColor} uppercase style={styles.title}>
                Choose State
              </TextDefault>
            </View>

            {error ? (
              <TextDefault>{error.message}</TextDefault>
            ) : (
              <FlatList
                contentContainerStyle={alignment.PBlarge}
                showsVerticalScrollIndicator={false}
                data={data.zones || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={styles.stateBtn}
                    onPress={() => {
                      setZone({ value: item.id, label: item.title });
                      onModalToggle();
                    }}>
                    <TextDefault style={styles.flex}>{item.title}</TextDefault>
                    {location?.value === item.id && (
                      <Entypo name="check" size={scale(15)} color={COLORS.fontMainColor} />
                    )}
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
export default React.memo(ZoneModal);

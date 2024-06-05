import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LocationModalProps } from './LocationModal.types';
import styles from './styles';
import { ModalHeader } from '../../Header';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

function LocationModal({
  loading,
  data,
  setFilters,
  onModalToggle,
  visible,
  onPressStorageLocation,
  error,
}: LocationModalProps) {
  function btnLocation(zone: { id: string; title: string }) {
    setFilters({ zone: zone.id, title: zone.title, latitude: null, longitude: null });
    onModalToggle();
  }

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <SafeAreaView edges={['top', 'bottom']} style={[styles.safeAreaViewStyles, styles.flex]}>
        <KeyboardAvoidingView
          style={[styles.flex]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.flex, styles.mainContainer]}>
            <ModalHeader closeModal={onModalToggle} title="Location" />
            <View style={styles.body}>
              <View style={styles.headerContents}>
                <View style={styles.closeBtn}>
                  <TouchableOpacity onPress={onModalToggle} style={styles.backBtn}>
                    <Ionicons name="search" size={scale(17)} color={COLORS.headerText} />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.inputAddress}
                    placeholderTextColor={COLORS.fontSecondColor}
                    placeholder="Search city, area or neighbour"
                  />
                </View>
                <TouchableOpacity style={styles.currentLocation} onPress={onPressStorageLocation}>
                  <MaterialCommunityIcons
                    name="target"
                    size={scale(25)}
                    color={COLORS.spinnerColor}
                  />
                  <View style={alignment.PLsmall}>
                    <TextDefault textColor={COLORS.spinnerColor} H5 bold>
                      Use current location
                    </TextDefault>
                    {loading && (
                      <TextDefault
                        numberOfLines={1}
                        textColor={COLORS.fontMainColor}
                        light
                        small
                        style={{ ...alignment.MTxSmall, width: '85%' }}>
                        Fetching location...
                      </TextDefault>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
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
                  <TouchableOpacity style={styles.stateBtn} onPress={() => btnLocation(item)}>
                    <TextDefault style={styles.flex}>{item.title}</TextDefault>
                    <Entypo
                      name="chevron-small-right"
                      size={scale(20)}
                      color={COLORS.fontMainColor}
                    />
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
export default React.memo(LocationModal);

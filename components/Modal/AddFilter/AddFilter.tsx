import React from 'react';
import { FlatList, Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';

import { AddFilterProps } from './AddFilter.types';
import styles from './styles';
import { ModalHeader } from '../../Header';
import { TextDefault } from '../../Text';

const OPTIONS = [
  {
    value: 'ALL',
    title: 'View all',
  },
  {
    value: 'ACTIVE',
    title: 'Active Ads',
  },
  {
    value: 'INACTIVE',
    title: 'Inactive Ads',
  },
  {
    value: 'PENDING',
    title: 'Pending Ads',
  },
];

function AddFilter({ visible, onModalToggle, setFilter }: AddFilterProps) {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <SafeAreaView style={[styles.safeAreaViewStyles, styles.flex]}>
        <View style={[styles.flex, styles.mainContainer]}>
          <ModalHeader closeModal={onModalToggle} title="Filters" />
          <FlatList
            data={OPTIONS}
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.body}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.stateBtn}
                onPress={() => {
                  onModalToggle();
                  setFilter(item);
                }}>
                <TextDefault style={[styles.flex, styles.font]} H5>
                  {item.title}
                </TextDefault>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
export default React.memo(AddFilter);

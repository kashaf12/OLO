import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';

import { SearchModalProps } from './SearchModal.types';
import styles from './styles';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

function SearchModal({ setSearch, onModalToggle, visible, categories }: SearchModalProps) {
  const [text, setText] = useState('');

  function handleNavigate(item?: string) {
    if (item) {
      setSearch(item);
    } else {
      setSearch(text);
    }
    onModalToggle();
  }

  function header() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerContents}>
          <View style={styles.closeBtn}>
            <TouchableOpacity onPress={onModalToggle} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={scale(23)} color={COLORS.headerText} />
            </TouchableOpacity>
            <TextInput
              style={styles.inputText}
              placeholderTextColor={COLORS.fontSecondColor}
              placeholder="Find Cars, Mobile, Phone and more..."
              value={text}
              onChange={(e) => {
                setText(e.nativeEvent.text);
              }}
            />
            <TouchableOpacity onPress={() => handleNavigate()} style={styles.searchBtn}>
              <Ionicons name="search" size={scale(20)} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerContents}>
          <View style={styles.closeBtn}>
            <TouchableOpacity onPress={() => handleNavigate()} style={styles.backBtn}>
              <SimpleLineIcons name="location-pin" size={scale(17)} color={COLORS.headerText} />
            </TouchableOpacity>
            <TextInput
              style={styles.inputAddress}
              placeholderTextColor={COLORS.fontSecondColor}
              placeholder="Search city, area or neighbour"
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <SafeAreaView style={[styles.safeAreaViewStyles, styles.flex]}>
        <View style={[styles.flex, styles.mainContainer]}>
          {header()}
          <View style={styles.body}>
            <TextDefault textColor={COLORS.fontSecondColor} light uppercase>
              Popular categories
            </TextDefault>
            {categories.map((item, index) => (
              <TouchableOpacity
                onPress={() => handleNavigate(item.title)}
                style={styles.category}
                key={index}>
                <Ionicons name="search" size={scale(20)} color={COLORS.buttonbackground} />
                <TextDefault textColor={COLORS.fontSecondColor} H5 style={styles.fontText}>
                  {item.title}
                </TextDefault>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
export default React.memo(SearchModal);

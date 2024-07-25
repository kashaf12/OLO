import { Feather, FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { MainHeaderProps } from './MainHeader.types';
import styles from './styles';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

function MainHeader({
  onPressNotification,
  inset,
  onModalToggle,
  locationText,
  toggleSearch,
  search,
}: MainHeaderProps) {
  return (
    <View style={[styles.headerBackground, { paddingTop: inset.top }]}>
      <TouchableOpacity activeOpacity={1} onPress={onModalToggle} style={styles.row}>
        <MaterialIcons name="location-on" size={scale(25)} color={COLORS.headerText} />
        <TextDefault numberOfLines={1} textColor={COLORS.headerText} H5 style={styles.title}>
          {locationText}
        </TextDefault>
        <Feather name="chevron-down" size={scale(20)} color={COLORS.fontSecondColor} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={toggleSearch} activeOpacity={1} style={styles.inputConainer}>
          <Octicons name="search" size={scale(18)} color={COLORS.headerText} />
          <TextDefault textColor={COLORS.fontSecondColor} style={styles.searchBar} light>
            {search ? search : 'Find Cars, Mobile Phone and more...'}
          </TextDefault>
        </TouchableOpacity>
        <BorderlessButton style={styles.bellBtn} onPress={onPressNotification}>
          <FontAwesome name="bell-o" size={scale(18)} color={COLORS.headerText} />
        </BorderlessButton>
      </View>
    </View>
  );
}
export default React.memo(MainHeader);

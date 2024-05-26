import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { CurrentLocationProps } from './CurrentLocation.types';
import styles from './styles';

import { LocationPermission, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { scale } from '@/utils';

function CurrentLocation({
  style = {
    backgroundColor: COLORS.selectedText,
    paddingTop: 0,
    paddingBottom: 0,
  },
  onPressSetCurrentLocation = () => null,
  onPressSelectLocation = () => null,
}: CurrentLocationProps) {
  return (
    <>
      <View
        style={[
          styles.flex,
          {
            backgroundColor: style.backgroundColor,
            paddingTop: style.paddingTop,
          },
        ]}>
        <View style={[styles.flex, styles.screenBackground]}>
          <View style={styles.subContainerImage}>
            <View style={styles.imageContainer}>
              <LocationPermission width={scale(300)} height={scale(300)} />
            </View>
            <View style={styles.descriptionEmpty}>
              <TextDefault textColor={COLORS.themeBackground} bolder center>
                Olo uses your location to show the products near you!
              </TextDefault>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.emptyButton}
              onPress={onPressSetCurrentLocation}>
              <TextDefault textColor="#fff" bolder center uppercase>
                use current location
              </TextDefault>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.linkButton}
            onPress={onPressSelectLocation}>
            <TextDefault textColor={COLORS.white} H5 bold center>
              Select another location
            </TextDefault>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingBottom: style.paddingBottom }} />
    </>
  );
}

export default CurrentLocation;

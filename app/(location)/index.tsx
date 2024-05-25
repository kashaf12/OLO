import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import LocationPermission from '@/components/LocationPermission';
import { COLORS } from '@/constants';
import { scale, alignment } from '@/utils';

function CurrentLocation() {
  const inset = useSafeAreaInsets();
  console.log(inset);
  return (
    <SafeAreaView>
      <View
        style={[
          styles.flex,
          {
            backgroundColor: COLORS.selectedText,
            paddingTop: inset.top,
          },
        ]}>
        <View style={[styles.flex, styles.screenBackground]}>
          <View style={styles.subContainerImage}>
            <View style={styles.imageContainer}>
              <LocationPermission width={scale(300)} height={scale(300)} />
            </View>
            <View style={styles.descriptionEmpty}>
              {/* <TextDefault textColor={colors.themeBackground} bolder center>
                {'Olo uses your location to show the products near you!'}
              </TextDefault> */}
            </View>
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.emptyButton}
              onPress={setCurrentLocation}>
              <TextDefault textColor={'#fff'} bolder center uppercase>
                {'use current location'}
              </TextDefault>
            </TouchableOpacity> */}
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={styles.linkButton}
            onPress={() => {
              navigation.navigate('SelectLocation');
            }}>
            <TextDefault textColor={colors.white} H5 bold center>
              {'Select another location'}
            </TextDefault>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={{ paddingBottom: inset.bottom }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screenBackground: {
    backgroundColor: '#FFF',
  },
  subContainerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MBlarge,
  },
  image: {
    width: scale(100),
    height: scale(100),
  },
  descriptionEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.Plarge,
  },
  emptyButton: {
    width: '80%',
    height: '5%',
    backgroundColor: COLORS.spinnerColor1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  linkButton: {
    ...alignment.Pmedium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default CurrentLocation;

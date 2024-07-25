import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import Constants from 'expo-constants';
import React, { useCallback, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './styles';
import { LocationPickerBottomSheetI, LocationPickerBottomSheetProps } from './types';
import { TextDefault } from '../Text';

import { COLORS } from '@/constants';

const defaultSnapPoints = ['75%'];
const API_KEY =
  Constants.expoConfig?.extra?.googlePlaceAPIkey || process.env.EXPO_PUBLIC_PLACES_API_KEY;

const LocationPickerBottomSheet = React.forwardRef<
  LocationPickerBottomSheetI,
  LocationPickerBottomSheetProps
>((props, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onOpen = useCallback(() => {
    bottomSheetModalRef.current?.present?.();
  }, [bottomSheetModalRef]);

  const onClose = useCallback(() => {
    bottomSheetModalRef.current?.close?.();
  }, [bottomSheetModalRef]);

  useImperativeHandle(ref, () => ({ onOpen, onClose }), [onClose, onOpen]);

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={defaultSnapPoints}
        backdropComponent={renderBackdrop}
        {...props}>
        <View style={styles.containerStyle}>
          <TextDefault H3 style={styles.textStyle}>
            Select a location
          </TextDefault>
          <GooglePlacesAutocomplete
            placeholder="Search for area, street or locality..."
            fetchDetails
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: API_KEY,
              language: 'en',
              components: 'country:ind',
            }}
            renderLeftButton={() => (
              <Ionicons
                name="search"
                size={24}
                color={COLORS.buttonbackground}
                style={styles.leftIconStyle}
              />
            )}
            textInputProps={{
              InputComp: BottomSheetTextInput,
              leftIcon: { type: 'font-awesome', name: 'chevron-left' },
              errorStyle: { color: 'red' },
            }}
            onFail={(e) => console.log('onFail', e)}
            onNotFound={() => console.log('onNotFound')}
            onTimeout={() => console.log('onTimeout')}
            styles={{
              textInputContainer: styles.inputTextContainer,
              poweredContainer: {
                justifyContent: 'center',
              },
            }}
          />
        </View>
      </BottomSheetModal>
    </>
  );
});

export default LocationPickerBottomSheet;

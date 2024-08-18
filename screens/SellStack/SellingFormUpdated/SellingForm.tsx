import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ColorValueType,
  ErrorType,
  FormValueType,
  SellingFormI,
  SellingFormProps,
} from './SellingForm.types';
import styles from './styles';

import {
  CategoryPicker,
  EmptyButton,
  FlashMessage,
  HorizontalImagePreview,
  LocationPickerBottomSheet,
  TextDefault,
} from '@/components';
import { LocationPickerBottomSheetI } from '@/components/LocationPickerBottomSheet/types';
import { COLORS } from '@/constants';
import { getCurrentLocationResponse } from '@/hooks/useLocationPermission/types';
import { alignment, scale } from '@/utils';

const CONDITIONS = [
  {
    value: 'working',
    title: 'Working',
  },
  {
    value: 'not_working',
    title: 'Not Working',
  },
];

const SellingForm = React.forwardRef<SellingFormI, SellingFormProps>(({ onPressNext }, ref) => {
  const [margin, marginSetter] = useState(false);
  const [color, setColor] = useState<ColorValueType>({
    category: COLORS.fontMainColor,
    title: COLORS.fontMainColor,
    description: COLORS.fontMainColor,
    location: COLORS.fontMainColor,
    price: COLORS.fontMainColor,
    images: COLORS.fontMainColor,
  });
  const [value, setValue] = useState<FormValueType>({
    category: '',
    title: '',
    description: '',
    price: '',
    location: null,
    images: [],
  });
  const [error, setError] = useState<ErrorType | null>(null);

  const bottomSheetRef = useRef<LocationPickerBottomSheetI>(null);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const resetForm = () => {
    setError(null);
    setColor({
      category: COLORS.fontMainColor,
      title: COLORS.fontMainColor,
      description: COLORS.fontMainColor,
      location: COLORS.fontMainColor,
      price: COLORS.fontMainColor,
      images: COLORS.fontMainColor,
    });

    setValue({ category: '', title: '', description: '', price: '', location: null, images: [] });
  };

  useImperativeHandle(ref, () => ({ resetForm }), [resetForm]);

  function _keyboardDidShow() {
    marginSetter(true);
  }
  function _keyboardDidHide() {
    marginSetter(false);
  }

  function validate() {
    let result = true;
    const error: ErrorType = {};

    if (!value?.title || value?.title?.length < 1) {
      error.title = 'This is mandatory. Please complete the required field.';
      result = false;
    }
    if (!value?.description || value?.description.length < 1) {
      error.description = 'This is mandatory. Please complete the required field.';
      result = false;
    }
    if (value?.category === '') {
      error.category = 'This is mandatory. Please complete the required field.';
      result = false;
    }
    if (!Array.isArray(value.images) || value.images.length < 1) {
      error.images = 'This is mandatory. Please add atleast 1 image.';
      result = false;
    }
    if (!value?.location) {
      error.location = 'This is mandatory. Please complete the required field.';
      result = false;
    }

    setError(error);
    return result;
  }

  const handleOnClickNext = () => {
    if (validate()) {
      onPressNext?.(value);
    }
  };

  const handlePresentModalPress = () => bottomSheetRef.current?.onOpen();

  const onLocationSelected = (response: getCurrentLocationResponse) => {
    bottomSheetRef.current?.onClose();
    if (response.error) {
      FlashMessage({
        message: response.message ?? 'Failed to get current location',
      });
      return;
    }
    setValue({ ...value, location: response });
  };
  return (
    <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
      <KeyboardAvoidingView
        style={[styles.flex, styles.mainContainer]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={{ flexGrow: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: margin ? scale(75) : 0 }}
          style={[styles.flex, styles.mainContainer]}>
          <View style={[styles.flex, { justifyContent: 'space-between' }, styles.parentGrouping]}>
            <View style={[styles.width100, styles.subContainer, styles.innerGrouping]}>
              <TextDefault
                textColor={error?.category ? COLORS.google : COLORS.fontMainColor}
                H5
                bold
                style={styles.width100}>
                Category *
              </TextDefault>
              <CategoryPicker
                onSelectCategory={(s) => {
                  setError({ ...error, category: null });
                  setValue({
                    ...value,
                    category: s,
                  });
                }}
              />
              {error?.category && (
                <TextDefault textColor={COLORS.google} style={styles.width100}>
                  {error?.category}
                </TextDefault>
              )}
            </View>
            <View style={styles.line} />
            <View style={[styles.subContainer, styles.innerGrouping]}>
              <TextDefault
                textColor={error?.title ? COLORS.google : color.title}
                H5
                bold
                style={styles.width100}>
                Ad title *
              </TextDefault>
              <View style={[styles.textContainer, { borderColor: color.title }]}>
                <TextInput
                  style={styles.inputText}
                  maxLength={70}
                  onFocus={() => {
                    setError({ ...error, title: null });
                    setColor({ ...color, title: COLORS.selectedText });
                  }}
                  defaultValue={value.title}
                  onBlur={() => setColor({ ...color, title: COLORS.fontMainColor })}
                  onChangeText={(text) => setValue({ ...value, title: text })}
                  placeholderTextColor={COLORS.fontSecondColor}
                  placeholder="Key Features of your item "
                />
              </View>
              <TextDefault light small right style={alignment.MTxSmall}>
                {value?.title?.length + '/ 70'}
              </TextDefault>
              {error?.title && (
                <TextDefault textColor={COLORS.google} style={styles.width100}>
                  {error?.title}
                </TextDefault>
              )}
            </View>
            <View style={[styles.subContainer, styles.innerGrouping]}>
              <TextDefault
                textColor={error?.description ? COLORS.google : color.description}
                H5
                bold
                style={styles.width100}>
                Additional information *
              </TextDefault>
              <View style={[styles.descriptionContainer, { borderColor: color.description }]}>
                <TextInput
                  style={styles.inputText}
                  maxLength={4096}
                  multiline
                  defaultValue={value.description}
                  onFocus={() => {
                    setError({
                      ...error,
                      description: null,
                    });
                    setColor({
                      ...color,
                      description: COLORS.selectedText,
                    });
                  }}
                  onBlur={() => setColor({ ...color, description: COLORS.fontMainColor })}
                  onChangeText={(text) => setValue({ ...value, description: text })}
                  placeholderTextColor={COLORS.fontSecondColor}
                  placeholder="Include condition, features and reasons for selling "
                />
              </View>
              <TextDefault light small right style={alignment.MTxSmall}>
                {value?.description?.length + '/ 4096'}
              </TextDefault>
              {error?.description && (
                <TextDefault textColor={COLORS.google} style={styles.width100}>
                  {error?.description}
                </TextDefault>
              )}
            </View>
            <View style={styles.line} />
            <View style={[styles.width100, styles.subContainer]}>
              <TextDefault
                textColor={error?.working ? COLORS.google : COLORS.fontMainColor}
                H5
                bold
                style={styles.width100}>
                Working *
              </TextDefault>
              <View style={styles.subContainerRow}>
                {CONDITIONS.map((item, index) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.conditionBox,
                      styles.boxContainer,
                      item.value === value.working ? styles.selected : styles.notSelected,
                    ]}
                    onPress={() => {
                      setValue({ ...value, working: item?.value || '' });
                      setError({ ...error, working: null });
                    }}>
                    <TextDefault
                      style={
                        item.value === value?.working ? styles.selectedText : styles.unSelectedText
                      }>
                      {item.title}
                    </TextDefault>
                  </TouchableOpacity>
                ))}
              </View>
              {error?.working && (
                <TextDefault textColor={COLORS.google} style={styles.width100}>
                  {error?.working}
                </TextDefault>
              )}
            </View>
            <View style={[styles.width100, styles.subContainer, styles.innerGrouping]}>
              <TextDefault
                textColor={error?.images ? COLORS.google : COLORS.fontMainColor}
                H5
                bold
                style={styles.width100}>
                Images *
              </TextDefault>
              <View style={[]}>
                <HorizontalImagePreview
                  imagesUri={value.images || []}
                  setImagesUri={(response) => {
                    setValue({ ...value, images: response });
                  }}
                />
              </View>
              {error?.images && (
                <TextDefault textColor={COLORS.google} style={styles.width100}>
                  {error?.images}
                </TextDefault>
              )}
            </View>
            <View style={[styles.width100, styles.subContainer, styles.innerGrouping]}>
              <TextDefault
                textColor={error?.category ? COLORS.google : COLORS.fontMainColor}
                H5
                bold
                style={styles.width100}>
                Price *
              </TextDefault>
              <View style={[styles.textContainer, { borderColor: color.title }]}>
                <TextInput
                  style={styles.inputText}
                  maxLength={70}
                  onFocus={() => {
                    setError({ ...error, price: null });
                    setColor({ ...color, price: COLORS.selectedText });
                  }}
                  defaultValue={value?.price}
                  onBlur={() => setColor({ ...color, price: COLORS.fontMainColor })}
                  onChangeText={(text) => setValue({ ...value, price: text })}
                  placeholderTextColor={COLORS.fontSecondColor}
                  placeholder="₹"
                  keyboardType="numeric"
                />
              </View>
              {error?.price && (
                <TextDefault textColor={COLORS.google} style={styles.width100}>
                  {error?.price}
                </TextDefault>
              )}
            </View>
            <View style={styles.line} />
            <View style={styles.locationContainer}>
              <TextDefault textColor={color.location} H5 bold style={styles.width100}>
                Location *
              </TextDefault>
              <TouchableOpacity style={styles.inputConainer} onPress={handlePresentModalPress}>
                <TextDefault style={styles.flex}>
                  {value.location ? value.location?.address?.name : 'Select Location'}
                </TextDefault>
                <Entypo name="chevron-down" size={scale(15)} color={COLORS.fontMainColor} />
              </TouchableOpacity>
              {error?.location && (
                <TextDefault textColor={COLORS.google} style={styles.width100}>
                  {error?.location}
                </TextDefault>
              )}
            </View>
            <View style={styles.buttonView}>
              <EmptyButton title="Upload Listing" onPress={handleOnClickNext} />
            </View>
          </View>
        </ScrollView>
        <LocationPickerBottomSheet ref={bottomSheetRef} onLocationSelected={onLocationSelected} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

export default React.memo(SellingForm);

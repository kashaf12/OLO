import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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

import { SellingFormProps } from './SellingForm.types';
import styles from './styles';

import { EmptyButton, TextDefault, ZoneModal } from '@/components';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const CONDITIONS = [
  {
    value: 'new',
    title: 'New',
  },
  {
    value: 'used',
    title: 'Used',
  },
];

const items = [
  { id: '1', label: 'Item 1', value: 'item1', title: 'item1' },
  { id: '2', label: 'Item 2', value: 'item2', title: 'item2' },
];

function SellingForm({ editProduct, onPressNext }: SellingFormProps) {
  const [margin, marginSetter] = useState(false);
  const [condition, setCondition] = useState<string | null>(null);
  const [adColor, setAdColor] = useState(COLORS.fontMainColor);
  const [descriptionColor, setDescriptionColor] = useState(COLORS.fontMainColor);
  const [locationColor] = useState(COLORS.fontMainColor);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<{
    value: string;
    label: string;
  }>({ value: '', label: '' });
  const [titleError, setTitleError] = useState<string | null>(null);
  const [conditionError, setConditionError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (editProduct) {
      didFocus();
    }
  }, []);

  async function didFocus() {
    setTitle(editProduct?.title || '');
    setDescription(editProduct?.description || '');
    setLocation({ value: editProduct?.zone.id || '', label: editProduct?.zone?.title || '' });
    setCondition(editProduct?.condition || '');
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  // useEffect(() => {
  //   async () => {
  //     // await AsyncStorage.setItem('formData', null);
  //   };
  // }, []);

  function _keyboardDidShow() {
    marginSetter(true);
  }
  function _keyboardDidHide() {
    marginSetter(false);
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  // function validate() {
  //   let result = true;
  //   if (title.length < 1) {
  //     setTitleError('This is mandatory. Please complete the required field.');
  //     result = false;
  //   }
  //   if (description.length < 1) {
  //     setDescriptionError('This is mandatory. Please complete the required field.');
  //     result = false;
  //   }
  //   if (condition === null) {
  //     setConditionError('This is mandatory. Please complete the required field.');
  //     result = false;
  //   }
  //   if (location === '') {
  //     setLocationError('This is mandatory. Please complete the required field.');
  //     result = false;
  //   }
  //   return result;
  // }

  // if (loading) {
  //   return <Spinner spinnerColor={COLORS.spinnerColor1} backColor={'transparent'} />;
  // }

  // if (error) {
  //   return <TextError text={error.message} />;
  // }
  // let zone = null;
  // if (data) {
  //   zone = [];
  // }

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
          <View style={[styles.flex, { justifyContent: 'space-between' }]}>
            <View>
              <View style={[styles.width100, styles.subContainer]}>
                <TextDefault
                  textColor={conditionError ? COLORS.google : COLORS.fontMainColor}
                  H5
                  bold
                  style={styles.width100}>
                  Condition *
                </TextDefault>
                <View style={styles.subContainerRow}>
                  {CONDITIONS.map((item, index) => (
                    <TouchableOpacity
                      key={item.value}
                      style={[
                        styles.conditionBox,
                        styles.boxContainer,
                        item.value === condition ? styles.selected : styles.notSelected,
                      ]}
                      onPress={() => {
                        setCondition(item?.value || '');
                        setConditionError(null);
                      }}>
                      <TextDefault
                        style={
                          item.value === condition ? styles.selectedText : styles.unSelectedText
                        }>
                        {item.title}
                      </TextDefault>
                    </TouchableOpacity>
                  ))}
                </View>
                {conditionError && (
                  <TextDefault textColor={COLORS.google} style={styles.width100}>
                    {conditionError}
                  </TextDefault>
                )}
              </View>
              <View style={styles.line} />
              <View style={styles.subContainer}>
                <TextDefault
                  textColor={titleError ? COLORS.google : adColor}
                  H5
                  bold
                  style={styles.width100}>
                  Ad title *
                </TextDefault>
                <View style={[styles.textContainer, { borderColor: adColor }]}>
                  <TextInput
                    style={styles.inputText}
                    maxLength={70}
                    onFocus={() => {
                      setTitleError(null);
                      setAdColor(COLORS.selectedText);
                    }}
                    defaultValue={title}
                    onBlur={() => setAdColor(COLORS.fontMainColor)}
                    onChangeText={(text) => setTitle(text)}
                    placeholderTextColor={COLORS.fontSecondColor}
                    placeholder="Key Features of your item "
                  />
                </View>
                <TextDefault light small right style={alignment.MTxSmall}>
                  {title.length + '/ 70'}
                </TextDefault>
                {titleError && (
                  <TextDefault textColor={COLORS.google} style={styles.width100}>
                    {titleError}
                  </TextDefault>
                )}
              </View>
              <View style={styles.line} />
              <View style={styles.subContainer}>
                <TextDefault
                  textColor={descriptionError ? COLORS.google : descriptionColor}
                  H5
                  bold
                  style={styles.width100}>
                  Additional information *
                </TextDefault>
                <View style={[styles.descriptionContainer, { borderColor: descriptionColor }]}>
                  <TextInput
                    style={styles.inputText}
                    maxLength={4096}
                    multiline
                    defaultValue={description}
                    onFocus={() => {
                      setDescriptionError(null);
                      setDescriptionColor(COLORS.selectedText);
                    }}
                    onBlur={() => setDescriptionColor(COLORS.fontMainColor)}
                    onChangeText={(text) => setDescription(text)}
                    placeholderTextColor={COLORS.fontSecondColor}
                    placeholder="Include condition, features and reasons for selling "
                  />
                </View>
                <TextDefault light small right style={alignment.MTxSmall}>
                  {description.length + '/ 4096'}
                </TextDefault>
                {descriptionError && (
                  <TextDefault textColor={COLORS.google} style={styles.width100}>
                    {descriptionError}
                  </TextDefault>
                )}
              </View>
              <View style={styles.line} />
              <View style={styles.locationContainer}>
                <TextDefault textColor={locationColor} H5 bold style={styles.width100}>
                  Location *
                </TextDefault>
                <TouchableOpacity style={styles.inputConainer} onPress={toggleModal}>
                  <TextDefault style={styles.flex}>
                    {location ? location.label : 'Select Location'}
                  </TextDefault>
                  <Entypo name="chevron-down" size={scale(15)} color={COLORS.fontMainColor} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonView}>
              <EmptyButton
                title="Next"
                // onPress={async () => {
                //   // if (validate() && subCategory) {
                //   //console.log('selling form', {id, location, description, title, condition, subCategory, editStatus, price})
                //   // await AsyncStorage.setItem(
                //   //   'formData',
                //   //   JSON.stringify({
                //   //     id,
                //   //     location,
                //   //     description,
                //   //     title,
                //   //     condition,
                //   //     subCategory,
                //   //     editStatus,
                //   //     price,
                //   //     image,
                //   //   })
                //   // );
                //   // navigation.navigate('UploadImage');
                //   // }
                // }}
                onPress={onPressNext}
              />
            </View>
          </View>
        </ScrollView>
        <ZoneModal
          visible={modalVisible}
          setZone={setLocation}
          location={location}
          onModalToggle={toggleModal}
          data={{ zones: items }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default React.memo(SellingForm);

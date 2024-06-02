import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PriceProps } from './Price.types';
import styles from './styles';

import { EmptyButton, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { scale, textStyles } from '@/utils';

// import ConfigurationContext from '../../../context/configuration';

function Price({ defaultFormData, onPressNext }: PriceProps) {
  const [margin, marginSetter] = useState(false);
  const [price, setPrice] = useState('');
  const [focus, setFocus] = useState(false);
  const [adColor, setAdColor] = useState(COLORS.fontPlaceholder);
  // const [, setFormData] = useState<>(null);
  // const configuration = useContext(ConfigurationContext);

  useEffect(() => {
    didFocus();
  }, []);

  async function didFocus() {
    if (defaultFormData) {
      // setFormData(defaultFormData);
      setPrice(defaultFormData.price);
    }
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

  function _keyboardDidShow() {
    marginSetter(true);
  }
  function _keyboardDidHide() {
    marginSetter(false);
  }

  return (
    <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
      <KeyboardAvoidingView
        style={[styles.flex]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={Keyboard.dismiss}
          style={[
            styles.flex,
            styles.mainContainer,
            { paddingBottom: Platform.OS === 'ios' ? (margin ? scale(100) : 0) : 0 },
          ]}>
          <View style={styles.flex}>
            <View style={[styles.inputBorder, { borderBottomColor: adColor }]}>
              <View style={styles.leftText}>
                <TextDefault textColor={COLORS.fontSecondColor} H5>
                  {/* {configuration.currency ?? 'RS'} */}
                  INR
                </TextDefault>
              </View>
              <TextInput
                style={[styles.flex, { ...textStyles.H4 }]}
                textAlignVertical="center"
                placeholder={focus ? '' : 'Price'}
                placeholderTextColor={COLORS.fontThirdColor}
                defaultValue={price.toString()}
                keyboardType="phone-pad"
                onFocus={() => {
                  setFocus(true);
                  setAdColor(COLORS.selectedText);
                }}
                onBlur={() => {
                  setFocus(false);
                  setAdColor(COLORS.fontThirdColor);
                }}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <EmptyButton
              disabled={!price}
              title="Next"
              onPress={async () => {
                if (price) {
                  // await AsyncStorage.setItem('formData', JSON.stringify({ ...formData, price }));
                  onPressNext();
                }
              }}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default React.memo(Price);

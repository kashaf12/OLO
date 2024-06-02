/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';

// import { OutlinedTextField } from 'react-native-material-textfield';

import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';

import { CustomMarker, EmptyButton } from '@/components';
import { verticalScale } from '@/utils';
import { LocationConfirmProps } from './LocationConfirm.types';

// const label_values = [
//   {
//     title: 'Home',
//     value: 'Home',
//   },
//   {
//     title: 'Work',
//     value: 'Work',
//   },
//   {
//     title: 'Other',
//     value: 'Other',
//   },
// ];

const LATITUDE = 33.7001019;
const LONGITUDE = 72.9735978;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.0021;

function LocationConfirm({
  onPressFullMap,
  defaultFormData,
  uploadImage,
  onCreateAd,
}: LocationConfirmProps) {
  // const addressRef = useRef();
  const [delivery_address, setDeliveryAddress] = useState('');
  // const [loader, setLoader] = useState(false);
  const [, setDeliveryAddressError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    editStatus: string;
    image: string;
    newImage: string;

    id: string;
    location: {
      value: string;
    };
    title: string;
    description: string;
    condition: string;
    subCategory: string;
    price: string;
  } | null>(null);
  // const [locLoading] = useState(true);
  const [region] = useState({
    latitude: LATITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitude: LONGITUDE,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    didFocus();
  }, []);

  async function didFocus() {
    if (defaultFormData) setFormData(defaultFormData);
  }

  return (
    <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
      {/* <View style={[styles.flex, styles.mainContainer]}> */}
      {/* <View style={styles.smallContainer}> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <View style={styles.mapContainer}>
            <MapView
              style={{ flex: 1 }}
              scrollEnabled={false}
              zoomEnabled={false}
              zoomControlEnabled={false}
              rotateEnabled={false}
              cacheEnabled
              initialRegion={{
                latitude: LATITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitude: LONGITUDE,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              region={region}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
              onPress={() => {
                onPressFullMap?.({
                  latitude: region.latitude,
                  longitude: region.longitude,
                });
                // navigation.navigate('FullMap', {
                //   currentScreen: 'LocationConfirm',
                //   title: 'Map',
                // });
              }}
            />
            <View
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 1,
                translateX: -25,
                translateY: -25,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ translateX: -25 }, { translateY: -25 }],
              }}>
              <CustomMarker
                width={40}
                height={40}
                transform={[{ translateY: -20 }]}
                translateY={-20}
              />
            </View>
          </View>
          <ScrollView style={styles.flex} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.subContainer}>
              <View style={styles.upperContainer}>
                <View style={styles.addressContainer}>
                  <TextInput
                    clearButtonMode="always"
                    // error={delivery_address_error}
                    // ref={addressRef}
                    value={delivery_address}
                    // label="Full Delivery Address"
                    // labelFontSize={scale(12)}
                    // fontSize={scale(12)}
                    // baseColor="rgb(0, 0, 0)"
                    // maxLength={100}
                    // labelOffset={{ y1: -5 }}
                    // tintColor={!delivery_address_error ? 'rgb(255, 85, 10)' : 'red'}
                    // labelTextStyle={{
                    //   fontSize: scale(12),
                    //   paddingTop: scale(1),
                    // }}
                    onChangeText={(text: string) => {
                      setDeliveryAddress(text);
                    }}
                    onBlur={() => {
                      setDeliveryAddressError(
                        !delivery_address.trim().length ? 'Delivery address is required' : null
                      );
                    }}
                  />
                  <View style={{ marginTop: verticalScale(20) }} />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      {/* </View> */}

      <View style={styles.buttonView}>
        {/* {!delivery_address ? (
          <EmptyButton
            // loading={locLoading}
            disabled={!locLoading}
            title={formData?.editStatus ? 'Update Ad' : 'Save Ad'}
          />
        ) : ( */}
        <EmptyButton
          // loading={loader}
          title={formData?.editStatus ? 'Update Ad' : 'Save Ad'}
          onPress={async () => {
            // setLoader(true);
            let imageUrl = formData?.image;
            if (formData?.newImage) {
              imageUrl = (await uploadImage?.(formData.image)) || '';
            }
            const address = {
              latitude: region.latitude.toString(),
              longitude: region.longitude.toString(),
              address: delivery_address,
            };
            if (formData) {
              console.log(formData.location.value);
              onCreateAd?.({
                _id: formData.id,
                zone: formData.location.value,
                address,
                images: [imageUrl || ''],
                title: formData.title,
                description: formData.description,
                condition: formData.condition,
                subCategory: formData.subCategory,
                price: Number(formData.price),
              });
            }
          }}
        />
        {/* )} */}
      </View>

      {/* </View> */}
    </SafeAreaView>
  );
}
export default React.memo(LocationConfirm);

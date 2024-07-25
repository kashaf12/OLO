import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';

import styles from './styles';

import { TextDefault, Spinner } from '@/components';
import { COLORS } from '@/constants';
import { scale } from '@/utils';

function Card({
  onPressProductDescription,
  images,
  onPressRegistration,
  loading,
  isLike,
  address,
  title,
  price,
}: {
  onPressProductDescription: () => void;
  images: string[];
  onPressRegistration: () => void;
  loading: boolean;
  isLike: boolean;
  address: { address: string };
  title: string;
  price: string;
}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.productCardContainer}
      onPress={() =>
        // navigation.navigate('ProductDescription', {
        //   screen: 'ProductDescription',
        //   params: { product: props },
        // })
        onPressProductDescription()
      }>
      <View style={styles.topCardContainer}>
        <Image
          source={{ uri: images[0] }}
          resizeMode="cover"
          style={styles.imgResponsive}
          defaultSource={require('@/assets/default.png')}
        />
        <TouchableOpacity
          activeOpacity={0}
          onPress={onPressRegistration}
          style={styles.heartContainer}>
          {loading && (
            <Spinner size="small" spinnerColor={COLORS.spinnerColor1} backColor="transparent" />
          )}
          {isLike && !loading && <FontAwesome name="heart" size={scale(18)} color={COLORS.black} />}
          {!isLike && !loading && (
            <FontAwesome name="heart-o" size={scale(18)} color={COLORS.horizontalLine} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.botCardContainer}>
        <View>
          <TextDefault textColor={COLORS.fontMainColor} H5 bolder>
            INR{/* {configuration.currencySymbol} */}
            {price}
          </TextDefault>
          <TextDefault textColor={COLORS.fontSecondColor} numberOfLines={1}>
            {title}
          </TextDefault>
        </View>
        <View style={styles.locationBottom}>
          <SimpleLineIcons name="location-pin" size={scale(15)} color={COLORS.buttonbackground} />
          <TextDefault
            textColor={COLORS.fontSecondColor}
            numberOfLines={1}
            light
            small
            style={styles.locationText}>
            {address.address}
          </TextDefault>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Card);

import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';

import { CardProps } from './Favourite.types';
import styles from './styles';

import { TextDefault, Spinner } from '@/components';
import { COLORS } from '@/constants';
import { scale } from '@/utils';

function Card({
  onPressNavigateToPrductDescription,
  isLoggedIn = false,
  onPressNavigateToRegistration,
  ...props
}: CardProps) {
  const [isLike, isLikeSetter] = useState(false);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     // isLikeSetter(profile.likes ? !!profile.likes.find((like) => like._id === props._id) : false);
  //   } else {
  //     isLikeSetter(false);
  //   }
  // }, [isLoggedIn]);

  const loadingMutation = false;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.productCardContainer}
      onPress={() => onPressNavigateToPrductDescription({ product: props })}>
      <View style={styles.topCardContainer}>
        <Image
          source={{ uri: props.images[0] }}
          resizeMode="cover"
          style={styles.imgResponsive}
          defaultSource={require('@/assets/default.png')}
        />
        <View style={styles.heartContainer}>
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => {
              if (isLoggedIn) {
                // mutate({
                //   variables: {
                //     item: props._id,
                //   },
                // });
                isLikeSetter((prev) => !prev);
              } else {
                onPressNavigateToRegistration();
                // navigation.navigate('Registration');
              }
            }}>
            {loadingMutation && (
              <Spinner size="small" spinnerColor={COLORS.spinnerColor1} backColor="transparent" />
            )}
            {isLike && !loadingMutation && (
              <FontAwesome name="heart" size={scale(18)} color={COLORS.black} />
            )}
            {!isLike && !loadingMutation && (
              <FontAwesome name="heart-o" size={scale(18)} color={COLORS.horizontalLine} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.botCardContainer}>
        <TextDefault numberOfLines={2} textColor={COLORS.fontMainColor}>
          {props.title}
        </TextDefault>
        <TextDefault textColor={COLORS.fontMainColor}>
          {/* {configuration.currencySymbol}  */}
          INR
          {props.price}
        </TextDefault>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Card);

import React from 'react';
import { Switch, View } from 'react-native';

import { NotificationsProps } from './Notifications.types';
import styles from './styles';

import { TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { alignment } from '@/utils';

function Notifications({
  onChangeOfferNotification,
  offerNotification,
  onChangeRecommendation,
  recommendation,
}: NotificationsProps) {
  return (
    <View style={[styles.flex, styles.mainContainer]}>
      <View style={styles.smallContainer}>
        <TextDefault bold H5 style={[alignment.PLlarge, styles.flex]}>
          Special communications & offers
        </TextDefault>
        {/* {loading ? (
          <View style={{ alignSelf: 'flex-end' }}>
            <Spinner
              backColor={'transparent'}
              spinnerColor={COLORS.buttonbackground}
              size={'small'}
            />
          </View>
        ) : ( */}
        <Switch
          trackColor={{ false: COLORS.headerbackground, true: COLORS.buttonbackground }}
          thumbColor={COLORS.containerBox}
          ios_backgroundColor={COLORS.headerbackground}
          onValueChange={onChangeOfferNotification}
          value={offerNotification}
        />
        {/* )} */}
      </View>
      <View style={styles.smallContainer}>
        <TextDefault
          textColor={COLORS.fontPlaceholder}
          bold
          H5
          style={[alignment.PLlarge, styles.flex]}>
          Recomendations
        </TextDefault>
        <Switch
          disabled
          trackColor={{ false: COLORS.headerbackground, true: COLORS.buttonbackground }}
          thumbColor={COLORS.containerBox}
          ios_backgroundColor={COLORS.headerbackground}
          onValueChange={onChangeRecommendation}
          value={recommendation}
        />
      </View>
    </View>
  );
}
export default React.memo(Notifications);

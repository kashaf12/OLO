import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import moment from 'moment';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { BaseButton, BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { CardProps } from './MainAds.types';
import styles from './styles';

import { FlashMessage, TextDefault } from '@/components';
import AdImage from '@/components/AdImage/AdImage';
import { COLORS } from '@/constants';
import { StatusType } from '@/store/ads';
import { alignment, scale } from '@/utils';

function Card({
  onPressNavigateToPrductDescription,
  onPressNavigateToSellingForm,
  onChangeStatus,
  onDeleteAd,
  ...props
}: CardProps) {
  const [deleteBox, setDeletebox] = useState(false);
  const [opacity, setopacity] = useState(1);

  function onBoxToggle() {
    setDeletebox((prev) => !prev);
  }

  function navigateScreen() {
    if (deleteBox) setDeletebox(false);
    else {
      onPressNavigateToPrductDescription({ product: props });
    }
  }

  function deleteAd() {
    if (props.status === 'active') {
      onChangeStatus?.('deactivated');
    }

    onDeleteAd?.();
  }

  function updateStatus(status: StatusType) {
    if (props.status !== status) {
      onChangeStatus?.(status);
    } else {
      FlashMessage({ message: 'No Change in status' });
    }
    onBoxToggle();
  }

  function activeState(data: any) {
    if (data) setopacity(0.5);
    else setopacity(1);
  }

  function getDate(date: FirebaseFirestoreTypes.Timestamp) {
    return moment(date).format('DD MMM YYYY');
  }

  function editAd() {
    onBoxToggle();
    onPressNavigateToSellingForm({ editProduct: props });
    // navigation.navigate('SellingForm', { screen: 'SellingForm', params: { editProduct: props } });
  }
  return (
    <>
      <View
        style={[
          styles.adContainer,
          {
            borderLeftColor:
              props.status === 'deactivated'
                ? COLORS.google
                : props.status === 'active'
                  ? COLORS.activeLine
                  : props.status === 'sold'
                    ? COLORS.selectedText
                    : COLORS.horizontalLine,
          },
        ]}>
        <BaseButton
          onPress={navigateScreen}
          onActiveStateChange={activeState}
          style={{ opacity: Platform.OS === 'ios' ? opacity : 1 }}>
          <View
            style={[
              styles.dateRow,
              {
                flexDirection: 'row',
                alignItems: 'center',
                ...alignment.PTxSmall,
                ...alignment.PBxSmall,
              },
            ]}>
            <TextDefault
              small
              textColor={COLORS.fontSecondColor}
              uppercase
              style={[styles.flex, alignment.PLsmall, {}]}>
              {'From: '}{' '}
              <TextDefault small bold>
                {getDate(props.createdAt as FirebaseFirestoreTypes.Timestamp)}
              </TextDefault>
              {props.status === 'deactivated' && (
                <>
                  {' -To: '}{' '}
                  <TextDefault bold small>
                    {getDate(props.endingAt as FirebaseFirestoreTypes.Timestamp)}
                  </TextDefault>
                </>
              )}
            </TextDefault>
            <BorderlessButton style={alignment.PxSmall} onPress={onBoxToggle}>
              <MaterialCommunityIcons name="dots-vertical" size={scale(20)} color="black" />
            </BorderlessButton>
          </View>

          <View style={[styles.InfoContainer, { zIndex: 0 }]}>
            <AdImage
              adId={props.id}
              imageId={props.images[0].id}
              variant="cover"
              size={150}
              style={styles.imgResponsive}
            />
            <View style={[styles.flex, styles.descriptionContainer]}>
              <View>
                <TextDefault bold>{props.title}</TextDefault>
                <TextDefault style={alignment.PTxSmall}>
                  {/* {configuration.currencySymbol}  */}₹ {props.price}
                </TextDefault>
              </View>
              <View style={styles.locationRow}>
                <View style={styles.Vline}>
                  <MaterialCommunityIcons
                    name="eye-outline"
                    size={scale(15)}
                    color={COLORS.headerText}
                  />
                  <TextDefault numberOfLines={1} small bold style={styles.locationText}>
                    Views:
                    <TextDefault small light>
                      {['pending', 'created'].includes(props.status) ? '-' : props.views}
                    </TextDefault>
                  </TextDefault>
                </View>
                <FontAwesome name="heart" size={scale(13)} color={COLORS.headerText} />
                <TextDefault numberOfLines={1} small bold style={styles.locationText}>
                  Likes:
                  <TextDefault small light>
                    {props?.likesCount || 0}
                  </TextDefault>
                </TextDefault>
              </View>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBox,
                props.status === 'deactivated'
                  ? styles.deactivateStatus
                  : props.status === 'active'
                    ? styles.activeStatus
                    : props.status === 'sold'
                      ? styles.soldStatus
                      : styles.pendingStatus,
              ]}>
              <TextDefault
                textColor={
                  props.status === 'created' ||
                  props.status === 'pending' ||
                  props.status === 'sold' ||
                  props.status === 'deactivated'
                    ? COLORS.white
                    : COLORS.fontMainColor
                }
                uppercase
                small
                bolder>
                {props.status}
              </TextDefault>
            </View>
            <TextDefault style={alignment.MTxSmall}>
              {props.status === 'deactivated'
                ? 'This ad is currently deactivated'
                : props.status === 'active'
                  ? 'This ad is currently live'
                  : 'This ad is being processed and it will be live soon'}
            </TextDefault>
          </View>
          {deleteBox && (
            <View
              style={{
                width: '50%',
                backgroundColor: COLORS.containerBox,
                shadowColor: COLORS.horizontalLine,
                shadowOffset: {
                  width: 1,
                  height: 2,
                },
                shadowOpacity: 0.7,
                shadowRadius: scale(5),
                elevation: 15,
                position: 'absolute',
                right: scale(10),
                top: scale(30),
                zIndex: 1,
              }}>
              {['deactivated'].includes(props.status) && (
                <RectButton disallowInterruption={false} style={alignment.Psmall} onPress={editAd}>
                  <TextDefault H5 bold uppercase>
                    Edit
                  </TextDefault>
                </RectButton>
              )}
              {['sold', 'deactivated'].includes(props.status) && (
                <RectButton style={alignment.Psmall} onPress={deleteAd}>
                  <TextDefault H5 bold uppercase>
                    Delete
                  </TextDefault>
                </RectButton>
              )}
              {['active', 'deactivated'].includes(props.status) && (
                <RectButton
                  style={alignment.Psmall}
                  onPress={() =>
                    updateStatus(props.status === 'deactivated' ? 'active' : 'deactivated')
                  }>
                  <TextDefault H5 bold uppercase>
                    {props.status === 'deactivated' ? 'Activate' : 'Deactivate'}
                  </TextDefault>
                </RectButton>
              )}
              {['active', 'deactivated'].includes(props.status) && (
                <RectButton style={alignment.Psmall} onPress={() => updateStatus('sold')}>
                  <TextDefault H5 bold uppercase>
                    Mark as sold
                  </TextDefault>
                </RectButton>
              )}
            </View>
          )}
        </BaseButton>
      </View>
    </>
  );
}

export default React.memo(Card);

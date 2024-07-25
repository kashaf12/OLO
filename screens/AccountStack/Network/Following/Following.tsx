import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Image, View } from 'react-native';

import { FollowingProps } from './Following.types';
import styles from '../styles';

import { EmptyButton, FollowingCard, TextDefault } from '@/components';
import { FollowingCardProps } from '@/components/Card/FollowingCard/FollowingCard.types';
import { COLORS } from '@/constants';
import { alignment } from '@/utils';

// const empty = false

function emptyView() {
  return (
    <View style={[styles.flex, styles.emptyContainer]}>
      <Image style={styles.emptyImage} source={require('@/assets/followers.png')} />
      <TextDefault H4 center bold style={alignment.MTlarge}>
        You are not following anyone yet.
      </TextDefault>
      <TextDefault H5 center light style={alignment.MTsmall}>
        Start following people you know or like and get notified when they post something new!
      </TextDefault>
    </View>
  );
}
function header({ onPressShare }: Pick<FollowingProps, 'onPressShare'>) {
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.imgResponsive}>
        <Image style={styles.img} source={require('@/assets/notification.png')} />
      </View>
      <View style={styles.notificationText}>
        <TextDefault textColor={COLORS.buttonbackground} H5 center>
          Your followers will be notified when you post new ads
        </TextDefault>
        <View style={{ width: '70%' }}>
          <EmptyButton title="Invite Friends" onPress={onPressShare} />
        </View>
      </View>
    </View>
  );
}
function Following({ onPressShare }: FollowingProps) {
  return (
    <View style={[styles.flex, styles.mainContainer]}>
      <FlashList
        // style={styles.flex}
        // contentContainerStyle={[styles.mainContainer, { flexGrow: 1 }]}
        data={[]}
        ListEmptyComponent={emptyView()}
        estimatedItemSize={20}
        ListHeaderComponent={
          // profile?.following?.length > 0
          //  ?
          header({ onPressShare })
          // : null
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <FollowingCard {...(item as FollowingCardProps)} />}
      />
    </View>
  );
}
export default React.memo(Following);

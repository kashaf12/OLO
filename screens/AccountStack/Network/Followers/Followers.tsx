import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Image, View } from 'react-native';

import { FollowersProps } from './Followers.types';
import styles from '../styles';

import { EmptyButton, FollowerCard, TextDefault } from '@/components';
import { FollowerCardProps } from '@/components/Card/FollowerCard/FollowerCard.types';
import { COLORS } from '@/constants';
import { alignment } from '@/utils';

function emptyView() {
  return (
    <View style={[styles.flex, styles.emptyContainer]}>
      <Image style={styles.emptyImage} source={require('@/assets/followers.png')} />
      <TextDefault H4 center bold style={alignment.MTlarge}>
        You don't have followers yet.
      </TextDefault>
      <TextDefault H5 center light style={alignment.MTsmall}>
        Chat, post or start following somebody so they can follow you.
      </TextDefault>
    </View>
  );
}

function header({ onPressShare }: Pick<FollowersProps, 'onPressShare'>) {
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.imgResponsive}>
        <Image style={styles.img} source={require('@/assets//network.png')} />
      </View>
      <View style={styles.notificationText}>
        <TextDefault textColor={COLORS.buttonbackground} H5 center>
          App is more fun shared with friends
        </TextDefault>
        <View style={{ width: '70%' }}>
          <EmptyButton title="Invite Friends" onPress={onPressShare} />
        </View>
      </View>
    </View>
  );
}
function Followers({ onPressShare }: FollowersProps) {
  return (
    <View style={[styles.flex, styles.mainContainer]}>
      <FlashList
        style={styles.flex}
        // contentContainerStyle={[styles.mainContainer, { flexGrow: 1 }]}
        data={[]}
        estimatedItemSize={20}
        ListEmptyComponent={emptyView()}
        ListHeaderComponent={header({ onPressShare })}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <FollowerCard {...(item as FollowerCardProps)} />}
      />
    </View>
  );
}
export default React.memo(Followers);

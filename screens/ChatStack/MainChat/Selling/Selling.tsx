import React from 'react';
import { Image, View } from 'react-native';

import styles from './styles';

import { EmptyButton, TextDefault } from '@/components';
import { alignment } from '@/utils';

function Selling() {
  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image style={styles.emptyImage} source={require('@/assets/email.png')} />
        <TextDefault H4 center bold style={alignment.MTlarge}>
          No messages, yet?
        </TextDefault>
        <TextDefault H5 center light style={alignment.MTsmall}>
          We'll keep messages for any item you're selling in here
        </TextDefault>

        <EmptyButton title="Start selling" />
      </View>
    );
  }

  return <View style={[styles.flex, styles.mainContainer]}>{emptyView()}</View>;
}

export default React.memo(Selling);

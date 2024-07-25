import React from 'react';
import { Image, View } from 'react-native';

import styles from './styles';

import { EmptyButton, TextDefault } from '@/components';
import { alignment } from '@/utils';

function Buying() {
  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image style={styles.emptyImage} source={require('@/assets/email.png')} />
        <TextDefault H4 center bold style={alignment.MTlarge}>
          You are not buying anything yet.
        </TextDefault>
        <TextDefault H5 center light style={alignment.MTsmall}>
          Explore the products/items to deal with seller.
        </TextDefault>
        <EmptyButton
          title="Explore"
          // onPress={() => navigation.navigate('Main')}
          onPress={() => null}
        />
      </View>
    );
  }

  return <View style={[styles.flex, styles.mainContainer]}>{emptyView()}</View>;
}

export default React.memo(Buying);

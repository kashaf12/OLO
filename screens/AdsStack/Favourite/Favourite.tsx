import React from 'react';
import { FlatList, Image, View } from 'react-native';

import Card from './Card';
import { FavouriteProps } from './Favourite.types';
import styles from './styles';

import { EmptyButton, TextDefault } from '@/components';
import { alignment } from '@/utils';

// const data = [
//     {
//         id: '10',
//         title: 'Japanese 28 inches cycle',
//         price: 'Rs: 22,900',
//         location: 'Peshawar Road, Rawalpindi, Punjab',
//         image: require('../../../../assets/images/products/cycle.jpg')
//     }
// ]

function Favourite({ onPressNavigateToMain, profile }: FavouriteProps) {
  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image style={styles.emptyImage} source={require('@/assets/favourite.png')} />
        <TextDefault H4 center bold style={alignment.MTlarge}>
          You haven't liked anything yet.
        </TextDefault>
        <TextDefault H5 center light style={alignment.MTsmall}>
          Mark the items that you like and share it with the world!
        </TextDefault>
        <EmptyButton title="Discover" onPress={onPressNavigateToMain} />
      </View>
    );
  }

  return (
    <View style={[styles.flex, styles.mainContainer]}>
      {/* {loadingProfile ? ( */}
      {/* <Spinner spinnerColor={COLORS.spinnerColor1} backColor="transparent" /> */}
      {/* ) : errorProfile ? (
        <TextError
          text={errorProfile.message}
          textColor={COLORS.fontThirdColor}
          style={textStyles.Light}
        />
      ) : ( */}
      <FlatList
        data={profile?.likes || []}
        // ||
        style={styles.flex}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={emptyView}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            {...item}
            onPressNavigateToPrductDescription={console.log}
            onPressNavigateToRegistration={console.log}
            isLoggedIn
          />
        )}
      />
      {/* )} */}
    </View>
  );
}

export default React.memo(Favourite);

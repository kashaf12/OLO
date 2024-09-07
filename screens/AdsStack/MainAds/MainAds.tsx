import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, RefreshControl, Image } from 'react-native';

import Card from './Card';
import { AdsProps } from './MainAds.types';
import styles from './styles';

import { AddFilter, EmptyButton, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

function Ads({ refetch, onPressStartSelling, userListedAds, isLoadingAds = false }: AdsProps) {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({
    value: 'ALL',
    title: 'View All',
  });

  function onModalToggle() {
    setVisible((prev) => !prev);
  }

  function search(filter: { value: string; title: string }) {
    if (filter.value === 'ALL') {
      return userListedAds;
    } else if (filter.value === 'INACTIVE') {
      const ads = userListedAds?.filter((item: { status: string }) => {
        if (item.status === 'SOLD' || item.status === 'DEACTIVATED') {
          return item;
        }
      });
      return ads;
    } else {
      const ads = userListedAds?.filter((item: { status: string }) => {
        if (item.status === filter.value) {
          return item;
        }
      });
      return ads;
    }
  }

  const filteredData = userListedAds ? search(filter) : [];

  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image style={styles.emptyImage} source={require('@/assets/ads.png')} />
        <TextDefault H4 center bold style={alignment.MTlarge}>
          You haven't listed anything yet.
        </TextDefault>
        <TextDefault H5 center light style={alignment.MTsmall}>
          Let go of what you don't use anymore
        </TextDefault>
        <EmptyButton title="Start selling" onPress={onPressStartSelling} />
      </View>
    );
  }

  function header() {
    return (
      <TouchableOpacity style={styles.smallContainer} onPress={onModalToggle}>
        <TextDefault bolder H5 style={alignment.PRsmall}>
          {`${filter.title} (${filteredData?.length})`}
        </TextDefault>
        <Feather name="chevron-down" size={scale(15)} color={COLORS.fontSecondColor} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.flex, styles.mainContainer]}>
      <FlatList
        data={filteredData}
        style={styles.flex}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyView}
        ListHeaderComponent={header}
        keyExtractor={(item) => item.id}
        stickyHeaderIndices={[0]}
        refreshControl={<RefreshControl refreshing={isLoadingAds} onRefresh={refetch} />}
        renderItem={({ item }) => {
          return (
            <Card
              {...item}
              onPressNavigateToPrductDescription={console.log}
              onPressNavigateToSellingForm={console.log}
            />
          );
        }}
      />

      <AddFilter visible={visible} onModalToggle={onModalToggle} setFilter={setFilter} />
    </View>
  );
}

export default React.memo(Ads);

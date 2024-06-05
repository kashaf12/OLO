import React, { useState } from 'react';
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from 'react-native';

import Card from './Card';
import styles from './styles';

import { LocationModal, SearchModal, TextDefault, TextError } from '@/components';
import { COLORS } from '@/constants';
import { alignment, textStyles } from '@/utils';

// import Card from './Card/Card';

const COLORS_INDEXES = ['#ffd54d', '#6df8f3', '#ff7a7a', '#d5b09f', '#eccbcb'];

function MainHome({
  loading,
  onPressCategories,
  data,
  onPressSubCategory,
  error,
  setFilters,
  setSearch,
  categoryError,
  categoryData,
  search,
  networkStatus,
  refetch,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSerachVisible] = useState(false);

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  function toggleSearch() {
    setSerachVisible((prev) => !prev);
  }

  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image style={styles.emptyImage} source={require('@/assets/no-data.png')} />
        <TextDefault H5 center bold style={alignment.MTlarge}>
          No data found.
        </TextDefault>
        <TextDefault center light>
          Please contact with your provider!.
        </TextDefault>
      </View>
    );
  }
  function categoryHeader() {
    return (
      <View style={styles.categoryHeader}>
        <TextDefault H5 bold>
          Browse Categories
        </TextDefault>
        <TouchableOpacity style={styles.rightBtn} onPress={onPressCategories}>
          <TextDefault H5 bolder>
            See All
          </TextDefault>
        </TouchableOpacity>
      </View>
    );
  }

  const items = data?.nearByItems ?? [];

  const searchRestaurants = (searchText: string) => {
    const data: any[] = [];
    items.forEach(
      (item: { title: string; subCategory: { title: string; category: { title: string } } }) => {
        const regex = new RegExp(
          searchText.replace(/[\\[\]()+?.*]/g, (c) => '\\' + c),
          'i'
        );
        const result = item.title.search(regex);
        if (result < 0) {
          const result = item.subCategory.title.search(regex);
          if (result < 0) {
            const result = item.subCategory.category.title.search(regex);
            if (result > -1) data.push(item);
            return;
          }
          data.push(item);
          return;
        }
        data.push(item);
      }
    );
    return data;
  };

  function renderHeader() {
    return (
      <>
        <View style={styles.headerContainer}>
          {categoryHeader()}
          {categoryError ? (
            <TextError
              text={categoryError.message}
              textColor={COLORS.fontThirdColor}
              style={textStyles.Light}
            />
          ) : (
            <FlatList
              data={categoryData ? categoryData.categories.slice(0, 5) : []}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.categoryContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.cardContainer}
                  onPress={() =>
                    // navigation.navigate('SubCategories', {
                    //   headerTitle: item.title,
                    //   categoryId: item._id,
                    // })
                    onPressSubCategory()
                  }>
                  <View style={styles.textViewContainer}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: COLORS_INDEXES[index % 5] },
                      ]}>
                      <Image
                        style={styles.imgResponsive}
                        source={{ uri: item.image }}
                        defaultSource={require('@/assets/default.png')}
                      />
                    </View>
                    <TextDefault numberOfLines={1} uppercase small light>
                      {item.title ?? 'Current Location'}
                    </TextDefault>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <View style={styles.spacer} />
        <View style={styles.headerTitle}>
          <TextDefault H5 bold>
            All Ads
          </TextDefault>
        </View>
      </>
    );
  }

  return (
    <View style={[styles.flex, styles.container]}>
      {/* Browswer Container */}
      {error ? (
        <TextError
          text={error.message}
          textColor={COLORS.fontThirdColor}
          style={textStyles.Light}
        />
      ) : (
        <FlatList
          data={search ? searchRestaurants(search) : items}
          style={[styles.flex, styles.flatList]}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: COLORS.containerBox,
            ...alignment.PBlarge,
          }}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={emptyView}
          ListHeaderComponent={renderHeader}
          numColumns={2}
          refreshControl={
            <RefreshControl
              colors={[COLORS.spinnerColor1]}
              refreshing={networkStatus === 4}
              onRefresh={() => {
                if (networkStatus === 7) {
                  refetch();
                }
              }}
            />
          }
          renderItem={({ item }) => <Card {...item} />}
        />
      )}

      {/* Modal */}
      <LocationModal
        visible={modalVisible}
        onModalToggle={toggleModal}
        setFilters={setFilters}
        loading={false}
        data={{ zones: [] }}
        onPressStorageLocation={console.log}
      />
      <SearchModal
        // categories={CategoryData?.categories ?? []}
        categories={[]}
        setSearch={setSearch}
        visible={searchVisible}
        onModalToggle={toggleSearch}
      />
    </View>
  );
}

export default MainHome;

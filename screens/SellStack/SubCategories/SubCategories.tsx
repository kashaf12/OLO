import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SubCategoriesProps } from './SubCategories.types';
import styles from './styles';

import { TextDefault, Spinner, TextError } from '@/components';
import { COLORS } from '@/constants';

const subCategory = [
  { id: '0', title: 'Mobiles', image: require('@/assets/categoryIcon/mobile.png') },
  { id: '1', title: 'Vehicles', image: require('@/assets/categoryIcon/car.png') },
  { id: '2', title: 'Animals', image: require('@/assets/categoryIcon/pet(1).png') },
  { id: '3', title: 'Kids', image: require('@/assets/categoryIcon/stroller.png') },
  {
    id: '4',
    title: 'Property For Sale',
    image: require('@/assets/categoryIcon/sale.png'),
  },
  {
    id: '5',
    title: 'Electronics',
    image: require('@/assets/categoryIcon/monitor.png'),
  },
  { id: '6', title: 'Bikes', image: require('@/assets/categoryIcon/motorcycle.png') },
  { id: '7', title: 'Jobs', image: require('@/assets/categoryIcon/work.png') },
];

function SubCategories({ loading, data, error, onPressSubCategory }: SubCategoriesProps) {
  return (
    <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
      <View style={[styles.flex, styles.container]}>
        {loading ? (
          <Spinner spinnerColor={COLORS.spinnerColor1} backColor="transparent" />
        ) : error ? (
          <TextError text={error?.message || ''} />
        ) : (
          <FlatList
            data={data ? data.subCategoriesById : subCategory}
            style={styles.flatList}
            contentContainerStyle={styles.categoryContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.line} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.categoryRow}
                // onPress={() => navigation.navigate('SellingForm', { subCategory: item._id })}
                onPress={() => onPressSubCategory(item.id)}>
                <TextDefault light H5 style={styles.fontText}>
                  {item.title}
                </TextDefault>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default React.memo(SubCategories);

import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoriesProps } from './Categories.types';
import styles from './styles';

import { TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const category = [
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

// const category = [];

function Categories({ onPressCategory }: CategoriesProps) {
  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image style={styles.emptyImage} source={require('@/assets/no-data.png')} />
        <TextDefault H5 center bold style={alignment.MTlarge}>
          No category found.
        </TextDefault>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
      <View style={[styles.flex, styles.container]}>
        <FlatList
          data={category}
          style={styles.flatList}
          contentContainerStyle={styles.categoryContainer}
          ListEmptyComponent={emptyView}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.spacer} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.categoryRow}
              // onPress={() => navigation.navigate('SubCategories', { headerTitle: item.title })}
              onPress={() => onPressCategory({ id: item.id, title: item.title })}>
              <View style={styles.rowContainer}>
                <View style={styles.image}>
                  <Image
                    style={styles.imgResponsive}
                    source={item.image}
                    defaultSource={require('@/assets/default.png')}
                  />
                </View>
                <TextDefault H5 style={styles.fontText}>
                  {item.title}
                </TextDefault>
                <View style={styles.rightIcon}>
                  <Entypo
                    name="chevron-small-right"
                    size={scale(20)}
                    color={COLORS.buttonbackground}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default React.memo(Categories);

import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MainSellProps } from './MainSell.types';
import styles from './styles';

import { TextDefault } from '@/components';

const MOCK_CATEGORIES = [
  {
    id: '1',
    title: 'Automobiles',
    image: require('@/assets/categories/car.png'),
  },
  {
    id: '2',
    title: 'Electronics',
    image: require('@/assets/categories/electronics.png'),
  },
  {
    id: '3',
    title: 'Home Appliances',
    image: require('@/assets/categories/home-appliances.png'),
  },
  {
    id: '4',
    title: 'Tools',
    image: require('@/assets/categories/tools.png'),
  },
];

function MainSell({ onPressCategory }: MainSellProps) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.flex}>
      {/* {loading ? ( */}
      {/* <Spinner spinnerColor={colors.spinnerColor1} backColor={'transparent'} /> */}
      {/* ) : error ? ( */}
      {/* <TextError text={error.message} /> */}
      {/* ) : ( */}
      <FlashList
        //   style
        //   data={data ? data.categories : []}
        data={MOCK_CATEGORIES}
        // style={[styles.flex, styles.container]}

        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        estimatedItemSize={20}
        horizontal={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.mainContainer, index % 2 === 0 && styles.borderStyle]}
            onPress={() =>
              onPressCategory({
                title: item.title,
                id: item.id,
              })
            }>
            <View style={styles.imageView}>
              <Image
                style={styles.imgResponsive}
                source={item.image}
                resizeMode="cover"
                defaultSource={require('@/assets/default.png')}
              />
            </View>
            <TextDefault light center>
              {item.title}
            </TextDefault>
          </TouchableOpacity>
        )}
      />
      {/* )} */}
    </SafeAreaView>
  );
}

export default MainSell;

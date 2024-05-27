import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import { EmptyButton, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const FILTERS = [
  {
    value: 0,
    title: 'All',
  },
  {
    value: 1,
    title: 'Unread',
  },
  {
    value: 2,
    title: 'Important',
  },
];

const MESSAGES = [
  {
    id: 3,
    key: 3,
    name: 'Fatim',
    lastMessage: "It's already sold.",
    duration: '4 days ago',
    adTile: '5 seater sofa set',
    addPic: require('@/assets/cycle.png'),
    imaga: require('@/assets/avatar.png'),
  },
];

function ALL() {
  const [filter, setFilter] = useState(FILTERS[0].value);
  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image style={styles.emptyImage} source={require('@/assets/email.png')} />
        <TextDefault H4 center bold style={alignment.MTlarge}>
          No messages, yet?
        </TextDefault>
        <TextDefault H5 center light style={alignment.MTsmall}>
          We'll keep messages for any item you're trying to buying in here
        </TextDefault>
        <EmptyButton
          title="Explore the latest ads"
          // onPress={() => navigation.navigate('Main')}
          onPress={() => null}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.filterContainer}>
        <TextDefault uppercase>QUICK FILTERS</TextDefault>
        <View style={styles.filterRow}>
          {FILTERS.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.boxContainer,
                item.value === filter ? styles.selected : styles.notSelected,
              ]}
              onPress={() => setFilter(item.value)}>
              <TextDefault
                style={item.value === filter ? styles.selectedText : styles.unSelectedText}>
                {item.title}
              </TextDefault>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.flex, styles.mainContainer]}>
      <FlashList
        data={MESSAGES}
        ListHeaderComponent={MESSAGES.length > 0 ? header : null}
        ListEmptyComponent={emptyView}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={20}
        renderItem={({
          item,
        }: {
          item: {
            addPic: ImageSourcePropType;
            imaga: ImageSourcePropType;
            name: string;
            duration: string;
            adTile: string;
            lastMessage: string;
          };
        }) => (
          <RectButton
            activeOpacity={0.07}
            style={styles.messageContainer}
            // onPress={() => navigation.navigate('LiveChat')}
          >
            <View style={styles.imgResposive}>
              <Image
                style={styles.image}
                source={item.addPic}
                defaultSource={require('@/assets/default.png')}
              />
              <Image
                style={styles.profileImg}
                source={item.imaga}
                defaultSource={require('@/assets/default.png')}
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoBox}>
                <View style={styles.messageIcon}>
                  <TextDefault H5 bold style={[styles.flex, alignment.MBxSmall]}>
                    {item.name}
                  </TextDefault>
                  <TextDefault light>{item.duration}</TextDefault>
                </View>
                <View style={styles.messageIcon}>
                  <TextDefault numberOfLines={1} light style={[styles.flex, alignment.MRxSmall]}>
                    {item.adTile}
                  </TextDefault>
                  <MaterialCommunityIcons name="dots-vertical" size={scale(20)} color="black" />
                </View>
                <View style={styles.messageIcon}>
                  <SimpleLineIcons
                    name="envelope"
                    size={scale(15)}
                    color={COLORS.fontSecondColor}
                  />
                  <TextDefault
                    numberOfLines={1}
                    textColor={COLORS.fontSecondColor}
                    style={[alignment.MLxSmall, styles.flex]}>
                    {item.lastMessage}
                  </TextDefault>
                </View>
              </View>
              <View style={styles.line} />
            </View>
          </RectButton>
        )}
      />
    </View>
  );
}

export default React.memo(ALL);

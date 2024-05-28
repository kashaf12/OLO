import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { HelpProps } from './Help.types';
import styles from './styles';

import { TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const links = [
  {
    title: 'Product Page',
    description: 'Experience our product Demo',
    url: 'https://market.nativebase.io/view/react-native-food-delivery-backend-app',
  },
  {
    title: 'Docs',
    url: 'https://enatega.gitbook.io/enatega-full-app/',
    description: 'Docs related to product',
  },
  {
    title: 'Blog',
    description: 'Blog related to our product',
    url: 'https://blog.nativebase.io/enatega-full-food-delivery-app-is-finally-here-a6039de4a09d',
  },
  {
    title: 'About Us',
    url: 'https://ninjascode.com/pages/ourteam.html',
    description: 'Connect to our team',
  },
];

function Help({ onPressHelpBrowser, onPressShare }: HelpProps) {
  return (
    <View style={[styles.flex, styles.mainContainer]}>
      {links.map(({ title, url, description }) => (
        <TouchableOpacity
          key={url}
          style={styles.smallContainer}
          // onPress={() => navigation.navigate('HelpBrowser', { title, url })}
          onPress={onPressHelpBrowser}>
          <View style={[styles.flex]}>
            <TextDefault bold H5 style={alignment.PLlarge}>
              {title}
            </TextDefault>
            <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
              {description}
            </TextDefault>
          </View>
          <Entypo name="chevron-small-right" size={scale(30)} color={COLORS.buttonbackground} />
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.smallContainer}>
        <View style={[styles.flex]}>
          <TextDefault bold H5 style={alignment.PLlarge}>
            Get Help
          </TextDefault>
          <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
            See FAQ and contact support
          </TextDefault>
        </View>
        <Entypo name="chevron-small-right" size={scale(30)} color={COLORS.buttonbackground} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.smallContainer}>
        <View style={[styles.flex]}>
          <TextDefault bold H5 style={alignment.PLlarge}>
            Rate us
          </TextDefault>
          <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
            If you love our app. Please take a moment to rate it
          </TextDefault>
        </View>
        <Entypo name="chevron-small-right" size={scale(30)} color={COLORS.buttonbackground} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.smallContainer} onPress={onPressShare}>
        <View style={[styles.flex]}>
          <TextDefault bold H5 style={alignment.PLlarge}>
            Invite friends to App
          </TextDefault>
          <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
            Invite your friends to buy and sell
          </TextDefault>
        </View>
        <Entypo name="chevron-small-right" size={scale(30)} color={COLORS.buttonbackground} />
      </TouchableOpacity>
      <View style={styles.smallContainer}>
        <View style={[styles.flex]}>
          <TextDefault bold H5 style={alignment.PLlarge}>
            Version
          </TextDefault>
          <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
            1.0.0
          </TextDefault>
        </View>
      </View>
    </View>
  );
}

export default React.memo(Help);

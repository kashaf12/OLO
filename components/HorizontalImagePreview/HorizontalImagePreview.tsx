import { MediaType, openPicker } from '@baronha/react-native-multiple-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { View, ScrollView, Image } from 'react-native';

import { HorizontalImagePreviewProps } from './HorizontalImagePreview.types';
import styles from './style';
import { IconButton } from '../Buttons';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

const HorizontalImagePreview: React.FC<HorizontalImagePreviewProps> = ({
  imagesUri,
  setImagesUri,
}) => {
  const handleOnClick = async () => {
    const response = await openPicker({
      usedCameraButton: true,
      mediaType: 'image' as MediaType.IMAGE,
      maxSelectedAssets: 10,
      selectedAssets: imagesUri,
      singleSelectedMode: false,
      selectedColor: COLORS.buttonbackground,
    });

    setImagesUri?.(response);
  };
  return (
    <View style={styles.container}>
      <IconButton onPress={handleOnClick}>
        <AntDesign name="camera" size={scale(24)} color="black" />
      </IconButton>
      <ScrollView
        horizontal
        pagingEnabled
        nestedScrollEnabled
        style={styles.horizontalScrollContainer}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContentContainer}
        showsVerticalScrollIndicator={false}>
        {imagesUri?.map((imageUri, i) => (
          <View style={styles.imageContainer} key={i}>
            <Image
              style={styles.imgResponsive}
              source={{ uri: imageUri.path }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default HorizontalImagePreview;

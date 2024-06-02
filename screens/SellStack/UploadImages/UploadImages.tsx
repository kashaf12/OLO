import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UploadImageProps } from './UploadImages.types';
import styles from './styles';

import { EmptyButton, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { scale } from '@/utils';

function UploadImages({
  onPressNext,
  defaultFormData,
  onPressCaptureImage,
  onPressPickImage,
}: UploadImageProps) {
  // const [image, setImage] = useState(null);
  // const [formData, setFormData] = useState(null);

  useEffect(() => {
    didFocus();
  }, []);

  async function didFocus() {
    if (defaultFormData) {
      // setFormData(defaultFormData);
      // setImage(defaultFormData.image ?? null);
    }
  }

  return (
    <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
      <View style={[styles.flex, styles.mainContainer]}>
        <View style={styles.imgContainer}>
          <View style={styles.imgResponsive}>
            <Image style={styles.img} source={require('@/assets/photo-album.png')} />
          </View>
          <TextDefault H5 center>
            Uploading more photos increases your chance of closing a deal
          </TextDefault>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.iconBtn}
              onPress={onPressCaptureImage}>
              <SimpleLineIcons name="camera" size={scale(35)} color={COLORS.buttonText} />
              <TextDefault textColor={COLORS.buttonText} bold uppercase>
                Take a picture
              </TextDefault>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn} onPress={onPressPickImage}>
              <SimpleLineIcons name="folder-alt" size={scale(35)} color={COLORS.buttonText} />
              <TextDefault textColor={COLORS.buttonText} bold uppercase>
                Folders
              </TextDefault>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonView}>
          <EmptyButton
            // disabled={!image}
            title="Next"
            onPress={onPressNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default React.memo(UploadImages);

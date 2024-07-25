import * as Device from 'expo-device';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';

import { FlashMessage } from '@/components';
import { SELL_SCREENS } from '@/constants';
import { UploadImages } from '@/screens';

const Page = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [, setNewImage] = useState(false);
  const [, setImage] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Upload your photos',
    });
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== ImagePicker.PermissionStatus.GRANTED) {
  //       alert('Sorry, we need camera roll permissions to make this work!');
  //     }
  //   })();
  // }, []);

  async function PickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setNewImage(true);
      setImage(`data:image/jpg;base64,${result.assets}`);
    }
  }

  async function CaptureImage() {
    if (!Device.isDevice) {
      FlashMessage({
        message: 'Camers is not working on simulator!',
        type: 'warning',
      });
      return;
    }

    const { status: checkStatus } = await ImagePicker.getCameraPermissionsAsync();
    if (checkStatus !== ImagePicker.PermissionStatus.GRANTED) {
      const { status: CameraStatus } = await ImagePicker.getCameraPermissionsAsync();
      if (CameraStatus !== ImagePicker.PermissionStatus.GRANTED) {
        alert('Sorry, we need camera permission to make this work!');
        return;
      }
    }
    const { status: checkStatusRoll } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (checkStatusRoll !== ImagePicker.PermissionStatus.GRANTED) {
      const { status: CameraRollStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (CameraRollStatus !== ImagePicker.PermissionStatus.GRANTED) {
        alert('Sorry, we need camera roll permission to make this work!');
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setNewImage(true);
      setImage(`data:image/jpg;base64,${result.assets}`);
    }
  }

  const handleOnPressNext = () => {
    router.navigate(SELL_SCREENS.PRICE);
  };

  return (
    <UploadImages
      onPressNext={handleOnPressNext}
      onPressCaptureImage={CaptureImage}
      onPressPickImage={PickImage}
    />
  );
};

export default Page;

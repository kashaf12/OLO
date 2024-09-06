import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useRef, useState } from 'react';
import uuid from 'react-native-uuid';

import { FlashMessage, LeftButton, LoadingModal } from '@/components';
import { COLORS } from '@/constants';
import { useUserAds } from '@/hooks';
import { SellingFormUpdated } from '@/screens';
import {
  FormValueType,
  SellingFormI,
} from '@/screens/SellStack/SellingFormUpdated/SellingForm.types';
import { LocationType } from '@/store/userAds';
import { getFileExtension } from '@/utils';

const Page = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { createUserAdWithImage } = useUserAds();
  const router = useRouter();
  const ref = useRef<SellingFormI>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create New Listing',
      headerLeft: () => <LeftButton icon="close" iconColor={COLORS.headerText} />,
    });
  }, [navigation]);

  const onNext = async (data: FormValueType) => {
    setLoading(true);
    try {
      const imagesPayload = (data?.images || []).map((image) => {
        const imageId = uuid.v4() as string;
        return {
          id: imageId,
          name: image.fileName || imageId,
          mime: image.mime,
          path: image.path,
          ext: getFileExtension(image.path),
        };
      });

      const ad = {
        title: data.title ?? 'NO_TITLE',
        description: data.description ?? 'NO_DESCRIPTION',
        price: parseFloat(data.price || '0'),
        category: data.category ?? 'NO_CATEGORY',
        location: {
          ...data.location?.coords,
          ...data.location?.address,
        } as LocationType,
      };

      await createUserAdWithImage(imagesPayload, ad);
      ref?.current?.resetForm?.();
      FlashMessage({
        message: 'Successfully Created AD',
        animated: true,
        autoHide: true,
        color: COLORS.activeLine,
        backgroundColor: COLORS.fontMainColor,
      });
      if (router.canGoBack()) {
        router.back();
      } else router.dismissAll();
    } catch (err) {
      console.error('Error creating ad with images:', err);
      FlashMessage({
        message: 'Failed to create ad',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingModal modalVisible={loading} title="Creating Ad" />
      <SellingFormUpdated onPressNext={onNext} ref={ref} />
    </>
  );
};

export default Page;

import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';

import { SELL_SCREENS } from '@/constants';
import { SubCategories } from '@/screens';

const Page = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { headerTitle } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
    });
  }, [navigation, headerTitle]);

  const handleOnPressCategory = (id: string) => {
    router.navigate({
      pathname: SELL_SCREENS.SELLING_FORM,
      params: {
        subCategory: id,
      },
    });
  };

  return <SubCategories onPressSubCategory={handleOnPressCategory} loading={false} />;
};

export default Page;

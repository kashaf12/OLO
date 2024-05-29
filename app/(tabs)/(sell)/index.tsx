import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';

import { LeftButton } from '@/components';
import { COLORS, SELL_SCREENS } from '@/constants';
import { MainSell } from '@/screens';

const Page = () => {
  const navigation = useNavigation();
  const router = useRouter();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'What are you offering?',
      headerLeft: () => <LeftButton icon="close" iconColor={COLORS.headerText} />,
    });
  }, [navigation]);

  const handleOnPressCategory = ({ title, id }: { title: string; id: string }) => {
    router.navigate({
      pathname: SELL_SCREENS.SUB_CATEGORIES,
      params: {
        headerTitle: title,
        categoryId: id,
      },
    });
  };

  return <MainSell onPressCategory={handleOnPressCategory} />;
};

export default Page;

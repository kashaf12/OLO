import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';

import { LeftButton } from '@/components';
import { COLORS } from '@/constants';
import { SellingFormUpdated } from '@/screens';

const Page = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create New Listing',
      headerLeft: () => <LeftButton icon="close" iconColor={COLORS.headerText} />,
    });
  }, [navigation]);

  const onNext = console.log;

  return <SellingFormUpdated onPressNext={onNext} />;
};

export default Page;

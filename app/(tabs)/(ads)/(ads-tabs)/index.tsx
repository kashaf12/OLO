import React from 'react';

import { MainAds } from '@/screens';

const Page = () => {
  return <MainAds refetch={console.log} onPressStartSelling={console.log} />;
};

export default Page;

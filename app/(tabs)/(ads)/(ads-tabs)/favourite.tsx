import React from 'react';

import { Favourite } from '@/screens';

const Page = () => {
  return <Favourite onPressNavigateToMain={console.log} profile={{ likes: [] }} />;
};

export default Page;

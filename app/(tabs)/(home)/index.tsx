import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainHeader } from '@/components';
import { MainHome } from '@/screens';
import { useLocationStore } from '@/store';

const Home = () => {
  const navigation = useNavigation();
  const [filters, setFilters] = useState<{
    zone: string;
    title: string;
    latitude: number | null;
    longitude: number | null;
  }>({
    zone: '642e439cd320c55d90dd6cd9',
    title: 'Lucknow',
    latitude: null,
    longitude: null,
  });
  const inset = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSerachVisible] = useState(false);
  const t = useLocationStore((state) => state);

  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleSearch = () => setSerachVisible(!searchVisible);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          search={search}
          onModalToggle={toggleModal}
          toggleSearch={toggleSearch}
          locationText={filters.title}
          inset={inset}
          onPressNotification={console.log}
        />
      ),
    });
  }, [navigation, filters, search]);

  useEffect(() => {
    storageLocation();
  }, []);

  async function storageLocation() {
    console.log(t);
    if (t) {
      setFilters({
        zone: '642e439cd320c55d90dd6cd9',
        title: t.label,
        latitude: t.latitude,
        longitude: t.longitude,
      });
    }
  }

  return (
    <MainHome
      //   categoryData={[]}
      //   categoryError={null}
      //   data={[]}
      error={null}
      loading
      networkStatus={0}
      onPressCategories={console.log}
      onPressSubCategory={console.log}
      refetch={console.log}
      search={''}
      setFilters={setFilters}
      setSearch={setSearch}
    />
  );
};

export default Home;

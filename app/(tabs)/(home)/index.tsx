import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlashMessage, LocationPickerBottomSheet, MainHeader } from '@/components';
import { LocationPickerBottomSheetI } from '@/components/LocationPickerBottomSheet/types';
import { getCurrentLocationResponse } from '@/hooks/useLocationPermission/types';
import { MainHome } from '@/screens';
import { useLocationStore } from '@/store';

const Home = () => {
  const navigation = useNavigation();
  const [filters, setFilters] = useState<{
    title: string;
    latitude: number | null;
    longitude: number | null;
  }>({
    title: 'Lucknow',
    latitude: null,
    longitude: null,
  });
  const inset = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [searchVisible, setSerachVisible] = useState(false);
  const label = useLocationStore((state) => state.label);
  const setLocation = useLocationStore((state) => state.setLocation);

  const bottomSheetRef = useRef<LocationPickerBottomSheetI>(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.onOpen();
  const toggleSearch = () => setSerachVisible(!searchVisible);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          search={search}
          onModalToggle={handlePresentModalPress}
          toggleSearch={toggleSearch}
          locationText={label}
          inset={inset}
          onPressNotification={console.log}
        />
      ),
    });
  }, [navigation, filters, search, label]);

  const handleLocationSelection = (e: getCurrentLocationResponse) => {
    if (e.coords && e.address) {
      setLocation({
        label: e.address.name || e.address.formattedAddress || 'India',
        address: e.address,
        coords: e.coords,
      });
    }
  };

  const onLocationSelected = (response: getCurrentLocationResponse) => {
    bottomSheetRef.current?.onClose();
    if (response.error) {
      FlashMessage({
        message: response.message ?? 'Failed to get current location',
      });
      return;
    }
    handleLocationSelection(response);
  };

  return (
    <>
      <LocationPickerBottomSheet ref={bottomSheetRef} onLocationSelected={onLocationSelected} />
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
    </>
  );
};

export default Home;

import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { RightButton, Spinner } from '@/components';
import { COLORS } from '@/constants';
import { useUser } from '@/hooks';
import { EditProfile } from '@/screens';
import { EditProfileI } from '@/screens/AccountStack/EditProfile/EditProfile.types';
import { alignment } from '@/utils';

const Page = () => {
  const navigation = useNavigation();
  const { user, updateUser, uploadProfileImage } = useUser();
  const [loading, setLoading] = useState(false);
  const ref = useRef<EditProfileI>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
      headerRight: () =>
        loading ? (
          <View {...alignment.PRlarge}>
            <Spinner size="small" spinnerColor={COLORS.spinnerColor1} backColor="transparent" />
          </View>
        ) : (
          <RightButton
            iconColor={COLORS.headerText}
            icon="text"
            title="Save"
            onPress={async () => {
              const data = ref.current?.onSave();
              if (data) {
                try {
                  setLoading(true);
                  await updateUser({
                    displayName: data.displayName || 'OLO_USER',
                    description: data.description,
                  });
                } catch (error) {
                  if (error instanceof Error) {
                    console.error(error);
                    alert('Failed to update user profile' + error.message);
                  }
                } finally {
                  setLoading(false);
                }
              }
            }}
          />
        ),
    });
  }, [navigation, loading]);

  if (!user) return <Spinner />;

  return <EditProfile user={user} ref={ref} saveImageOnBackend={uploadProfileImage} />;
};

export default Page;

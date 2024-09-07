import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';

import { ProfilePictureProps } from './ProfilePicture.types';
import styles from './styles';

import { Spinner } from '@/components';
import { COLORS } from '@/constants';
import { useUser } from '@/hooks';

const ProfilePicture: React.FC<ProfilePictureProps> = ({ size = 90, style, localImageUrl }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { user, getProfileImage } = useUser();

  useEffect(() => {
    const loadProfileImage = async () => {
      setLoading(true);
      setError(false);
      if (localImageUrl) {
        setImageUrl(localImageUrl);
      } else if (user?.isProfilePicAvailable) {
        try {
          if (user?.profilePhotoThumbnail || user?.profilePhotoOriginal) {
            setImageUrl(user.profilePhotoThumbnail || user?.profilePhotoOriginal || null);
          } else {
            const urls = await getProfileImage();
            setImageUrl(urls?.[0] || urls?.[1] || null);
          }
        } catch (e) {
          console.error('Error loading profile image:', e);
          setError(true);
        }
      } else {
        setImageUrl(null);
      }
      setLoading(false);
    };

    loadProfileImage();
  }, [user, getProfileImage, localImageUrl]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  const imageSource = imageUrl ? { uri: imageUrl } : require('@/assets/avatar.png');

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {loading && (
        <View style={[styles.spinnerContainer, { width: size, height: size }]}>
          <Spinner size="small" spinnerColor={COLORS.spinnerColor1} backColor="transparent" />
        </View>
      )}
      <Image
        source={imageSource}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
          loading && styles.hidden,
        ]}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {error && (
        <Image
          source={require('@/assets/avatar.png')}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      )}
    </View>
  );
};

export default ProfilePicture;

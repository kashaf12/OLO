import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';

import { AdImageProps } from './AdImage.types';
import styles from './styles';

import { Spinner } from '@/components';
import { COLORS } from '@/constants';
import { useUserAds } from '@/hooks';

const AdImage: React.FC<AdImageProps> = ({
  adId,
  imageId,
  variant = 'cover',
  size = 90,
  style,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { getAdsImage } = useUserAds();

  useEffect(() => {
    const loadAdImage = async () => {
      setLoading(true);
      setError(false);
      try {
        const [thumbnailUrl, coverUrl, fullUrl] = await getAdsImage(adId, imageId);

        let selectedUrl: string | null = null;
        switch (variant) {
          case 'thumbnail':
            selectedUrl = thumbnailUrl || coverUrl || fullUrl;
            break;
          case 'cover':
            selectedUrl = coverUrl || fullUrl || thumbnailUrl;
            break;
          case 'full':
            selectedUrl = fullUrl || coverUrl || thumbnailUrl;
            break;
        }

        setImageUrl(selectedUrl);
      } catch (e) {
        console.error('Error loading ad image:', e);
        setError(true);
      }
      setLoading(false);
    };

    loadAdImage();
  }, [adId, imageId, variant, getAdsImage]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  const defaultImage = require('@/assets/default.png');

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {loading && (
        <View style={[styles.spinnerContainer, { width: size, height: size }]}>
          <Spinner size="small" spinnerColor={COLORS.spinnerColor1} backColor="transparent" />
        </View>
      )}
      <Image
        source={imageUrl ? { uri: imageUrl } : defaultImage}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: variant === 'thumbnail' ? size / 2 : 0 },
          loading && styles.hidden,
        ]}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {error && (
        <Image
          source={defaultImage}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: variant === 'thumbnail' ? size / 2 : 0 },
          ]}
        />
      )}
    </View>
  );
};
export default AdImage;

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

import { AdType, ImageType, LocationType } from '@/store/ads';

const ADS_COLLECTION = 'Ads';

export const uploadAdImage = async (
  adId: string,
  image: Pick<ImageType, 'id' | 'name'> & { path: string }
): Promise<
  { success: true; data: Pick<ImageType, 'id' | 'name'> } | { success: false; error: string }
> => {
  try {
    const filename = `ads/${adId}/${image.id}`;
    const reference = storage().ref(filename);

    if (Platform.OS === 'ios') {
      await reference.putFile(image.path);
    } else {
      const response = await fetch(image.path);
      const blob = await response.blob();
      await reference.put(blob);
    }

    return {
      success: true,
      data: {
        id: image.id,
        name: image.name,
      },
    };
  } catch (error) {
    let message = 'Failed to upload image';
    if (error instanceof Error) {
      message = `Failed to upload image: ${error.message}`;
    }
    console.error(message);
    return {
      success: false,
      error: message,
    };
  }
};

export const createAdWithImages = async (
  userId: string,
  adData: Omit<
    AdType,
    'createdAt' | 'updatedAt' | 'status' | 'images' | 'id' | 'likesCount' | 'views'
  >,
  images: (Pick<ImageType, 'id' | 'name'> & { path: string })[]
) => {
  const adRef = firestore().collection(ADS_COLLECTION).doc();
  const createdAt = firestore.FieldValue.serverTimestamp();
  const adId = adRef.id;

  try {
    const imagesData = await Promise.all(images.map((image) => uploadAdImage(adId, image)));

    if (imagesData.some((image) => Boolean(!image.success))) {
      throw new Error('Failed to upload ad images');
    }

    await adRef.set({
      ...adData,
      userId,
      createdAt,
      updatedAt: createdAt,
      status: 'pending',
      views: 0,
      likesCount: 0,
      images: imagesData.filter((image) => image.success).map((image) => image.data),
    });

    return adId;
  } catch (err) {
    console.error('Error uploading ads photo:', err);
    throw new Error('Failed to uploading ads photo');
  }
};

export const createAd = async (
  userId: string,
  adData: Omit<
    AdType,
    'createdAt' | 'updatedAt' | 'status' | 'id' | 'likesCount' | 'views' | 'images'
  >
): Promise<string> => {
  const adRef = firestore().collection(ADS_COLLECTION).doc();
  const createdAt = firestore.FieldValue.serverTimestamp();

  await adRef.set({
    ...adData,
    userId,
    createdAt,
    updatedAt: createdAt,
    status: 'pending',
    views: 0,
    likesCount: 0,
    images: [],
  });

  return adRef.id;
};

export const addImagesToAd = async (adId: string, images: ImageType[]): Promise<void> => {
  const adRef = firestore().collection(ADS_COLLECTION).doc(adId);
  await adRef.update({
    images: firestore.FieldValue.arrayUnion(...images),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const updateAd = async (adId: string, adData: Partial<AdType>): Promise<void> => {
  const adRef = firestore().collection(ADS_COLLECTION).doc(adId);
  await adRef.update({
    ...adData,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const deleteAd = async (adId: string): Promise<void> => {
  const adRef = firestore().collection(ADS_COLLECTION).doc(adId);
  await adRef.delete();

  // Delete associated images
  const imagesRef = storage().ref(`ads/${adId}`);
  try {
    const files = await imagesRef.listAll();
    await Promise.all(files.items.map((file) => file.delete()));
  } catch (error) {
    console.error('Error deleting ad images:', error);
  }
};

export const getUserAds = async (userId: string): Promise<AdType[]> => {
  const adsSnapshot = await firestore()
    .collection(ADS_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return adsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as AdType
  );
};

export const getAdById = async (adId: string): Promise<AdType | null> => {
  const adDoc = await firestore().collection(ADS_COLLECTION).doc(adId).get();
  if (!adDoc.exists) return null;
  return { id: adDoc.id, ...adDoc.data() } as AdType;
};

export const updateAdLocation = async (adId: string, location: LocationType): Promise<void> => {
  await updateAd(adId, { location });
};

export const changeAdStatus = async (adId: string, status: AdType['status']): Promise<void> => {
  await updateAd(adId, { status });
};

export const getAdImageUrl = async (adId: string, imageId: string): Promise<string | null> => {
  try {
    const filename = `ads/${adId}/${imageId}`;
    const reference = storage().ref(filename);
    return await reference.getDownloadURL();
  } catch (error) {
    console.error('Error getting ad image URL:', error);
    return null;
  }
};

export const getAdThumbnailUrl = async (adId: string, imageId: string): Promise<string | null> => {
  try {
    const filename = `ads/${adId}/${imageId}_300x300`;
    const reference = storage().ref(filename);
    return await reference.getDownloadURL();
  } catch (error) {
    console.error('Error getting ad thumbnail image URL:', error);
    return null;
  }
};

export const getAdCoverUrl = async (adId: string, imageId: string): Promise<string | null> => {
  try {
    const filename = `ads/${adId}/${imageId}_1200x1200`;
    const reference = storage().ref(filename);
    return await reference.getDownloadURL();
  } catch (error) {
    console.error('Error getting ad thumbnail image URL:', error);
    return null;
  }
};

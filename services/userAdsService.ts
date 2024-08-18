import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

import { AdType, LocationType } from '@/store/userAds';

const ADS_COLLECTION = 'Ads';

export const getNewDocAdId = async () => {
  const adRef = firestore().collection(ADS_COLLECTION).doc();
  return adRef.id;
};

export const createAd = async (
  userId: string,
  adData: Omit<AdType, 'createdAt' | 'updatedAt' | 'status'>
): Promise<string> => {
  const adRef = firestore().collection(ADS_COLLECTION).doc();
  const createdAt = firestore.FieldValue.serverTimestamp();
  await adRef.set({
    ...adData,
    userId,
    createdAt,
    updatedAt: createdAt,
    status: 'created',
  });

  return adRef.id;
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

export const uploadAdImages = async (
  adId: string,
  images: {
    id: string;
    name: string;
    mime: string;
    path: string;
    ext: string;
  }[]
): Promise<
  {
    id: string;
    original: string;
    thumbnail: string;
    name: string;
    mime: string;
  }[]
> => {
  try {
    return Promise.all(
      images.map(async (image) => {
        const filename = `ads/${adId}/original/${image.id}.${image.ext}`;
        const reference = storage().ref(filename);
        if (Platform.OS === 'ios') {
          await reference.putFile(image.path);
        } else {
          const response = await fetch(image.path);
          const blob = await response.blob();
          await reference.put(blob);
        }

        return {
          id: image.id,
          original: `ads/${adId}/original/${image.id}.${image.ext}`,
          thumbnail: `ads/${adId}/thumbnail/${image.id}.${image.ext}`,
          name: image.name,
          mime: image.mime,
        };
      })
    );
  } catch (err) {
    console.error('Error uploading ads photo:', err);
    throw new Error('Failed to uploading ads photo');
  }
};

export const createAnduploadAdWithImages = async (
  userId: string,
  adData: Omit<AdType, 'createdAt' | 'updatedAt' | 'status' | 'images' | 'id'>,
  images: {
    id: string;
    name: string;
    mime: string;
    path: string;
    ext: string;
  }[]
) => {
  const adRef = firestore().collection(ADS_COLLECTION).doc();
  const createdAt = firestore.FieldValue.serverTimestamp();
  const adId = adRef.id;
  try {
    const imagesData = await Promise.all(
      images.map(async (image) => {
        const filename = `ads/${adId}/original/${image.id}.${image.ext}`;
        const reference = storage().ref(filename);
        if (Platform.OS === 'ios') {
          await reference.putFile(image.path);
        } else {
          const response = await fetch(image.path);
          const blob = await response.blob();
          await reference.put(blob);
        }

        return {
          id: image.id,
          original: `ads/${adId}/original/${image.id}.${image.ext}`,
          thumbnail: `ads/${adId}/thumbnail/${image.id}.${image.ext}`,
          name: image.name,
          mime: image.mime,
        };
      })
    );
    await adRef.set({
      ...adData,
      id: adId,
      images: imagesData,
      userId,
      createdAt,
      updatedAt: createdAt,
      status: 'created',
    });
    return adId;
  } catch (err) {
    console.error('Error uploading ads photo:', err);
    throw new Error('Failed to uploading ads photo');
  }
};

export const updateAdLocation = async (adId: string, location: LocationType): Promise<void> => {
  await updateAd(adId, { location });
};

export const changeAdStatus = async (adId: string, status: AdType['status']): Promise<void> => {
  await updateAd(adId, { status });
};

export const listenToUserAds = (
  userId: string,
  callback: (ads: AdType[]) => void
): (() => void) => {
  return firestore()
    .collection(ADS_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      if (!snapshot) return;
      const ads = (snapshot?.docs || []).map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as AdType
      );
      callback(ads);
    });
};

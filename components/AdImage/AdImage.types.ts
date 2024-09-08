export type AdImageVariant = 'cover' | 'full' | 'thumbnail';

export interface AdImageProps {
  adId: string;
  imageId: string;
  variant?: AdImageVariant;
  size?: number;
  style?: object;
}

import { AdType } from '@/store/ads';

export type AdsProps = {
  refetch: () => void;
  onPressStartSelling: () => void;
  userListedAds?: AdType[];
  isLoadingAds?: boolean;
};

export type CardProps = {
  onPressNavigateToPrductDescription: (s: any) => void;
  onPressNavigateToSellingForm: (s: any) => void;
} & AdType;

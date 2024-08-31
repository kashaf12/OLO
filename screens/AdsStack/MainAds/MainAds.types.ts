import { AdType } from '@/store/userAds';

export type AdsProps = {
  refetch: () => void;
  onPressStartSelling: () => void;
  userListedAds?: AdType[];
};

export type CardProps = {
  onPressNavigateToPrductDescription: (s: any) => void;
  onPressNavigateToSellingForm: (s: any) => void;
} & AdType;

import { AdType, StatusType } from '@/store/ads';

export type AdsProps = {
  refetch: () => void;
  onPressStartSelling: () => void;
  userListedAds?: AdType[];
  isLoadingAds?: boolean;
  onChangeStatus?: (adId: string, s: StatusType) => void;
  onDeleteAd?: (adId: string) => void;
};

export type CardProps = {
  onPressNavigateToPrductDescription: (s: any) => void;
  onPressNavigateToSellingForm: (s: any) => void;
  onChangeStatus?: (s: StatusType) => void;
  onDeleteAd?: () => void;
} & AdType;

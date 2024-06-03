export type AdsProps = {
  refetch: () => void;
  onPressStartSelling: () => void;
  data?: {
    itemsByUser: {
      status: string;
      id: string;
      createdAt: string;
      images: string[];
      title: string;
      price: string;
      views: string;
      likesCount: string;
    }[];
  };
};

export type CardProps = {
  onPressNavigateToPrductDescription: (s: any) => void;
  onPressNavigateToSellingForm: (s: any) => void;
  status: string;
  createdAt: string;
  images: string[];
  title: string;
  price: string;
  views: string;
  likesCount: string;
};

export type FavouriteProps = {
  onPressNavigateToMain: () => void;
  profile: {
    likes: { id: string; images: string[]; title: string; price: string }[];
  };
};

export type CardProps = {
  onPressNavigateToPrductDescription: (s: any) => void;
  isLoggedIn: boolean;
  onPressNavigateToRegistration: () => void;
  images: string[];
  title: string;
  price: string;
};

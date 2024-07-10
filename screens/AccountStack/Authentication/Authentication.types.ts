export type AuthenticationProps = {
  insets: {
    top: number;
    bottom: number;
    right: number;
  };
  onPressSkip?: () => void;
  onPressPhoneNumber?: (number: string) => void;
  onPressGoogle?: () => void;
  isGoogleSignInLoading?: boolean;
};

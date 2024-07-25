export type MainHeaderProps = {
  onPressNotification: () => void;
  inset: {
    top: number;
  };
  onModalToggle: () => void;
  locationText: string;
  toggleSearch: () => void;
  search?: string;
};

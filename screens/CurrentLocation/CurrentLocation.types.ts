export type CurrentLocationProps = {
  style?: {
    backgroundColor: string;
    paddingTop: number;
    paddingBottom: number;
  };
  onPressSetCurrentLocation?: () => void;
  onPressSelectLocation?: () => void;
};

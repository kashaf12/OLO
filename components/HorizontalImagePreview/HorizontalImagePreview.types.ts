import { Results } from '@baronha/react-native-multiple-image-picker';

export type HorizontalImagePreviewProps = {
  imagesUri?: Results[];
  setImagesUri?: (value: Results[]) => void;
};

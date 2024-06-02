export type UploadImageProps = {
  onPressNext: () => void;
  defaultFormData?: { image: string };
  onPressCaptureImage: () => void;
  onPressPickImage: () => void;
};

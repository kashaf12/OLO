export type UploadImageModalProps = {
  modalVisible?: boolean;
  onBackPress?: () => void;
  onCameraPress?: () => void;
  onGalleryPress?: () => void;
  onRemovePress?: () => void;
  isLoading?: boolean;
};

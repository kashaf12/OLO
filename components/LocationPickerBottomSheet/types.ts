import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';

export type ClosableType = {
  onClose: () => void;
  onOpen: () => void;
};

export type LocationPickerBottomSheetProps = Partial<Omit<BottomSheetModalProps, 'children'>>;

export interface LocationPickerBottomSheetI extends ClosableType {}

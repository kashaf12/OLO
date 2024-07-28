import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';

import { getCurrentLocationResponse } from '@/hooks/useLocationPermission/types';

export type ClosableType = {
  onClose: () => void;
  onOpen: () => void;
};

export interface LocationPickerBottomSheetProps
  extends Partial<Omit<BottomSheetModalProps, 'children'>> {
  onLocationSelected: (location: getCurrentLocationResponse) => void;
}

export interface LocationPickerBottomSheetI extends ClosableType {}

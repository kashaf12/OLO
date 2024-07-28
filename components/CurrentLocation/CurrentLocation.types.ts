import { getCurrentLocationResponse } from '@/hooks/useLocationPermission/types';

export type CurrentLocationComponentProps = {
  onLocationSelect: (result: getCurrentLocationResponse) => void;
};

import { MapViewProps } from 'react-native-maps';
import { EdgeInsets } from 'react-native-safe-area-context';

export type SelectLocationProps = {
  onPanDrag: () => void;
  onRegionChangeComplete: MapViewProps['onRegionChangeComplete'];
  inset: EdgeInsets;
  coordinates: MapViewProps['initialRegion'];
  onPressSelectLocation: () => void;
};

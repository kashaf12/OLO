import { forwardRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { SelectLocationProps } from './SelectLocation.types';
import styles, { mapStyle } from './styles';

import { TextDefault } from '@/components';
import { COLORS } from '@/constants';

function SelectLocation(
  {
    onPanDrag,
    onRegionChangeComplete,
    inset,
    coordinates,
    onPressSelectLocation,
  }: SelectLocationProps,
  ref: React.LegacyRef<MapView>
) {
  return (
    <>
      <View style={styles.flex}>
        <MapView
          ref={ref}
          initialRegion={coordinates}
          // region={coordinates}
          style={{ height: '92%' }}
          provider={PROVIDER_GOOGLE}
          showsTraffic={false}
          maxZoomLevel={15}
          customMapStyle={mapStyle}
          onRegionChangeComplete={onRegionChangeComplete}
          onPanDrag={onPanDrag}
        />
        <View
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            top: '46%',
            left: '50%',
            zIndex: 1,
            translateX: -25,
            translateY: -25,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ translateX: -25 }, { translateY: -25 }],
          }}>
          {/* <CustomMarker width={40} height={40} transform={[{ translateY: -20 }]} translateY={-20} /> */}
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onPressSelectLocation}>
          <TextDefault textColor={COLORS.buttonText} H4 bold>
            Select Location
          </TextDefault>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: inset.bottom }} />
    </>
  );
}

export default forwardRef(SelectLocation);

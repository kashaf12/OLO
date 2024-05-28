import React, { useState } from 'react';
import { Switch, View } from 'react-native';

import styles from './styles';

import { TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { alignment } from '@/utils';

function Privacy() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);
  return (
    <View style={[styles.flex, styles.mainContainer]}>
      <View style={styles.smallContainer}>
        <TextDefault bold H5 style={[alignment.PLlarge, styles.flex]}>
          Show my phone number in ads
        </TextDefault>
        <Switch
          trackColor={{ false: COLORS.headerbackground, true: COLORS.buttonbackground }}
          thumbColor={COLORS.containerBox}
          ios_backgroundColor={COLORS.headerbackground}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}
export default React.memo(Privacy);

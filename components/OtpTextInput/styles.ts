import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

const styles = StyleSheet.create({
  fill: { flex: 1 },
  containerStyle: {
    flexDirection: 'row',
    borderColor: COLORS.buttonbackground,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scale(5),
    padding: scale(8),
  },
  textInputStyle: {
    padding: 0,
  },
});

export default styles;

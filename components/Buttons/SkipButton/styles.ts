import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

const styles = StyleSheet.create({
  button: {
    borderRadius: scale(5),
    borderColor: COLORS.primary,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    padding: scale(5),
  },
});
export default styles;

import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

const styles = StyleSheet.create({
  buttonStyle: {
    paddingTop: scale(8),
    paddingBottom: scale(8),
    paddingLeft: scale(16),
    paddingRight: scale(16),
    borderWidth: scale(1),
    borderRadius: scale(3),
    alignSelf: 'flex-start',
  },
  textStyle: {
    textTransform: 'uppercase',
    fontSize: scale(12),
    color: COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default styles;

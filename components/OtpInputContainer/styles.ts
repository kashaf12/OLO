import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

const styles = StyleSheet.create({
  fill: { flex: 1 },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(12),
  },
  textInputStyle: {
    flex: 1,
    marginRight: scale(12),
  },
  textStyle: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
});

export default styles;

import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  emptyButton: {
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.themeBackground,
    borderRadius: scale(5),
    borderColor: COLORS.buttonbackground,
    borderWidth: scale(1),
    ...alignment.MTlarge,
  },
});
export default styles;

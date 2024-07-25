import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  emptyButton: {
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.themeBackground,
    borderRadius: scale(5),
    borderColor: COLORS.buttonbackground,
    borderWidth: scale(1),
    ...alignment.MBsmall,
    ...alignment.PLlarge,
    ...alignment.PRlarge,
  },
});
export default styles;

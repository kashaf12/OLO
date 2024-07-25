import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: COLORS.themeBackground,
  },
  emptyContainer: {
    backgroundColor: COLORS.containerBox,
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.PLmedium,
    ...alignment.PRmedium,
  },
  emptyImage: {
    width: scale(150),
    height: scale(150),
  },
});
export default styles;

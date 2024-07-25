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
  notificationContainer: {
    backgroundColor: COLORS.lightHorizontalLine,
    alignItems: 'center',
    flexDirection: 'row',
    ...alignment.Plarge,
    ...alignment.MBsmall,
  },
  imgResponsive: {
    height: scale(70),
    width: scale(70),
  },
  img: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  notificationText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    ...alignment.PLmedium,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...alignment.Psmall,
    ...alignment.PLlarge,
  },
  avatar: {
    height: scale(40),
    width: scale(40),
  },
});
export default styles;

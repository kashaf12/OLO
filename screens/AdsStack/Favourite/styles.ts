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
  productCardContainer: {
    marginLeft: '1%',
    marginRight: '1%',
    width: '48%',
    height: scale(200),
    borderWidth: scale(1),
    borderRadius: scale(5),
    backgroundColor: COLORS.containerBox,
    borderColor: COLORS.medHorizontalLine,
    alignItems: 'center',
    ...alignment.PTxSmall,
    ...alignment.PBxSmall,
    ...alignment.MTsmall,
    ...alignment.MBsmall,
  },
  topCardContainer: {
    width: '95%',
    height: '58%',
    backgroundColor: COLORS.containerBox,
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  botCardContainer: {
    width: '95%',
    height: '40%',
    justifyContent: 'space-around',
    ...alignment.PTsmall,
    ...alignment.PLsmall,
  },
  locationBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartContainer: {
    position: 'absolute',
    right: scale(5),
    top: scale(5),
    width: scale(32),
    height: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.containerBox,
    borderRadius: scale(16),
  },
});
export default styles;

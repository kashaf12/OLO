import { StyleSheet, Dimensions } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  spacer: {
    backgroundColor: COLORS.themeBackground,
    ...alignment.PBmedium,
  },
  container: {
    backgroundColor: COLORS.themeBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    width: '100%',
    backgroundColor: COLORS.themeBackground,
  },
  emptyContainer: {
    backgroundColor: COLORS.containerBox,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: scale(150),
    height: scale(150),
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    padding: scale(8),
  },
  headerContainer: {
    width: '100%',
    backgroundColor: COLORS.containerBox,
    ...alignment.PTlarge,
  },
  categoryContainer: {
    backgroundColor: COLORS.containerBox,
    flexDirection: 'row',
    ...alignment.PTmedium,
    ...alignment.PBlarge,
    ...alignment.PLlarge,
  },
  cardContainer: {
    width: width * 0.25,
    height: scale(65),
    ...alignment.MRsmall,
  },
  textViewContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  categoryHeader: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rightBtn: {
    borderBottomColor: COLORS.fontMainColor,
    borderBottomWidth: scale(2),
  },
  headerTitle: {
    backgroundColor: COLORS.containerBox,
    ...alignment.PTsmall,
    ...alignment.PBsmall,
    ...alignment.PLmedium,
  },
  productCardContainer: {
    marginLeft: '1%',
    marginRight: '1%',
    width: '48%',
    height: scale(200),
    borderWidth: scale(1),
    borderRadius: scale(5),
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
    justifyContent: 'space-between',
    backgroundColor: COLORS.containerBox,
    ...alignment.PTsmall,
  },
  locationBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    flex: 1,
    ...alignment.PLxSmall,
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

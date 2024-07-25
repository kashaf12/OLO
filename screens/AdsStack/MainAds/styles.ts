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
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.themeBackground,
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...alignment.Pmedium,
  },
  adContainer: {
    ...alignment.Msmall,
    backgroundColor: COLORS.containerBox,
    borderRadius: scale(5),
    borderLeftWidth: scale(3),
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: scale(0.5),
      height: scale(1),
    },
    shadowRadius: scale(1),
    shadowOpacity: 0.6,
    elevation: 5,
  },
  dateRow: {
    backgroundColor: COLORS.bottomTabColor,
    width: '100%',
  },

  InfoContainer: {
    borderRadius: scale(5),
    height: scale(100),
    width: '100%',
    flexDirection: 'row',
    ...alignment.Psmall,
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imgResponsive: {
    height: '100%',
    width: '30%',
  },
  descriptionContainer: {
    justifyContent: 'space-between',
    ...alignment.PLsmall,
  },
  locationRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  locationText: {
    flex: 1,
    ...alignment.PLxSmall,
    ...alignment.PRxSmall,
  },
  Vline: {
    width: '40%',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: COLORS.fontMainColor,
    flexDirection: 'row',
    ...alignment.MRlarge,
  },
  statusContainer: {
    ...alignment.Psmall,
  },
  statusBox: {
    width: scale(120),
    height: scale(30),
    borderRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.PLxSmall,
    ...alignment.PRxSmall,
  },
  activeStatus: {
    backgroundColor: COLORS.activeLine,
  },
  deactivateStatus: {
    backgroundColor: COLORS.google,
  },
  pendingStatus: {
    backgroundColor: COLORS.horizontalLine,
  },
  soldStatus: {
    backgroundColor: COLORS.selectedText,
  },
});
export default styles;

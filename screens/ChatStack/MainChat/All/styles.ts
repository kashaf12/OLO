import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale, textStyles } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: COLORS.themeBackground,
  },
  seperator: {
    height: scale(5),
    backgroundColor: 'transparent',
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
  filterContainer: {
    backgroundColor: COLORS.containerBox,
    ...alignment.Pmedium,
  },
  filterRow: {
    flexDirection: 'row',
    ...alignment.PTsmall,
  },
  boxContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scale(20),
    ...alignment.MRxSmall,
    ...alignment.PTsmall,
    ...alignment.PBsmall,
    ...alignment.PRmedium,
    ...alignment.PLmedium,
  },
  notSelected: {
    backgroundColor: COLORS.themeBackground,
    borderColor: COLORS.buttonbackground,
  },
  selected: {
    backgroundColor: COLORS.selected,
    borderColor: COLORS.selectedText,
  },
  unSelectedText: {
    color: COLORS.fontMainColor,
  },
  selectedText: {
    color: COLORS.selectedText,
    ...textStyles.Bold,
  },
  messageContainer: {
    flexDirection: 'row',
    ...alignment.PTmedium,
    ...alignment.PLmedium,
    ...alignment.PRmedium,
  },
  imgResposive: {
    height: scale(50),
    width: scale(50),
    ...alignment.MRlarge,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImg: {
    position: 'absolute',
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    bottom: -10,
    right: -10,
  },
  infoContainer: {
    flex: 1,
  },
  infoBox: {
    flex: 1,
    ...alignment.PTxSmall,
    ...alignment.MBmedium,
  },
  line: {
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  messageIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default styles;

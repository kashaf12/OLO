import { COLORS } from '@/constants';
import { alignment, scale, textStyles } from '@/utils';

const { StyleSheet } = require('react-native');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  width100: {
    width: '100%',
  },
  safeAreaview: {
    backgroundColor: COLORS.bottomTabColor,
  },
  mainContainer: {
    backgroundColor: COLORS.themeBackground,
    // alignItems: "center"
  },
  subContainer: {
    ...alignment.Psmall,
  },
  locationContainer: {
    ...alignment.Psmall,
  },
  line: {
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subContainerRow: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    ...alignment.PTsmall,
    ...alignment.PBsmall,
  },
  conditionBox: {
    width: '30%',
    height: scale(35),
    ...alignment.MRsmall,
  },
  boxContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
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
  scrollviewContent: {
    alignItems: 'center',
    ...alignment.PTsmall,
    ...alignment.PBsmall,
  },
  typeBox: {
    width: scale(100),
    height: scale(35),
    ...alignment.PLsmall,
    ...alignment.PRsmall,
    ...alignment.MRsmall,
  },
  textContainer: {
    backgroundColor: COLORS.themeBackground,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scale(5),
    height: scale(40),
    ...alignment.MTsmall,
  },
  descriptionContainer: {
    backgroundColor: COLORS.themeBackground,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scale(5),
    height: scale(70),
    ...alignment.MTsmall,
  },
  locationOptionContainer: {
    backgroundColor: COLORS.themeBackground,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scale(50),
    height: scale(80),
  },
  locationItemStyle: {
    borderBottomColor: COLORS.headerbackground,
    borderBottomWidth: 1,
    ...alignment.PTmedium,
    ...alignment.PBmedium,
  },
  inputText: {
    flex: 1,
    ...textStyles.H4,
    ...alignment.PLsmall,
    ...alignment.PRsmall,
  },
  inputConainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.themeBackground,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scale(5),
    ...alignment.Psmall,
    ...alignment.MTsmall,
  },
  buttonView: {
    width: '90%',
    alignSelf: 'center',
    ...alignment.PBsmall,
  },
});

export default styles;

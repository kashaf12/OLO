import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale, textStyles } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  width100: {
    width: '100%',
  },
  safeAreaView: {
    backgroundColor: COLORS.headerbackground,
  },
  mainContainer: {
    backgroundColor: COLORS.themeBackground,
  },
  basicInfoContainer: {
    ...alignment.PTlarge,
    ...alignment.PLmedium,
    ...alignment.PRmedium,
    borderBottomColor: COLORS.medHorizontalLine,
    // borderBottomWidth: StyleSheet.hairlineWidth
  },
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: COLORS.containerBox,
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderColor: COLORS.buttonbackground,
    borderWidth: scale(2),
    borderRadius: scale(75),
  },
  editButton: {
    position: 'absolute',
    backgroundColor: COLORS.buttonbackground,
    borderRadius: scale(15),
    padding: scale(2),
    right: scale(2),
    bottom: scale(0),
  },
  subContainer: {
    ...alignment.PLsmall,
    ...alignment.PBsmall,
    ...alignment.PTsmall,
  },
  textContainer: {
    backgroundColor: COLORS.themeBackground,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scale(5),
    height: scale(35),
    ...alignment.MTxSmall,
  },
  descriptionContainer: {
    backgroundColor: COLORS.themeBackground,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scale(5),
    height: scale(50),
    ...alignment.MTsmall,
  },
  inputText: {
    flex: 1,
    ...textStyles.H5,
    ...alignment.PLsmall,
    ...alignment.PRsmall,
  },
  phoneRow: {
    ...alignment.MTsmall,
    ...alignment.MBsmall,
  },
  countryBox: {
    width: '20%',
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: scale(1),
  },
  numberBox: {
    backgroundColor: COLORS.fontPlaceholder,
    width: '100%',
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: scale(1),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  emailBox: {
    width: '100%',
    backgroundColor: COLORS.fontPlaceholder,
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: scale(1),
    ...alignment.MTsmall,
  },
  optionalLeft: {
    width: '60%',
    // ...alignment.PTmedium,
    // ...alignment.PBmedium
  },
  optionalRight: {
    width: '35%',
  },
  error: {
    width: '70%',
    alignSelf: 'flex-end',
  },
});

export default styles;

import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { verticalScale, scale, alignment } from '@/utils';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  subContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: scale(20),
    justifyContent: 'space-between',
  },
  upperContainer: {
    width: '90%',
    alignItems: 'center',
  },
  addressContainer: {
    padding: scale(10),
    paddingTop: 0,
    width: '100%',
  },
  labelButtonContainer: {
    padding: scale(5),
    width: '100%',
  },
  labelTitleContainer: {
    paddingTop: scale(10),
    paddingBottom: scale(10),
  },
  labelText: {
    fontSize: scale(14),
  },
  buttonInline: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelButton: {
    width: '30%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 30,
    padding: scale(5),
    justifyContent: 'center',
  },
  labelButtonText: {
    fontSize: scale(12),
    textAlign: 'center',
  },
  activeLabel: {
    width: '30%',
    borderWidth: 1,
    borderRadius: 30,
    padding: scale(5),
    justifyContent: 'center',
    color: COLORS.primary,
    borderColor: COLORS.primary,
  },
  activeButtonText: {
    fontSize: scale(12),
    textAlign: 'center',
    color: COLORS.primary,
  },
  saveBtnContainer: {
    width: '100%',
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.black,
  },
  saveBtnText: {
    color: COLORS.primary,
    fontSize: scale(16),
  },
  fakeMarkerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: -24,
    marginTop: -58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  marker: {
    height: 48,
    width: 48,
  },
  mapContainer: {
    height: '40%',
    backgroundColor: 'black',
  },
  alertboxRed: {
    marginTop:
      Platform.OS === 'ios' ? height * 0.1 : height * 0.1 - (StatusBar?.currentHeight || 0),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  alertboxGreen: {
    backgroundColor: 'rgba(49,169,96,0.85)',
    marginTop:
      Platform.OS === 'ios' ? height * 0.1 : height * 0.1 - (StatusBar?.currentHeight || 0),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  buttonView: {
    width: '90%',
    alignSelf: 'center',
    ...alignment.PBsmall,
  },

  mainContainer: {
    backgroundColor: COLORS.themeBackground,
    justifyContent: 'space-between',
  },
  safeAreaview: {
    backgroundColor: COLORS.bottomTabColor,
  },
  inputBorder: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...alignment.PBxSmall,
    ...alignment.Mlarge,
  },

  leftText: {
    borderRightColor: COLORS.fontSecondColor,
    borderRightWidth: StyleSheet.hairlineWidth,
    ...alignment.PRxSmall,
    ...alignment.MRmedium,
  },
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...alignment.Pmedium,
  },
});

export default styles;

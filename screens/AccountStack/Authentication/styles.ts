import { StyleSheet, Dimensions } from 'react-native';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.headerbackground,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.themeBackground,
  },
  skipButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: scale(10),
    backgroundColor: COLORS.headerbackground,
  },
  logoContainer: {
    height: height * 0.3,
    backgroundColor: COLORS.headerbackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: scale(200),
    height: scale(100),
  },
  appIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  authenticationContainer: {
    flex: 1,
    alignItems: 'center',
    gap: scale(10),
    paddingVertical: scale(10),
    backgroundColor: COLORS.buttonbackground,
  },
  phoneInputContainer: {
    width: '100%',
    gap: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInputWidth: {
    width: '85%',
    marginBottom: 0,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.buttonbackground,
    paddingVertical: scale(10),
  },
  underlinedText: {
    textDecorationLine: 'underline',
  },
  appleBtn: {
    width: '85%',
    height: 50,
    fontSize: 20,
  },
  textTitle: {
    fontSize: scale(52),
    letterSpacing: scale(5),
  },
});

export default styles;

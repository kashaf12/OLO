import { COLORS } from '@/constants';
import { scale, alignment } from '@/utils';

const { StyleSheet, Dimensions } = require('react-native');
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeAreaViewStyles: {
    backgroundColor: COLORS.headerbackground,
    overflow: 'hidden',
  },
  mainContainer: {
    backgroundColor: COLORS.themeBackground,
  },
  logoContainer: {
    height: height * 0.5,
    backgroundColor: COLORS.headerbackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.buttonbackground,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.buttonbackground,
    ...alignment.PBxSmall,
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
  image: {
    width: scale(200),
    height: scale(100),
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
export default styles;

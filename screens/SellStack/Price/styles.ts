import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: COLORS.themeBackground,
  },
  safeAreaview: {
    backgroundColor: COLORS.bottomTabColor,
  },
  inputBorder: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    ...alignment.PBxSmall,
    ...alignment.Mlarge,
  },
  buttonView: {
    width: '90%',
    alignSelf: 'center',
    ...alignment.PBsmall,
  },
  leftText: {
    borderRightColor: COLORS.fontSecondColor,
    borderRightWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    ...alignment.PRxSmall,
    ...alignment.MRmedium,
  },
});
export default styles;

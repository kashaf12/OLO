import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeAreaViewStyles: {
    backgroundColor: COLORS.headerbackground,
  },
  mainContainer: {
    backgroundColor: COLORS.themeBackground,
  },
  body: {
    ...alignment.PTsmall,
  },
  stateBtn: {
    justifyContent: 'center',
    ...alignment.Psmall,
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.horizontalLine,
  },
  font: {
    ...alignment.PLsmall,
  },
});

export default styles;

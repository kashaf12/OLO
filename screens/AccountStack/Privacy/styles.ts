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
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...alignment.Psmall,
  },
});
export default styles;

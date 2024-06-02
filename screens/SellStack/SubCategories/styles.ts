import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeAreaview: {
    backgroundColor: COLORS.bottomTabColor,
  },
  container: {
    backgroundColor: COLORS.themeBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    width: '100%',
    backgroundColor: COLORS.themeBackground,
  },
  categoryContainer: {
    flexGrow: 1,
    ...alignment.PTmedium,
    ...alignment.PBlarge,
  },
  categoryRow: {
    height: scale(45),
    justifyContent: 'center',
  },
  fontText: {
    width: '100%',
    ...alignment.PLlarge,
    ...alignment.PRlarge,
  },
  line: {
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default styles;

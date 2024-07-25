import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.themeBackground,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  flatListContent: {
    // flexGrow: 1,
    // flex: 1,
    // width: '100%',
    // width: '100%',
    // backgroundColor: 'orange',
    // ...alignment.Plarge,
  },
  mainContainer: {
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: scale(100),
    // flex: 1 / 2,
  },
  borderStyle: {
    borderRightColor: COLORS.medHorizontalLine,
    borderRightWidth: scale(1),
  },
  imageView: {
    height: scale(30),
    width: scale(30),
    ...alignment.MBsmall,
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  seperator: {
    height: scale(1),
    backgroundColor: COLORS.medHorizontalLine,
  },
});
export default styles;

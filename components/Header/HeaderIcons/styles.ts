import { Dimensions, StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  leftIconPadding: {
    ...alignment.PLxSmall,
    ...alignment.PRxSmall,
  },
  rightIconPadding: {
    ...alignment.PLmedium,
    ...alignment.PRsmall,
  },
  textIcon: {
    ...alignment.PLmedium,
    ...alignment.PRsmall,
  },
  rightOuter: {
    height: '90%',
    justifyContent: 'center',
  },
  //   rightContainer: {
  //     height: '95%',
  //     width: scale(140),
  //     justifyContent: 'center',
  //     backgroundColor: COLORS.containerBox,
  //     ...alignment.MRsmall,
  //     ...alignment.PLsmall,
  //   },
  shareBtn: {
    width: width * 0.5,
    backgroundColor: COLORS.containerBox,
    position: 'absolute',
    right: scale(5),
    ...alignment.Psmall,
  },
  rightContainer: {
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    ...alignment.PLxSmall,
  },
  flex: {
    display: 'flex',
  },
});

export default styles;

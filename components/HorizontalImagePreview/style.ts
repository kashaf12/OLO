import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.horizontalLine,
  },
  horizontalScrollContainer: {
    height: '100%',
    paddingHorizontal: scale(5),
  },
  horizontalScrollContentContainer: {
    gap: scale(5),
  },
  imageContainer: {
    borderWidth: 1,
    backgroundColor: COLORS.containerBox,
    width: scale(48),
    overflow: 'hidden',
  },
  imgResponsive: { flex: 1, width: undefined, height: undefined },
});

export default styles;

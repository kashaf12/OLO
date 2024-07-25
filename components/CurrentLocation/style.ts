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
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: scale(12),
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.fontMainColor,
  },
  subtitle: {
    color: COLORS.fontSecondColor,
  },
  enableButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(4),
  },
  enableButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default styles;

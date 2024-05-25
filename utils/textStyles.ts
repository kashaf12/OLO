import { scale } from './scaling';

import { FONT_STYLES } from '@/constants';

export const textStyles = {
  H1: {
    fontSize: scale(35),
  },
  H2: {
    fontSize: scale(24),
  },
  H3: {
    fontSize: scale(20),
  },
  H4: {
    fontSize: scale(16),
  },
  H5: {
    fontSize: scale(14),
  },
  Normal: {
    fontSize: scale(12),
  },
  Small: {
    fontSize: scale(10),
  },
  Thin: {
    fontFamily: FONT_STYLES.Thin,
  },
  Light: {
    fontFamily: FONT_STYLES.Light,
  },
  Regular: {
    fontFamily: FONT_STYLES.Regular,
  },
  Bold: {
    fontFamily: FONT_STYLES.Bold,
  },
  Bolder: {
    fontFamily: FONT_STYLES.Bolder,
  },
  Center: {
    textAlign: 'center',
  },
  Right: {
    textAlign: 'right',
  },
  UpperCase: {
    textTransform: 'uppercase',
  },
};

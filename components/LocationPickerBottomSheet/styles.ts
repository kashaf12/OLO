import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: scale(10),
    gap: scale(10),
  },
  textStyle: {
    fontWeight: 'bold',
  },
  leftIconStyle: {
    // alignSelf: 'center',
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.buttonbackground,
    borderRadius: scale(8),
    paddingHorizontal: scale(4),
  },
});

export default styles;

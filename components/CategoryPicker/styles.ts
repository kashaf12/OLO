import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.medHorizontalLine,
    borderRadius: 5,
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderColor: COLORS.medHorizontalLine,
  },
});

export default styles;

import { StyleSheet } from 'react-native';

import { scale } from '@/utils';

const styles = StyleSheet.create({
  containerStyle: {
    fontSize: scale(12),
    textAlign: 'center',
    marginTop: scale(24),
  },
  textStyle: {
    fontWeight: 'bold',
  },
});

export default styles;

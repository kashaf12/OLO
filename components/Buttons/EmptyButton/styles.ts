import { StyleSheet } from 'react-native';

import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  emptyButton: {
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: scale(5),
    ...alignment.MTlarge,
  },
});
export default styles;

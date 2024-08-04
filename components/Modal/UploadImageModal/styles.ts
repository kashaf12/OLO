import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    margin: scale(20),
    width: '85%',
    backgroundColor: COLORS.containerBox,
    borderRadius: scale(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    ...alignment.Plarge,
  },
  buttonsRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    ...alignment.PTsmall,
  },
  button: {
    backgroundColor: COLORS.bottomTabColor,
    borderRadius: scale(4),
    alignItems: 'center',
    gap: scale(2),
    ...alignment.Psmall,
  },
});
export default styles;

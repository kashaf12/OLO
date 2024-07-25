import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    ...alignment.PTsmall,
  },
  button: {
    ...alignment.PTmedium,
    ...alignment.PLlarge,
    ...alignment.MLsmall,
  },
  buttonText: {
    borderBottomColor: COLORS.buttonbackground,
    borderBottomWidth: 2,
    ...alignment.PBxSmall,
  },
});
export default styles;

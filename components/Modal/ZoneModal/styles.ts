import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeAreaViewStyles: {
    backgroundColor: COLORS.headerbackground,
  },
  mainContainer: {
    backgroundColor: COLORS.themeBackground,
  },
  body: {
    ...alignment.PTsmall,
  },
  headerContents: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  closeBtn: {
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scale(5),
    height: scale(35),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.containerBox,
    overflow: 'hidden',
  },
  backBtn: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputAddress: {
    width: '90%',
    ...alignment.PLxSmall,
    ...alignment.PRxSmall,
  },
  currentLocation: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    ...alignment.MTlarge,
  },
  title: {
    backgroundColor: COLORS.headerbackground,
    ...alignment.MTmedium,
    ...alignment.PLmedium,
    ...alignment.PTxSmall,
    ...alignment.PBxSmall,
  },
  stateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...alignment.Psmall,
  },
});

export default styles;

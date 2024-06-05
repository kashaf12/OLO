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
  headerContainer: {
    width: '100%',
    height: scale(50),
    backgroundColor: COLORS.headerbackground,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.horizontalLine,
  },
  headerContents: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scale(5),
    height: scale(30),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.headerbackground,
    overflow: 'hidden',
  },
  backBtn: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtn: {
    backgroundColor: COLORS.buttonbackground,
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    width: '80%',
    ...alignment.PLxSmall,
    ...alignment.PRxSmall,
  },
  inputAddress: {
    width: '90%',
    ...alignment.PLxSmall,
    ...alignment.PRxSmall,
  },
  body: {
    ...alignment.Plarge,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    ...alignment.MTlarge,
  },
  fontText: {
    flex: 1,
    ...alignment.PLlarge,
  },
});

export default styles;

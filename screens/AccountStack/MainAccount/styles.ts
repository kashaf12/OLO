import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.themeBackground,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...alignment.Plarge,
  },
  imageContainer: {
    backgroundColor: COLORS.containerBox,
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    overflow: 'hidden',
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileInfo: {
    ...alignment.PLmedium,
  },
  font: {
    borderBottomColor: COLORS.fontMainColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...alignment.Pmedium,
  },
  loginBtn: {
    width: '90%',
    alignSelf: 'center',
  },
});
export default styles;

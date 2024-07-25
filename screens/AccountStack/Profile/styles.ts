import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: COLORS.themeBackground,
  },
  subContainer: {
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    ...alignment.Pmedium,
  },
  profileContainer: {
    borderBottomColor: COLORS.medHorizontalLine,
    borderBottomWidth: scale(2),
    ...alignment.Psmall,
  },
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
  },
  following: {
    flex: 1,
    alignItems: 'center',
    borderRightColor: COLORS.horizontalLine,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  follower: {
    flex: 1,
    alignItems: 'center',
  },
  editButton: {
    width: '85%',
    borderWidth: scale(1),
    borderColor: COLORS.buttonbackground,
    borderRadius: scale(5),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(30),
    ...alignment.MTsmall,
  },
});

export default styles;

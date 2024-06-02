import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ModalHeaderProps } from './ModalHeader.types';
import styles from './styles';
import { TextDefault } from '../../Text';
import { LeftButton } from '../HeaderIcons/HeaderIcons';

import { COLORS } from '@/constants';

function ModalHeader({ title, closeModal }: ModalHeaderProps) {
  return (
    <View
      style={[styles.headerContainer, { borderBottomWidth: title ? StyleSheet.hairlineWidth : 0 }]}>
      <View style={styles.headerContents}>
        <LeftButton icon="close" iconColor={COLORS.headerText} navigate={closeModal} />
        {title && (
          <TextDefault textColor={COLORS.headerText} style={styles.title} bolder H3>
            {title}
          </TextDefault>
        )}
      </View>
    </View>
  );
}
export default React.memo(ModalHeader);

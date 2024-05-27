import { Ionicons, EvilIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButtonProps, LeftButtonProps, RightButtonProps } from './HeaderIcons.types';
import styles from './styles';

import { TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

function BackButton(props: BackButtonProps) {
  if (props.icon === 'leftArrow') {
    return (
      <Ionicons
        name="arrow-back"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    );
  } else if (props.icon === 'menu') {
    return (
      <MaterialIcons
        name="menu"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    );
  } else if (props.icon === 'share') {
    return (
      <EvilIcons
        name="share-google"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    );
  } else if (props.icon === 'dots') {
    return (
      <MaterialCommunityIcons
        name="dots-vertical"
        size={scale(30)}
        style={styles.rightIconPadding}
        color={props.iconColor}
      />
    );
  } else if (props.icon === 'target') {
    return <MaterialIcons name="my-location" size={scale(20)} color={props.iconColor} />;
  } else {
    return (
      <Ionicons
        name="close"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    );
  }
}

function LeftButton(props: LeftButtonProps) {
  const router = useRouter();
  if (props.icon === 'back') {
    return (
      <TouchableOpacity onPress={router.back}>
        <BackButton iconColor={props.iconColor} icon="leftArrow" />
      </TouchableOpacity>
    );
  } else if (props.icon === 'close' && props.action === 'POP') {
    return (
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}>
        <BackButton iconColor={props.iconColor} icon="close" />
      </TouchableOpacity>
    );
  } else if (props.icon === 'close') {
    return (
      <TouchableOpacity
        onPress={() => {
          if (props.navigate) props.navigate();
          else router.back();
          // navigation.dispatch(state => {
          //   const routes = state.routes.filter(r => r.name === 'Menu')
          //   return CommonActions.reset({
          //     ...state,
          //     routes,
          //     index: 0
          //   })
          // })
        }}>
        <BackButton iconColor={props.iconColor} icon="close" />
      </TouchableOpacity>
    );
  }
}
function RightButton(props: RightButtonProps) {
  const [password, setPassword] = useState(false);
  const inset = useSafeAreaInsets();

  function togglePassword() {
    setPassword((prev) => !prev);
  }
  if (props.icon === 'share') {
    return (
      <TouchableOpacity onPress={props?.onPress}>
        <BackButton iconColor={props.iconColor} icon="share" />
      </TouchableOpacity>
    );
  } else if (props.icon === 'dots') {
    return (
      <View>
        {password ? (
          <Modal animationType="fade" visible={password} onRequestClose={() => setPassword(false)}>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1 }}
              onPress={() => {
                if (props.share) props?.share();
                setPassword(false);
              }}>
              <BorderlessButton
                onPress={props.share}
                borderless={false}
                style={[styles.shareBtn, { top: inset.top }]}>
                <TextDefault textColor={COLORS.headerText} H5 bold style={styles.flex}>
                  Share Profile
                </TextDefault>
              </BorderlessButton>
            </TouchableOpacity>
          </Modal>
        ) : (
          <TouchableOpacity onPress={togglePassword}>
            <BackButton iconColor={props.iconColor} icon="dots" />
          </TouchableOpacity>
        )}
      </View>
    );
  } else if (props.icon === 'text') {
    return (
      <BorderlessButton onPress={props?.onPress} borderless={false} style={styles.rightOuter}>
        <TextDefault textColor={props.iconColor} H5 style={styles.textIcon}>
          {props.title || ''}
        </TextDefault>
      </BorderlessButton>
    );
  } else if (props.icon === 'target') {
    return (
      <TouchableOpacity onPress={props?.onPressRight}>
        <View style={[styles.rightContainer, { ...alignment.PRsmall }]}>
          <BackButton iconColor={props.iconColor} icon="target" />
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

export { BackButton, LeftButton, RightButton };

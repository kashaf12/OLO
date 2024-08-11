import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import { EditProfileI, EditProfileProps } from './EditProfile.types';
import styles from './styles';

import { DisconnectButton, EmptyButton, TextDefault, UploadImageModal } from '@/components';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

const IMAGE_PLACEHOLDER = require('@/assets/avatar.png');

const EditProfile = React.forwardRef<EditProfileI, EditProfileProps>(
  ({ user, saveImageOnBackend }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [adColor, setAdColor] = useState(COLORS.fontThirdColor);
    const [descriptionColor, setDescriptionColor] = useState(COLORS.fontMainColor);
    const [name, setName] = useState(user?.displayName || 'name');
    const [description, setDescription] = useState(user?.description || '');
    const [nameError, setNameError] = useState<string | null>(null);
    const [margin, marginSetter] = useState(false);
    const [image, setImage] = useState<string | null>(user?.profilePhotoUrl || null);
    const [imageUploading, setImageUploading] = useState(false);
    const onSave = () => {
      if (validation()) {
        return {
          description,
          displayName: name,
          image,
        };
      }
      return null;
    };

    useImperativeHandle(ref, () => ({ onSave }), [onSave]);

    function validation() {
      if (name.length < 1) {
        setNameError('This is mandatory. Please complete the required field.');
        return false;
      }

      return true;
    }

    useEffect(() => {
      Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

      // cleanup function
      return () => {
        Keyboard.removeAllListeners('keyboardDidShow');
        Keyboard.removeAllListeners('keyboardDidHide');
      };
    }, []);
    function _keyboardDidShow() {
      marginSetter(true);
    }
    function _keyboardDidHide() {
      marginSetter(false);
    }

    const uploadGalleryImage = async () => {
      try {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
        if (!result.canceled && result.assets.length > 0) {
          await saveImage(result.assets[0].uri);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert('Error uploading image: ' + error.message);
          setShowModal(false);
        }
      }
    };

    const uploadCameraImage = async () => {
      try {
        await ImagePicker.requestCameraPermissionsAsync();
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          cameraType: ImagePicker.CameraType.front,
          aspect: [1, 1],
          quality: 0.5,
        });
        if (!result.canceled && result.assets.length > 0) {
          await saveImage(result.assets[0].uri);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert('Error uploading image: ' + error.message);
          setShowModal(false);
        }
      }
    };

    const removeImage = async () => {
      try {
        setImageUploading(true);
        setImage(null);
        setImage(image);
        await saveImageOnBackend?.(null);
      } catch (error) {
        if (error instanceof Error) {
          alert('Error uploading image: ' + error.message);
        }
      } finally {
        setImageUploading(false);
        setShowModal(false);
      }
    };

    const saveImage = async (image: string) => {
      try {
        setImageUploading(true);
        setImage(image);
        await saveImageOnBackend?.(image);
      } catch (error) {
        if (error instanceof Error) {
          alert('Error uploading image: ' + error.message);
        }
      } finally {
        setImageUploading(false);
        setShowModal(false);
      }
    };

    return (
      <SafeAreaView style={[styles.flex, styles.safeAreaView]}>
        <UploadImageModal
          modalVisible={showModal}
          onBackPress={() => setShowModal(false)}
          onCameraPress={uploadCameraImage}
          onGalleryPress={uploadGalleryImage}
          onRemovePress={removeImage}
          isLoading={imageUploading}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.flex}
            alwaysBounceVertical={false}
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: COLORS.themeBackground,
              paddingBottom: Platform.OS === 'ios' ? (margin ? scale(70) : 0) : 0,
            }}>
            <View style={styles.flex}>
              <View style={styles.basicInfoContainer}>
                <TextDefault textColor={COLORS.fontMainColor} bold H4 style={alignment.MTlarge}>
                  Basic information
                </TextDefault>
                <View style={styles.upperContainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.imgResponsive}
                      source={image ? { uri: image } : IMAGE_PLACEHOLDER}
                      resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.editButton} onPress={() => setShowModal(true)}>
                      <MaterialCommunityIcons
                        name="camera-outline"
                        size={scale(20)}
                        color={COLORS.activeLine}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.subContainer, styles.flex]}>
                    <TextDefault
                      textColor={nameError ? COLORS.google : adColor}
                      bold
                      style={styles.width100}>
                      Enter Name
                      <TextDefault textColor={COLORS.errorColor}>*</TextDefault>
                    </TextDefault>
                    <View style={[styles.textContainer, { borderColor: adColor }]}>
                      <TextInput
                        style={styles.inputText}
                        onFocus={() => {
                          setNameError(null);
                          setAdColor(COLORS.selectedText);
                        }}
                        defaultValue={name}
                        onBlur={() => setAdColor(COLORS.fontThirdColor)}
                        onChangeText={(text) => setName(text)}
                        placeholderTextColor={COLORS.fontThirdColor}
                        placeholder="Enter your name"
                      />
                    </View>
                    {nameError && (
                      <TextDefault textColor={COLORS.google} style={styles.width100}>
                        {nameError}
                      </TextDefault>
                    )}
                  </View>
                </View>
                <View style={styles.subContainer}>
                  <TextDefault textColor={descriptionColor} bold style={styles.width100}>
                    Description
                  </TextDefault>
                  <View style={[styles.descriptionContainer, { borderColor: descriptionColor }]}>
                    <TextInput
                      style={styles.inputText}
                      maxLength={140}
                      multiline
                      onFocus={() => {
                        setDescriptionColor(COLORS.selectedText);
                      }}
                      defaultValue={description}
                      onBlur={() => setDescriptionColor(COLORS.fontMainColor)}
                      onChangeText={(text) => setDescription(text)}
                      placeholderTextColor={COLORS.fontSecondColor}
                      placeholder="Something about you"
                    />
                  </View>
                  <TextDefault light small right style={alignment.MTxSmall}>
                    {description.length + '/ 140'}
                  </TextDefault>
                </View>
              </View>

              <View style={styles.basicInfoContainer}>
                <TextDefault textColor={COLORS.fontMainColor} bold H4>
                  Contact information
                </TextDefault>
                <TouchableOpacity activeOpacity={1} style={styles.phoneRow}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      flex: 1,
                    }}>
                    <View style={styles.numberBox}>
                      <View>
                        <TextDefault textColor={COLORS.fontThirdColor}>Phone Number</TextDefault>
                        <TextDefault
                          textColor={
                            (user?.phoneNumber?.length ?? 0) < 1
                              ? COLORS.fontThirdColor
                              : COLORS.fontMainColor
                          }
                          H5
                          style={[alignment.PBxSmall, alignment.PTxSmall]}>
                          {(user?.phoneNumber?.length ?? 0) < 1 ? 'NOT FOUND' : user?.phoneNumber}
                        </TextDefault>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.emailBox}>
                  <TextDefault textColor={COLORS.fontThirdColor}>Email</TextDefault>
                  <TextDefault
                    textColor={
                      (user?.email?.length ?? 0) < 1
                        ? COLORS.fontThirdColor
                        : COLORS.fontSecondColor
                    }
                    H5
                    style={[alignment.PBxSmall, alignment.PTxSmall]}>
                    {user?.email || 'NOT FOUND'}
                  </TextDefault>
                </View>
                <TextDefault
                  textColor={COLORS.fontSecondColor}
                  style={[alignment.MTxSmall, alignment.MBsmall]}>
                  This email will be useful to keep in touch. We won't share your private email with
                  other App users.
                </TextDefault>
              </View>
              <View style={styles.basicInfoContainer}>
                <TextDefault textColor={COLORS.fontMainColor} bold H4>
                  Optional information
                </TextDefault>
                <TouchableOpacity activeOpacity={1} style={styles.phoneRow}>
                  <View style={styles.optionalLeft}>
                    <TextDefault textColor={COLORS.fontMainColor} H5 style={alignment.MBsmall}>
                      Google
                    </TextDefault>
                    <TextDefault
                      textColor={COLORS.fontSecondColor}
                      style={[alignment.PBxSmall, alignment.PTxSmall]}>
                      Connect your App account to your Google account for simplicity and ease.
                    </TextDefault>
                  </View>
                  <View style={styles.optionalRight}>
                    {!user?.email ? (
                      <EmptyButton
                        title="Connect"
                        disabled
                        // onPress={() => navigation.goBack()}
                      />
                    ) : (
                      <DisconnectButton
                        title="Disconnect"
                        disabled
                        // onPress={() => navigation.goBack()}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
);

export default EditProfile;

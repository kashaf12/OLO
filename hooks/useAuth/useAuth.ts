import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useAuthStore } from '@/store';

GoogleSignin.configure({
  webClientId:
    Constants.expoConfig?.extra?.firebase.webClientId || process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});
export const useInitializeAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setIsLoading]);
};

export const useAuth = () => {
  const {
    user,
    isLoading,
    isGoogleSignInLoading,
    isPhoneVerificationLoading,
    confirm,
    setIsGoogleSignInLoading,
    setIsPhoneVerificationLoading,
    setConfirm,
    setUser,
    setIsLoading,
  } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isLoading: state.isLoading,
      isGoogleSignInLoading: state.isGoogleSignInLoading,
      isPhoneVerificationLoading: state.isPhoneVerificationLoading,
      confirm: state.confirm,
      setIsGoogleSignInLoading: state.setIsGoogleSignInLoading,
      setIsPhoneVerificationLoading: state.setIsPhoneVerificationLoading,
      setConfirm: state.setConfirm,
      setUser: state.setUser,
      setIsLoading: state.setIsLoading,
    }))
  );

  const signInWithGoogle = async () => {
    setIsGoogleSignInLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setIsGoogleSignInLoading(false);
    }
  };

  const sendPhoneVerification = async (phoneNumber: string) => {
    setIsPhoneVerificationLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      return confirmation;
    } catch (error) {
      console.error('Error sending phone verification:', error);
      throw error;
    } finally {
      setIsPhoneVerificationLoading(false);
    }
  };

  // const verifyPhoneNumber = async (phoneNumber: string, codeSentCallback: () => void) => {
  //   setIsPhoneVerificationLoading(true);
  //   auth()
  //     .verifyPhoneNumber(phoneNumber)
  //     .on('state_changed', async (phoneAuthSnapshot) => {
  //       setIsPhoneVerificationLoading(false);
  //       console.log({ phoneAuthSnapshot });
  //       switch (phoneAuthSnapshot.state) {
  //         case auth.PhoneAuthState.CODE_SENT:
  //           codeSentCallback();
  //           console.log('sent sms code');
  //           break;

  //         case auth.PhoneAuthState.ERROR:
  //           console.error('error');
  //           break;

  //         case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
  //           console.error('auto verify timeout error');
  //           break;

  //         case auth.PhoneAuthState.AUTO_VERIFIED:
  //           console.log('auto verified');

  //           if (phoneAuthSnapshot.code === null) return;

  //           const phoneCredential = auth.PhoneAuthProvider.credential(
  //             phoneAuthSnapshot.verificationId,
  //             phoneAuthSnapshot.code
  //           );

  //           console.log('phoneCredential', phoneCredential);
  //           const response = await auth().signInWithCredential(phoneCredential);
  //           console.log('response', response);
  //           console.log('success phone auth sign in and login');
  //           break;
  //       }
  //     });
  // };

  const verifyPhoneCode = async (code: string) => {
    if (!confirm) {
      throw new Error('No confirmation result found');
    }
    setIsPhoneVerificationLoading(true);
    try {
      const credential = await confirm.confirm(code);
      if (!credential) return;
      setUser(credential.user);
      return credential;
    } catch (error) {
      console.error('Error verifying phone code:', error);
      throw error;
    } finally {
      setIsPhoneVerificationLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isGoogleSignInLoading,
    isPhoneVerificationLoading,
    signInWithGoogle,
    sendPhoneVerification,
    verifyPhoneCode,
    signOut,
    // verifyPhoneNumber,
  };
};

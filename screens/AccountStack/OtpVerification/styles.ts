import { StyleSheet, Platform } from 'react-native';

import { COLORS } from '@/constants';
import { scale } from '@/utils';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  phoneNumberText: {
    fontWeight: 'bold',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    padding: scale(20),
    flex: 1,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
  otpResendButton: {
    alignItems: 'center',
    width: '100%',
    marginTop: scale(16),
  },
  otpResendButtonText: {
    color: COLORS.fontMainColor,
    textTransform: 'none',
    textDecorationLine: 'underline',
  },
  otpText: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: scale(18),
    width: '100%',
  },
  fillWidthButton: {
    width: '100%',
    alignItems: 'center',
    paddingTop: scale(12),
    paddingBottom: scale(12),
  },
  errorContainer: {
    color: COLORS.errorColor,
    marginTop: scale(12),
    textAlign: 'center',
  },
  attemptsContainer: {
    textAlign: 'center',
    marginTop: scale(12),
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    padding: scale(16),
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  activityIndicator: {
    marginTop: scale(20),
  },
});

export default styles;

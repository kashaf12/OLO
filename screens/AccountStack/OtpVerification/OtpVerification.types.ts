export type OtpVerificationProps = {
  phoneNumber: string;
  onSubmitOtp: (otp: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
};

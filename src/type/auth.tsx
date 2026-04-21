import type { NavigateFunction } from "react-router-dom";
import type { CloudinaryPayload } from "./general";

export interface AuthState {
  isLoading: boolean;
  register: (data: RegisterPayload) => Promise<boolean>;
   verifyEmail: (data: VerifyEmailPayload) => Promise<boolean>;
   resendOtp : (data : ResendOtpPayload) => Promise<boolean>;
   deleteImage : (data : CloudinaryPayload) => Promise<boolean>;
    registerPracticeIdentity: (
    data: RegisterPracticeIdentityPayload
  ) => Promise<boolean>; 
}


export interface RegisterHandlerProps {
  data: RegisterPayload;
  register: (data: RegisterPayload) => Promise<boolean>;
  navigate: NavigateFunction;
}


export interface VerifyEmailHandlerProps {
  data: VerifyEmailPayload;
  verifyEmail: (data: VerifyEmailPayload) => Promise<boolean>;
  navigate: NavigateFunction;
}

export interface ResendOtpHandlerProps {
  data: ResendOtpPayload;
  resendOtp: (data: ResendOtpPayload) => Promise<boolean>;
}

export interface RegisterPracticeIdentityHandlerProps {
  data: RegisterPracticeIdentityPayload;
  register_practice_identity: (data: RegisterPracticeIdentityPayload) => Promise<boolean>;
  navigate: NavigateFunction;
}


export interface User {
  id: string;
  email: string;
  onboardingStep: number;           
  isOnboardingComplete: boolean;
}


export interface RegisterPayload {
  full_name: string;
  email_address: string;
  password: string;
  role: string;
}


export interface VerifyEmailPayload {
  email_address: string;
  otp: string;        
}

export interface ResendOtpPayload {
  email_address: string;
}


export interface RegisterPracticeIdentityPayload {
  user_id : string;
  name : string;
  number : string;
  country : string;
  logo : string;
  state : string;
}


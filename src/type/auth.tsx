import type { NavigateFunction } from "react-router-dom";
import type { CloudinaryPayload } from "./general";

export interface AuthState {
  isLoading: boolean;
  register: (data: RegisterPayload) => Promise<boolean>;
   verifyEmail: (data: VerifyEmailPayload) => Promise<boolean>;
   resendOtp : (data : ResendOtpPayload) => Promise<boolean>;
   deleteImage : (data : CloudinaryPayload) => Promise<boolean>;
   registerPracticeIdentity: (data: RegisterPracticeIdentityPayload) => Promise<boolean>; 
   registerPracticeDetails: (data: RegisterPracticeDetailsPayload) => Promise<boolean>; 
   registerComplianceTerms: (data: RegisterComplianceTermsPayload) => Promise<boolean>; 
   

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

export interface RegisterPracticeDetailsHandlerProps {
  data: RegisterPracticeDetailsPayload;
  register_practice_details: (data: RegisterPracticeDetailsPayload) => Promise<boolean>;
  navigate: NavigateFunction;
}

export interface RegisterComplianceTermsHandlerProps {
  data: RegisterComplianceTermsPayload;
  register_compliance_terms: (data: RegisterComplianceTermsPayload) => Promise<boolean>;
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

export interface RegisterPracticeDetailsPayload {
  user_id: string;
  main_phone_number: string;
  website: string;
  number_of_practitioners: string;
  insurance_plans: string[];
}



export interface RegisterComplianceTermsPayload{
    user_id: string;
    business_associate_agreement: boolean;
    terms_of_service: boolean;
    data_processing_agreement: boolean,
    practice_information_accuracy: boolean;
}




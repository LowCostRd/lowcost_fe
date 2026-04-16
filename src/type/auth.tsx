export interface AuthState {
  isLoading: boolean;
  register: (data: RegisterPayload) => Promise<boolean>;
   verifyEmail: (data: VerifyEmailPayload) => Promise<boolean>;
}



export interface RegisterPayload {
  full_name: string;
  email_address: string;
  password: string;
  role: string;
}

export interface RegisterHandlerProps {
  data: RegisterPayload;
  register: (data: RegisterPayload) => Promise<boolean>;
  navigate: (path: string, options?: unknown) => void;
}


export interface VerifyEmailHandlerProps {
  data: VerifyEmailPayload;
  verifyEmail: (data: VerifyEmailPayload) => Promise<boolean>;
  navigate: (path: string, options?: unknown) => void;
}


export interface User {
  id: string;
  email: string;
  onboardingStep: number;           
  isOnboardingComplete: boolean;
}


export interface VerifyEmailPayload {
  email_address: string;
  otp: string;        
}


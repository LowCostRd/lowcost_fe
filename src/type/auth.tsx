export interface AuthState {
  isLoading: boolean;
  register: (data: RegisterPayload) => Promise<boolean>;
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
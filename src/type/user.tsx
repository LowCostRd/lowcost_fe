export interface GetState {
  isLoading: boolean;
  get_user_by_email_address: (data: getUserPayload) => Promise<getUserResponse>;
}


export interface GetUserByEmailAddressHandlerProps {
  data: getUserPayload;
  get_user_by_email_address: (data: getUserPayload) => Promise<getUserResponse>;
}

export interface getUserResponse {
  _id: string;
  full_name: string;
  email_address: string;
  role: string;
  is_verified: boolean;
  created_at: { $date: string };
}

export interface getUserPayload {
    email_address : string;
}
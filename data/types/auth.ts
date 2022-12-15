import { DefaultUser } from "next-auth";

export type CredentialsType = {
  email: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string;
};

export type ApiUser = {
  id: number;
  first_name: string;
  last_name: string;
  email_verified_at: string | null;
  email: string;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
  role: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: ApiUser;
  expires_at: number;
};

export type LoggedInUser = DefaultUser & LoginResponse;

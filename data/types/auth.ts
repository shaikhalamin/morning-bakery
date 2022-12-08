import { DefaultUser } from "next-auth";

export type CredentialsType = {
  username: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string;
};

export type ApiUser = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  isActive: boolean;
  isVerified: boolean;
  role: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: ApiUser;
  expires_at: number;
};

export type LoggedInUser = DefaultUser & LoginResponse;

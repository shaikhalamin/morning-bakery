export type User = {
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

import { ApiUser } from "@/data/types/auth";


export const setProfileFormValue = (setValue: CallableFunction, user: ApiUser) => {
  setValue("first_name", user.first_name);
  setValue("last_name", user.last_name);
  setValue("email", user.email);
  setValue("phone", user.phone);
  setValue("role", user.role);
};
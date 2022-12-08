import { User } from "@/data/model/user";

export const setProfileFormValue = (setValue: CallableFunction, user: User) => {
  setValue("firstName", user.firstName);
  setValue("lastName", user.lastName);
  setValue("username", user.username);
  setValue("email", user.email);
  setValue("phone", user.phone);
  setValue("role", user.role);
};

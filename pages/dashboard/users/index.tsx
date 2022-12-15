import UserList from "@/components/dashboard/user/UserList";
import AdminLayout from "@/components/layouts/AdminLayout";
import { getUsers } from "@/data/api/user";
import { User } from "@/data/model/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextPageWithLayout } from "@/pages/_app";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React, { ReactElement } from "react";

type UserProps = {
  users: User[];
};

const Index: NextPageWithLayout<UserProps> = ({ users }) => {
  return <UserList users={users} />;
};

Index.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    let users = [] as User[];
    if (session) {
      const token = `${(session as any)?.access_token}`;
      const role = `${(session as any)?.role}`;
      if (role !== "admin") {
        return {
          notFound: true,
        };
      }
      const usersResults = await getUsers(token);
      users = usersResults.data.data;
    }
    return { props: { users: users } };
  } catch (error) {
    console.log("data fetch error", { error: error });
    return {
      notFound: true,
    };
  }
};

export default Index;

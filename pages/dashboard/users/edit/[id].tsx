import EditUserInfo from "@/components/dashboard/user/EditUserInfo";
import AdminLayout from "@/components/layouts/AdminLayout";
import { getUser } from "@/data/api/user";
import { User } from "@/data/model/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextPageWithLayout } from "@/pages/_app";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React, { ReactElement } from "react";

type UserProps = {
  user: User;
};

export const AdminUserEdit: NextPageWithLayout<UserProps> = ({ user }) => {
  return <EditUserInfo user={user} />;
};

AdminUserEdit.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    const { id } = query;
    let user = {} as User;
    if (session) {
      const token = `${(session as any)?.access_token}`;
      const userResults = await getUser(Number(id), token);
      user = userResults.data.data as User;
    }
    return { props: { user: user } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default AdminUserEdit;

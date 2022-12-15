import ProfileBasicInfo from "@/components/dashboard/user/ProfileBasicInfo";
import AdminLayout from "@/components/layouts/AdminLayout";
import { getUser } from "@/data/api/user";
import { User } from "@/data/model/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextPageWithLayout } from "@/pages/_app";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React, { ReactElement } from "react";

type ProfileProps = {
  user: User;
};

const Profile: NextPageWithLayout<ProfileProps> = ({ user }) => {
  return <ProfileBasicInfo user={user} />;
};

Profile.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    let user = {} as User;
    if (session) {
      const token = `${(session as any)?.access_token}`;
      const userId = (session.user as any).id;
      const userResults = await getUser(+userId, token);
      user = userResults.data.data as User;
    }
    return { props: { user: user } };
  } catch (error) {
    console.log("data fetch error", { error: error });
    return {
      notFound: true,
    };
  }
};

export default Profile;

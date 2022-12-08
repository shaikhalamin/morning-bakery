import { GetServerSideProps } from "next";
import React, { ReactElement, useState } from "react";
import AdminPropertyList from "@/components/admin/properties/AdminPropertyList";
import AdminLayout from "@/components/layouts/AdminLayout";
import { PropertyList } from "@/data/model/property-list";
import { NextPageWithLayout } from "@/pages/_app";
import { getProperties } from "@/data/api/property";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type PropertyListProps = {
  properties: PropertyList;
};

const Index: NextPageWithLayout<PropertyListProps> = ({ properties }) => {
  const [propertyList, setPropertyList] = useState(properties);
  return <AdminPropertyList data={propertyList.data} />;
};

Index.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const userId = (session.user as any).id as string;
      const role = (session.user as any).role;
      let filterUrl = `?page=1&perPage=20&order[updated_at]=DESC`;
      if (role === "agent") {
        filterUrl += `&filters[userId]=${userId}`;
      }
      const result = await getProperties(filterUrl);
      const properties = result.data;
      return { props: { properties } };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Index;

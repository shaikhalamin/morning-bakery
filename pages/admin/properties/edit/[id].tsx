import PropertyEditForm from "@/components/admin/properties/PropertyEditForm";
import AdminLayout from "@/components/layouts/AdminLayout";
import { getCities } from "@/data/api/city";
import { getFeatures } from "@/data/api/feature";
import { getPropertyDetails } from "@/data/api/property";
import { getPropertyTypes } from "@/data/api/property-types";
import { Property, PropertyResponse } from "@/data/model/property";
import { PropertyFormHelpers } from "@/data/types/property/property";
import { NextPageWithLayout } from "@/pages/_app";
import { GetServerSideProps } from "next";
import React, { ReactElement } from "react";

type PropertyProps = {
  property: PropertyResponse;
  formsHelpers: PropertyFormHelpers;
};

export const PropertyEdit: NextPageWithLayout<PropertyProps> = ({
  property,
  formsHelpers,
}) => {
  return <PropertyEditForm data={formsHelpers} propertyData={property.data as Property} />;
};

PropertyEdit.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const result = await getPropertyDetails(Number(id));
  const property = result.data;
  const [propertyTypes, cities, features] = await Promise.all([
    getPropertyTypes(),
    getCities(),
    getFeatures(),
  ]);
  const formsHelpers = {
    propertyTypes: propertyTypes.data,
    cities: cities.data,
    features: features.data,
  };

  return { props: { formsHelpers, property } };
};

export default PropertyEdit;

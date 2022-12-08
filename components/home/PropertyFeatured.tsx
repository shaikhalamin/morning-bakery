import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import BaseContainer from "../common/container/BaseContainer";
import FeatureWithIcon from "../common/property-item/FeatureWithIcon";
import SectionTitleLink from "./SectionTitleLink";
import { PropertyList } from "@/data/model/property-list";
import Image from "next/image";
import PropertyHorizontalList from "../property/PropertyHorizontalList";

type PropertyFeaturedProps = {
  properties: PropertyList;
};

const PropertyFeatured: React.FC<PropertyFeaturedProps> = ({ properties }) => {
  return (
    <>
      <BaseContainer>
        <SectionTitleLink
          title={`Recent Real Estate`}
          linkTitle={`View more properties`}
          link={`/property-type/properties`}
        />
        <Row className="mt-1 mb-2">
          {properties.success && (
            <PropertyHorizontalList properties={properties.data} />
          )}
        </Row>
      </BaseContainer>
    </>
  );
};

export default PropertyFeatured;

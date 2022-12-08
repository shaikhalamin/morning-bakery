import { Property } from "@/data/model/property";
import React from "react";
import { Row, Col } from "react-bootstrap";
import SpecificationInfo from "./SpecificationInfo";
import SpecificationInfoDetails from "./SpecificationInfoDetails";

type PropertySpecificationsProps = {
  data?: Property;
};
const PropertySpecifications: React.FC<PropertySpecificationsProps> = ({
  data,
}) => {
  return (
    <>
      <SpecificationInfo title="Specification" lClSize={3} rClSize={9}>
        <Row>
          <Col md="6">
            <SpecificationInfoDetails
              title="Bedrooms:"
              content={data?.noOfBedRoom as number}
            />
            <SpecificationInfoDetails
              title="Property size:"
              content={data?.propertySize as number}
              contentPostfix="sq ft"
            />
            <SpecificationInfoDetails
              title="Total floors:"
              content={data?.totalFloors as number}
            />
            <SpecificationInfoDetails
              title="Heating:"
              content={data?.heating as string}
            />
          </Col>
          <Col md="6">
            <SpecificationInfoDetails
              title="Bathrooms:"
              content={data?.noOfBathRoom as number}
            />
            <SpecificationInfoDetails
              title="Year Built:"
              content={data?.yearBuild as number}
            />
            <SpecificationInfoDetails
              title="Accommodation:"
              content={data?.accommodations as string}
            />
          </Col>
        </Row>
      </SpecificationInfo>
      <SpecificationInfo title="" lClSize={3} rClSize={9}>
        <Row>
          <Col md="6">
            <SpecificationInfoDetails
              title="Ceiling height:"
              content={data?.ceilingHeight as number}
              contentPostfix="meter"
            />
            <SpecificationInfoDetails
              title="From center:"
              content={data?.distanceFromCenter as number}
              contentPostfix="miles"
            />
            <SpecificationInfoDetails
              title="Area size:"
              content={data?.areaSize as number}
              contentPostfix="sq ft"
            />
            {data?.garageSize && (
              <SpecificationInfoDetails
                title="Garages size:"
                content={data?.garageSize as number}
                contentPostfix="sq ft"
              />
            )}
          </Col>
          <Col md="6">
            <SpecificationInfoDetails
              title="Parking:"
              content={data?.parking as string}
            />

            {data?.publishedDate && (
              <SpecificationInfoDetails
                title="Publication date:"
                content={data?.publishedDate as string}
              />
            )}

            <SpecificationInfoDetails
              title="Garages:"
              content={data?.garage === true ? "Yes" : "No"}
            />
            <SpecificationInfoDetails
              title="Additional space:"
              content={data?.additionalSpec as string}
            />
          </Col>
        </Row>
      </SpecificationInfo>
    </>
  );
};

export default PropertySpecifications;

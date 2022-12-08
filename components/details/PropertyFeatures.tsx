import { Property } from "@/data/model/property";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { MdOutlineCheckCircle } from "react-icons/md";
import SpecificationInfo from "./SpecificationInfo";

type PropertyFeaturesProps = {
  data?: Property;
};

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ data }) => {
  return (
    <SpecificationInfo title="Features" lClSize={3} rClSize={9}>
      <Row className="mb-1 px-1 py-1">
        {data?.propertyFeatures.map((featureItem) => (
          <Col md="4" key={featureItem.id} className="mb-1">
            <Row className="mb-1 px-1">
              <Col md="2" className="text-start text-color-a3a ft-20 mt-1">
                <MdOutlineCheckCircle />
              </Col>
              <Col md="10" className="text-start text-color-a3a ft-14 mt-2">
                <span>{featureItem.feature.name}</span>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </SpecificationInfo>
  );
};

export default PropertyFeatures;

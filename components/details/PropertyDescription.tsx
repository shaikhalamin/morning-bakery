import React from "react";
import { Row, Col } from "react-bootstrap";
import SpecificationInfo from "./SpecificationInfo";

const PropertyDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <SpecificationInfo title="Description" lClSize={3} rClSize={9}>
      <Row className="mb-1 px-1 py-1">
        <Col md="12" className="text-start text-color-b94 ft-14">
          <div className="px-2 text-justify">{description}</div>
        </Col>
      </Row>
    </SpecificationInfo>
  );
};

export default PropertyDescription;

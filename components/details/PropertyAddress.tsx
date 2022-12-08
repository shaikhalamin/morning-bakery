import React from "react";
import { Row, Col } from "react-bootstrap";
import SpecificationInfo from "./SpecificationInfo";

const PropertyAddress: React.FC<{ address: string }> = ({ address }) => {
  return (
    <SpecificationInfo title="Address" lClSize={3} rClSize={9}>
      <Row className="mb-1 px-1 py-1">
        <Col md="12" className="text-start text-color-a3a ft-14">
          <div className="px-2">{address}</div>
        </Col>
      </Row>
    </SpecificationInfo>
  );
};

export default PropertyAddress;

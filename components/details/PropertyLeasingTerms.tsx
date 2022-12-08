import { Property } from "@/data/model/property";
import React from "react";
import { Row, Col } from "react-bootstrap";

type PropertyLeasingTermsProps = {
  data?: Property;
};

const PropertyLeasingTerms: React.FC<PropertyLeasingTermsProps> = ({
  data,
}) => {
  return (
    <Row className="py-4">
      <Col md="4">
        <h4 className="ft-16">Leasing Terms</h4>
      </Col>
      <Col md="4">
        <Row className="mb-1 px-1 py-1">
          <Col md="7" className="text-start text-color-b94 ft-13">
            Deposit:
          </Col>
          <Col md="5" className="text-start text-color-a3a ft-14">
            {data?.deposit}
          </Col>
        </Row>
        <Row className="mb-1 px-1 py-1">
          <Col md="7" className="text-start text-color-b94 ft-13">
            Payment period:
          </Col>
          <Col md="5" className="text-start text-color-a3a ft-14">
            {data?.paymentPeriod}
          </Col>
        </Row>
        <Row className="mb-1 px-1 py-1">
          <Col md="7" className="text-start text-color-b94 ft-13">
            Minimum term:
          </Col>
          <Col md="5" className="text-start text-color-a3a ft-14">
            {data?.minimumStayDuration}
          </Col>
        </Row>
      </Col>
      <Col md="4">
        <Row className="mb-1 px-1 py-1">
          <Col md="7" className="text-start text-color-b94 ft-13">
            Allowed pets:
          </Col>
          <Col md="5" className="text-start text-color-a3a ft-14">
            {data?.petAllowed ? "Yes" : "No"}
          </Col>
        </Row>
        <Row className="mb-1 px-1 py-1">
          <Col md="7" className="text-start text-color-b94 ft-13">
            Habitable:
          </Col>
          <Col md="5" className="text-start text-color-a3a ft-14">
            {data?.habitable}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PropertyLeasingTerms;

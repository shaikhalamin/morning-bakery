import { Property } from "@/data/model/property";
import React from "react";
import { Row, Col } from "react-bootstrap";
import SpecificationInfo from "./SpecificationInfo";
import SpecificationInfoDetails from "./SpecificationInfoDetails";

type PropertyCostInfoProps = {
  data?: Property;
};

const PropertyCostInfo: React.FC<PropertyCostInfoProps> = ({ data }) => {
  return (
    <SpecificationInfo title="Costs" lClSize={3} rClSize={9}>
      <Row>
        <Col md="6">
          <SpecificationInfoDetails
            title="Utilities:"
            content={data?.utilityCost.toFixed(2) as string}
            contentPrefix="$"
          />
          <SpecificationInfoDetails
            title="Electricity:"
            content={data?.electricityCost as string}
          />
        </Col>
        <Col md="6">
          <SpecificationInfoDetails
            title="Cable TV:"
            content={data?.cableTvCost.toFixed(2) as string}
            contentPrefix="$"
          />
        </Col>
      </Row>
    </SpecificationInfo>
  );
};

export default PropertyCostInfo;

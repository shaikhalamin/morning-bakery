import React from "react";
import { Row, Col } from "react-bootstrap";

type SpecInfoProps = {
  title: string;
  content: number | string;
  lcSize?: number;
  rcSize?: number;
  contentPrefix?: string;
  contentPostfix?: string;
};

const SpecificationInfoDetails: React.FC<SpecInfoProps> = ({
  title,
  content,
  lcSize = 5,
  rcSize = 7,
  contentPrefix,
  contentPostfix,
}) => {
  return (
    <Row className="mb-1 px-1 py-1">
      <Col md={lcSize} className="text-start text-color-b94 ft-13">
        <span>{title}</span>
      </Col>
      <Col md={rcSize} className="text-start text-color-a3a ft-14">
        {contentPrefix && <span>{contentPrefix}</span>} <span>{content}</span>
        {contentPostfix && (
          <span style={{ marginLeft: "3px" }}>{contentPostfix}</span>
        )}
      </Col>
    </Row>
  );
};

export default SpecificationInfoDetails;

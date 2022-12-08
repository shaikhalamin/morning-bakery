import React from "react";
import { Row, Col } from "react-bootstrap";

type ChildProps = {
  children: React.ReactNode;
  title: string;
  clsTitle?: string;
  clsRoot?: string;
  lClSize?: number;
  rClSize?: number;
};

const SpecificationInfo: React.FC<ChildProps> = ({
  children,
  title,
  clsTitle,
  clsRoot,
  lClSize = 4,
  rClSize = 8,
}) => {
  return (
    <Row className={`${clsRoot ? clsRoot : "py-4 border-bottom"}`}>
      <Col md={lClSize}>
        <h4 className={`${clsTitle ? clsTitle : "ft-16"}`}>{title}</h4>
      </Col>
      <Col md={rClSize}>{children}</Col>
    </Row>
  );
};

export default SpecificationInfo;

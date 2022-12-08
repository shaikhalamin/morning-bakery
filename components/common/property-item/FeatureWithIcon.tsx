import React from "react";
import { Row, Col } from "react-bootstrap";
import BathIcon from "../icon/Bath";
import BedIcon from "../icon/Bed";
import PropertySizeIcon from "../icon/PropertySize";
import styles from "./property.module.css";

type PropertyFeatureProps = {
  noOfRooms: number;
  noOfBath: number;
  propertySize: number;
  cls?:string
};

const FeatureWithIcon: React.FC<PropertyFeatureProps> = ({
  noOfRooms,
  noOfBath,
  propertySize,
  cls
}) => {
  return (
    <>
      <Row className="mt-1 mb-1">
        <Col lg="4" md="4" sm="4" xs="4">
          <span className={`${styles.propertyIcon}`}>
            <BedIcon />
          </span>
          <span className="ft-12 text-color-b94 mt-2">{noOfRooms} Rooms</span>
        </Col>
        <Col lg="4" md="4" sm="4" xs="4">
          <span className={`${styles.propertyIcon}`}>
            <BathIcon />
          </span>
          <span className="ft-12 text-color-b94 mt-2">{noOfBath} Baths</span>
        </Col>
        <Col lg="4" md="4" sm="4" xs="4">
          <span className={`${styles.propertyIcon}`}>
            <PropertySizeIcon />
          </span>
          <span className="ft-12 text-color-b94 mt-2">{propertySize} sq</span>
        </Col>
      </Row>
    </>
  );
};

export default FeatureWithIcon;

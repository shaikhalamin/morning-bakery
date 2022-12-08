import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Property } from "@/data/model/property";
import FeatureWithIcon from "../common/property-item/FeatureWithIcon";
import { FaMapMarkerAlt } from "react-icons/fa";
import PurposeBadge from "../common/property-item/PurposeBadge";
import _ from "lodash";

type SinglePropertyProps = {
  property: Property;
};

const SingleProperty: React.FC<SinglePropertyProps> = ({ property }) => {
  const imagePath = property.propertyImages.find(
    (image) => image.type == "header" && image.size == "md"
  );
  return (
    <Row className="py-1 px-1 mt-3">
      <Col md="5" className="mt-1 mb-1">
        <Card className="rounded-0">
          <Card.Body className="position-relative py-0 px-0">
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
              src={`${imagePath ? imagePath.image_url : ""}`}
              alt={property.name}
              className={`w-100`}
              height={250}
            />
          </Card.Body>
        </Card>
      </Col>
      <Col md="7" className="border-bottom">
        <Card className="border-0">
          <Row className="py-2 px-1">
            <Col className="mt-2 mb-3">
              <div className="mt-2 mb-1 text-color-a3a fw-bold">
                <Row>
                  <Col lg="8" md="8" sm="8" xs="8" className="text-start ft-20">
                    {property.name}
                  </Col>
                  <Col lg="4" md="4" sm="4" xs="4" className="text-end">
                    <PurposeBadge purpose={property.purpose} />
                  </Col>
                </Row>
              </div>
              <div className="mt-2 mb-1">
                <span className="ft-16 text-color-09a px-1">
                  <FaMapMarkerAlt />
                </span>
                <span className="ft-12 text-color-b94">{property.address}</span>
              </div>
              <div className="ft-14 mt-2 mb-1 text-color-b94">
                {property.descriptions.slice(0, 160)}
                <span>...</span>
              </div>
              <div className="mt-2">
                <FeatureWithIcon
                  noOfRooms={property.noOfBedRoom}
                  noOfBath={property.noOfBathRoom}
                  propertySize={property.propertySize}
                />
              </div>
              <div className="mt-2">
                <Row className="">
                  <Col md="12" className="text-start fs-14 fw-bold text-dark">
                    <span className="mt-2">${property.price.toFixed(2)}</span>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default SingleProperty;

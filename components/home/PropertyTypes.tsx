import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { API_URLS } from "@/data/utils/api.urls";
import styles from "./home.module.css";
import { PropertyType } from "@/data/model/property-type";

type PropertyTypeProps = {
  propertyTypes: PropertyType[];
};

const PropertyTypes: React.FC<PropertyTypeProps> = ({ propertyTypes }) => {
  return (
    <section className="bg-white py-3 mt-4">
      <Container>
        <h2 className={`${styles.ft30} mb-2 text-justify`}>
          Find Your Property
        </h2>
        <Row>
          <Col className="md-10 offset-md-1">
            <Container>
              <Row className="pl-2 pr-2 mt-4">
                {propertyTypes.length > 0 &&
                  propertyTypes.map((propertyType) => (
                    <Col key={propertyType.id.toString()} md="2" sm="6">
                      <Card className={`${styles.pTypeBody} border-0`}>
                        <Card.Body>
                          <a
                            href={`/property-type/${propertyType.alias}`}
                            className="text-decoration-none"
                          >
                            <Row>
                              <Col className="py-0 px-0 ">
                                <Card className="border-0">
                                  <Card.Body className="d-flex justify-content-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={`${
                                        API_URLS.static_img
                                      }/property-types/icon_${propertyType.name.toLocaleLowerCase()}.svg`}
                                      width="60"
                                      height="60"
                                      alt={propertyType.name}
                                    />
                                  </Card.Body>
                                </Card>
                                <div
                                  className={`text-center ${styles.pTypeText}`}
                                >
                                  {propertyType.name}
                                </div>
                                <div className={`text-center ${styles.pCount}`}>
                                  ({propertyType.propertyCount})
                                </div>
                              </Col>
                            </Row>
                          </a>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PropertyTypes;

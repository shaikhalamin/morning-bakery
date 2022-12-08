import React, { SyntheticEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "@/components/header/property-header.module.css";
import { PropertyType } from "@/data/model/property-type";
import { City } from "@/data/model/city";
import { Feature } from "@/data/model/feature";
import { PROPERTY_PURPOSES } from "@/data/types/property/property";
import { useRouter } from "next/router";
import SubmitButton from "../common/form/SubmitButton";

type PropertyHeaderProps = {
  propertyTypes: PropertyType[];
  cities: City[];
  features: Feature[];
  onChange?: (key: string, value: string) => void;
};

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  propertyTypes,
  cities,
  onChange,
}) => {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState("properties");
  const [rangeValue, setRangeValue] = useState(0);
  const [city, setCity] = useState<string>("");
  const [bedroom, setBedRoom] = useState<number>(0);
  const [purpose, setPurpose] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    let propertiesUrl = `/property-type/${propertyType}?`;
    purpose.length > 0 && (propertiesUrl += `purpose=${purpose}&`);
    city.length > 0 && city != "Any" && (propertiesUrl += `cityId=${city}&`);
    rangeValue > 0 && (propertiesUrl += `price=${rangeValue}&`);
    bedroom > 0 && (propertiesUrl += `noOfBedRoom=${bedroom}&`);

    router.push(propertiesUrl);
  };

  return (
    <section
      className={`py-5 ${styles.headerBgColor} ${styles.headerBgImage} ${styles.headerHeight}`}
    >
      <header>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col>
                  <h1 className="text-white text-center mb-4">
                    Find the Best Property for Rent or Sale
                  </h1>
                  <Container className="py-1 mt-3">
                    <Row>
                      <Col className="col-md-10 offset-md-1">
                        <Container className="bg-white">
                          <Form className="" onSubmit={handleSubmit}>
                            <Row className="mb-0 border py-2">
                              <Col md="4" sm="6">
                                <Form.Group controlId="purposeId">
                                  <Form.Label>Purpose</Form.Label>
                                  <Form.Select
                                    className="rounded-0"
                                    onChange={(e) => setPurpose(e.target.value)}
                                  >
                                    <option>Select Purpose</option>
                                    {PROPERTY_PURPOSES.map((item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md="4" sm="6">
                                <Form.Group controlId="locationId">
                                  <Form.Label>Location</Form.Label>
                                  <Form.Select
                                    className="rounded-0"
                                    onChange={(e) => setCity(e.target.value)}
                                  >
                                    <option>Any</option>
                                    {cities.map((city, index) => {
                                      return (
                                        <option key={index} value={city.id}>
                                          {city.name}
                                        </option>
                                      );
                                    })}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md="4" sm="6">
                                <Form.Group controlId="propertyTypeId">
                                  <Form.Label>Property Type</Form.Label>
                                  <Form.Select
                                    className="rounded-0"
                                    onChange={(e) =>
                                      setPropertyType(e.target.value)
                                    }
                                  >
                                    <option value={"properties"}>Any</option>
                                    {propertyTypes.map((pt, index) => {
                                      return (
                                        <option key={index} value={pt.alias}>
                                          {pt.name}
                                        </option>
                                      );
                                    })}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="mb-1 border py-2">
                              <Col md="4" sm="6">
                                <Form.Group controlId="bedroomId">
                                  <Form.Label>Bed Rooms</Form.Label>
                                  <Form.Select
                                    className="rounded-0"
                                    onChange={(e) =>
                                      setBedRoom(+e.target.value)
                                    }
                                  >
                                    <option>Any</option>
                                    {[...Array(10)].map((_, i) => (
                                      <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md="4" sm="6">
                                <Form.Group controlId="priceRangeId">
                                  <Form.Label>Price Range</Form.Label>
                                  <Form.Range
                                    min={10}
                                    step={25}
                                    value={rangeValue}
                                    onChange={(e) =>
                                      setRangeValue(+e.target.value)
                                    }
                                    max={1000000}
                                  />
                                  <p className="ft-13">
                                    <span>
                                      ${Number(rangeValue).toFixed(2)}
                                    </span>
                                    <span className="ml-2 mr-2">-</span>
                                    <span>${Number(1000000).toFixed(2)}</span>
                                  </p>
                                </Form.Group>
                              </Col>
                              <Col md="4" sm="6">
                                <Form.Group controlId="formGridState">
                                  <SubmitButton
                                    title="Filter Results"
                                    variant="warning"
                                    buttonCls="mt-3 btn-block w-100 rounded-0"
                                    isLoading={loading}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </Form>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </header>
    </section>
  );
};

export default PropertyHeader;

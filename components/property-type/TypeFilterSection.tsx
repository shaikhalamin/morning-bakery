import { PropertiesFilter } from "@/data/api/property";
import { City } from "@/data/model/city";
import { Feature } from "@/data/model/feature";
import { PropertyType } from "@/data/model/property-type";
import { PROPERTY_PURPOSES } from "@/data/types/property/property";
import React, { SyntheticEvent, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import styles from "./property-type.module.css";

type TypeFilterProps = {
  propertyTypes: PropertyType[];
  cities: City[];
  features: Feature[];
  filterValue: PropertiesFilter;
  onChange: (key: string, value: string) => void;
};

const TypeFilterSection: React.FC<TypeFilterProps> = ({
  onChange,
  propertyTypes,
  cities,
  filterValue,
  features,
}) => {
  const [rangeValue, setRangeValue] = useState(10);
  const [checkedFeatures, setCheckedFeatures] = useState<number[]>([]);

  const handleFilter = (e: SyntheticEvent, key: string) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value;
    value.length > 0 && onChange(key, value);
  };

  const handleFeature = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    let updatedList = [...checkedFeatures];
    if (target.checked) {
      updatedList = [...checkedFeatures, +target.value];
    } else {
      updatedList.splice(checkedFeatures.indexOf(+target.value), 1);
    }
    onChange("propertyFeatures", updatedList.join(","));
    setCheckedFeatures(updatedList);
  };

  return (
    <>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Row className={`${styles.bgColor}`}>
            <Col className="border">
              <Card className={`${styles.bgColor} py-3 px-3 border-0`}>
                <h3 className="mt-3 mb-2 text-white ft-24">Find Property</h3>
                <Form className="">
                  <Row className="mb-0 py-2">
                    <Col>
                      <Form.Group controlId="purposeId">
                        <Form.Label className="ft-14 text-color-bca">
                          Purpose
                        </Form.Label>
                        <Form.Select
                          className="rounded-0"
                          onChange={(e) => handleFilter(e, "purpose")}
                          defaultValue={filterValue?.filters?.purpose}
                        >
                          <option>Any</option>
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
                  </Row>
                  <Row className="mb-0 py-2">
                    <Col>
                      <Form.Group controlId="locationId">
                        <Form.Label className="ft-14 text-color-bca">
                          Location
                        </Form.Label>
                        <Form.Select
                          className="rounded-0"
                          onChange={(e) => handleFilter(e, "cityId")}
                          defaultValue={filterValue?.filters?.cityId}
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
                  </Row>
                  <Row className="mb-3 py-2">
                    <Col>
                      <Form.Group controlId="propertyTypeId">
                        <Form.Label className="ft-14 text-color-bca">
                          Property Type
                        </Form.Label>
                        <Form.Select
                          className="rounded-0"
                          onChange={(e) => handleFilter(e, "propertyType")}
                          defaultValue={filterValue?.filters?.propertyType}
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
                </Form>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3 mb-1 py-2">
            <Col md="12">
              <h6 className="ft-20 text-dark fw-normal">Filter by :</h6>
            </Col>
          </Row>
          <Row className="mt-2 mb-1 border py-3">
            <Col md="12" sm="12">
              <Form.Group controlId="bedroomId">
                <Form.Label className="ft-14 fw-normal text-dark">Bed Rooms</Form.Label>
                <Form.Select
                  className="rounded-0"
                  onChange={(e) => handleFilter(e, "noOfBedRoom")}
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
          </Row>
          <Row className="mt-2 mb-1 border py-3">
            <Col md="12" sm="12">
              <Form.Group controlId="priceRangeId">
                <Form.Label className="ft-14 fw-normal text-dark">Price Range</Form.Label>
                <Form.Range
                  min={10}
                  step={25}
                  value={rangeValue}
                  onChange={(e) => {
                    handleFilter(e, "price");
                    setRangeValue(+e.target.value);
                  }}
                  max={1000000}
                />
                <p className="ft-14">
                  <span>${Number(rangeValue).toFixed(2)}</span>
                  <span className="ml-2 mr-2">-</span>
                  <span>${Number(1000000).toFixed(2)}</span>
                </p>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2 mb-1 border py-3">
            <h6 className="mt-1 mb-1 ft-14 fw-normal text-dark">Amenities</h6>
            {features.length > 0 &&
              features.map((feature, index) => {
                return (
                  <Col md="12" key={index} className="mt-2">
                    <Form.Group controlId={`htmlId`}>
                      <Form.Check type={"checkbox"} className={``}>
                        <Form.Check.Input
                          type={"checkbox"}
                          value={feature.id}
                          onChange={handleFeature}
                        />
                        <Form.Check.Label className={`ft-14 fw-normal`}>
                          <span className={`text-color-b94`}>{feature.name}</span>
                        </Form.Check.Label>
                      </Form.Check>
                    </Form.Group>
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TypeFilterSection;

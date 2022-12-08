import { Property } from "@/data/model/property";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import PropertyAddress from "./PropertyAddress";
import PropertyCostInfo from "./PropertyCostInfo";
import PropertyDescription from "./PropertyDescription";
import PropertyFeatures from "./PropertyFeatures";
import { PropertyImageViewer } from "./PropertyImageViewer";
import PropertySpecifications from "./PropertySpecifications";

type PropertyFeatureAndSpecificationsProps = {
  data?: Property;
};

const PropertyFeatureAndSpecifications: React.FC<
  PropertyFeatureAndSpecificationsProps
> = ({ data }) => {
  return (
    <Col md="9" className="px-5">
      <Row className="py-3 border-bottom">
        <Col md="6" xs="12" className="text-start">
          <div className="ft-24 fw-bold text-dark ">{data?.name}</div>
          <div>
            <span className="ft-16 text-color-09a px-1">
              <FaMapMarkerAlt />
            </span>
            <span className="ft-18 text-color-b94">{data?.address}</span>
          </div>
        </Col>
        <Col md="6" xs="12" className="text-end">
          <div className="mb-3">
            <span
              className={`badge bg-dark fs-16 fs-normal rounded-0 text-white`}
            >
              {data?.purpose}
            </span>
          </div>
          <div>
            <h3 className="ft-14 text-color-b94 text-end">
              <span>Property ID: </span> {data?.id}
            </h3>
          </div>
        </Col>
      </Row>
      <PropertySpecifications data={data as Property} />
      <PropertyCostInfo data={data as Property} />
      <PropertyFeatures data={data as Property} />
      <PropertyImageViewer data={data as Property} />
      <PropertyDescription description={data?.descriptions as string} />
      <PropertyAddress address={data?.address as string} />
    </Col>
  );
};

export default PropertyFeatureAndSpecifications;

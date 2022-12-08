import SubmitButton, {
  ButtonSize,
} from "@/components/common/form/SubmitButton";
import { Property } from "@/data/model/property";
import { useRouter } from "next/router";
import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";

type Properties = {
  data: Property[];
};

const AdminPropertyList: React.FC<Properties> = ({ data }) => {
  const router = useRouter();
  const [buttonRef, setButtonRef] = useState<number | string>('');
  return (
    <Row className="py-4 px-2">
      <Col className="">
        <Row>
          <Col className="mb-3 mt-2">
            <Button
              className="btn-md btn-primary"
              onClick={() => router.push("/admin/properties/create")}
            >
              + Add Property
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className="border" responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Price</th>
                  <th>Purpose</th>
                  <th>Property Type</th>
                  <th>Edit</th>
                  <th>Preview Button</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((property) => (
                    <tr key={property.id}>
                      <td>{property.name}</td>
                      <td>{property.address}</td>
                      <td>${property.price}</td>
                      <td>{property.purpose}</td>
                      <td>{property.propertyType.name}</td>
                      <td>
                        <SubmitButton
                          title="Edit"
                          variant="warning"
                          isLoading={false}
                          size={ButtonSize.SM}
                          loadingTitle="Redirecting"
                          btnId={property.id}
                          btnRef={buttonRef}
                          onClick={() => {
                            setButtonRef(property.id);
                            router.push(
                              `/admin/properties/edit/${property.id}`
                            );
                          }}
                        />
                      </td>
                      <td>
                        <SubmitButton
                          title="Preview"
                          variant="info"
                          isLoading={false}
                          size={ButtonSize.SM}
                          loadingTitle="Previewing"
                          btnId={`${property.id}_preview`}
                          btnRef={buttonRef}
                          onClick={() => {
                            setButtonRef(`${property.id}_preview`);
                            router.push(`/properties/${property.slug}`);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AdminPropertyList;

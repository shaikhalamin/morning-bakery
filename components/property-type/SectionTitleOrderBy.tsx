import React, { SyntheticEvent } from "react";
import { Row, Col, Form } from "react-bootstrap";

interface TitleLinkProps {
  title: string;
  titleCls?: string;
  orderTitle?: string;
  onChange: (value: string) => void;
}

const SectionTitleOrderBy: React.FC<TitleLinkProps> = ({
  title,
  titleCls,
  orderTitle,
  onChange,
}) => {
  const handleSorting = (e: SyntheticEvent) => {
    const target = e.target as HTMLSelectElement;
    target.value.length > 1 && onChange(target.value);
  };
  return (
    <section>
      <Row className="py-1 px-3 mb-3">
        <Col md="6">
          <h2 className={`mb-2 ${!titleCls ? `text-start` : titleCls} ft-30`}>
            {title}
          </h2>
        </Col>
        <Col md="6">
          <Row>
            <Col>
              <h2 className={`mb-2 text-end`}>
                <span className={`text-black ft-14 fw-bold`}>
                  {orderTitle} <span>:</span>
                </span>
              </h2>
            </Col>
            <Col>
              <Form.Group controlId="purposeId">
                <Form.Select
                  defaultValue="Ordinary"
                  className="rounded-0 mt-2"
                  onChange={handleSorting}
                >
                  <option>Select a value</option>
                  <option value={"created_at:asc"}>
                    Date : Old to New
                  </option>
                  <option value={"created_at:desc"}>
                    Date : New to Old
                  </option>
                  <option value={"price:desc"}>Price : High to Low</option>
                  <option value={"price:asc"}>Price : Low to High</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default SectionTitleOrderBy;

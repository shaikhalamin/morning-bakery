import React from "react";
import { Container, Row, Col } from "react-bootstrap";
interface ChildProps {
  children: React.ReactNode;
  className?: string;
}
const BaseContainer: React.FC<ChildProps> = ({ children }) => {
  return (
    <>
      <section className="bg-white py-3 mt-2">
        <Container>
          <Row>
            <Col md="12">
              <Container>{children}</Container>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BaseContainer;

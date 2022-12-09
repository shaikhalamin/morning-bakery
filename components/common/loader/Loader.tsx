import React from "react";
import { Row, Col, Container, Card, Button, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Row className="py-5 mb-5">
      <Col md={{ span: 6, offset: 3 }} className="py-5">
        <Container>
          <Card className="border-0 mt-5">
            <Button variant="outline-dark" className="list_loader border-0">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span style={{ marginLeft: "5px" }}>Loading...</span>
            </Button>
          </Card>
        </Container>
      </Col>
    </Row>
  );
};

export default Loader;

import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./property.module.css";

const PropertyAddBanner = () => {
  const router = useRouter();

  return (
    <div>
      <section
        className={`py-5 ${styles.bannerBgColor} ${styles.bannerImage} ${styles.bannerHeight}`}
      >
        <Container>
          <Row>
            <Col md="12">
              <Container>
                <Row className={`mt-2 mb-2 py-2`}>
                  <Col md="8">
                    <h3 className="text-white">
                      Got a property that you want to list for sale/rent ?
                      <br />
                      Click the button to submit a listing.
                    </h3>
                  </Col>
                  <Col md="4">
                    <Button
                      variant="warning"
                      role="general-nav-logout-btn"
                      className={`ml-5 text-dark fw-bold ft-14 rounded-0`}
                      onClick={() => router.push("/admin/properties/create")}
                    >
                      Add Property
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PropertyAddBanner;

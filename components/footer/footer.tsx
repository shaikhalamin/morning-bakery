import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import _ from "lodash"

const Footer = () => {
  return (
    <div>
      <section className={`py-3`}>
        <Container>
          <Row>
            <Col md="12" key={Number(_.random(10,20).toString())}>
              <Container>
                <Row className={`mt-2 mb-2 py-2`}>
                  <Col md="3" className="mt-4" key={Number(_.random(20,30).toString())}>
                    <div className="">
                      <div className="py-3 px-3">
                        <div className="ft-20 mb-1 text-color-a3a fw-bold">
                          Templates
                        </div>
                        <div className="ft-16 mt-3 mb-1 text-color-b94">
                          <a href="#" className="text-color-b94 text-decoration-none">Premade websites</a>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <a href="#" className="text-color-b94 text-decoration-none">Popup bundles</a>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <a href="#" className="text-color-b94 text-decoration-none">Website models</a>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="3" className="mt-4" key={Number(_.random(31,40).toString())}>
                    <div className="">
                      <div className="py-3 px-3">
                        <div className="ft-20 mb-1 text-color-a3a fw-bold">
                          Support
                        </div>
                        <div className="ft-16 mt-3 mb-1 text-color-b94">
                          <a href="#" className="text-color-b94 text-decoration-none">Help Center</a>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <a href="#" className="text-color-b94 text-decoration-none">Refund policy</a>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <a href="#" className="text-color-b94 text-decoration-none">FAQ</a>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="3" className="mt-4" key={Number(_.random(41,50).toString())}>
                    <div className="">
                      <div className="py-3 px-3">
                        <div className="ft-20 mb-1 text-color-a3a fw-bold">
                          Links
                        </div>
                        <div className="ft-16 mt-3 mb-1 text-color-b94">
                          <a href="#" className="text-color-b94 text-decoration-none">Blog</a>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <a href="#" className="text-color-b94 text-decoration-none">Add Property</a>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <a href="#" className="text-color-b94 text-decoration-none">Find Property</a>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="3" className="mt-4" key={Number(_.random(51,60).toString())}>
                    <div className="">
                      <div className="py-3 px-3">
                        <div className="ft-20 mb-1 text-color-a3a fw-bold">
                          Socials
                        </div>
                        <div className="ft-14 mt-3 mb-1 text-color-b94">
                          <ul className="nav justify-content-start">
                            <li className="nav-item px-1 fs-16">
                              <a href="#" className="text-dark">
                                <FaFacebookF />
                              </a>
                            </li>
                            <li className="nav-item px-2 fs-16">
                              <a href="#" className="text-dark">
                                <FaInstagram />
                              </a>
                            </li>
                            <li className="nav-item px-2 fs-16">
                              <a href="#" className="text-dark">
                                <FaTwitter />
                              </a>
                            </li>

                            <li className="nav-item px-2 fs-16">
                              <a href="#" className="text-dark">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
        <hr />
        <Row>
          <Col className="mx-3" key={Number(_.random(61,70).toString())}>
            <p className="text-center text-color-b94 fs-14 fw-normal">
              Copyright © {new Date().getFullYear()} powered by morning bakery,
              Inc. All rights reserved
            </p>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Footer;

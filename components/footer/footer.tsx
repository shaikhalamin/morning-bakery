import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <section className={`py-3`}>
        <Container>
          <Row>
            <Col md="12">
              <Container>
                <Row className={`mt-2 mb-2 py-2`}>
                  <Col md="3" className="mt-4">
                    <div className="">
                      <div className="py-3 px-3">
                        <div className="ft-20 mb-1 text-color-a3a fw-bold">
                          Main Menu
                        </div>
                        <div className="ft-16 mt-3 mb-1 text-color-b94">
                          <Link href="/">
                            <a className="text-color-b94 text-decoration-none">
                              Home
                            </a>
                          </Link>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <Link href="/products/all-items">
                            <a className="text-color-b94 text-decoration-none">
                              Products
                            </a>
                          </Link>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <Link href="/about-us">
                            <a className="text-color-b94 text-decoration-none">
                              About Us
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="3" className="mt-4">
                    <div className="">
                      <div className="py-3 px-3">
                        <div className="ft-20 mb-1 text-color-a3a fw-bold">
                          Support
                        </div>
                        <div className="ft-16 mt-3 mb-1 text-color-b94">
                          <a
                            href="#"
                            className="text-color-b94 text-decoration-none"
                          >
                            Help Center
                          </a>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <a
                            href="#"
                            className="text-color-b94 text-decoration-none"
                          >
                            Refund policy
                          </a>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <a
                            href="#"
                            className="text-color-b94 text-decoration-none"
                          >
                            FAQ
                          </a>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="3" className="mt-4">
                    <div className="">
                      <div className="py-3 px-3">
                        <div className="ft-20 mb-1 text-color-a3a fw-bold">
                          Links
                        </div>
                        <div className="ft-16 mt-3 mb-1 text-color-b94">
                          <Link href="/contact-us">
                            <a className="text-color-b94 text-decoration-none">
                              Contact Us
                            </a>
                          </Link>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <Link href="/products/cake">
                            <a className="text-color-b94 text-decoration-none">
                              Cake
                            </a>
                          </Link>
                        </div>
                        <div className="ft-16 mb-1 text-color-b94">
                          <Link href="/products/others">
                            <a className="text-color-b94 text-decoration-none">
                              Others
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="3" className="mt-4">
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
          <Col className="mx-3">
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

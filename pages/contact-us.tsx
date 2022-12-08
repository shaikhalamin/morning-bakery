import BaseContainer from "@/components/common/container/BaseContainer";
import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import {
  MdMailOutline,
  MdOutlineAddIcCall,
  MdOutlineMail,
} from "react-icons/md";
import { NextPageWithLayout } from "./_app";

const ContactUs: NextPageWithLayout = () => {
  return (
    <section>
      <BaseContainer>
        <Row className="py-5 border-bottom">
          <Col md="6">
            <h1 className="ft-24 fw-bold text-dark">OUR CORPORATE OFFICE</h1>
            <div className="py-2">
              <h2 className="ft-16">
                <span className="text-color-b94" style={{ marginRight: "8px" }}>
                  <FaHome size={19} />
                </span>
                <span className="text-color-b94 fw-normal">
                  Kuwati Masjid Road,Dhaka-1212,Bangladesh
                </span>
              </h2>
            </div>
            <div className="py-2">
              <h2 className="ft-16">
                <span className="text-color-b94" style={{ marginRight: "8px" }}>
                  <MdOutlineAddIcCall size={19} />
                </span>
                <span className="text-color-b94 fw-normal">+8801712341937</span>
              </h2>
            </div>
            <div className="py-2">
              <h2 className="ft-16">
                <span className="text-color-b94" style={{ marginRight: "8px" }}>
                  <MdMailOutline size={19} />
                </span>
                <span className="text-color-b94 fw-normal">
                  alamin.cse15@gmail.com
                </span>
              </h2>
            </div>
            <Row className="py-2">
              <Col md="12">
                <h2 className="ft-24 fw-bold text-dark mt-2 mb-2">
                  OPENING TIME
                </h2>
                <h3 className="mt-2">
                  <span className="ft-16 fw-normal text-color-b94">
                    Saturday -- Thursday : 9.00 AM- 5.00 PM
                  </span>
                </h3>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <h1 className="ft-24 fw-bold text-dark mt-3 mb-3">GET IN TOUCH</h1>
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <span>
                        <AiOutlineUser size={19} />
                      </span>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Name"
                      aria-label="name"
                      type="text"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <span>
                        <MdOutlineAddIcCall size={19} />
                      </span>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Phone"
                      aria-label="phone"
                      type="text"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <span>
                        <MdOutlineMail size={19} />
                      </span>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Email"
                      aria-label="email"
                      type="text"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel controlId="floatingTextarea2" label="Message">
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a message here"
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Row className="py-4">
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Button variant="warning" type="submit" className="w-100">Send</Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </BaseContainer>
    </section>
  );
};

export default ContactUs;

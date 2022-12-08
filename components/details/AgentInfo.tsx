import { Agent } from "@/data/model/agent";
import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

type PropertyAgent = {
  agent?: Agent;
};

const AgentInfo: React.FC<PropertyAgent> = ({ agent }) => {
  return (
    <Col md="3" className="px-3">
      <Row className="py-3">
        <Col className="agent-bg">
          <Card className="border-0 agent-bg">
            <Row className="py-2 px-3 mt-4">
              <Col md="4">
                <Card className="border-0 agent-bg">
                  <a
                    href={`/agents/${agent?.id}`}
                    className="text-decoration-none text-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${agent?.agentImage?.image_url}`}
                      className="rounded-circle w-100"
                      alt="agent"
                    />
                  </a>
                </Card>
              </Col>
              <Col md="8">
                <div className="ft-18 text-white">
                  <a
                    href={`/agents/${agent?.id}`}
                    className="text-decoration-none text-white"
                  >
                    {agent?.user.firstName}
                    {agent?.user.lastName}
                  </a>
                </div>
                <div className="ft-14 text-color-bca mt-1">
                  {agent?.designation}
                </div>
              </Col>
            </Row>
            <Row className="py-1 px-3 mt-3">
              <Col md="12">
                <div>
                  <span className="ft-14 text-color-bca">Phone:</span>
                  <span className="ft-18 text-warning fw-bold px-2">
                    {agent?.user.phone}
                  </span>
                </div>
                <div className="mt-1 mb-1">
                  <span className="ft-14 text-color-bca">Email:</span>
                  <span className="ft-14 text-white px-2">
                    {agent?.user.email}
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="py-1 px-3 mt-2 mb-3">
              <Col md="12">
                <div>
                  <span className="ft-16 fw-normal text-white">
                    Connect with us:
                  </span>
                </div>
                <div className="mt-1 mb-3">
                  <ul className="nav justify-content-start">
                    <li className="px-2">
                      <span className="text-color-bca ft-14">
                        <FaFacebookF />
                      </span>
                    </li>
                    <li className="px-2">
                      <span className="text-color-bca ft-14">
                        <FaInstagram />
                      </span>
                    </li>
                    <li className="px-2">
                      <span className="text-color-bca ft-14">
                        <FaTwitter />
                      </span>
                    </li>
                    <li className="px-2">
                      <span className="text-color-bca ft-14">
                        <FaLinkedinIn />
                      </span>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default AgentInfo;

import { Agent } from "@/data/model/agent";
import Image from "next/image";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import styles from "../home/home.module.css";

type AgentListProps = {
  agents: Agent[];
};

const AgentList: React.FC<AgentListProps> = ({ agents }) => {
  return (
    <Row className="mt-1 mb-2">
      {agents.length > 0 &&
        agents.map((agent) => {
          const imagePath = agent.agentImage ? agent.agentImage.image_url : "";
          return (
            <Col md="3" className="mt-4" key={agent.id.toString()}>
              <Card className={`${styles.pTypeBody} rounded-0`}>
                <a
                  className="text-decoration-none"
                  href={`/agents/${agent.id}`}
                >
                  <Card.Body className="py-0 px-0 position-relative">
                    <Image
                      src={`${imagePath}`}
                      alt={agent.user.firstName}
                      width={298}
                      height={352}
                      layout="responsive"
                    />
                  </Card.Body>
                </a>
              </Card>
              <div className="border">
                <div className="py-3 px-3">
                  <div className="ft-20 mb-1 text-color-a3a fw-bold">
                    <a
                      className="text-decoration-none text-dark"
                      href={`/agents/${agent.id}`}
                    >
                      {agent.user.firstName} {agent.user.lastName}
                    </a>
                  </div>
                  <div className="ft-14 mb-1">
                    <span className="text-color-b94">{agent.designation}</span>
                  </div>
                  <ul className="list-group list-group-horizontal-sm mt-2">
                    <li className="list-group-item">
                      <span>
                        <FaFacebookF />
                      </span>
                    </li>
                    <li className="list-group-item">
                      <span>
                        <FaInstagram />
                      </span>
                    </li>
                    <li className="list-group-item">
                      <span>
                        <FaTwitter />
                      </span>
                    </li>
                    <li className="list-group-item">
                      <span>
                        <FaLinkedinIn />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          );
        })}
    </Row>
  );
};

export default AgentList;

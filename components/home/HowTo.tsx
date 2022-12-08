import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import SectionTitleLink from "./SectionTitleLink";
import styles from "./home.module.css";
import AdviseIcon from "../common/icon/Advise";
import QuickSearchIcon from "../common/icon/QuickSearch";
import PaperWorkIcon from "../common/icon/PaperWork";
import CommunicationIcon from "../common/icon/Communication";
import BaseContainer from "../common/container/BaseContainer";

const howToData = [
  {
    id: 1,
    infoHeader: "Expert real estate advice",
    icon: () => <AdviseIcon />,
    details:
      "Our real estate agents will help you find the property that suits your budget and purpose.",
  },
  {
    id: 2,
    infoHeader: "Quick sitewide search",
    icon: () => <QuickSearchIcon />,
    details:
      "Use a quick search to locate the most suitable real estate option among all property ads.",
  },
  {
    id: 3,
    infoHeader: "Help with paperwork",
    icon: () => <PaperWorkIcon />,
    details:
      "Our experts will prepare the needed contracts. You just sign them to seal the deal.",
  },
  {
    id: 4,
    infoHeader: "Steady communication",
    icon: () => <CommunicationIcon />,
    details:
      "Let us get connected. Reach out to our real estate agents anytime you have questions.",
  },
];

const HowTo = () => {
  return (
    <BaseContainer>
      <SectionTitleLink
        title={`How can we help you find real estate?`}
        titleCls={`text-center`}
      />
      <Row className={`mt-5 mb-2`}>
        {howToData.length > 0 &&
          howToData.map((info) => (
            <Col key={info.id} md="3" sm="6" className="mt-2">
              <Card className={`${styles.pTypeBody} `}>
                <Card.Body>
                  <a href="#" className="text-decoration-none">
                    <Row>
                      <Col md="12" className="py-3 px-0">
                        <Card className="border-0">
                          <Card.Body className="d-flex justify-content-center">
                            {info.icon()}
                          </Card.Body>
                        </Card>
                        <div className={`text-center ${styles.pTypeText}`}>
                          {info.infoHeader}
                        </div>
                        <div
                          className={`text-center ${styles.pCount} px-3 py-1`}
                        >
                          {info.details}
                        </div>
                      </Col>
                    </Row>
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </BaseContainer>
  );
};

export default HowTo;

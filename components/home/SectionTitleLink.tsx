import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from "./home.module.css";

interface TitleLinkProps {
  title: string;
  titleCls?: string;
  linkTitle?: string;
  link?: string;
}

const SectionTitleLink: React.FC<TitleLinkProps> = ({
  title,
  titleCls,
  linkTitle,
  link = "#",
}) => {
  return (
    <>
      <Row>
        <Col key={``}>
          <h2 className={`mb-2 ${!titleCls ? "text-start" : titleCls} ft-30`}>
            {title}
          </h2>
        </Col>

        {linkTitle && (
          <Col>
            <h2 className={`mb-2 text-end`}>
              <a
                href={link}
                className={`text-decoration-none text-black ft-14 text-uppercase fw-bold`}
              >
                {linkTitle}
                <span className="px-2">
                  <FaLongArrowAltRight size={`18`} />
                </span>
              </a>
            </h2>
          </Col>
        )}
      </Row>
    </>
  );
};

export default SectionTitleLink;

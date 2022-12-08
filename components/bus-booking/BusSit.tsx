import React, { SyntheticEvent, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import SeatIcon from "./SeatIcon";
import SitPlanning from "./SitPlanning";

import styles from "./test.module.css";

const sitsInfo = [
  {
    sitNo: "A1",
    price: 266,
    isBooked: false,
  },
  {
    sitNo: "A2",
    price: 266,
    isBooked: false,
  },
  {
    sitNo: "A3",
    price: 266,
    isBooked: false,
  },
  {
    sitNo: "A4",
    price: 266,
    isBooked: false,
  },
  {
    sitNo: "B1",
    price: 266,
    isBooked: false,
  },
  {
    sitNo: "B2",
    price: 266,
    isBooked: false,
  },
  {
    sitNo: "B3",
    price: 266,
    isBooked: false,
  },
  {
    sitNo: "B4",
    price: 266,
    isBooked: false,
  },
];



const BusSit = () => {
  const [busSits, setBusSits] = useState(sitsInfo);



  const handleClick = (e: SyntheticEvent, data: any) => {
    setBusSits((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.sitNo === data.sitNo) {
          return {
            ...obj,
            isBooked: !obj.isBooked,
          };
        }
        return obj;
      });

      return newState;
    });
  };

  return (
    <div>
      {busSits.length > 0 && (
        <Container className="mt-5">
          <>
            <Row key={Number(60596058969).toString()}>
              <Col className="py-3 border mb-3" key={Number(5000).toString()}>
                <p>
                  Selected Sits :{" "}
                  {JSON.stringify(
                    busSits.filter((sit) => sit.isBooked === true)
                  )}
                </p>
              </Col>
            </Row>
            <Row
            key={Number(605960589696590496094).toString()}
            className={`mt-1 mb-2 py-1 px-2`}
          >
            {busSits.length > 0 &&
              busSits.map((sit, index) => {
                return (
                  <>
                    <Col
                      md="1"
                      className={`px-3  py-2`}
                      key={Number(index).toString()}
                      disabled={!sit.isBooked}
                    >
                      <Card className={`border mt-2 text-center`}>
                        <p className="mt-2">{sit.sitNo}</p>
                        <p>{sit.price}</p>
                        <p
                          className={`${styles.seatIcon}`}
                          onClick={(e) => handleClick(e, sit)}
                        >
                          <SeatIcon
                            labelName={sit.sitNo}
                            fillColor={
                              sit.isBooked === true ? "#079d49" : "#fff"
                            }
                          />
                        </p>
                      </Card>
                    </Col>
                  </>
                );
              })}
          </Row>
          <SitPlanning />
          </>
        </Container>
      )}
    </div>
  );
};

export default BusSit;

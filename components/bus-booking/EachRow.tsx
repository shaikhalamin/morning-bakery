import React, { SyntheticEvent } from "react";
import { Card, Col, Row } from "react-bootstrap";
import SeatIcon from "./SeatIcon";
import styles from "./test.module.css";

type SitProps = {
  sitNo: string;
  price: number;
  isSelected: boolean;
  isBooked: boolean;
};

interface SitRowProps {
  sitArray: SitProps[];
  parentIndex: number;
  onChildClick?: (data: any) => void;
}

const EachRow: React.FC<SitRowProps> = ({
  sitArray,
  parentIndex,
  onChildClick,
}) => {
  const handleClick = (e: SyntheticEvent, data: SitProps) => {
    console.log({ data });
  };

  return (
    <div>
      <Row className="mt-2 py-3">
        {sitArray.length > 0 &&
          sitArray.map((sitInfo, ind) => {
            if (sitInfo.isSelected === false) {
              return (
                <>
                  <Col
                    md="2"
                    className={`px-3  py-2`}
                    key={Number(ind).toString()}
                  >
                    <Card className={`border-0 mt-2 text-center`}></Card>
                  </Col>
                </>
              );
            } else {
              return (
                <Col
                  md="2"
                  className={`px-3  py-2`}
                  key={Number(ind).toString()}
                >
                  <Card className={`border mt-2 text-center`}>
                    <p>{sitInfo.price}</p>
                    <p
                      className={`${styles.seatIcon}`}
                      onClick={(e) => handleClick(e, sitInfo)}
                    >
                      <SeatIcon labelName={sitInfo.sitNo} fillColor={ sitInfo.isBooked === true ? 'green' : "#fff"} />
                    </p>
                  </Card>
                </Col>
              );
            }
          })}
      </Row>
    </div>
  );
};

export default EachRow;

import Image from "next/image";
import React from "react";
import { Card } from "react-bootstrap";

const Loading: React.FC<{ width?: number; height?: number }> = ({
  width = 40,
  height = 40,
}) => {
  return (
    <Card className={`rounded-0`}>
      <Card.Body className="py-0 px-0 position-relative">
        <Image
          src="/images/loading.gif"
          alt="me"
          width={width}
          height={height}
        />
      </Card.Body>
    </Card>
  );
};

export default Loading;

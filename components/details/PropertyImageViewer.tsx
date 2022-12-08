import { Property } from "@/data/model/property";
import React, { useState, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ImageViewer from "react-simple-image-viewer";

type PropertyImageProps = {
  data?: Property;
};

export const PropertyImageViewer: React.FC<PropertyImageProps> = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = data?.propertyImages
    .filter((image) => image.type === "feature")
    .map((image) => image.image_url);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <Row className="py-3">
      <Col md="12">
        <Row>
          {images?.map((src, index) => (
            <Col md="4" key={index}>
              <Card className="rounded-0">
                <Card.Body className="py-0 px-0 rounded-0">
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img
                    src={src}
                    onClick={() => openImageViewer(index)}
                    className={`w-100`}
                    height={267}
                    key={index}
                    alt={`Feature image`}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {isViewerOpen && (
          <ImageViewer
            src={images as string[]}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        )}
      </Col>
    </Row>
  );
};

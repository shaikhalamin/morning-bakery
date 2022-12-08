import BaseContainer from "@/components/common/container/BaseContainer";
import React, { useEffect, useState } from "react";
import { Row, Col, Nav, Button, Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import Image from "next/image";
import { NextPageWithLayout } from "../_app";

type StorageFile = {
  id: number;
  type: string;
  size: string;
  public_id: string;
  image_url: string;
  product_id: number | null;
  category_id: number | null;
  created_at: string;
  updated_at: string;
};

type Product = {
  id: number;
  name: string;
  descriptions: string;
  quantity: number;
  weight: number;
  price: number;
  sku: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  storage_files: StorageFile[];
};

const Products: NextPageWithLayout = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [rating, setRating] = useState(3);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BaseContainer>
      <Row className="py-3">
        <Col md="7">
          <ul style={{ listStyleType: "none" }}>
            <li className="px-1" style={{ display: "inline" }}>
              Home
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              /
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              Products
            </li>
          </ul>
        </Col>
        <Col md="5">
          <ul style={{ listStyleType: "none" }}>
            <li className="px-2" style={{ display: "inline" }}>
              <span className="ft-16 fw-bold text-dark">Show : </span>
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              9
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              /
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              24
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              /
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              36
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="py-2">
        <Col md="12">
          <Row>
            {products.map((product) => {
              const imagePath =
                product.storage_files.length > 0
                  ? product.storage_files[0]
                  : ({} as StorageFile);

              return (
                <Col md="3" key={product.id} className="mt-3">
                  <Card className="rounded-0">
                    <Card.Body className="py-0 px-0 position-relative">
                      <Image
                        src={`${
                          Object.keys(imagePath).length > 0
                            ? imagePath.image_url
                            : ""
                        }`}
                        alt={product.name}
                        width={283}
                        height={283}
                        layout="responsive"
                      />
                    </Card.Body>
                  </Card>
                  <div className="home-custom-border">
                    <div className="py-3 px-3">
                      <div className="mb-1">
                        <Row>
                          <Col
                            lg="8"
                            md="8"
                            sm="8"
                            xs="8"
                            className="text-start"
                          >
                            <span className="fw-bold ft-14 text-color-333">
                              {product.name}
                            </span>
                          </Col>
                          <Col
                            lg="4"
                            md="4"
                            sm="4"
                            xs="4"
                            className="text-start"
                          >
                            <span className="badge bg-danger fs-12 fs-normal rounded-0 ">
                              ৳ {product.price.toFixed(2)}
                            </span>
                          </Col>
                        </Row>
                      </div>
                      <div className="mt-2 mb-2">
                        <Rating initialValue={rating} size={19} />
                      </div>
                      <div className="mt-3 mb-2">
                        <Button variant="danger" className="text-center w-100">
                          <span>Quick View</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </BaseContainer>
  );
};

export default Products;

import { Product } from "@/data/model/products";
import { StorageFile } from "@/data/model/storage-file";
import { useBakeryContext } from "context/BakeryContext";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Loader from "../common/loader/Loader";
import ProductModal from "./ProductModal";
import { FaCartPlus } from "react-icons/fa";

const ClientStarRating = dynamic(() => import("./ClientStartRating"), {
  ssr: false,
});

type ProductListProps = {
  products: Product[];
  loading: boolean;
};

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  const [singleProduct, setSingleProduct] = useState<Product>();
  const [modalShow, setModalShow] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const { cartItems, handleCartItem, setCartShow } = useBakeryContext();

  const showProductModal = (product: Product) => {
    setSingleProduct(product);
    setModalShow(true);
    const findInCart = cartItems.find((cItem) => cItem.item.id === product.id);
    if (findInCart) {
      setProductQuantity(findInCart.quantity);
    } else {
      setProductQuantity(1);
    }
  };

  const setModalClose = (show: boolean) => {
    setModalShow(false);
  };

  const addToCart = (product: Product) => {
    handleCartItem(product, 1);
    alert("Product added to cart !");
    setCartShow(true);
  };

  return (
    <>
      <Row className="py-4 mb-4 border-bottom">
        <Col md="12">
          {loading === true ? <Loader /> : ""}
          {!products.length && loading === false && (
            <Row className="py-5 mt-5 mb-5">
              <Col md={{ span: 6, offset: 3 }} className="mt-5 mb-5">
                <h4 className="ft-20 fw-bold text-center"> No Products Found ! </h4>
              </Col>
            </Row>
          )}
          <Row>
            {products.length > 0 &&
              products.map((product) => {
                const imagePath =
                  product.storage_files.length > 0
                    ? product.storage_files[0]
                    : ({} as StorageFile);

                return (
                  <Col md="3" key={product.id} className="mt-3">
                    <Card className="rounded-0">
                      <Card.Body className="py-0 px-0 position-relative">
                        {/*eslint-disable-next-line @next/next/no-img-element*/}
                        <img
                          src={`${
                            Object.keys(imagePath).length > 0
                              ? imagePath.image_url
                              : ""
                          }`}
                         
                          alt={product.name}
                          className="w-100"
                          height={283}
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
                                ৳ {Number(product.price).toFixed(2)}
                              </span>
                            </Col>
                          </Row>
                        </div>
                        <div className="mt-2 mb-2">
                          <ClientStarRating />
                        </div>
                        <div className="mt-3 mb-2">
                          <Row>
                            <Col md="9" xs="9">
                              <Button
                                variant="danger"
                                className="text-center w-100 rounded-0"
                                onClick={() => showProductModal(product)}
                              >
                                <span>Quick View</span>
                              </Button>
                            </Col>
                            <Col md="3" xs="3">
                              <Button
                                variant="outline-warning"
                                className="text-center w-100 rounded-0"
                                onClick={() => addToCart(product)}
                              >
                                <span>
                                  <FaCartPlus size={19} />
                                </span>
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
      <ProductModal
        singleProduct={singleProduct as Product}
        modalShow={modalShow}
        setModalClose={setModalClose}
        productQuantity={productQuantity}
      />
    </>
  );
};

export default ProductList;

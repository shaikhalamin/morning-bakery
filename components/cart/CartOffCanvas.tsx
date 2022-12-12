import { StorageFile } from "@/data/model/storage-file";
import { useBakeryContext } from "context/BakeryContext";
import React, { useState } from "react";
import { Button, Card, Col, Offcanvas, Row } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { useRouter } from "next/router";

const CartOffCanvas = () => {
  const router = useRouter();
  const { cartItems, cartShow, deleteCartItem, setCartShow } =
    useBakeryContext();

  return (
    <Offcanvas
      show={cartShow}
      onHide={() => setCartShow(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton className="border">
        <Offcanvas.Title className="ft-20 fw-bold text-uppercase">
          Sopping Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {!cartItems.length && (
          <Row className="py-5">
            <Col md="12" xs="12">
              <div className="mt-3 mb-3">
                <span>
                  <BsCartX size={50} className="mx-auto d-block" />
                </span>
              </div>
              <div className="mt-3 mb-3">
                <h2 className="ft-14 fw-normal text-center">
                  No products in the cart.
                </h2>
              </div>
              <div className="mt-3 mb-3 px-5">
                <Button
                  variant="danger"
                  className="text-center w-100"
                  onClick={() => {
                    setCartShow(false);
                    router.push("/products/all-items");
                  }}
                >
                  <span className="ft-13 fw-bold text-uppercase">
                    Return to shop
                  </span>
                </Button>
              </div>
            </Col>
          </Row>
        )}
        <div style={{ marginBottom: "30px" }}>
          <Row className="py-1 border-bottom">
            {cartItems.length > 0 &&
              cartItems.map((cart) => {
                const imagePath =
                  cart.item.storage_files.length > 0
                    ? cart.item.storage_files[0]
                    : ({} as StorageFile);

                return (
                  <Col md="12" className="px-2" key={cart.item.id}>
                    <Row className="py-1">
                      <Col md="4" xs="4">
                        <Card className="rounded-0">
                          <Card.Body className="py-0 px-0 position-relative">
                            {/* eslint-disable-next-line @next/next/no-img-element*/}
                            <img
                              src={`${
                                Object.keys(imagePath).length > 0
                                  ? imagePath.image_url
                                  : ""
                              }`}
                              alt={cart.item.name}
                              className="mx-auto d-block"
                              width={60}
                              height={60}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md="6" xs="6">
                        <h5 className="ft-16 ft-normal mt-1 mb-1">
                          {cart.item.name}
                        </h5>
                        <h5>
                          <span className="ft-13 fw-bold">{cart.quantity}</span>
                          <span className="ft-13 fw-bold px-1">x</span>
                          <span className="text-danger ft-13 fw-bold">
                            ৳ {Number(cart.item.price).toFixed(2)}
                          </span>
                          <span className="ft-13 fw-bold px-1">=</span>
                          <span className="text-danger ft-13 fw-bold">
                            ৳ {Number(cart.price).toFixed(2)}
                          </span>
                        </h5>
                      </Col>
                      <Col md="2" xs="2" className="2">
                        <MdClose
                          size={18}
                          className="mx-auto d-block border border-danger cursor-pointer"
                          onClick={() => deleteCartItem(cart.item)}
                        />
                      </Col>
                    </Row>
                  </Col>
                );
              })}
          </Row>
        </div>
        {cartItems.length > 0 && (
          <>
            <Row className="py-2 mt-3 mb-2 px-3">
              <Col md="6" xs="6">
                <h4 className="ft-20 fw-bold text-start">SUBTOTAL : </h4>
              </Col>
              <Col md="6" xs="6">
                <h4 className="ft-20 fw-bold text-end text-danger">
                  ৳{" "}
                  {Number(cartItems.reduce((acc, item) => acc + item.price, 0)).toFixed(2)}
                </h4>
              </Col>
            </Row>
            <Row className="py-1">
              <Col md="12" xs="12">
                <div className="px-3">
                  <Button
                    variant="danger"
                    className="text-center w-100 rounded-0"
                    onClick={() => {
                      setCartShow(false);
                      router.push("/cart");
                    }}
                  >
                    <span className="ft-13 fw-bold text-uppercase">
                      view cart
                    </span>
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="py-1">
              <Col md="12" xs="12">
                <div className="px-3">
                  <Button
                    variant="danger"
                    className="text-center w-100 rounded-0"
                    onClick={() => {
                      setCartShow(false);
                      router.push("/checkout");
                    }}
                  >
                    <span className="ft-13 fw-bold text-uppercase">
                      checkout
                    </span>
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffCanvas;

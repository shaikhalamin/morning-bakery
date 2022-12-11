import CartSingleItem from "@/components/cart/CartSingleItem";
import BaseContainer from "@/components/common/container/BaseContainer";
import { useBakeryContext } from "context/BakeryContext";
import React from "react";
import { Row, Col } from "react-bootstrap";

const CartItems = () => {
  const { cartItems } = useBakeryContext();

  return (
    <BaseContainer>
      <Row>
        <Col md="8">
          <Row className="py-1 border-bottom">
            <Col md="2" className="text-center">
              <span className="text-uppercase ft-14 fw-bold"></span>
            </Col>
            <Col md="3" className="text-center">
              <span className="text-uppercase ft-14 fw-bold">Product</span>
            </Col>
            <Col md="3" className="text-center">
              <span className="text-uppercase ft-14 fw-bold">Price</span>
            </Col>
            <Col md="2" className="text-center">
              <span className="text-uppercase ft-14 fw-bold">Quantity</span>
            </Col>
            <Col md="2" className="text-center">
              <span className="text-uppercase ft-14 fw-bold">Close</span>
            </Col>
          </Row>
          <Row className="py-1">
            {cartItems.length > 0 &&
              cartItems.map((cart) => {
                return (
                  <Col
                    md="12"
                    className="px-2 border-bottom"
                    key={cart.item.id}
                  >
                    <CartSingleItem cart={cart} />
                  </Col>
                );
              })}
          </Row>
        </Col>
        <Col md="4"></Col>
      </Row>
    </BaseContainer>
  );
};

export default CartItems;

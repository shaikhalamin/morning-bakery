import CartSingleItem from "@/components/cart/CartSingleItem";
import BaseContainer from "@/components/common/container/BaseContainer";
import { StorageFile } from "@/data/model/storage-file";
import { useBakeryContext } from "context/BakeryContext";
import React from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const CartItems = () => {
  // const { cartItems, cartShow, deleteCartItem, setCartShow } =
  // useBakeryContext();

  const {
    cartItems,
    cartShow,
    currentQuantity,
    handleCartQuantity,
    setCurrentQuantity,
    handleCartItem,
    setCartShow,
    deleteCartItem,
  } = useBakeryContext();

  return (
    <BaseContainer>
      <Row className="py-1 border-bottom">
        <Col md="2">Image</Col>
        <Col md="3">Product</Col>
        <Col md="3">Price</Col>
        <Col md="2">Quantity</Col>
        <Col md="2">Close</Col>
      </Row>
      <Row className="py-1 border-bottom">
        {cartItems.length > 0 &&
          cartItems.map((cart) => {
            const imagePath =
              cart.item.storage_files.length > 0
                ? cart.item.storage_files[0]
                : ({} as StorageFile);

            return (
              <Col md="12" className="px-2" key={cart.item.id}>
                <CartSingleItem cart={cart} />
              </Col>
            );
          })}
      </Row>
    </BaseContainer>
  );
};

export default CartItems;

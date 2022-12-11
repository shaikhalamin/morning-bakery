import { Cart } from "@/data/model/cart";
import { StorageFile } from "@/data/model/storage-file";
import { useBakeryContext } from "context/BakeryContext";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

type CartSingleItemProps = {
  cart: Cart;
};

const CartSingleItem: React.FC<CartSingleItemProps> = ({ cart }) => {
  const imagePath =
    cart.item.storage_files.length > 0
      ? cart.item.storage_files[0]
      : ({} as StorageFile);

  const { handleCartItem, deleteCartItem } = useBakeryContext();

  const [quantity, setQuantity] = useState(cart.quantity);

  const handleQuantity = (qty: number) => {
    handleCartItem(cart.item, qty);
    setQuantity(qty);
  };

  const handleCartQuantity = (qty: number) => {
    if(qty === 0 && quantity > 1){
      handleCartItem(cart.item, quantity - 1);
      setQuantity((prev) => prev - 1);
    } 
    if(qty === 1){
      handleCartItem(cart.item, quantity + 1);
      setQuantity((prev) => prev + 1);
    } 
  };

  return (
    <Row className="py-2">
      <Col md="2" xs="2">
        <Card className="rounded-0">
          <Card.Body className="py-0 px-0 position-relative">
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
              src={`${
                Object.keys(imagePath).length > 0 ? imagePath.image_url : ""
              }`}
              alt={cart.item.name}
              className="mx-auto d-block"
              width={80}
              height={80}
            />
          </Card.Body>
        </Card>
      </Col>
      <Col md="3" xs="3" className="text-center">
        <h5 className="ft-16 ft-normal mt-1 mb-1">{cart.item.name}</h5>
      </Col>
      <Col md="3" xs="3" className="text-center">
        <h5 className="ft-16 ft-normal mt-1 mb-1">
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
      <Col md="2" xs="2" className="text-center">
        <Row>
          <Col md="3" xs="3">
            <span className="fw-bold cursor-pointer" onClick={() => handleCartQuantity(0)}>
              <TfiAngleLeft size={18} />
            </span>
          </Col>
          <Col md="6" xs="6">
            <input
              type="number"
              className="text-center"
              value={quantity}
              onChange={({ target }) => {
                if (Number(target.value) > 0) {
                  handleQuantity(+target.value);
                }
              }}
              style={{ width: "50px" }}
            />
          </Col>
          <Col md="3" xs="3">
            <span className="fw-bold cursor-pointer" onClick={() => handleCartQuantity(1)}>
              <TfiAngleRight size={18} />
            </span>
          </Col>
        </Row>
      </Col>
      <Col md="2" xs="2" className="2">
        <MdClose
          size={18}
          className="mx-auto d-block border border-danger cursor-pointer"
          onClick={() => deleteCartItem(cart.item)}
        />
      </Col>
    </Row>
  );
};

export default CartSingleItem;

import { Cart } from "@/data/model/cart";
import { StorageFile } from "@/data/model/storage-file";
import cart from "@/pages/cart";
import { useBakeryContext } from "context/BakeryContext";
import React, { useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";

type CartSingleItemProps = {
  cart: Cart;
};

const CartSingleItem: React.FC<CartSingleItemProps> = ({ cart }) => {
  const imagePath =
    cart.item.storage_files.length > 0
      ? cart.item.storage_files[0]
      : ({} as StorageFile);

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

  const [quantity,setQuantity] = useState(cart.quantity);

  const handleQuantity = (qty:number)=>{
    setQuantity(qty);
  }

  return (
    <Row className="py-1">
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
              width={60}
              height={60}
            />
          </Card.Body>
        </Card>
      </Col>
      <Col md="3" xs="3">
        <h5 className="ft-16 ft-normal mt-1 mb-1">{cart.item.name}</h5>
      </Col>
      <Col md="2" xs="2">
        <h5 className="ft-16 ft-normal mt-1 mb-1">
          <span className="text-danger ft-13 fw-bold">
            ৳ {Number(cart.price).toFixed(2)}
          </span>
        </h5>
      </Col>
      <Col md="3" xs="3">
        <Row>
          <Col md="3" xs="3">
            <Button
              variant="outline-dark rounded-0"
              onClick={() => handleCartQuantity(0)}
            >
              <AiOutlineMinus size={19} />
            </Button>
          </Col>
          <Col md="6" xs="6">
            <Form.Group
              className="justify-content-center"
              controlId="formGroupEmail"
            >
              <Form.Control
                type="number"
                className="rounded-0 text-center"
                value={quantity}
                onChange={({ target }) => {
                  if (Number(target.value) == 0 || Number(target.value) > 0) {
                    handleQuantity(+target.value);
                  }
                }}
              />
            </Form.Group>
          </Col>
          <Col md="3" xs="3">
            <Button
              variant="outline-dark rounded-0"
              onClick={() => handleCartQuantity(1)}
            >
              <AiOutlinePlus size={19} />
            </Button>
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

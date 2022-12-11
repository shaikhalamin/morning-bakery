import { Product } from "@/data/model/products";
import { useBakeryContext } from "context/BakeryContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Card, Button, Form } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";

type ProductModelProps = {
  modalShow: boolean;
  setModalClose: (show: boolean) => void;
  singleProduct: Product;
  productQuantity: number;
  
};

const ProductModal: React.FC<ProductModelProps> = ({
  modalShow,
  setModalClose,
  singleProduct,
  productQuantity,
  
}) => {
  const { handleCartItem, setCartShow } = useBakeryContext();
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product: Product) => {
    handleCartItem(product, quantity);
    setQuantity(1);
    alert("Product added to cart !");
    setModalClose(true);
    setCartShow(true);
  };

  useEffect(()=>{
    setQuantity(productQuantity);
  },[productQuantity])

  const handleCartQuantity = (qty: number) => {
    qty === 0 && quantity > 1 && setQuantity((prev) => prev - 1);
    qty === 1 && setQuantity((prev) => prev + 1);
  };

  return (
    <Modal
      size="lg"
      show={modalShow}
      onHide={() => setModalClose(false)}
      aria-labelledby="single-product-show"
    >
      <Modal.Body>
        <Row>
          <Col md="10" xs="10"></Col>
          <Col md="2" xs="2" className="text-end">
            <MdClose
              size={19}
              className="border border-danger cursor-pointer mb-2"
              onClick={() => setModalClose(false)}
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Card className="rounded-0">
              <Card.Body className="py-0 px-0 position-relative">
                <Image
                  src={`${singleProduct?.storage_files[0].image_url ?? ""}`}
                  alt={singleProduct?.name}
                  width={283}
                  height={283}
                  layout="responsive"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="7">
            <Row>
              <Col md="12" xs="12" className="px-2">
                <h4 className="ft-30 fw-normal text-dark mt-3">
                  {singleProduct?.name}
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <h4 className="ft-16 text-color-d12 fw-bold mt-3 mb-3">
                  ৳ {Number(singleProduct?.price).toFixed(2)}
                </h4>
                <h6 className="ft-15 text-dark fw-bold mt-2 mb-3">
                  {singleProduct?.weight} gm
                </h6>
                <h6 className="ft-15 text-color-b94 fw-normal mt-3 mb-3">
                  {singleProduct?.descriptions}
                </h6>
              </Col>
            </Row>
            <Row className="px-2">
              <Col md="7" className="mt-2 mb-2">
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
                          if (
                            Number(target.value) == 0 ||
                            Number(target.value) > 0
                          ) {
                            setQuantity(+target.value);
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
              <Col md="5" className="mt-2 mb-2">
                <Button
                  variant="danger"
                  className="text-center w-100 rounded-0 text-uppercase"
                  onClick={() => addToCart(singleProduct as Product)}
                >
                  <span>Add To Cart</span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;

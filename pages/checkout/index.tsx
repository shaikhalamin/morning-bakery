import {
  CheckoutFormFields,
  checkoutSchema,
} from "@/components/checkout/checkout.helper";
import BaseContainer from "@/components/common/container/BaseContainer";
import { InputField } from "@/components/common/form/InputField";
import TextAreaField from "@/components/common/form/TextAreaField";
import Meta from "@/components/meta/Meta";
import { getErrorMessage } from "@/data/utils/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBakeryContext } from "context/BakeryContext";
import { useRouter } from "next/router";
import React from "react";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { BsCartX } from "react-icons/bs";

const Checkout = () => {
  const router = useRouter();
  const { cartItems } = useBakeryContext();

  const methods = useForm<CheckoutFormFields>({
    resolver: yupResolver(checkoutSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: CheckoutFormFields) => {
    alert("Please log in first !");
  };

  const errorMessage = getErrorMessage(errors);

  return (
    <BaseContainer>
      <Meta
        title={`Morning Bakery | Checkout`}
        content={`Best sweets and bakery items in dhaka,Bangladesh`}
      />
      {!cartItems.length && (
        <Row className="py-5 mt-5 mb-5 border-bottom">
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
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                  <Button
                    variant="danger"
                    className="text-center w-100"
                    onClick={() => {
                      router.push("/products/all-items");
                    }}
                  >
                    <span className="ft-13 fw-bold text-uppercase">
                      Return to shop
                    </span>
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      )}
      {cartItems.length > 0 && (
        <FormProvider {...methods}>
          <Form className="py-3" onSubmit={handleSubmit(onSubmit)}>
            <Row className="py-3 border-bottom">
              <Col md="7">
                <Card className="rounded-0 border-0">
                  <Card.Body>
                    <Row className="py-2">
                      <Col md="12">
                        <h4 className="ft-20 fw-bold text-justify">
                          BILLING DETAILS
                        </h4>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md="6">
                        <InputField
                          labelText="First name"
                          name="firstName"
                          inputType="text"
                          errorMessage={errorMessage("firstName")}
                        />
                      </Col>
                      <Col md="6">
                        <InputField
                          labelText="Last name"
                          name="lastName"
                          inputType="text"
                          errorMessage={errorMessage("lastName")}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md="12">
                        <InputField
                          labelText="Street address"
                          name="streetAddress"
                          inputType="text"
                          errorMessage={errorMessage("streetAddress")}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md="12">
                        <InputField
                          labelText="Town/City"
                          name="townCity"
                          inputType="text"
                          errorMessage={errorMessage("townCity")}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md="12">
                        <InputField
                          labelText="District"
                          name="district"
                          inputType="text"
                          errorMessage={errorMessage("district")}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md="12">
                        <InputField
                          labelText="Phone"
                          name="phone"
                          inputType="text"
                          errorMessage={errorMessage("phone")}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md="12">
                        <InputField
                          labelText="ZipCode"
                          name="zipCode"
                          inputType="text"
                          errorMessage={errorMessage("zipCode")}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md="12">
                        <InputField
                          labelText="Email"
                          name="email"
                          inputType="text"
                          errorMessage={errorMessage("email")}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md="12">
                        <TextAreaField
                          labelText="Message"
                          name="message"
                          rows={5}
                          errorMessage={errorMessage("message")}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="5">
                <Row>
                  <Col md="12" className="bg-gray-200 py-3">
                    <h4 className="ft-20 fw-bold text-center mt-2 mb-3">
                      YOUR ORDER
                    </h4>
                    <Row>
                      <Col md="12">
                        <Card className="rounded-0 border-0 bg-white">
                          <Card.Body>
                            <Row className="mt-2 mb-2 border-bottom">
                              <Col md="6" className="text-start">
                                <h4 className="text-uppercase fw-bold ft-16">
                                  PRODUCT
                                </h4>
                              </Col>
                              <Col md="6" className="text-end">
                                <h4 className="text-uppercase fw-bold ft-16">
                                  Sub Total
                                </h4>
                              </Col>
                            </Row>

                            {cartItems.length > 0 &&
                              cartItems.map((cart) => {
                                return (
                                  <Row
                                    key={cart.item.id}
                                    className="py-2 mt-2 mb-2 border-bottom"
                                  >
                                    <Col md="6" className="text-start">
                                      <h4 className="fw-bold ft-14 text-color-b94">
                                        {cart.item.name} x{" "}
                                        <span>{cart.quantity}</span>
                                      </h4>
                                    </Col>
                                    <Col md="6" className="text-end">
                                      <h4 className="text-uppercase fw-bold ft-14">
                                        ৳ {Number(cart.price).toFixed(2)}
                                      </h4>
                                    </Col>
                                  </Row>
                                );
                              })}

                            <Row className="py-2 mt-2 mb-2 border-bottom">
                              <Col md="6" className="text-start">
                                <h4 className="fw-bold ft-14 text-dark">
                                  Subtotal
                                </h4>
                              </Col>
                              <Col md="6" className="text-end">
                                <h4 className="text-uppercase fw-bold ft-14 text-color-d12">
                                  ৳{" "}
                                  {Number(
                                    cartItems.reduce(
                                      (acc, item) => acc + item.price,
                                      0
                                    )
                                  ).toFixed(2)}
                                </h4>
                              </Col>
                            </Row>
                            <Row className="py-2 mt-2 mb-2 border-bottom">
                              <Col md="6" className="text-start">
                                <h4 className="fw-bold ft-14 text-dark">
                                  Shipping
                                </h4>
                              </Col>
                              <Col md="6" className="text-end">
                                <h4 className="fw-bold ft-14 text-color-d12">
                                  <span className="text-dark fw-normal">
                                    Flat rate:
                                  </span>{" "}
                                  <span className="text-color-d12 fw-bold">
                                    ৳ 100.00
                                  </span>
                                </h4>
                              </Col>
                            </Row>
                            <Row className="py-2 mt-2 mb-2 border-bottom">
                              <Col md="6" className="text-start">
                                <h4 className="fw-bold ft-16 text-dark">
                                  Total
                                </h4>
                              </Col>
                              <Col md="6" className="text-end">
                                <h4 className="fw-bold ft-16 text-color-d12">
                                  <span className="text-color-d12 fw-bold">
                                    ৳{" "}
                                    {Number(
                                      cartItems.reduce(
                                        (acc, item) => acc + item.price,
                                        0
                                      ) + 100
                                    ).toFixed(2)}
                                  </span>
                                </h4>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="py-3 px-3">
                      <Col md="12">
                        <Row className="mb-2">
                          <Col md="12">
                            <Form.Check
                              type={`radio`}
                              checked={true}
                              id={`payment-option`}
                              label={`Cash on delivery`}
                            />
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col md="12">
                            <Form.Check
                              type={`checkbox`}
                              id={`payment-option`}
                              label={`I have read and agree to the website terms and conditions *`}
                            />
                          </Col>
                        </Row>

                        <Row className="py-2 mb-2 px-3">
                          <Col md="12">
                            <Button
                              variant="danger"
                              type="submit"
                              className="text-center w-100 rounded-0"
                            >
                              <span className="ft-13 fw-bold text-uppercase">
                                proceed to checkout
                              </span>
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </FormProvider>
      )}
    </BaseContainer>
  );
};

export default Checkout;

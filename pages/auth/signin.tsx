import BaseContainer from "@/components/common/container/BaseContainer";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import SubmitButton from "@/components/common/form/SubmitButton";
import { SignInFormFields, signInSchema } from "@/components/auth/helpers";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/data/utils/lib";
import { yupResolver } from "@hookform/resolvers/yup";

const SignIn = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: yupResolver(signInSchema),
    mode: "onTouched",
  });

  const errorMessage = getErrorMessage(errors);

  const onSubmit = async (data: SignInFormFields) => {
    const { username, password } = data;
    try {
      setSubmitLoading(true);
      const res = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (res?.ok && res.error == null) {
        const url = new URL(res?.url as string);
        const callBackUrl = url.searchParams.get("callbackUrl");
        if (callBackUrl) {
          router.push(callBackUrl as string);
        } else {
          router.push("/");
        }
      } else {
        setSubmitLoading((prev) => !prev);
        alert("Username or password incorrect !");
      }
    } catch (error) {
      setSubmitLoading(false);
      console.log("login error", error);
    }
  };

  return (
    <BaseContainer>
      <Row className="py-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Row>
                <Col md="12">
                  <h3 className="text-center ft-24 fw-bold">Login</h3>
                </Col>
              </Row>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("username")}
                      placeholder="Enter Username"
                    />
                    {errorMessage("username") && (
                      <Form.Text className="text-danger">
                        {errorMessage("username")}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("password")}
                      placeholder="Password"
                    />
                    {errorMessage("password") && (
                      <Form.Text className="text-danger">
                        {errorMessage("password")}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>

                <Row className="py-3">
                  <Col md="12" className="">
                    <SubmitButton
                      title="Submit"
                      isLoading={submitLoading}
                      loadingTitle="Checking"
                      buttonCls="w-100 mt-3"
                      variant="warning"
                    />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </BaseContainer>
  );
};

export default SignIn;

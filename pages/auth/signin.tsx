import BaseContainer from "@/components/common/container/BaseContainer";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import SubmitButton from "@/components/common/form/SubmitButton";
import { SignInFormFields, signInSchema } from "@/components/auth/helpers";
import { FormProvider, useForm } from "react-hook-form";
import { getErrorMessage } from "@/data/utils/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/components/common/form/InputField";

const SignIn = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  const reactHookFormMethods = useForm<SignInFormFields>({
    resolver: yupResolver(signInSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = reactHookFormMethods;

  const errorMessage = getErrorMessage(errors);

  const onSubmit = async (data: SignInFormFields) => {
    const { email, password } = data;
    setSubmitLoading(true);
    console.log({
      email, password
    })
    setSubmitLoading(false);
    try {
      setSubmitLoading(true);
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res?.ok && res.error == null) {
        const url = new URL(res?.url as string);
        const callBackUrl = url.searchParams.get("callbackUrl");
        if (callBackUrl) {
          //router.push(callBackUrl as string);
          console.log("login success full");
          router.push("/");
        } else {
          console.log("login success full");
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
      <Row className="py-3 mt-5 border-bottom">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Row>
                <Col md="12">
                  <h3 className="text-center ft-24 fw-bold mt-2">Login</h3>
                </Col>
              </Row>

              <FormProvider {...reactHookFormMethods}>
                <Form className="py-2" onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mb-2">
                    <Col md="12">
                      <InputField
                        labelText="Email"
                        name="email"
                        inputType="email"
                        errorMessage={errorMessage("email")}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col md="12">
                      <InputField
                        labelText="Password"
                        name="password"
                        inputType="password"
                        errorMessage={errorMessage("password")}
                      />
                    </Col>
                  </Row>

                  <Row className="py-3">
                    <Col md="12" className="">
                      <SubmitButton
                        title="Submit"
                        isLoading={submitLoading}
                        loadingTitle="Checking"
                        buttonCls="w-100 mt-3 rounded-0"
                        variant="danger"
                      />
                    </Col>
                  </Row>
                </Form>
              </FormProvider>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </BaseContainer>
  );
};

export default SignIn;

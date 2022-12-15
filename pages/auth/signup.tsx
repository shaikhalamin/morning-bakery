import BaseContainer from "@/components/common/container/BaseContainer";
import React, { useState } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormFields, signUpSchema } from "@/components/auth/helpers";
import { getErrorMessage } from "@/data/utils/lib";
import { signUp } from "@/data/api/auth";
import { AxiosError } from "axios";
import SubmitButton from "@/components/common/form/SubmitButton";
import { InputField } from "@/components/common/form/InputField";
import InputGroupCustomField from "@/components/common/form/InputGroupCustomField";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const SignUp = () => {
  const router = useRouter();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<boolean>(false);

  const reactHookFormMethods = useForm<SignUpFormFields>({
    resolver: yupResolver(signUpSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = reactHookFormMethods;

  const errorMessage = getErrorMessage(errors);

  const onSubmit = async (data: SignUpFormFields) => {
    const singUpPayload = {
      ...data,
      role: "user",
    };
    console.log({
      singUpPayload,
    });
    try {
      setSubmitLoading(true);
      const createUser = await signUp(singUpPayload);
      if (createUser.data) {
        router.push("/auth/signin");
      } else {
        setSubmitLoading(false);
        alert("Something went wrong !");
      }
    } catch (error: any) {
      setSubmitLoading(false);
      if (error instanceof AxiosError) {
        const errors = error.response?.data?.errors;
        Object.keys(errors).length > 0 &&
          Object.keys(errors).forEach((key) => {
            const [message, _] = errors[key];
            setError(key as keyof SignUpFormFields, {
              type: "focus",
              message: message,
            });
          });
      }
    }
  };

  const showEyeIcon = (show: boolean) => {
    if (show === false) {
      return (
        <BsFillEyeSlashFill
          size={19}
          className="text-success"
          onClick={() => setRevealed((prev) => !prev)}
        />
      );
    }
    return (
      <BsFillEyeFill
        size={19}
        className="text-success"
        onClick={() => setRevealed((prev) => !prev)}
      />
    );
  };

  return (
    <BaseContainer>
      <Row className="py-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Row className="py-2">
                <Col md="12">
                  <h3 className="text-center ft-24 fw-bold">Create account</h3>
                </Col>
              </Row>

              <FormProvider {...reactHookFormMethods}>
                <Form className="py-2" onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mb-2">
                    <Col md="12">
                      <InputField
                        labelText="First name"
                        name="first_name"
                        inputType="text"
                        errorMessage={errorMessage("first_name")}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md="12">
                      <InputField
                        labelText="Last name"
                        name="last_name"
                        inputType="text"
                        errorMessage={errorMessage("last_name")}
                      />
                    </Col>
                  </Row>
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
                        labelText="Phone"
                        name="phone"
                        inputType="text"
                        errorMessage={errorMessage("phone")}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md="12">
                      <InputGroupCustomField
                        labelText="Password"
                        labelTextIcon={showEyeIcon(revealed)}
                        name="password"
                        inputType={revealed === true ? "text" : "password"}
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

export default SignUp;

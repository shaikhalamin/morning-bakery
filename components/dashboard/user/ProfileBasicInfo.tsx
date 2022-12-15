import { EditUserFormFields, userEditSchema } from "@/components/auth/helpers";
import { InputField } from "@/components/common/form/InputField";
import SubmitButton from "@/components/common/form/SubmitButton";
import { User } from "@/data/model/user";
import { getErrorMessage } from "@/data/utils/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Row, Col, Card, Form, Container } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { setProfileFormValue } from "./user.helpers";

type ProfileBasicInfoProps = {
  user: User;
};

const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({ user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const reactHookFormMethods = useForm<EditUserFormFields>({
    resolver: yupResolver(userEditSchema),
    mode: "onTouched",
  });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = reactHookFormMethods;

  setProfileFormValue(setValue, user);
  const errorMessage = getErrorMessage(errors);

  const onSubmit = async (data: EditUserFormFields) => {
    const userEditPayload = {
      ...data,
    };
    setLoading(true);
    console.log("payload", userEditPayload);
    try {
      //   const createUser = await signUp(singUpPayload);
      //   if (createUser.data) {
      //     router.push("/auth/signin");
      //   } else {
      //     alert("Username password error");
      //   }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message as string;
        alert(message);
      }
    }
  };

  return (
    <Container className="px-2" fluid>
      <Row className="py-5">
        <Col md={8}>
          <Card className="border-0">
            <Card.Body>
              <Row className="py-2">
                <Col md="12">
                  <h3 className="text-center ft-24 fw-bold mb-3">
                    Update Profile Information
                  </h3>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <FormProvider {...reactHookFormMethods}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row className="mb-3">
                        <Col md="6">
                          <InputField
                            labelText="First name"
                            name="first_name"
                            inputType="text"
                            errorMessage={errorMessage("first_name")}
                          />
                        </Col>
                        <Col md="6">
                          <InputField
                            labelText="Last name"
                            name="last_name"
                            inputType="text"
                            errorMessage={errorMessage("last_name")}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md="12">
                          <InputField
                            labelText="Email"
                            name="email"
                            inputType="text"
                            errorMessage={errorMessage("email")}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md="12">
                          <InputField
                            labelText="Phone"
                            name="phone"
                            inputType="text"
                            errorMessage={errorMessage("phone")}
                          />
                        </Col>
                      </Row>
                      <Row>
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
                        <Col md="12" className="mt-2">
                          <SubmitButton
                            title="Submit"
                            variant="warning"
                            isLoading={loading}
                          />
                        </Col>
                      </Row>
                    </Form>
                  </FormProvider>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileBasicInfo;

import { EditUserFormFields, userEditSchema } from "@/components/auth/helpers";
import BaseContainer from "@/components/common/container/BaseContainer";
import { User } from "@/data/model/user";
import { getErrorMessage } from "@/data/utils/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import BioAndDescription from "./BioAndDescription";
import { setProfileFormValue } from "./user.helper";

type ProfileBasicInfoProps = {
  user: User;
};

const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({ user }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserFormFields>({
    resolver: yupResolver(userEditSchema),
    mode: "onTouched",
  });

  setProfileFormValue(setValue, user);

  const errorMessage = getErrorMessage(errors);

  const onSubmit = async (data: EditUserFormFields) => {
    const userEditPayload = {
      ...data,
    };
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
    <BaseContainer>
      <Row className="py-3">
        <Col md={10}>
          <Card>
            <Card.Body>
              <Row className="py-2">
                <Col md="12">
                  <h3 className="text-center ft-24 fw-bold">
                    Update Profile Information
                  </h3>
                </Col>
              </Row>
              <BioAndDescription user={user} />
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="py-3">
                  <Col md="12">
                    <h4>Basic Information</h4>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="6">
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" {...register("firstName")} />
                      {errorMessage("firstName") && (
                        <Form.Text className="text-danger">
                          {errorMessage("firstName")}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md="6">
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" {...register("lastName")} />
                      {errorMessage("lastName") && (
                        <Form.Text className="text-danger">
                          {errorMessage("lastName")}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md="12">
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="text" {...register("email")} />
                      {errorMessage("email") && (
                        <Form.Text className="text-danger">
                          {errorMessage("email")}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" {...register("phone")} />
                    {errorMessage("phone") && (
                      <Form.Text className="text-danger">
                        {errorMessage("phone")}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" {...register("password")} />
                    {errorMessage("password") && (
                      <Form.Text className="text-danger">
                        {errorMessage("password")}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>
                <Row className="py-3">
                  <Col md="12" className="mt-2">
                    <Button variant="warning" type="submit" className="">
                      Submit
                    </Button>
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

export default ProfileBasicInfo;

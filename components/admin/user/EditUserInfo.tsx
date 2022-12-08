import { EditUserFormFields, userEditSchema } from "@/components/auth/helpers";
import BaseContainer from "@/components/common/container/BaseContainer";
import { InputField } from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import SubmitButton from "@/components/common/form/SubmitButton";
import { updateUser } from "@/data/api/user";
import { User } from "@/data/model/user";
import { getErrorMessage, removeFalsy } from "@/data/utils/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { setProfileFormValue } from "./user.helper";

type EditUserInfoProps = {
  user: User;
};

const ROLES = [
  { id: "agent", name: "Agent" },
  { id: "user", name: "User" },
  { id: "admin", name: "Admin" },
];

const EditUserInfo: React.FC<EditUserInfoProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const reactHookFormMethods = useForm<EditUserFormFields>({
    resolver: yupResolver(userEditSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = reactHookFormMethods;

  useEffect(() => {
    setProfileFormValue(setValue, user);
  }, [user, setValue]);

  const errorMessage = getErrorMessage(errors);

  const onSubmit = async (data: EditUserFormFields) => {
    try {
      setLoading(true);
      const trimmedData = removeFalsy(data);
      const result = await updateUser(user.id, trimmedData as EditUserFormFields);
      if (result.data) {
        router.push("/admin/users/");
      } else {
        setLoading(false);
        alert("User info update error");
      }
    } catch (error: any) {
      setLoading(false);
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
              <Row className="py-3">
                <Col md="12">
                  <h4 className="text-center mt-3 mb-3">
                    Edit Basic Information
                  </h4>
                </Col>
              </Row>
              <FormProvider {...reactHookFormMethods}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mb-3">
                    <Col md="6">
                      <InputField
                        labelText="First Name"
                        name="firstName"
                        inputType="text"
                        errorMessage={errorMessage("firstName")}
                      />
                    </Col>
                    <Col md="6">
                      <InputField
                        labelText="Last Name"
                        name="lastName"
                        inputType="text"
                        errorMessage={errorMessage("lastName")}
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
                  <Row className="mb-3">
                    <Col md="12">
                      <SelectField
                        labelText="Role"
                        fieldName="role"
                        selectData={ROLES}
                        errorMessage={errorMessage("role")}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </BaseContainer>
  );
};

export default EditUserInfo;

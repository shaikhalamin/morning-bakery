import SubmitButton from "@/components/common/form/SubmitButton";
import Loading from "@/components/common/icon/Loading";
import { createAgent, updateAgent } from "@/data/api/agent";
import { deleteImage, uploadImage } from "@/data/api/image-files";
import { Agent } from "@/data/model/agent";
import { Image } from "@/data/model/image-file";
import { User } from "@/data/model/user";
import { getErrorMessage } from "@/data/utils/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  BioAndDescriptionFields,
  bioAndDescriptionFieldsSchema,
  setBioAndDescriptionFormValue,
} from "./bio-description.helper";

type BioAndDescriptionProps = {
  user: User;
};

const BioAndDescription: React.FC<BioAndDescriptionProps> = ({ user }) => {
  const router = useRouter();

  const [agentInfo] = useState(user.agent as Agent);

  const [image = {} as Image, setImageFile] = useState<Image>(
    user.agent?.agentImage as Image
  );
  const [uploadedImage, setUploadedImage] = useState<Image>({} as Image);
  const [deleting, setDeleting] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BioAndDescriptionFields>({
    resolver: yupResolver(bioAndDescriptionFieldsSchema),
    mode: "onSubmit",
  });

  setBioAndDescriptionFormValue(setValue, agentInfo);

  const onSubmit = async (data: BioAndDescriptionFields) => {
    let payload = {
      ...data,
      designation: "Real Estate Agent",
    };
    if (Object.values(uploadedImage).length > 0 && uploadedImage?.id > 0) {
      payload = {
        ...payload,
        agentImage: uploadedImage?.id,
      };
    }
    try {
      setSubmitLoading(true);
      if (!agentInfo?.id) {
        const agent = await createAgent(payload);
        if (agent.status) {
          router.reload();
        }
      } else {
        const agentUpdate = await updateAgent(agentInfo?.id, payload);
        if (agentUpdate.status) {
          router.reload();
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message as string;
        alert(message);
      }
    }
  };

  const errorMessage = getErrorMessage(errors);

  const handleFileDelete = (e: SyntheticEvent, id: number) => {
    e.preventDefault();
    const check = confirm("Are sure want to delete image?");
    if (check) {
      setDeleting(id);
      deleteImage(id)
        .then(async (res) => {
          setDeleting(0);
          setImageFile({} as Image);
          setUploadedImage({} as Image);
        })
        .catch((error) => {
          setDeleting(0);
          console.log(error.message);
        });
    }
  };

  const handleFileUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files instanceof FileList ? target.files : null;
    if (!files) {
      return;
    }
    let formData = new FormData();
    formData.append("type", "agent");
    formData.append("size", "md");
    formData.append("fileName", files[0]);
    setLoading(true);
    uploadImage(formData)
      .then((res) => {
        setLoading(false);
        target.value = "";
        setImageFile(res.data as Image);
        setUploadedImage(res.data as Image);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Row>
      <Col className="mt-2 mb-2">
        <h5 className="mb-3">Profile photo </h5>
        <Card>
          <Card.Body>
            <Row>
              <Col md="4">
                <Row>
                  <Col md="12">
                    {Object.keys(image || {}).length > 0 && (
                      <Card className="mt-0">
                        <Card.Body className="px-0 py-0">
                          <Row className="mb-0 ft-12 px-3">
                            <Col md="9" className="text-start ft-12">
                              {image?.type?.toLowerCase()}
                            </Col>
                            <Col
                              md="3"
                              className="text-start bg-warning text-dark"
                              onClick={(e) => {
                                handleFileDelete(e, image.id);
                              }}
                            >
                              x
                            </Col>
                          </Row>
                          {deleting === image?.id ? (
                            <Row className="py-1 mt-3">
                              <Col
                                md={{ span: 6, offset: 3 }}
                                style={{ minHeight: "80px" }}
                              >
                                <Loading />
                              </Col>
                            </Row>
                          ) : (
                            <Row className="mt-2">
                              <Col
                                md={{ span: 10, offset: 1 }}
                                className="px-2"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={image?.image_url}
                                  width={`250`}
                                  height={`250`}
                                  alt={user.firstName}
                                />
                              </Col>
                            </Row>
                          )}
                        </Card.Body>
                      </Card>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="9">
                    <Row>
                      <Form.Group
                        as={Col}
                        controlId="formFileSm"
                        className="mb-3"
                      >
                        <Form.Label></Form.Label>
                        <Form.Control
                          type="file"
                          size="sm"
                          name="agentImage"
                          onChange={handleFileUpload}
                        />
                        {errorMessage("agentImage") && (
                          <Form.Text className="text-danger">
                            {errorMessage("agentImage")}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col md="3" className="mt-3">
                    {loading && <Loading />}
                  </Col>
                </Row>
              </Col>
              <Col md="8">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md="12">
                      <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Tell about your self </Form.Label>
                        <Form.Control
                          as="textarea"
                          {...register("description")}
                          className={errors?.description ? "is-invalid" : ""}
                          rows={5}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Form.Group controlId="fb_link">
                        <Form.Label>Facebook Url</Form.Label>
                        <Form.Control type="text" {...register("fb_link")} />
                        {errorMessage("fb_link") && (
                          <Form.Text className="text-danger">
                            {errorMessage("fb_link")}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="instagram_link">
                        <Form.Label>Instagram Url</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("instagram_link")}
                        />
                        {errorMessage("instagram_link") && (
                          <Form.Text className="text-danger">
                            {errorMessage("instagram_link")}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Form.Group controlId="twitter_link">
                        <Form.Label>Twitter Url</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("twitter_link")}
                        />
                        {errorMessage("twitter_link") && (
                          <Form.Text className="text-danger">
                            {errorMessage("twitter_link")}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="linkedin_link">
                        <Form.Label>Linkedin Url</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("linkedin_link")}
                        />
                        {errorMessage("linkedin_link") && (
                          <Form.Text className="text-danger">
                            {errorMessage("linkedin_link")}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="py-3 mt-2">
                    <Col md="12">
                      <SubmitButton
                        title="Update Info"
                        variant="warning"
                        isLoading={submitLoading}
                      />
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default BioAndDescription;

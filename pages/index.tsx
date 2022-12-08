import BaseContainer from "@/components/common/container/BaseContainer";
import HomeCarousel from "@/components/header/HomeCarousel";
import Meta from "@/components/meta/Meta";
import { GetServerSideProps } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Col, Nav, Row } from "react-bootstrap";
import { NextPageWithLayout } from "./_app";
import { Rating } from "react-simple-star-rating";
import { Product } from "@/data/model/products";
import { getProducts } from "@/data/api/products";
import { StorageFile } from "@/data/model/storage-file";

const categoryItems = [
  {
    name: "sweets",
    key: "sweets",
    icon: "https://wellfoodonline.com/wp-content/uploads/elementor/thumbs/Sweets-2-pc6q3xpc6vtbzxmue1dxv9a2wm6qn80iav6lfig2bs.png",
  },
  {
    name: "cake",
    key: "cake",
    icon: "https://wellfoodonline.com/wp-content/uploads/elementor/thumbs/Asset-11-pc6kpgve8tlq083xxz8m0bwyisoy5jzowca72ms9mw.png",
  },
  {
    name: "bread/bun",
    key: "bread-bun",
    icon: "https://wellfoodonline.com/wp-content/uploads/elementor/thumbs/Asset-9-pc6ktusa4zlw6pqkbvhxn82ebj2m2peli1vrp4a4lk.png",
  },
  {
    name: "cookies",
    key: "cookies",
    icon: "https://wellfoodonline.com/wp-content/uploads/elementor/thumbs/Asset-9-1-pcdis8gu3bpmvp373z2lx0iewh7amhcmbwccywakeg.png",
  },
  {
    name: "biscuits",
    key: "biscuits",
    icon: "https://wellfoodonline.com/wp-content/uploads/elementor/thumbs/Asset-8-pc6kr6wqrvynahltvq1zkw9dq8769ktz4vc8qw8a88.png",
  },
  {
    name: "snacks",
    key: "snacks",
    icon: "https://wellfoodonline.com/wp-content/uploads/elementor/thumbs/Asset-10-pce5e8p8ma0x6up5vtzl7loul12gi8we8utyldcvyg.png",
  },
  {
    name: "others",
    key: "others",
    icon: "https://wellfoodonline.com/wp-content/uploads/elementor/thumbs/Asset-7-pcdibv4127auo6v9pebizn8efvw5k9cx2vax2ekers.png",
  },
];

type ProductList = {
  productsItems: Product[];
};

const Home: NextPageWithLayout<ProductList> = ({ productsItems }) => {
  const { data: session } = useSession();
  if (session) {
    //console.log(session)
  }

  const [products, setProducts] = useState<Product[]>(productsItems);
  const [rating, setRating] = useState(3);

  const handleCategory = async (category: string) => {
    //alert(category);
    try {
      const productFilterUrl = `?category=${category}`;
      const result = await getProducts(productFilterUrl);
      setProducts(result.data.data);
      console.log(result.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <>
      <Meta
        title="Morning Bakery | Best sweets and bakery items in dhaka,Bangladesh"
        content=" Best sweets and bakery items in dhaka,Bangladesh"
      />
      <header>
        <HomeCarousel />
      </header>
      <BaseContainer>
        <Row className="py-3 mt-2 mb-2 border-bottom">
          <Col md="12">
            <h1 className="text-center text-color-d12 ft-30 fw-bold mb-2 ">
              Bakery Products & Categories{" "}
            </h1>
          </Col>
        </Row>
        <Row className="py-3">
          <Col md="12">
            <Nav className="justify-content-center" activeKey="/home">
              {categoryItems.map((nav) => (
                <Nav.Item key={nav.key}>
                  <Nav.Link
                    href={`#`}
                    className="text-dark"
                    onClick={() => handleCategory(nav.key)}
                  >
                    <div className="mb-2">
                      {/*eslint-disable-next-line @next/next/no-img-element*/}
                      <img
                        src={nav.icon}
                        alt={nav.name}
                        className=" mx-auto d-block"
                      />
                    </div>
                    <div>
                      <span className="text-color-3b3 fw-bold ft-16 text-underline-hover">
                        {nav.name.toUpperCase()}
                      </span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        </Row>
        <Row className="py-2">
          <Col md="12">
            <Row>
              {products.length > 0 &&
                products.map((product) => {
                  const imagePath =
                    product.storage_files.length > 0
                      ? product.storage_files[0]
                      : ({} as StorageFile);

                  return (
                    <Col md="3" key={product.id} className="mt-3">
                      <Card className="rounded-0">
                        <Card.Body className="py-0 px-0 position-relative">
                          <Image
                            src={`${
                              Object.keys(imagePath).length > 0
                                ? imagePath.image_url
                                : ""
                            }`}
                            alt={product.name}
                            width={283}
                            height={283}
                            layout="responsive"
                          />
                        </Card.Body>
                      </Card>
                      <div className="home-custom-border">
                        <div className="py-3 px-3">
                          <div className="mb-1">
                            <Row>
                              <Col
                                lg="8"
                                md="8"
                                sm="8"
                                xs="8"
                                className="text-start"
                              >
                                <span className="fw-bold ft-14 text-color-333">
                                  {product.name}
                                </span>
                              </Col>
                              <Col
                                lg="4"
                                md="4"
                                sm="4"
                                xs="4"
                                className="text-start"
                              >
                                <span className="badge bg-danger fs-12 fs-normal rounded-0 ">
                                  ৳ {product.price.toFixed(2)}
                                </span>
                              </Col>
                            </Row>
                          </div>
                          <div className="mt-2 mb-2">
                            <Rating initialValue={rating} size={19} />
                          </div>
                          <div className="mt-3 mb-2">
                            <Button
                              variant="danger"
                              className="text-center w-100"
                            >
                              <span>Quick View</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
        <Row className="py-5 border-bottom mt-4">
          <Col md="8">
            <Card className="rounded-0">
              <Card.Body className="py-0 px-0">
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src="https://res.cloudinary.com/deundpsr2/image/upload/v1670502325/bakery/category_local/f7ffsy3aoeib1kzezsry.jpg"
                  alt="cake"
                  className="img-fluid"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" className="py-3">
            <h2 className="text-center ft-30 fw-bold mb-3 mt-5 text-danger">
              Celebrate with Morning Bakery Food!
            </h2>
            <h6 className="text-justify ft-16 fw-normal mb-3 mt-4 text-color-b94">
              Celebrate any occasion with our delicious and beautiful cake.
              Choose your favorite design and flavor.
            </h6>
            <Row className="py-3">
              <Col
                md={{ span: 10, offset: 1 }}
                sm={{ span: 10, offset: 1 }}
                xs={{ span: 10, offset: 1 }}
              >
                <Row>
                  <Col md="6" sm="6" xs="6">
                    <Button variant="danger" className="">
                      <span className="ft-16 ft-normal">View More</span>
                    </Button>
                  </Col>
                  <Col md="6" sm="6" xs="6">
                    <Button variant="outline-dark">
                      <span className="ft-16 ft-normal">Go to Shop</span>
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </BaseContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const productsUrl = `?per_page=12&category=sweets`;
    const results = await getProducts(productsUrl);
    console.log(results.data);
    const productsItems = results.data.data;
    return { props: { productsItems } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;

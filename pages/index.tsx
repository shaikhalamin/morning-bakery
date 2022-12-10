import BaseContainer from "@/components/common/container/BaseContainer";
import HomeCarousel from "@/components/header/HomeCarousel";
import Meta from "@/components/meta/Meta";
import { GetServerSideProps } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { NextPageWithLayout } from "./_app";
import { Rating } from "react-simple-star-rating";
import { Product } from "@/data/model/products";
import { getProducts } from "@/data/api/products";
import { StorageFile } from "@/data/model/storage-file";
import { getStorageFiles } from "@/data/api/storage-files";
import { getCategories } from "@/data/api/category";
import { Category } from "@/data/model/category";
import CategoryList from "@/components/home/CategoryList";
import Loader from "@/components/common/loader/Loader";
import { MdClose } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Cookies from "js-cookie";
import { useBakeryContext } from "context/BakeryContext";

type ProductList = {
  response: {
    productsItems: Product[];
    bannerFiles: StorageFile[];
    categories: Category[];
  };
};

type Cart = {
  item: Product;
  quantity: number;
  price: number;
};

const Home: NextPageWithLayout<ProductList> = ({
  response: { productsItems, bannerFiles, categories },
}) => {
  const { data: session } = useSession();
  if (session) {
    //console.log(session)
  }

  const [products, setProducts] = useState<Product[]>(productsItems);
  const [rating, setRating] = useState(3);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState<Product>();

  const {
    cartItems,
    currentQuantity,
    handleCartQuantity,
    setCurrentQuantity,
    handleCartItem,
    deleteCartItem,
  } = useBakeryContext();

  const handleCategory = async (category: string) => {
    try {
      const productFilterUrl = `?category=${category}`;
      setLoading(true);
      const result = await getProducts(productFilterUrl);
      setLoading(false);
      setProducts(result.data.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const showProductModal = (product: Product) => {
    setSingleProduct(product);
    setModalShow(true);
    const findInCart = cartItems.find((cItem) => cItem.item.id === product.id);
    findInCart
      ? setCurrentQuantity(findInCart.quantity)
      : setCurrentQuantity(1);
  };

  return (
    <>
      <Meta
        title="Morning Bakery | Best sweets and bakery items in dhaka,Bangladesh"
        content=" Best sweets and bakery items in dhaka,Bangladesh"
      />
      <header>
        <HomeCarousel carouselItems={bannerFiles} />
      </header>
      <BaseContainer>
        <Row className="py-3 mt-2 mb-2 border-bottom">
          <Col md="12">
            <h1 className="text-center text-color-d12 ft-30 fw-bold mb-2 ">
              Bakery Products & Categories
            </h1>
          </Col>
        </Row>
        <CategoryList
          categoryItems={categories}
          handleCategory={handleCategory}
        />

        <Row className="py-2">
          <Col md="12">
            <Row>
              {loading === true ? <Loader /> : ""}
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
                                  ৳ {Number(product.price).toFixed(2)}
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
                              onClick={() => showProductModal(product)}
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

        <Modal
          size="lg"
          show={modalShow}
          onHide={() => setModalShow(false)}
          aria-labelledby="single-product-show"
        >
          <Modal.Body>
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
                  <Col md="10" xs="10">
                    <h4 className="ft-30 fw-normal text-dark mt-3">
                      {singleProduct?.name}
                    </h4>
                  </Col>
                  <Col md="2" xs="2">
                    <MdClose
                      size={19}
                      className="mx-auto d-block border border-danger cursor-pointer mt-3"
                      onClick={() => setModalShow(false)}
                    />
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
                            value={currentQuantity}
                            onChange={({ target }) => {
                              if (
                                Number(target.value) == 0 ||
                                Number(target.value) > 0
                              ) {
                                setCurrentQuantity(+target.value);
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
                      onClick={() => handleCartItem(singleProduct as Product)}
                    >
                      <span>Add To Cart</span>
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {cartItems.length > 0 &&
                      cartItems.map((product) => (
                        <div key={product.item.id} className="mt-3 mb-3 border">
                          <h4 className="mt-2 mb-3">{product.item.name}</h4>
                          <h4 className="mt-2 mb-3">{product.quantity}</h4>
                          <h4 className="mt-2 mb-3">{product.price}</h4>
                        </div>
                      ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

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
    const bannerImageUrl = `?type=banner`;

    const [productRes, bannerFileRes, categoryRes] = await Promise.all([
      getProducts(productsUrl),
      getStorageFiles(bannerImageUrl),
      getCategories(),
    ]);
    const response = {
      productsItems: productRes.data.data,
      bannerFiles: bannerFileRes.data.data,
      categories: categoryRes.data.data,
    };

    return { props: { response } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;

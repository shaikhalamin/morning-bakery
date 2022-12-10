import BaseContainer from "@/components/common/container/BaseContainer";
import HomeCarousel from "@/components/header/HomeCarousel";
import Meta from "@/components/meta/Meta";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { NextPageWithLayout } from "./_app";
import { Product } from "@/data/model/products";
import { getProducts } from "@/data/api/products";
import { StorageFile } from "@/data/model/storage-file";
import { getStorageFiles } from "@/data/api/storage-files";
import { getCategories } from "@/data/api/category";
import { Category } from "@/data/model/category";
import CategoryList from "@/components/home/CategoryList";

import ProductList from "@/components/home/ProductList";

type ProductList = {
  response: {
    productsItems: Product[];
    bannerFiles: StorageFile[];
    categories: Category[];
  };
};

const Home: NextPageWithLayout<ProductList> = ({
  response: { productsItems, bannerFiles, categories },
}) => {
  const { data: session } = useSession();
  if (session) {
    //console.log(session)
  }

  const [products, setProducts] = useState<Product[]>(productsItems);
  const [loading, setLoading] = useState(false);

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
        <ProductList products={products} loading={loading} />

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

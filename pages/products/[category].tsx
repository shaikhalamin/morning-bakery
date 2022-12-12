import BaseContainer from "@/components/common/container/BaseContainer";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { NextPageWithLayout } from "../_app";
import { getProducts } from "@/data/api/products";
import { GetServerSideProps } from "next";
import { Product } from "@/data/model/products";
import ProductList from "@/components/home/ProductList";
import Meta from "@/components/meta/Meta";

type CategoryProductsProps = {
  productsItems: Product[];
  category: string;
};

const CategoryProducts: NextPageWithLayout<CategoryProductsProps> = ({
  productsItems,
  category,
}) => {
  const [products, setProducts] = useState<Product[]>(productsItems);
  const [loading, setLoading] = useState(false);

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <BaseContainer>
      <Meta
        title={`Morning Bakery | ${title}`}
        content={`${title} | Best sweets and bakery items in dhaka,Bangladesh`}
      />
      <Row className="py-3">
        <Col md="7">
          <ul style={{ listStyleType: "none" }} className="ft-14 fw-normal">
            <li className="px-1" style={{ display: "inline" }}>
              Home
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              /
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              Products
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              /
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              {title}
            </li>
          </ul>
        </Col>
        <Col md="5">
          {/* <ul style={{ listStyleType: "none" }}>
            <li className="px-2" style={{ display: "inline" }}>
              <span className="ft-16 fw-bold text-dark">Show : </span>
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              9
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              /
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              24
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              /
            </li>
            <li className="px-1" style={{ display: "inline" }}>
              36
            </li>
          </ul> */}
        </Col>
      </Row>
      <ProductList products={products} loading={loading} />
    </BaseContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { category } = query;
    const productsUrl =
      category !== "all-items"
        ? `?per_page=24&category=${category as string}`
        : `?per_page=24&category=sweets`;

    const productRes = await getProducts(productsUrl);
    const productsItems = productRes.data.data;

    return { props: { productsItems, category } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default CategoryProducts;

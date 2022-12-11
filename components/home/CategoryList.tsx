import { Category } from "@/data/model/category";
import React from "react";
import { Row, Col, Nav } from "react-bootstrap";

type CategoryListProps = {
  categoryItems: Category[];
  handleCategory: (category: string) => void;
  selectedCategory: string;
};

const CategoryList: React.FC<CategoryListProps> = ({
  categoryItems,
  handleCategory,
  selectedCategory,
}) => {
  return (
    <Row className="py-3">
      <Col md="12">
        <Nav className="justify-content-center" activeKey="/home">
          {categoryItems.map((category) => (
            <Nav.Item
              key={category.alias}
              className={category.alias === selectedCategory ? "border" : ""}
            >
              <Nav.Link
                href={`#`}
                className="text-dark"
                onClick={() => handleCategory(category.alias)}
              >
                <div className="mb-2">
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img
                    src={category.storage_file.image_url}
                    alt={category.name}
                    className="mx-auto d-block"
                  />
                </div>
                <div>
                  <span
                    className={`text-color-3b3 fw-bold ft-16  ${
                      category.alias === selectedCategory
                        ? "category-selected-underline"
                        : ""
                    } text-underline-hover`}
                  >
                    {category.name.toUpperCase()}
                  </span>
                </div>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Col>
    </Row>
  );
};

export default CategoryList;

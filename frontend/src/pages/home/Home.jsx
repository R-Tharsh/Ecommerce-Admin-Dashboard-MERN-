import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col } from "antd";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Shirts");
  const categories = [
    {
      name: "Shirts",
      imageUrl:
        "https://png.pngtree.com/png-clipart/20190906/original/pngtree-summer-shirt-short-sleeve-png-image_4557073.jpg",
    },
    {
      name: "Tshirts",
      imageUrl:
        "https://www.pngfind.com/pngs/m/29-298041_clipart-info-transparent-t-shirt-clip-art-hd.png",
    },
    {
      name: "Blazers",
      imageUrl:
        "https://png.pngtree.com/png-clipart/20190904/original/pngtree-red-hand-painted-blazer-png-image_4477740.jpg",
    },
  ];

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/products/getproducts");
        setProductData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [dispatch]);

  return (
    <LayoutApp>
      <div className="category">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`categoryFlex ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h3 className="categoryName">{category.name}</h3>
            <img
              src={category.imageUrl}
              alt={category.name}
              height={60}
              width={60}
            />
          </div>
        ))}
      </div>
      <Row>
        {productData
          .filter((i) => i.category === selectedCategory)
          .map((product) => (
            <Col xs={24} sm={6} md={12} lg={6}>
              <Product key={product.id} product={product} />
            </Col>
          ))}
      </Row>
    </LayoutApp>
  );
};

export default Home;

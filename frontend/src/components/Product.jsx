import React from "react";
import { Card } from "antd";
import { useDispatch } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const { Meta } = Card;

  return (
    <Card
      hoverable
      style={{ width: 240, marginBottom: 30 }}
      cover={
        <img alt={product.name} src={product.image} style={{ height: 200 }} />
      }
    >
      <Meta title={product.name} description={`$${product.price}`} />
    </Card>
  );
};

export default Product;

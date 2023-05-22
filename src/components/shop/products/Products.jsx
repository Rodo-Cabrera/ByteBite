import React from "react";
import { Card, Button } from "react-bootstrap";
import { addToCartIcon } from "../Icons.jsx";
import "../styles/products.css";

const Products = ({ products }) => {
  return (
    <>
      <div className="products">
        <ul>
          {products.map((product) => (
            <Card style={{ width: "18rem" }} key={product.id}>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <div>
                  <Button>Ver en tienda</Button>
                  <Button>{addToCartIcon()}</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Products;

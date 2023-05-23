import React from "react";
import { Card, Button } from "react-bootstrap";
import { AddToCartIcon, RemoveFromCartIcon } from "../Icons.jsx";
import "../styles/products.css";
import { useCart } from "../../../hooks/useCart.jsx";

const Products = ({ products }) => {

 const {addToCart, cart, removeFromCart} = useCart()

  const checkProductInCart = product => {
      return cart.some(item => item.id === product.id)
    }

  return (
    <>
      <div className="products">
        <ul>
          {products.map(product => {

            const isProductInCart = checkProductInCart(product)

            return (
            <Card style={{ width: "18rem" }} key={product.id}>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <div>
                  <Button>Ver en tienda</Button>
                    <Button 
                      className={isProductInCart ? "btn-danger" : "btn-primary"}
                      onClick={() =>
                      isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)                                    
                    }>
                      {     
                      isProductInCart  
                        ? <RemoveFromCartIcon/>
                        : <AddToCartIcon />
                      }                                                    
                    </Button>
                </div>
              </Card.Body>
            </Card>
            )
          })}
        </ul>
      </div>
    </>
  );
};

export default Products;

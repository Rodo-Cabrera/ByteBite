import React, { useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { AddToCartIcon, RemoveFromCartIcon } from "../Icons.jsx";
import "../styles/products.css";
import { useCart } from "../../../hooks/useCart.jsx";

const Products = ({ products }) => {

 const {addToCart, cart, removeFromCart, removeOneFromCart, totalPrice} = useCart();


  const checkProductInCart = product => {
      return cart.some(item => item.id === product.id)   
    }



  return (
    <>
      <div className="products">
        <ul>
          {products.map(product => {

            const isProductInCart = checkProductInCart(product);
            const cartItem = cart.find(item => item.id === product.id);

            return (
            <Card style={{ width: "18rem" }} key={product.id} className="container">
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title className="text-center">{product.name}</Card.Title>
                <Card.Text className="stockPrice text-center">${product.price}</Card.Text>
              </Card.Body>
                <div className="buy-butons">
                  <Button variant="warning">Ver en tienda</Button>
                  {!isProductInCart ? 
                    <Button 
                      className="btn-success"
                      onClick={() =>                
                      addToCart(product)                                               
                    }>
                      <AddToCartIcon />                                                                          
                    </Button>
                   : 
                   <Container className="my-1">
                   <div className="d-flex justify-content-around align-items-center">              
                        <Button
                        className="btn-danger col-6"
                        onClick={() => removeFromCart(product)}>
                        <RemoveFromCartIcon/>
                        </Button>
                        <div className="">
                          <Button variant="success" onClick={() => addToCart(product)}>+</Button>
                          <span className="mx-3">{cartItem.quantity}</span>
                          <Button variant={cartItem.quantity > 1 ? 'warning' : 'danger'} onClick={cartItem.quantity > 1 ? () => removeOneFromCart(product) : () => removeFromCart(product)}>-</Button>                   
                        </div>         
                   </div>
                   <div className="text-center">
                      <span className="small">Total: ${totalPrice()}</span>
                  </div>
                   </Container>
                  
                  }              
                </div>
                
            </Card>
            )
          })}
        </ul>
      </div>
    </>
  );
};

export default Products;

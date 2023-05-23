import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const addToCart = product => {

    const cartProductIndex = cart.findIndex(item => item.id === product.id);

    if (cartProductIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[cartProductIndex].quantity += 1;
      return setCart(newCart);
    }

    setCart(prev => ([
      ...prev, 
      {
        ...product,
        quantity: 1
      }
    ]))

  };


  const removeFromCart = product => {

    setCart(prev => prev.filter((item) => item.id !== product.id));

  }

  const clearCart = () => {
    setCart([]);
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,         
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

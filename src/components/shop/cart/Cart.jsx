import React from 'react'
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from '../Icons'
import { useId } from 'react'
import './cart.css'
import { useCart } from '../../../hooks/useCart'
import { Button } from 'react-bootstrap'




const CartItem = ({ img, price, name, addToCart, quantity, removeFromCart }) => {

  return (
    <li>
      <img src={img} alt={name} />
      <div>
        <strong>{name}</strong>
        <p>${price}</p>
      </div>
      <footer>
        <small>Cantidad: { quantity }</small>
        <button onClick={addToCart}>+</button>
        <button onClick="">-</button>
      </footer>
    </li>
  );

}


const Cart = () => {

  const cartCheckboxId = useId()

  const {cart, clearCart, addToCart} = useCart()


  return (
    <div>
      <label htmlFor={cartCheckboxId} className="cart-button">
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />
      <aside className="cart">
        <ul className="mt-5">
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={()=> addToCart(product)}
              {...product} />
          ))}
        </ul>

        <Button onClick={clearCart}>
          <ClearCartIcon />
        </Button>
      </aside>
    </div>
  );
}

export default Cart

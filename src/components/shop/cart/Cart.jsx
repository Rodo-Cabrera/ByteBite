import React from 'react'
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from '../Icons'
import { useId } from 'react'
import './cart.css'
import { useCart } from '../../../hooks/useCart'
import { Button } from 'react-bootstrap'




export const CartItem = ({ img, price, name, addToCart, quantity, removeFromCart, removeOneFromCart }) => {

  return (
    <div className='item-container d-grid'>
    <li>
      <div className='my-1'>
      <img src={img} alt={name} className='item-img'/>
        <strong>{name}</strong>
      </div>
    </li>
      <footer className='justify-content-around'>
        <small>$ {price}</small>
        <small>Cantidad: { quantity }</small>
        <div className='d-flex gap-2'>
        <Button onClick={addToCart} variant='success'>+</Button>
        <Button onClick={quantity > 1 ? removeOneFromCart : removeFromCart} variant={quantity > 1 ? 'warning' : 'danger'} >-</Button>
        </div>
      </footer>
    </div>
  );

}


const Cart = () => {

  const cartCheckboxId = useId()

  const {cart, clearCart, addToCart, removeOneFromCart, removeFromCart, totalPrice} = useCart();

  return (
    <div>
      <label htmlFor={cartCheckboxId} className="cart-button">
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />
      <aside className="cart">

      {cart.length > 0 ? 
        <div>
        <ul className='d-grid container'>
          {cart.map((product) => (
            <CartItem
            key={product.id}
            addToCart={()=> addToCart(product)}
            removeOneFromCart={() => removeOneFromCart(product)}
            removeFromCart={() => removeFromCart(product)}
            {...product}
            />
            ))}
        </ul>
        <div className='d-grid gap-2'>
          <div className='text-center'>
            <small>Total: $</small>
            <small className={`displayed-price`}>{totalPrice()}</small>
          </div>
        <Button onClick={clearCart} variant='danger'>
          <ClearCartIcon />
        </Button>
        </div>
        </div>
      :
      <div>
      <h1>Tu carrito está vacío</h1>
      </div>
      }
      </aside>
    </div>
  );
}

export default Cart

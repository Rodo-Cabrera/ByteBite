import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { BrowserRouter } from "react-router-dom";
import { FiltersProvider } from './context/FiltersContext';
import { CartProvider } from './context/CartContext';




ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <FiltersProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FiltersProvider>
    </BrowserRouter>
);

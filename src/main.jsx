import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { FiltersProvider } from './context/FiltersContext';
import { CartProvider } from './context/CartContext';
import { SnackbarProvider } from 'notistack';




ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <FiltersProvider>
        <CartProvider>
          <SnackbarProvider maxSnack={3} autoHideDuration={2000} >
           <App />
          </SnackbarProvider>
        </CartProvider>
      </FiltersProvider>
    </BrowserRouter>
);

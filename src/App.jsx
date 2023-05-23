import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import Register from "./components/register/Register";
import ContactForm from "./components/contact/ContactForm";
import Shop from "./components/shop/Shop";
import Footer from "./components/footer/Footer";
import './app.css'
import Home from "./components/home/Home";


const App = () => {

  

  return (
    <>
    <div id="App">
      <NavBar />
      <Routes>
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/" element={<Home/>} index="true" />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
        <Footer id="footer" />
    </div>
    </>
  );

};

export default App
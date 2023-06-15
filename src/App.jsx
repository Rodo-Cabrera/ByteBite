import React, {useContext, useState} from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import Register from "./components/register/Register";
import ContactForm from "./components/contact/ContactForm";
import Shop from "./components/shop/Shop";
import Footer from "./components/footer/Footer";
import './app.css'
import Home from "./components/home/Home";
import CreateProduct from './components/admin/products/CreateProduct';
import { AuthProvider, userContext } from './context/AuthContext';
import UserList from './components/admin/users/UserList';
import Users from './components/pages/Users';


const App = () => {
  
  const token = useContext(userContext)

  return (
    <>
      <AuthProvider value={token}>
          <div id="App">
            <NavBar />
              <Routes>
                <Route path="/createprod" element={ <CreateProduct/> } />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/" element={<Home/>} index="true" />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/userlist" element={<Users />} token={token} />
              </Routes>
            <Footer id="footer" />
          </div>
      </AuthProvider>
    </>
  );

};

export default App
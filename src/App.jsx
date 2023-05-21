import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import Register from "./components/register/Register";
import ContactForm from "./components/contact/ContactForm";
import Footer from "./components/footer/Footer";
import './app.css'
import Home from "./components/home/Home";

const App = () => {

  return (
    <>
    <div id="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} index="true" />
        <Route path="/contact" element={<ContactForm/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/> } />
      </Routes>
      <Footer id="footer"/>
    </div>
    </>
  );

};

export default App
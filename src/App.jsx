import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import Register from "./components/register/Register";
import ContactForm from "./components/contact/ContactForm";

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/contact" element={<ContactForm/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/> } />
      </Routes>
    </>
  );

};

export default App
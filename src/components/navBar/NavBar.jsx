import React, {useEffect, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './styles/navBar.css';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Login from '../login/Login';
import Cart from '../shop/cart/Cart';
import { useAuth } from '../../hooks/useAuth';



const NavBar = () => {

  
  const navRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
    window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleScroll = () => {
    const nav = navRef.current;
    if (window.scrollY > 500) {
      nav.classList.add("opacity-75");  
    } else {
      nav.classList.remove("opacity-75"); 
    }

  };

  const {isLogged, logout, user} = useAuth()

  const [loginMod, setLoginMod] = useState(false);

  const handleOpenL = () => setLoginMod(true);
  const handleCloseL = () => setLoginMod(false);



  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="navContainer sticky-top shadow"
        ref={navRef}
      >
        <Container>
          <Link to="/">
            <Navbar.Brand>ByteBite</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link id="navbarNav">
                <Link className="underline nav-link" to="/aboutUs">
                  Nosotros
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link className="underline nav-link" to="/contact">
                  Contacto
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="underline nav-link" to="/register">
                  Registrarse
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="underline nav-link" to="/userlist">
                  Lista de usuarios
                </Link>
              </Nav.Link>
              {isLogged ? (
                <div className="user">
                  <Nav.Link>
                    <Link
                      className="underline nav-link"
                      to="/"
                      onClick={() => logout()}
                    >
                      LogOut
                    </Link>
                  </Nav.Link>
                </div>
              ) : (
                <Nav.Link>
                  <Link className="underline nav-link" onClick={handleOpenL}>
                    LogIn
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <div className='user'>
            {isLogged ? <strong>{user}</strong> : <p></p>}
            <Cart />
          </div>
        </Container>
      </Navbar>

      <Modal show={loginMod} onHide={handleCloseL}>
        <Login />
      </Modal>
    </>
  );
}

export default NavBar

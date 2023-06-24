import React, {useEffect, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import {Button} from 'react-bootstrap';
import './styles/navBar.css';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Login from '../login/Login';
import Cart from '../shop/cart/Cart';
import { useAuth } from '../../hooks/useAuth';
import UserPanel from '../userProfile/UserPanel';
import { Tooltip } from "react-tooltip";




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

  const { role } = useAuth();

  const { isLogged, logout, actualUser } = useAuth()

  const [loginMod, setLoginMod] = useState(false);

  const handleOpenL = () => setLoginMod(true);
  const handleCloseL = () => setLoginMod(false);

  const [profile, setProfile] = useState(false);

  const handleProfile = () => setProfile(true);
  const handleCloseProfile = () => setProfile(false);



  return (
    <>
      <Navbar
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
                <Link className="underline nav-link " to="/aboutUs">
                  Nosotros
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link className="underline nav-link " to="/contact">
                  Contacto
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="underline nav-link" to="/register">
                  Registrarse
                </Link>
              </Nav.Link>
              {role === "owner" && role === "owner" && (
                <Nav.Link>
                  <Link className="underline nav-link" to="/userlist">
                    Admin panel
                  </Link>
                </Nav.Link>
              )}

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
          <div className="user-column">
            {actualUser.length > 0 && (
              <div className="user">
                <Tooltip id="userTooltip" />
                <div>
                  <Button
                    className="profileButton"
                    onClick={handleProfile}
                    data-tooltip-id="userTooltip"
                    data-tooltip-content="Mi perfil"
                  >
                    <img
                      src={actualUser[0].avatar}
                      alt={actualUser[0].avatar}
                      className="navAvatar"
                    />
                  </Button>
                </div>
                <strong>{actualUser[0].name}</strong>
              </div>
            )}
            <Cart />
          </div>
        </Container>
      </Navbar>

      <Modal show={loginMod} onHide={handleCloseL}>
        <Login />
      </Modal>
      <Offcanvas
        show={profile}
        onHide={handleCloseProfile}
        placement="end"
        className="offcanvaProfile"
      >
        <Button
          className="ms-auto mx-3 my-3 closeButton"
          onClick={handleCloseProfile}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </Button>
        <Offcanvas.Title className="text-center my-2">
          Perfil de usuario
        </Offcanvas.Title>
        <UserPanel />
      </Offcanvas>
    </>
  );
}


export default NavBar

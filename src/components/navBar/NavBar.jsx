import React, {useEffect, useRef} from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './styles/navBar.css';
import { Link } from 'react-router-dom';



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


  return (
    <Navbar
      bg="light"
      expand="lg"
      className="navContainer sticky-top shadow"
      ref={navRef}
    >
      <Container>
        <Navbar.Brand href="#home">ByteBite</Navbar.Brand>
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
              <Link className="underline nav-link" to="/login">
                LogIn
              </Link>
            </Nav.Link>

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar

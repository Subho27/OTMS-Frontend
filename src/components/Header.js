import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import './Header.css'

const Header = () => {
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const [isLoggedIn, setIsLoggedIn] = useState(loginReducer.loggedIn);
  let profilePageUrl = "";

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setIsLoggedIn(true);
      loginReducer.user.roles.map((r) => {
        if (r["roleName"] === "ADMIN") {
          profilePageUrl = "/adminProfile";
        } else {
          profilePageUrl = "/";
        }
      });
    }
  }, [navigate]);

  return (
    <header>
      <Navbar style={{ backgroundColor: "#492E87" }} variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <Navbar.Brand className='poppins-extrabold text-center'>ONLINE TEST MANAGEMENT PORTAL</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {isLoggedIn ? (
                  <Nav.Link className='profile-name'>{loginReducer.user.firstName}</Nav.Link>
              ) : (
                <LinkContainer to="/">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}

              {isLoggedIn ? (
                  <LinkContainer to="/">
                    <Nav.Link id='logout-button' onClick={logoutHandler}>Logout</Nav.Link>
                    {/*<span className='poppins-bold logout-button' onClick={logoutHandler}>LOG OUT</span>*/}
                  </LinkContainer>
              ) : (
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

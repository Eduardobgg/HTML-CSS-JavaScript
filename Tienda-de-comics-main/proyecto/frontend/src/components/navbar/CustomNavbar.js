import React, { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { FaSearch, FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { FiBell, FiActivity } from "react-icons/fi";

import * as styles from "./CustomNavbarStyles";
import "./customNavbar.css";
import { useNavigate } from "react-router-dom";
import dispatcher from "../../dispatcher/Dispatcher";

function CustomNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Verificar si el usuario está logueado al montar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const [query, setQuery] = useState("");
  const handleLogoutClick = () => {
    dispatcher.dispatch({
      type: "LOGOUT",
    });
    setIsLoggedIn(false);
    setUsername("");
    navigate("/"); // Redirigir a la página principal
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist"); // Redirigir a la página de Wishlist
  };

  const handleSearch = () => {
    if (query.trim() === "") return;
    navigate(`/results?query=${encodeURIComponent(query.trim())}`);
  };

  const handleSellClick = () => {
    navigate("/Venta"); // Redirigir a la página de Venta
  };

  return (
    <Navbar
      data-bs-theme="dark"
      style={styles.navbar}
      bg="transparent"
      expand="lg"
    >
      <Container fluid className="g-0">
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={styles.brand}
          className="text-white"
        >
          ComicVault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="ms-5">
          <Nav>
            <NavDropdown title="Categorías" renderMenuOnMount>
              <div style={styles.dropdownMenuStyle}>
                {[
                  "Aventura",
                  "Ciencia Ficción o Futurista",
                  "Cómico y Satírico",
                  "Fantasía",
                  "Manga",
                  "Policiaco o Criminal",
                  "Romance",
                  "Terror",
                ].map((category, index) => (
                  <div
                    key={index}
                    style={styles.dropdownItemStyle}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        styles.dropdownItemHoverStyle.backgroundColor)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    {category}
                  </div>
                ))}
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Row className="d-flex align-items-center">
            <InputGroup>
              <Form.Control
                style={styles.search}
                type="text"
                placeholder="Buscar"
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputGroup.Text style={styles.searchIcon}>
                <FaSearch onClick={handleSearch} />
              </InputGroup.Text>
            </InputGroup>
          </Row>
        </Form>
        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link className="text-white me-3" onClick={handleSellClick}>
            <FaDollarSign className="me-2" />
            Vender
          </Nav.Link>
          {/* Botón de Wishlist */}
          <Button
            variant="link"
            className="text-white me-3"
            onClick={handleWishlistClick}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              fontSize: "1.rem",
              marginRight: "1.2rem",
            }}
          >
            <FaShoppingCart className="me-2" style={{ fontSize: "2rem" }} />
            Wishlist
          </Button>

          <Navbar.Collapse>
            <Nav>
              <NavDropdown
                className="notifications"
                title={
                  <span>
                    <FiBell className="me-2" />
                    Notificaciones
                  </span>
                }
                renderMenuOnMount
              >
                <div style={styles.dropdownMenuStyle}>
                  <span style={styles.notificationTitle}>Ventas</span>
                  <NavDropdown.Divider style={styles.divider} />
                  {[
                    {
                      type: "venta",
                      title: "Dandadan Vol 1",
                    },
                    {
                      type: "wish",
                      title: "Billy Bat T20",
                    },
                  ].map((comic, index) => (
                    <div
                      key={index}
                      style={styles.dropdownItemStyle}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          styles.dropdownItemHoverStyle.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                      className="d-flex flex-column align-items-start"
                    >
                      {comic.type === "venta" ? (
                        <div>
                          <div style={styles.notificationTitle}>
                            <HiTrendingUp className="fs-4 me-2" /> Has hecho una
                            venta.
                          </div>
                          <div style={styles.notificationText}>
                            {comic.title + " ¡Ha sido vendido!"}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={styles.notificationTitle}>
                            <FiActivity className="fs-4 me-2" /> Agregado a
                            Wishlist
                          </div>
                          <div style={styles.notificationText}>
                            {comic.title +
                              " ¡Ha sido agregado a wishlist de alguien!"}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {isLoggedIn ? (
            <NavDropdown
              title={username}
              id="user-dropdown"
              className="text-white"
              renderMenuOnMount
            >
              <NavDropdown.Item onClick={handleLogoutClick}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button
              style={styles.loginButton}
              type="button"
              onClick={handleLoginClick}
            >
              Iniciar sesión
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;

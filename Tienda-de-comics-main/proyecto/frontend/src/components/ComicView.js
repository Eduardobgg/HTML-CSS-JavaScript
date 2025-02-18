import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Alert } from "react-bootstrap";
import CustomNavbar from "./navbar/CustomNavbar";
import * as styles from "./ComicViewStyles";
import { FaTruck } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import comicStore from "../stores/ComicStore";
import AnimatedButton from "./animatedButton/AnimatedButton";

// Función para agregar cómic a la wishlist
const addToWishlist = (comic, setShowAlert, setAlertMessage) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlistComics")) || [];

  if (!wishlist.some((item) => item.nombre === comic.nombre)) {
    wishlist.push(comic); // Agregar cómic a la lista
    localStorage.setItem("wishlistComics", JSON.stringify(wishlist)); // Guardar en localStorage
    setAlertMessage("¡Cómic agregado a tu Wishlist!"); // Mensaje de éxito
    setShowAlert(true); // Mostrar alerta
  } else {
    setAlertMessage("¡Cómic ya está en tu Wishlist!"); // Mensaje de duplicado
    setShowAlert(true); // Mostrar alerta
  }

  // Ocultar alerta después de 3 segundos
  setTimeout(() => setShowAlert(false), 3000);
};

function ComicView() {
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar el mensaje
  const [alertMessage, setAlertMessage] = useState(""); // Estado para el mensaje de alerta
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      setComics(await comicStore.fetchComics());
    };

    fetchComics();

    const listenerID = comicStore.addChangeListener(() => {
      fetchComics();
    });

    return () => {
      comicStore.removeChangeListener(listenerID);
    };
  }, []);

  const comic = comics.find((comic) => comic.id == id);

  return (
    <Container style={styles.mainContainer} fluid>
      <CustomNavbar />
      {showAlert && (
        <Alert
          variant="success"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          {alertMessage}
        </Alert>
      )}
      {comic && (
        <Container style={styles.detailsWrapper}>
          <div className="w-100 d-flex justify-content-end">
            <Button onClick={() => navigate("/")} style={styles.closeButton}>
              X
            </Button>
          </div>

          <Row style={styles.detailsContainer}>
            <Col className="d-flex align-items-center justify-content-center">
              <Image src={comic.url_imagen} style={styles.comicImage} />
            </Col>
            <Col style={styles.details}>
              <Row className="fs-3 text-white">{comic.nombre}</Row>
              <Row className="fs-1 text-white fw-bold mt-2">
                {"$" + comic.precio}
              </Row>
              <Row className="mt-2 fw-light" style={styles.vendido}>
                Vendedor - {comic.vendedor_nombre}
              </Row>
              <Row className="mt-5">
                <Col className="ps-0">
                  <Button
                    className="w-100 fw-bold bg-white text-dark"
                    onClick={() =>
                      addToWishlist(comic, setShowAlert, setAlertMessage)
                    } // Llamar a la función de agregar a wishlist
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      fontWeight: "bold",
                      padding: "12px 16px",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Añadir a Wishlist
                  </Button>
                </Col>
                <Col className="pe-0">
                  {/* Botón animado para comprar */}
                  <AnimatedButton />
                </Col>
              </Row>
              <Row className="text-white mt-4">
                <span>
                  <FaTruck size={24} color="white" className="me-2" /> Envío
                  GRATIS en compras mayores a $3,000.00
                </span>
              </Row>
              <Row className="bg-white mt-4 py-3 px-3 rounded-3">
                <Row className="fw-bold">{comic.autor}</Row>
                <Row className="mt-2">{comic.descripcion}</Row>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default ComicView;
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CustomNavbar from "./navbar/CustomNavbar";
import * as styles from "./WishlistStyles";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "./animatedButton/AnimatedButton";

function WishCard({ comic, onRemove }) {
  return (
    <Card className="h-100" style={styles.card}>
      <Row className="mx-0">
        <Row className="d-flex flex justify-content-center mx-auto">
          <Card.Img
            variant="top"
            src={comic.url_imagen}
            alt="Comic Cover"
            style={styles.cardImage}
          />
        </Row>
        <Row fluid className="px-0 pt-4 mx-auto">
          <AnimatedButton onComplete={() => onRemove(comic.nombre)} />
          <Card.Text className="ps-0" style={styles.cardPrice}>
            {comic.precio}
          </Card.Text>
        </Row>
      </Row>

      <Card.Body className="mx-0 ps-0">
        <Card.Title style={styles.cardTitle}>{comic.nombre}</Card.Title>
        <Card.Text style={styles.cardDescription}>
          {comic.descripcion}
        </Card.Text>
      </Card.Body>

      {/* Botón de eliminar */}
      <Button
        variant="danger"
        onClick={() => onRemove(comic.nombre)}
        style={styles.removeButton}
      >
        Eliminar de Wishlist
      </Button>
    </Card>
  );
}


function Wishlist() {
  const navigate = useNavigate();

  // Cargar los cómics del localStorage o usar los valores por defecto
  const loadComicsFromStorage = () => {
    const savedComics = localStorage.getItem("wishlistComics");
    if (savedComics) {
      return JSON.parse(savedComics); // Devuelve los cómics guardados si existen
    } else {
      return [];
    }
  };

  // Usar useState para establecer el estado de los cómics
  const [comics, setComics] = useState(loadComicsFromStorage);

  // Función para eliminar un cómic de la wishlist
  const handleRemove = (title) => {
    const updatedComics = comics.filter((comic) => comic.nombre !== title); // Filtrar el cómic a eliminar
    setComics(updatedComics); // Actualizar el estado con la nueva lista

    // Guardar los cómics actualizados en localStorage
    localStorage.setItem("wishlistComics", JSON.stringify(updatedComics));
  };

  return (
    <Container style={styles.mainContainer} fluid>
      <CustomNavbar isLoggedIn={false} />
      <Container style={styles.wishListContainer}>
        <div className="w-100 d-flex justify-content-end">
          <Button onClick={() => navigate("/")} style={styles.closeButton}>
            X
          </Button>
        </div>
        <div style={styles.title}>Mi Wishlist</div>
        <Row className="mt-5 d-flex justify-content-between">
          {comics.map((comic, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-5">
              <WishCard
                comic={comic}
                onRemove={handleRemove} // Pasamos la función de eliminación
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Wishlist;
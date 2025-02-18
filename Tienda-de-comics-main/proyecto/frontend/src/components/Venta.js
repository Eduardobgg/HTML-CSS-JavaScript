import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CustomNavbar from "./navbar/CustomNavbar";
import * as styles from "./VentaStyles";

import { FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dispatcher from "../dispatcher/Dispatcher";

function Venta() {
  const [image, setImage] = useState(""); // Ahora es un enlace
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [autor, setAutor] = useState("");
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const updatedUserName = localStorage.getItem("username");
    if (updatedUserName) {
      setUserName(updatedUserName); // Si existe, actualizamos el estado
    } else {
      setUserName(null); // Si no existe, aseguramos que el estado esté vacío
    }
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (!image || !title || !price) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Guardar el cómic en localStorage
    const newComic = {
      url_imagen: image,
      nombre: title,
      precio: price,
      vendedor_nombre: userName,
      autor: autor,
      descripcion: description,
    };

    dispatcher.dispatch({
      type: "SELL_COMIC",
      comic: newComic,
    });
    // Navegar de vuelta al inicio
    navigate("/");
  };

  return (
    <Container style={styles.mainContainer} fluid>
      <CustomNavbar isLoggedIn={false} />
      <Container style={styles.ventaContainer}>
        <div className="w-100 d-flex justify-content-end">
          <Button onClick={() => navigate("/")} style={styles.closeButton}>
            X
          </Button>
        </div>
        <div style={styles.title}>Añadir Cómic a la Venta</div>

        <Row className="mt-5">
          <Col md={6} sm={12}>
            {/* Ingresar enlace de imagen */}
            <Form.Group className="mb-3">
              <Form.Label>Enlace de la Imagen del Cómic</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Ejemplo: https://miimagen.com/comic.jpg"
              />
            </Form.Group>

            {image && (
              <div style={styles.imagePreviewContainer}>
                <img
                  src={image}
                  alt="Vista previa"
                  style={styles.imagePreview}
                />
              </div>
            )}
          </Col>

          <Col md={6} sm={12}>
            {/* Título */}
            <Form.Group className="mb-3">
              <Form.Label>Título del Cómic</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe el título del cómic"
              />
            </Form.Group>

            {/* Precio */}
            <Form.Group className="mb-3">
              <Form.Label>Precio del Cómic</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ejemplo: 1000"
              />
            </Form.Group>

            {/* Autor */}
            <Form.Group className="mb-3">
              <Form.Label>Autor del Cómic</Form.Label>
              <Form.Control
                type="text"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Ejemplo: Stan Lee"
              />
            </Form.Group>

            {/* Descripción */}
            <Form.Group className="mb-3">
              <Form.Label>Descripción del Cómic</Form.Label>
              <Form.Control
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ejemplo: Batman pelea contra superman"
              />
            </Form.Group>

            {/* Texto de vendedor */}
            <div style={styles.sellerInfo}>
              {userName ? (
                <h2>Vendido por {userName}</h2>
              ) : (
                <h2>Usuario no logueado</h2>
              )}
            </div>

            {/* Información de envío */}
            <div style={styles.shippingInfo}>
              <FaTruck /> GRATUITO en compras mayores a $3,000.00
            </div>
          </Col>
        </Row>

        {/* Botón para agregar el cómic a la venta */}
        <Button onClick={handleSubmit} style={styles.submitButton}>
          Publicar para Venta
        </Button>
      </Container>
    </Container>
  );
}

export default Venta;
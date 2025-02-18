import React from "react";
import { Card } from "react-bootstrap";
import * as styles from "./ComicCardStyles";
import { useNavigate } from "react-router-dom";
function ComicCard({ comic }) {
  const { id, nombre, precio, url_imagen } = comic;
  const navigate = useNavigate();
  return (
    <Card
      style={styles.card}
      onClick={() => navigate(`/detalles?id=${encodeURIComponent(id)}`)}
    >
      <Card.Img
        variant="top"
        src={url_imagen}
        alt="Comic Cover"
        style={styles.cardImage}
      />
      <Card.Body>
        <Card.Title style={styles.title}>{nombre}</Card.Title>
        <Card.Text style={styles.price}>{"$" + precio}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ComicCard;

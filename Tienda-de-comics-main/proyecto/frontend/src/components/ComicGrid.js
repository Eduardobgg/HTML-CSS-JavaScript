import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ComicCard from "./ComicCard";
import comicStore from "../stores/ComicStore";

function ComicGrid() {
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

  return (
    <Container fluid>
      <Row className="mt-5 d-flex justify-content-between">
        {comics.map((comic, index) => (
          <Col md={3} sm={6} xs={12} key={index} className="mb-5">
            <ComicCard comic={comic} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ComicGrid;

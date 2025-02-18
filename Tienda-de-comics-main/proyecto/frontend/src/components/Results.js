import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomNavbar from "./navbar/CustomNavbar";
import { Container, Row, Col } from "react-bootstrap";
import * as styles from "./ResultStyles";
import ComicCard from "./ComicCard";
import comicStore from "../stores/ComicStore";

function Results() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
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

  const filteredComics = comics.filter((comic) =>
    comic.nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container style={styles.dashboardContainer} fluid>
      <CustomNavbar />
      <Row className="mt-5 d-flex justify-content-between">
        {filteredComics.map((comic, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-5">
            <ComicCard comic={comic} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Results;

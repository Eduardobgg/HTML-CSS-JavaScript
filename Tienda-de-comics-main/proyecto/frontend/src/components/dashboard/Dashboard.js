import React from "react";
import { Container, Row } from "react-bootstrap";
import CustomNavbar from "../navbar/CustomNavbar";
import * as styles from "./DashboardStyles";
import ComicCarousel from "../ComicGrid";

function Dashboard() {
  console.log("HOLA");
  return (
    <Container style={styles.dashboardContainer} fluid>
      <CustomNavbar />
      <Container fluid className="mt-5">
        <h2 className="text-white">Lo más popular</h2>
        <Row className="mt-4">
          <ComicCarousel />
        </Row>
      </Container>
    </Container>
  );
}

export default Dashboard;

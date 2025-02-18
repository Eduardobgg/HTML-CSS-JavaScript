import React, { useState } from "react";
import * as styles from "./LoginStyles.js";
import "./login.css";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para la redirección
import comicImage from "../../images/comic-img.jpeg";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(""); // Nombre de usuario para registro
  const [phoneNumber, setPhoneNumber] = useState(""); // Número de teléfono para registro
  const [role, setRole] = useState("comprador"); // Rol predeterminado
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const navigate = useNavigate(); // Instanciar useNavigate

  const handleSubmit = async () => {
    try {
      if (isLoggingIn) {
        // Modo de inicio de sesión
        const response = await axios.post(
          "http://localhost:8000/api/users/verify/",
          {
            email,
            password,
          }
        );

        if (response.data.exists) {
          // Almacenar el token y el nombre de usuario en el localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          navigate("/dashboard");
        } else {
          alert("Correo o contraseña incorrectos");
        }
      } else {
        // Modo de registro
        const response = await axios.post(
          "http://localhost:8000/api/users/create/",
          {
            user_name: userName,
            email,
            password,
            phone_number: phoneNumber,
            role,
          }
        );

        if (response.status === 201) {
          alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
          setIsLoggingIn(true); // Cambiar al modo de inicio de sesión
        } else {
          alert("Hubo un problema al registrar el usuario.");
        }
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
      alert("Hubo un error al procesar tu solicitud. Intenta de nuevo.");
    }
  };

  return (
    <Container className="w-100 mx-0 px-0" fluid style={styles.loginContainer}>
      <Row className="w-100">
        <Col md={4} className="d-flex justify-content-end mx-0 px-0">
          <Image style={styles.comicImage} src={comicImage} alt="Comic" fluid />
        </Col>
        <Col md={4} className="ms-0 ps-0 me-5">
          <Card style={styles.loginForm}>
            <Card.Header className="text-white text-center">
              <h1>{isLoggingIn ? "Inicia sesión" : "Registrate"}</h1>
            </Card.Header>
            <Card.Body>
              <Form className="text-white">
                {!isLoggingIn && (
                  <>
                    <Form.Group>
                      <Form.Label>Nombre de Usuario</Form.Label>
                      <Form.Control
                        style={styles.input}
                        type="text"
                        placeholder="Nombre de usuario"
                        onChange={(e) => setUserName(e.target.value)}
                        className="mb-3"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Número de Teléfono</Form.Label>
                      <Form.Control
                        style={styles.input}
                        type="text"
                        placeholder="Número de teléfono"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mb-3"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Rol</Form.Label>
                      <Form.Select
                        style={styles.input}
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                        className="mb-3"
                      >
                        <option value="comprador">Comprador</option>
                        <option value="vendedor">Vendedor</option>
                      </Form.Select>
                    </Form.Group>
                  </>
                )}
                <Form.Group>
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    style={styles.input}
                    type="email"
                    placeholder="correo@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    style={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="******"
                  />
                </Form.Group>
                <Button
                  onClick={handleSubmit}
                  onMouseEnter={() => setIsSubmitHovered(true)}
                  onMouseLeave={() => setIsSubmitHovered(false)}
                  style={{
                    ...styles.loginButton,
                    backgroundColor: isSubmitHovered ? "#4E31AA" : "#5F1BF0",
                  }}
                >
                  {isLoggingIn ? "Iniciar sesión" : "Registrate"}
                </Button>
                {isLoggingIn && (
                  <Button
                    onClick={() => setIsLoggingIn(false)}
                    className="text-white w-100 mt-3"
                    variant="link"
                  >
                    No tienes cuenta? Registrate
                  </Button>
                )}
                {!isLoggingIn && (
                  <Button
                    onClick={() => setIsLoggingIn(true)}
                    className="text-white w-100 mt-3"
                    variant="link"
                  >
                    Ya tienes una cuenta? Inicia sesión
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="text-white">
          <p style={styles.title}>ComicVault</p>
          <div className="d-flex align-items-center" style={styles.listItem}>
            <div style={styles.circle}></div> Se un cliente o vendedor
          </div>
          <div className="d-flex align-items-center" style={styles.listItem}>
            <div style={styles.circle}></div> +100 cómics y coleccionables
          </div>
          <div className="d-flex align-items-center" style={styles.listItem}>
            <div style={styles.circle}></div> Crea tu cuenta gratis
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
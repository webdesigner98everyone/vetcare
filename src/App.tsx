import React from "react";
import { Container } from "react-bootstrap";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <AppRoutes />
      </Container>
      <Footer />
    </>
  );
}

export default App;

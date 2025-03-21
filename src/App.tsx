import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard"); // Verifica si la ruta comienza con "/dashboard"

  return (
    <>
      {!isDashboard && <Navbar />}
      <Container fluid className={isDashboard ? "dashboard-container" : ""}>
        <AppRoutes />
      </Container>
      {!isDashboard && <Footer />}
    </>
  );
}

export default App;

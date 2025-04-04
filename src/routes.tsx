import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import MedicalHistory from "./components/MedicalHistory";
import PetProfile from "./components/PetProfile";
import PetQR from "./components/PetQR";
import PetVaccines from "./components/PetVaccines";
import PrivacyPolicy from "./components/PrivacyPolicy";
import UpdateProfile from "./components/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRouteProps";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/privacidad" element={<PrivacyPolicy />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/About" element={<About />} />

      {/* Rutas protegidas */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/PetProfile" element={
        <ProtectedRoute allowedRoles={["admin", "viewer"]}>
          <PetProfile />
        </ProtectedRoute>
      } />

      <Route path="/PetQR" element={
        <ProtectedRoute allowedRoles={["admin", "viewer"]}>
          <PetQR />
        </ProtectedRoute>
      } />
      
      <Route path="/Vaccines" element={
        <ProtectedRoute allowedRoles={["admin", "viewer"]}>
          <PetVaccines />
        </ProtectedRoute>
      } />

      <Route path="/history" element={
        <ProtectedRoute allowedRoles={["admin", "viewer"]}>
          <MedicalHistory />
        </ProtectedRoute>
      } />

      <Route path="/Contact" element={<Contact />} />
    </Routes>
  );
}

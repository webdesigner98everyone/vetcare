import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MedicalHistory from "./pages/MedicalHistory";
import PetProfile from "./pages/PetProfile";
import PetFeeding from "./pages/feeding";
import PetVaccines from "./pages/Vaccines";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRouteProps";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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

      <Route path="/Feeding" element={
        <ProtectedRoute allowedRoles={["admin", "viewer"]}>
          <PetFeeding />
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

      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminPanel />
        </ProtectedRoute>
      } />

      <Route path="/Contact" element={<Contact />} />
    </Routes>
  );
}

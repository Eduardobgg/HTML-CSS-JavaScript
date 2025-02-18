import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Wishlist from "./components/Wishlist";
import ComicView from "./components/ComicView";
import Results from "./components/Results";
import Venta from "./components/Venta";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Venta" element={<Venta />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/detalles" element={<ComicView />} />
        <Route path="/results" element={<Results />} />
        <Route path="/Venta" element={<Venta />} />
      </Routes>
    </Router>
  );
};

export default App;

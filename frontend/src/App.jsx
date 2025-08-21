import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthProvider, { useAuth } from "./AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Slots from "./pages/Slots";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="container">
      <Link to="/">Home</Link>
      <Link to="/slots">Slots</Link>
      {user ? (
        <>
          <Link to="/my-bookings">My Bookings</Link>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
          <span style={{ marginLeft: 12 }}>
            <strong>{user.name}</strong> ({user.role})
            <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
          </span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <hr />
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Slots />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

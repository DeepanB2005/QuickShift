import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Workers from "./pages/Workers";
import Bookings from "./pages/Bookings";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </div>
    </div>
  );
}

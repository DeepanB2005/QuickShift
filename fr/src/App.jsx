import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ServiceWorkers from "./pages/ServiceWorkers";

// Worker subpages
import WorkerDashboard from "./pages/WorkerDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add your Navbar component here if needed */}
      <div className="p-4">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workers" element={<ServiceWorkers />} />

          {/* Worker Pages */}
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
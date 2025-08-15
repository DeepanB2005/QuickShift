import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Workers from "./pages/Workers";
import Bookings from "./pages/Bookings";
import Navbar from "./components/Navbar";

// Worker subpages
import Dashboard from "./pages/worker/Dashboard";
import AvailableJobs from "./pages/worker/AvailableJobs";
import MyJobs from "./pages/worker/MyJobs";
import Payments from "./pages/worker/Payments";
import Profile from "./pages/worker/Profile";
import Support from "./pages/worker/Support";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/bookings" element={<Bookings />} />

          {/* Worker Pages */}
          <Route path="/worker/dashboard" element={<Dashboard />} />
          <Route path="/worker/available-jobs" element={<AvailableJobs />} />
          <Route path="/worker/my-jobs" element={<MyJobs />} />
          <Route path="/worker/payments" element={<Payments />} />
          <Route path="/worker/profile" element={<Profile />} />
          <Route path="/worker/support" element={<Support />} />
        </Routes>
      </div>
    </div>
  );
}

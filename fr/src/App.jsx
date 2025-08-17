import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-4 py-3 bg-white shadow">
        <Link to="/" className="font-semibold">QuickShift</Link>
        <div className="flex gap-3 items-center">
          <LanguageSwitcher />
          <Link className="text-sm px-3 py-2 bg-indigo-600 text-white rounded" to="/auth">Login</Link>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) return <Navigate to="/auth" replace />;
  return children;
}

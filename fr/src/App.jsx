import React from "react";
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {!isDashboard && <Nav />}
      <main className={isDashboard ? "p-0" : "max-w-2xl mx-auto p-4"}>
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

function Nav() {
  const token = localStorage.getItem("token");
  let userName = null;
  if (token) {
    try {
      userName = JSON.parse(atob(token.split('.')[1])).name;
    } catch {
      userName = null;
    }
  }

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow">
      <Link to="/" className="font-semibold">QuickShift</Link>
      <div className="flex gap-3 items-center">
        <LanguageSwitcher />
        {token ? (
          <Link
            className="text-sm px-3 py-2 bg-indigo-600 text-white rounded"
            to="/dashboard"
          >
            {userName || "Dashboard"}
          </Link>
        ) : (
          <Link className="text-sm px-3 py-2 bg-indigo-600 text-white rounded" to="/auth">Login</Link>
        )}
      </div>
    </nav>
  );
}

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) return <Navigate to="/auth" replace />;
  return children;
}
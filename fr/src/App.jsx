import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import ChatBot from "./components/ChatBot";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { I18nProvider } from "./i18n/I18nProvider";

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <I18nProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <main className={isDashboard ? "p-0" : "w-full px-0"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </I18nProvider>
  );
}

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/auth" replace />;
  return children;
}

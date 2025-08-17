import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const { t } = useI18n();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <div className="mt-10 text-center">{t("common.loading")}</div>;

  return (
    <div className="mt-10 space-y-3">
      <h1 className="text-2xl font-bold">{t("dashboard.welcome")}, {user.name}</h1>
      <div className="bg-white rounded shadow p-4">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Location:</b> {user.location || "-"}</p>
        <p><b>Phone:</b> {user.phone || "-"}</p>
      </div>
    </div>
  );
}

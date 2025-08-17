import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const { t } = useI18n();
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", phone: "", role: "user" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setUser(data.user);
      setForm({
        name: data.user.name || "",
        location: data.user.location || "",
        phone: data.user.phone || "",
        role: data.user.role || "user"
      });
      // If profile incomplete, show edit form
      if (!data.user.name || !data.user.phone || !data.user.location) setEdit(true);
    }).catch(() => setUser(null));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { data } = await axios.patch(`${API}/api/auth/me`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser(data.user);
    setEdit(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!user) return <div className="mt-10 text-center">{t("common.loading")}</div>;

  return (
    <div className="mt-10 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("dashboard.welcome")}, {user.name}</h1>
        <div>
          <span className="mr-4">{user.name}</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {edit ? (
        <form className="bg-white rounded shadow p-4 space-y-3" onSubmit={handleUpdate}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border rounded px-3 py-2" required />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border rounded px-3 py-2" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border rounded px-3 py-2" required />
          <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="user">User</option>
            <option value="worker">Worker</option>
          </select>
          <button className="bg-indigo-600 text-white px-3 py-2 rounded w-full">Update Profile</button>
        </form>
      ) : (
        <div className="bg-white rounded shadow p-4">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Location:</b> {user.location || "-"}</p>
          <p><b>Phone:</b> {user.phone || "-"}</p>
          <button className="mt-3 bg-gray-200 px-3 py-1 rounded" onClick={() => setEdit(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

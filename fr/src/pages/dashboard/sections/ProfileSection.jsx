import React, { useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProfileSection({ user, onUserUpdate }) {
  const { t } = useI18n();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: user.name || "",
    location: user.location || "",
    phone: user.phone || "",
    age: user.age || "",
    skills: (user.skills || []).join(", "),
    experience: user.experience || "",
    wageMin: user.wageMin || "",
    wageMax: user.wageMax || "",
    availability: (user.availability || []).join(", "),
    description: user.description || ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const token = localStorage.getItem("token");
      const patch = {
        ...form,
        skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
        availability: form.availability.split(",").map(s => s.trim()).filter(Boolean),
        age: form.age ? Number(form.age) : undefined,
        experience: form.experience ? Number(form.experience) : undefined,
        wageMin: form.wageMin ? Number(form.wageMin) : undefined,
        wageMax: form.wageMax ? Number(form.wageMax) : undefined
      };
      const { data } = await axios.patch(`${API}/api/auth/me`, patch, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUserUpdate(data.user);
      setMsg(t("common.success"));
      setEdit(false);
    } catch (err) {
      setMsg(err?.response?.data?.message || t("common.error"));
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t("sections.profile")}</h2>
      {!edit ? (
        <div className="space-y-2">
          <p><b>{t("profile.name")}:</b> {user.name}</p>
          <p><b>{t("profile.email")}:</b> {user.email}</p>
          <p><b>{t("profile.role")}:</b> {user.role}</p>
          <p><b>{t("profile.age")}:</b> {user.age || "-"}</p>
          <p><b>{t("profile.location")}:</b> {user.location || "-"}</p>
          <p><b>{t("profile.phone")}:</b> {user.phone || "-"}</p>
          {user.role === "worker" && (
            <>
              <p><b>{t("profile.skills")}:</b> {(user.skills || []).join(", ")}</p>
              <p><b>{t("profile.experience")}:</b> {user.experience ? `${user.experience} ${t("common.years")}` : "-"}</p>
              <p><b>{t("profile.wageRange")}:</b> {user.wageMin && user.wageMax ? `${user.wageMin} - ${user.wageMax}` : "-"}</p>
              <p><b>{t("profile.availability")}:</b> {(user.availability || []).join(", ")}</p>
              <p><b>{t("profile.description")}:</b> {user.description || "-"}</p>
            </>
          )}
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => setEdit(true)}
          >
            {t("profile.edit")}
          </button>
          {msg && <div className="mt-2 text-green-600">{msg}</div>}
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">{t("profile.name")}</label>
            <input className="input" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block font-medium">{t("profile.location")}</label>
            <input className="input" name="location" value={form.location} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium">{t("profile.phone")}</label>
            <input className="input" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium">{t("profile.age")}</label>
            <input className="input" name="age" type="number" min="16" max="100" value={form.age} onChange={handleChange} />
          </div>
          {user.role === "worker" && (
            <>
              <div>
                <label className="block font-medium">
                  {t("profile.skills")} <span className="text-xs text-gray-400">({t("common.comma_separated") || "comma separated"})</span>
                </label>
                <input className="input" name="skills" value={form.skills} onChange={handleChange} />
              </div>
              <div>
                <label className="block font-medium">{t("profile.experience")}</label>
                <input className="input" name="experience" type="number" min="0" max="80" value={form.experience} onChange={handleChange} />
              </div>
              <div>
                <label className="block font-medium">{t("profile.wageMin")}</label>
                <input className="input" name="wageMin" type="number" min="0" value={form.wageMin} onChange={handleChange} />
              </div>
              <div>
                <label className="block font-medium">{t("profile.wageMax")}</label>
                <input className="input" name="wageMax" type="number" min="0" value={form.wageMax} onChange={handleChange} />
              </div>
              <div>
                <label className="block font-medium">
                  {t("profile.availability")} <span className="text-xs text-gray-400">({t("common.comma_separated") || "comma separated"})</span>
                </label>
                <input className="input" name="availability" value={form.availability} onChange={handleChange} />
              </div>
              <div>
                <label className="block font-medium">{t("profile.description")}</label>
                <textarea className="input" name="description" value={form.description} onChange={handleChange} />
              </div>
            </>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? t("common.save") : t("profile.save")}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setEdit(false)}
              disabled={loading}
            >
              {t("profile.cancel")}
            </button>
          </div>
          {msg && <div className="text-green-600">{msg}</div>}
        </form>
      )}
    </div>
  );
}
export default ProfileSection;
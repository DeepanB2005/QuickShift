import React, { useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AddPostSection() {
  const { t } = useI18n();
  const [form, setForm] = useState({
    jobName: "",
    description: "",
    location: "",
    duration: "",
    date: "",
    wageMin: "",
    wageMax: "",
    requirements: ""
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
      await axios.post(`${API}/api/jobs`, {
        ...form,
        wageMin: form.wageMin ? Number(form.wageMin) : undefined,
        wageMax: form.wageMax ? Number(form.wageMax) : undefined,
        requirements: form.requirements.split(",").map(r => r.trim()).filter(Boolean)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg(t("addPost.success") || "Job posted successfully!");
      setForm({
        jobName: "",
        description: "",
        location: "",
        duration: "",
        date: "",
        wageMin: "",
        wageMax: "",
        requirements: ""
      });
    } catch (err) {
      setMsg(err?.response?.data?.message || t("common.error"));
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">{t("addPost.title") || "Post a Job"}</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold mb-1 text-indigo-600">{t("addPost.jobName") || "Job Name"}</label>
          <input className="input bg-gray-200 rounded-2xl h-10 w-full" name="jobName" value={form.jobName} onChange={handleChange} required />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-indigo-600">{t("addPost.description") || "Description"}</label>
          <textarea className="input w-full" name="description" value={form.description} onChange={handleChange} required rows={3} />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-indigo-600">{t("addPost.location") || "Location"}</label>
          <input className="input w-full" name="location" value={form.location} onChange={handleChange} required />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-indigo-600">{t("addPost.duration") || "Duration"}</label>
            <input className="input w-full" name="duration" value={form.duration} onChange={handleChange} required placeholder="e.g. 2 days" />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-indigo-600">{t("addPost.date") || "Date"}</label>
            <input className="input w-full" name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-indigo-600">{t("addPost.wageMin") || "Wage Min"}</label>
            <input className="input w-full" name="wageMin" type="number" min="0" value={form.wageMin} onChange={handleChange} required />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-indigo-600">{t("addPost.wageMax") || "Wage Max"}</label>
            <input className="input w-full" name="wageMax" type="number" min="0" value={form.wageMax} onChange={handleChange} required />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-indigo-600">
            {t("addPost.requirements") || "Requirements"}
            <span className="text-xs text-gray-400 ml-2">({t("common.comma_separated") || "comma separated"})</span>
          </label>
          <input className="input w-full" name="requirements" value={form.requirements} onChange={handleChange} />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-bold rounded-lg shadow hover:from-indigo-600 hover:to-indigo-800 transition-all"
          disabled={loading}
        >
          {loading ? t("common.loading") : t("addPost.submit") || "Post Job"}
        </button>
        {msg && <div className="mt-4 text-green-600 text-center font-semibold">{msg}</div>}
      </form>
    </div>
  );
}
import React, { useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const JOB_OPTIONS = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "AC Mechanic",
  "House Cleaning",
  "Cook",
  "Gardener",
  "Driver",
  "Painter",
  "Other"
];

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
    requirements: "",
    latitude: "",
    longitude: ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [locating, setLocating] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }));
          setLocating(false);
        },
        () => {
          setMsg(t("addPost.locationError") || "Could not get your location.");
          setLocating(false);
        }
      );
    } else {
      setMsg(t("addPost.locationError") || "Geolocation is not supported.");
      setLocating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...form,
        wageMin: form.wageMin ? Number(form.wageMin) : undefined,
        wageMax: form.wageMax ? Number(form.wageMax) : undefined,
        requirements: form.requirements
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean),
      };
      await axios.post(`${API}/api/jobs`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg(t("addPost.success") || "✅ Job posted successfully!");
      setForm({
        jobName: "",
        description: "",
        location: "",
        duration: "",
        date: "",
        wageMin: "",
        wageMax: "",
        requirements: "",
        latitude: "",
        longitude: ""
      });
    } catch (err) {
      setMsg(err?.response?.data?.message || t("common.error"));
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto mt-">
      <h2 className="text-3xl font-extrabold mb- text-indigo-800 text-center">
        {t("addPost.title") || "🚀 Post a Job"}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Job Name */}
        <div>
          <label className="block font-semibold mb- text-indigo-700">
            {t("addPost.jobName") || "Job Name"}
          </label>
          <select
            className="w-full rounded-xl border border-gray-300 bg-white p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            name="jobName"
            value={form.jobName}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Job --</option>
            {JOB_OPTIONS.map((job, idx) => (
              <option key={idx} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb- text-indigo-700">
            {t("addPost.description") || "Description"}
          </label>
          <textarea
            className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write job details here..."
            required
            rows={3}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb- text-indigo-700">
            {t("addPost.location") || "Location"}
          </label>
          <input
            className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Chennai, Tamil Nadu"
            required
          />
          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleGetLocation}
              disabled={locating}
            >
              {locating
                ? t("addPost.locating") || "Getting location..."
                : t("addPost.getLocation") || "Use My Location"}
            </button>
            {(form.latitude && form.longitude) && (
              <span className="text-xs text-green-700">
                {t("addPost.coords") || "Coordinates"}: {form.latitude}, {form.longitude}
              </span>
            )}
          </div>
        </div>

        {/* Duration & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              {t("addPost.duration") || "Duration"}
            </label>
            <input
              className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g. 2 days"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              {t("addPost.date") || "Date"}
            </label>
            <input
              className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Wage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              {t("addPost.wageMin") || "Wage Min"}
            </label>
            <input
              className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              name="wageMin"
              type="number"
              min="0"
              value={form.wageMin}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              {t("addPost.wageMax") || "Wage Max"}
            </label>
            <input
              className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              name="wageMax"
              type="number"
              min="0"
              value={form.wageMax}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block font-semibold mb-2 text-indigo-700">
            {t("addPost.requirements") || "Requirements"}
            <span className="text-xs text-gray-400 ml-2">
              ({t("common.comma_separated") || "comma separated"})
            </span>
          </label>
          <input
            className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            placeholder="e.g. Tools, Experience, License"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all"
          disabled={loading}
        >
          {loading ? t("common.loading") || "Posting..." : t("addPost.submit") || "Post Job"}
        </button>

        {/* Message */}
        {msg && (
          <div className="mt-4 text-green-600 text-center font-semibold animate-bounce">
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";
import LanguageSwitcher from "../components/LanguageSwitcher.jsx";
import { motion } from "framer-motion";
import { User, Lock, Mail, Phone, MapPin, Briefcase } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const SKILL_OPTIONS = [
  "Cleaning", "Painting", "Plumbing", "Electrician", "Gardening", "Carpentry", "Cooking", "Other"
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Auth() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
    location: "", role: "user", phone: "",
    age: "", skills: [], customSkill: "", experience: "", wageMin: "", wageMax: "",
    availability: [], description: ""
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRole = (role) => setForm(f => ({ ...f, role }));

  const handleMultiSelect = (e, field) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setForm(f => ({ ...f, [field]: selected }));
  };

  // Google login setup
  useEffect(() => {
    /* global google */
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!window.google) return;
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (resp) => {
          try {
            const { data } = await axios.post(`${API}/api/auth/google`, { credential: resp.credential });
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } catch {
            alert(t("login.oauth_failed"));
          }
        }
      });
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", width: 320 }
      );
    };
    document.body.appendChild(script);
  }, [navigate, t]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "register") {
        if (form.password !== form.confirm) return alert(t("register.errors.passwords_dont_match"));

        let skills = form.skills;
        if (skills.includes("Other") && form.customSkill) {
          skills = skills.filter(s => s !== "Other").concat(form.customSkill);
        }

        const payload = {
          name: form.name, email: form.email, password: form.password,
          location: form.location, role: form.role, phone: form.phone,
          age: form.age,
          skills: form.role === "worker" ? skills : [],
          experience: form.role === "worker" ? form.experience : undefined,
          wageMin: form.role === "worker" ? form.wageMin : undefined,
          wageMax: form.role === "worker" ? form.wageMax : undefined,
          availability: form.role === "worker" ? form.availability : [],
          description: form.role === "worker" ? form.description : ""
        };
        const { data } = await axios.post(`${API}/api/auth/register`, payload);
        localStorage.setItem("token", data.token);
      } else {
        const { data } = await axios.post(`${API}/api/auth/login`, {
          email: form.email, password: form.password
        });
        localStorage.setItem("token", data.token);
      }
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || t("login.error"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/30 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-20">
        <Link to="/" className="font-bold text-2xl text-white drop-shadow">
          QuickShift
        </Link>
        <div className="flex gap-3 items-center">
          <LanguageSwitcher />
          <button
            className="text-sm px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 font-medium transition"
            onClick={() => navigate("/")}
          >
            {t("auth.homeBtn") || "Home"}
          </button>
        </div>
      </nav>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-28 flex justify-center items-center px-4"
      >
        <div className="w-full max-w-lg bg-gradient-to-r from-red-200 to-violet-200 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-indigo-600">
            {mode === "login" ? t("login.title") : t("register.title")}
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {mode === "login" ? t("login.subtitle") : t("register.subtitle")}
          </p>

          {/* Google Sign-in */}
          <div id="googleSignInDiv" className="mb-4 flex justify-center"></div>
          <div className="text-center text-gray-500 mb-4">{t("login.or_continue_with_email")}</div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <>
                <div className="flex gap-2">
                  <div className="relative w-1/2">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input name="name" value={form.name} onChange={onChange}
                      placeholder="Full Name"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400  " required />
                  </div>
                  <div className="relative w-1/2">
                    <input type="number" name="age" value={form.age} min="16" max="100"
                      onChange={onChange} placeholder="Age"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400" required />
                  </div>
                </div>

                {/* Role */}
                <div className="flex gap-3">
                  <button type="button"
                    className={`flex-1 px-3 py-2 rounded-lg border transition ${form.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
                    onClick={() => handleRole("user")}>
                    Customer
                  </button>
                  <button type="button"
                    className={`flex-1 px-3 py-2 rounded-lg border transition ${form.role === "worker" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
                    onClick={() => handleRole("worker")}>
                    Worker
                  </button>
                </div>

                <div className="flex gap-2">
                  <div className="relative w-1/2">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input name="location" value={form.location} onChange={onChange}
                      placeholder="City / Location"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400" />
                  </div>
                  <div className="relative w-1/2">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input name="phone" value={form.phone} onChange={onChange}
                      placeholder="Phone Number"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400" />
                  </div>
                </div>

                {/* Worker-specific fields */}
                {form.role === "worker" && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg border">
                    <label className="block font-medium">Skills</label>
                    <select multiple name="skills" value={form.skills}
                      onChange={(e) => handleMultiSelect(e, "skills")}
                      className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-indigo-400">
                      {SKILL_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {form.skills.includes("Other") && (
                      <input name="customSkill" value={form.customSkill} onChange={onChange}
                        placeholder="Enter custom skill"
                        className="w-full border rounded-lg px-3 py-2 mt-2" />
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" name="experience" value={form.experience}
                        onChange={onChange} placeholder="Experience (years)"
                        className="border rounded-lg px-3 py-2" />
                      <div className="flex gap-2">
                        <input type="number" name="wageMin" value={form.wageMin}
                          onChange={onChange} placeholder="Wage From"
                          className="border rounded-lg px-3 py-2 w-1/2" />
                        <input type="number" name="wageMax" value={form.wageMax}
                          onChange={onChange} placeholder="To"
                          className="border rounded-lg px-3 py-2 w-1/2" />
                      </div>
                    </div>

                    <label className="block font-medium">Availability</label>
                    <select multiple name="availability" value={form.availability}
                      onChange={(e) => handleMultiSelect(e, "availability")}
                      className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-indigo-400">
                      {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
                    </select>

                    <textarea name="description" value={form.description} onChange={onChange}
                      placeholder="Describe your work experience..."
                      className="w-full border rounded-lg px-3 py-2 mt-2" rows={3} />
                  </div>
                )}
              </>
            )}

            {/* Email & Password */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="email" name="email" value={form.email} onChange={onChange}
                placeholder="Email"
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="password" name="password" value={form.password} onChange={onChange}
                placeholder="Password"
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400" required />
            </div>
            {mode === "register" && (
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input type="password" name="confirm" value={form.confirm} onChange={onChange}
                  placeholder="Confirm Password"
                  className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400" required />
              </div>
            )}

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 py-2 transition shadow-md font-semibold"
            >
              {mode === "login" ? t("login.sign_in_button") : t("register.create_account_button")}
            </motion.button>
          </form>

          {/* Switch mode */}
          <div className="text-center mt-4">
            {mode === "login" ? (
              <button className="text-indigo-700 font-medium hover:underline"
                onClick={() => setMode("register")}>
                {t("auth.switchToRegister") || "Don't have an account? Register"}
              </button>
            ) : (
              <button className="text-indigo-700 font-medium hover:underline"
                onClick={() => setMode("login")}>
                {t("auth.switchToLogin") || "Already have an account? Login"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

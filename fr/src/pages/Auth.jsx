import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";
import LanguageSwitcher from "../components/LanguageSwitcher.jsx";
import { motion } from "framer-motion";
import { User, Lock, Mail, Phone, MapPin, Briefcase, Eye, EyeOff } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const SKILL_OPTIONS = [
  "Cleaning",
  "Painting",
  "Plumbing",
  "Electrician",
  "Gardening",
  "Carpentry",
  "Cooking",
  "Other",
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Auth() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    location: "",
    role: "user",
    phone: "",
    age: "",
    skills: [],
    customSkill: "",
    experience: "",
    wageMin: "",
    wageMax: "",
    availability: [],
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // load google button if needed (kept minimal and safe)
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      try {
        /* global google */
        if (!window.google) return;
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: async (resp) => {
            try {
              const { data } = await axios.post(`${API}/api/auth/google`, { credential: resp.credential });
              localStorage.setItem("token", data.token);
              navigate("/dashboard");
            } catch (e) {
              alert(t("login.oauth_failed"));
            }
          },
        });
        google.accounts.id.renderButton(document.getElementById("googleSignInDiv"), {
          theme: "outline",
          size: "large",
          width: 320,
        });
      } catch (e) {
        // ignore
      }
    };
    document.body.appendChild(script);
  }, [navigate, t]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "role") {
      setForm((f) => ({ ...f, role: value }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleRole = (role) => setForm((f) => ({ ...f, role }));

  const handleMultiSelect = (e, field) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm((f) => ({ ...f, [field]: selected }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = t("errors.email_required") || "Email is required";
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email)) errs.email = t("errors.email_invalid") || "Enter a valid email";

    if (mode === "register") {
      if (!form.name) errs.name = t("errors.name_required") || "Full name is required";
      if (!form.password || form.password.length < 6) errs.password = t("errors.password_min") || "Password must be at least 6 characters";
      if (form.password !== form.confirm) errs.confirm = t("errors.password_mismatch") || "Passwords do not match";
      if (form.role === "worker") {
        if (!form.skills.length) errs.skills = "Please select at least one skill";
        if (form.age && (Number(form.age) < 16 || Number(form.age) > 100)) errs.age = "Enter a valid age";
      }
    } else {
      if (!form.password) errs.password = t("errors.password_required") || "Password is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      if (mode === "register") {
        let skills = form.skills;
        if (skills.includes("Other") && form.customSkill) {
          skills = skills.filter((s) => s !== "Other").concat(form.customSkill);
        }

        const payload = {
          name: form.name,
          email: form.email,
          password: form.password,
          location: form.location,
          role: form.role,
          phone: form.phone,
          age: form.age,
          skills: form.role === "worker" ? skills : [],
          experience: form.role === "worker" ? form.experience : undefined,
          wageMin: form.role === "worker" ? form.wageMin : undefined,
          wageMax: form.role === "worker" ? form.wageMax : undefined,
          availability: form.role === "worker" ? form.availability : [],
          description: form.role === "worker" ? form.description : "",
        };
        const { data } = await axios.post(`${API}/api/auth/register`, payload);
        localStorage.setItem("token", data.token);
      } else {
        const { data } = await axios.post(`${API}/api/auth/login`, {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", data.token);
      }
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || t("login.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // small helper: render selected skills as chips for a more interactive feel
  const SkillChips = ({ skills }) => {
    if (!skills || !skills.length) return <span className="text-sm text-gray-400">No skills selected</span>;
    return (
      <div className="flex gap-2 flex-wrap">
        {skills.map((s) => (
          <span key={s} className="text-sm px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">{s}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-violet-300 to-white px-4 py-10">
      <nav className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-slate-700">QuickShift</Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            className="hidden sm:inline-block text-sm px-4 py-2 border rounded-lg bg-white shadow-sm hover:shadow-md"
            onClick={() => navigate("/")}
          >
            {t("auth.homeBtn") || "Home"}
          </button>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        {/* Left: hero / marketing */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="hidden md:flex flex-col justify-center px-8"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-10 text-white">
            <h1 className="text-3xl font-bold mb-3">Hire trusted local workers — fast</h1>
            <p className="mb-6 text-slate-100/90">Find reliable temporary blue-collar workers nearby. Post jobs, chat, and get the right person for the task.</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-white/80 mt-3" />
                <div>
                  <strong>Verified workers</strong>
                  <div className="text-sm text-white/90">Phone-verified, rated by customers</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-white/80 mt-3" />
                <div>
                  <strong>Smart matching</strong>
                  <div className="text-sm text-white/90">See nearby workers and route-ready details</div>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right: Auth Card */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-purple-100 shadow-lg rounded-2xl p-6 md:p-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">{mode === "login" ? t("login.title") : t("register.title")}</h2>
              <p className="text-sm text-slate-500">{mode === "login" ? t("login.subtitle") : t("register.subtitle")}</p>
            </div>
            <div className="text-right text-sm">
              <span className="text-slate-400">{mode === "login" ? "New here?" : "Already have an account?"}</span>
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="ml-2 text-indigo-600 font-medium"
              >
                {mode === "login" ? "Create account" : "Sign in"}
              </button>
            </div>
          </div>

          {/* Google Sign-in */}
          <div id="googleSignInDiv" className="mb-4 flex justify-center"></div>
          <div className="text-center text-gray-400 mb-4">{t("login.or_continue_with_email")}</div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <label className={`absolute left-3 top-2 text-xs transition-all ${form.name ? "text-indigo-600 -translate-y-1 scale-95" : "text-gray-400"}`}>Full name</label>
                    <div className="mt-4 relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder=""
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none ${errors.name ? 'border-red-400' : ''}`}
                      />
                      {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
                    </div>
                  </div>

                  <div className="relative">
                    <label className={`absolute left-3 top-2 text-xs transition-all ${form.age ? "text-indigo-600 -translate-y-1 scale-95" : "text-gray-400"}`}>Age</label>
                    <div className="mt-4 relative">
                      <input
                        type="number"
                        name="age"
                        value={form.age}
                        min="16"
                        max="100"
                        onChange={onChange}
                        placeholder=""
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none ${errors.age ? 'border-red-400' : ''}`}
                      />
                      {errors.age && <div className="text-xs text-red-500 mt-1">{errors.age}</div>}
                    </div>
                  </div>
                </div>

                {/* Role chooser */}
                <div className="flex gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => handleRole("user")}
                    className={`flex-1 px-4 py-2 rounded-lg border ${form.role === "user" ? "bg-indigo-600 text-white" : "bg-white"}`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRole("worker")}
                    className={`flex-1 px-4 py-2 rounded-lg border ${form.role === "worker" ? "bg-indigo-600 text-white" : "bg-white"}`}
                  >
                    Worker
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      name="location"
                      value={form.location}
                      onChange={onChange}
                      placeholder="City / Location"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="Phone Number"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>

                {form.role === "worker" && (
                  <div className="mt-3 p-4 rounded-lg border bg-slate-50">
                    <label className="block font-medium mb-2">Skills</label>
                    <div className="mb-2">
                      <select
                        multiple
                        name="skills"
                        value={form.skills}
                        onChange={(e) => handleMultiSelect(e, "skills")}
                        className="w-full border rounded-lg px-3 py-2 h-28 focus:ring-2 focus:ring-indigo-400"
                      >
                        {SKILL_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.skills && <div className="text-xs text-red-500 mt-1">{errors.skills}</div>}
                    </div>

                    {form.skills.includes("Other") && (
                      <input
                        name="customSkill"
                        value={form.customSkill}
                        onChange={onChange}
                        placeholder="Enter custom skill"
                        className="w-full border rounded-lg px-3 py-2 mt-2"
                      />
                    )}

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="number"
                        name="experience"
                        value={form.experience}
                        onChange={onChange}
                        placeholder="Experience (years)"
                        className="border rounded-lg px-3 py-2"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          name="wageMin"
                          value={form.wageMin}
                          onChange={onChange}
                          placeholder="Wage From"
                          className="border rounded-lg px-3 py-2 w-1/2"
                        />
                        <input
                          type="number"
                          name="wageMax"
                          value={form.wageMax}
                          onChange={onChange}
                          placeholder="To"
                          className="border rounded-lg px-3 py-2 w-1/2"
                        />
                      </div>
                    </div>

                    <label className="block font-medium mt-3">Availability</label>
                    <select
                      multiple
                      name="availability"
                      value={form.availability}
                      onChange={(e) => handleMultiSelect(e, "availability")}
                      className="w-full border rounded-lg px-3 py-2 h-24 mt-2 focus:ring-2 focus:ring-indigo-400"
                    >
                      {DAYS.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={onChange}
                      placeholder="Describe your work experience..."
                      className="w-full border rounded-lg px-3 py-2 mt-3"
                      rows={3}
                    />
                  </div>
                )}
              </>
            )}

            {/* Common fields */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Email"
                className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 ${errors.email ? 'border-red-400' : ''}`}
                required
              />
              {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Password"
                className={`w-full border rounded-lg pl-10 pr-10 py-2 focus:ring-2 focus:ring-indigo-400 ${errors.password ? 'border-red-400' : ''}`}
                required
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-3">
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </button>
              {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
            </div>

            {mode === "register" && (
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={onChange}
                  placeholder="Confirm Password"
                  className={`w-full border rounded-lg pl-10 pr-10 py-2 focus:ring-2 focus:ring-indigo-400 ${errors.confirm ? 'border-red-400' : ''}`}
                  required
                />
                <button type="button" onClick={() => setShowConfirm((s) => !s)} className="absolute right-3 top-3">
                  {showConfirm ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
                {errors.confirm && <div className="text-xs text-red-500 mt-1">{errors.confirm}</div>}
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 disabled:opacity-60 text-white rounded-lg px-4 py-2 transition shadow-md font-semibold"
            >
              {isSubmitting ? (mode === "login" ? "Signing in..." : "Creating account...") : (mode === "login" ? t("login.sign_in_button") : t("register.create_account_button"))}
            </motion.button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-500">
            By continuing, you agree to our <Link to="/terms" className="text-indigo-600">Terms</Link> and <Link to="/privacy" className="text-indigo-600">Privacy Policy</Link>.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

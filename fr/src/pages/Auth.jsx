import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const SKILL_OPTIONS = [
  "Cleaning", "Painting", "Plumbing", "Electrician", "Gardening", "Carpentry", "Cooking", "Other"
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Auth() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
    location: "", role: "user", phone: "",
    age: "", skills: [], customSkill: "", experience: "", wageMin: "", wageMax: "",
    availability: [], description: ""
  });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRole = (role) => setForm(f => ({ ...f, role }));

  const handleSkillChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setForm(f => ({ ...f, skills: selected }));
  };

  const handleAvailabilityChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setForm(f => ({ ...f, availability: selected }));
  };

  // Google Identity Services
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
          } catch (e) {
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
      if (err.response?.status === 401) {
        alert("This account was registered with Google. Please use Google login.");
      } else if (err.response?.status === 409) {
        alert(t("register.errors.email_exists") || "Email already registered");
      } else {
        alert(t("login.error"));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-1">{mode === "login" ? t("login.title") : t("register.title")}</h2>
      <p className="text-gray-600 mb-4">{mode === "login" ? t("login.subtitle") : t("register.subtitle")}</p>

      <div id="googleSignInDiv" className="mb-4 flex justify-center"></div>

      <div className="text-center text-gray-500 mb-2">{t("login.or_continue_with_email")}</div>

      <form onSubmit={submit} className="space-y-3">
        {mode === "register" && (
          <>
            <input name="name" value={form.name} onChange={onChange} placeholder={t("register.name_placeholder")}
              className="w-full border rounded px-3 py-2" required />
            <input name="age" type="number" min="16" max="100" value={form.age} onChange={onChange} placeholder="Age"
              className="w-full border rounded px-3 py-2" required />

            <div className="flex gap-2 mb-2">
              <button type="button"
                className={`flex-1 px-3 py-2 rounded border ${form.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
                onClick={() => handleRole("user")}>
                Customer
              </button>
              <button type="button"
                className={`flex-1 px-3 py-2 rounded border ${form.role === "worker" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
                onClick={() => handleRole("worker")}>
                Worker
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input name="location" value={form.location} onChange={onChange} placeholder={t("register.city_placeholder")}
                className="border rounded px-3 py-2" />
              <input name="phone" value={form.phone} onChange={onChange} placeholder={t("register.phone_placeholder")}
                className="border rounded px-3 py-2" />
            </div>

            {form.role === "worker" && (
              <div className="space-y-2 bg-gray-50 p-3 rounded border">
                <label className="block font-medium mb-1">Skills</label>
                <select multiple name="skills" value={form.skills} onChange={handleSkillChange}
                  className="w-full border rounded px-3 py-2 h-24">
                  {SKILL_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {form.skills.includes("Other") && (
                  <input name="customSkill" value={form.customSkill} onChange={onChange}
                    placeholder="Enter custom skill" className="w-full border rounded px-3 py-2 mt-1" />
                )}

                <div className="grid grid-cols-2 gap-2">
                  <input name="experience" type="number" min="0" max="80" value={form.experience}
                    onChange={onChange} placeholder="Experience (years)" className="border rounded px-3 py-2" />
                  <div className="flex gap-1">
                    <input name="wageMin" type="number" min="0" value={form.wageMin}
                      onChange={onChange} placeholder="Wage from" className="border rounded px-3 py-2 w-1/2" />
                    <input name="wageMax" type="number" min="0" value={form.wageMax}
                      onChange={onChange} placeholder="to" className="border rounded px-3 py-2 w-1/2" />
                  </div>
                </div>

                <label className="block font-medium mt-2 mb-1">Availability</label>
                <select multiple name="availability" value={form.availability} onChange={handleAvailabilityChange}
                  className="w-full border rounded px-3 py-2 h-24">
                  {DAYS.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>

                <textarea name="description" value={form.description} onChange={onChange}
                  placeholder="Describe your experience, specialties, etc."
                  className="w-full border rounded px-3 py-2 mt-2" rows={3} />
              </div>
            )}
          </>
        )}
        <input type="email" name="email" value={form.email} onChange={onChange} placeholder={t("login.email_placeholder")}
          className="w-full border rounded px-3 py-2" required />
        <input type="password" name="password" value={form.password} onChange={onChange} placeholder={t("login.password_placeholder")}
          className="w-full border rounded px-3 py-2" required />
        {mode === "register" && (
          <input type="password" name="confirm" value={form.confirm} onChange={onChange} placeholder={t("register.confirm_password_placeholder")}
            className="w-full border rounded px-3 py-2" required />
        )}
        <button className="w-full bg-indigo-600 text-white rounded px-3 py-2">
          {mode === "login" ? t("login.sign_in_button") : t("register.create_account_button")}
        </button>
      </form>

      <div className="text-center mt-3">
        {mode === "login" ? (
          <button className="text-indigo-600" onClick={() => setMode("register")}>{t("login.dont_have_account")} {t("register.sign_in_link").replace("साइन", "Sign")}</button>
        ) : (
          <button className="text-indigo-600" onClick={() => setMode("login")}>{t("register.sign_in_link")}</button>
        )}
      </div>
    </div>
  );
}

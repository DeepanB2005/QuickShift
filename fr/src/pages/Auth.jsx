import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Auth() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
    location: "", role: "user", phone: ""
  });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
        const payload = {
          name: form.name, email: form.email, password: form.password,
          location: form.location, role: form.role, phone: form.phone
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
      alert(t("login.error"));
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
            <div className="grid grid-cols-2 gap-2">
              <select name="role" value={form.role} onChange={onChange} className="border rounded px-3 py-2">
                <option value="user">{t("common.customer")}</option>
                <option value="worker">{t("common.worker")}</option>
              </select>
              <input name="location" value={form.location} onChange={onChange} placeholder={t("register.city_placeholder")}
                className="border rounded px-3 py-2" />
            </div>
            <input name="phone" value={form.phone} onChange={onChange} placeholder={t("register.phone_placeholder")}
              className="w-full border rounded px-3 py-2" />
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

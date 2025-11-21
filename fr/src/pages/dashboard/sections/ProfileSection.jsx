import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, CheckCircle, X, Loader2, Trash2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Small helper components used inside the file so this stays single-file and previewable
function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">{children}</span>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-sm">
      <span>{label}</span>
      {onRemove && (
        <button onClick={onRemove} aria-label={`remove ${label}`} className="p-1 rounded hover:bg-gray-200">
          <X size={12} />
        </button>
      )}
    </span>
  );
}

export default function ProfileSection({ user, onUserUpdate }) {
  const { t } = useI18n();
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");

  // form state is normalized to make interactive UI easier
  const [form, setForm] = useState({
    name: user.name || "",
    location: user.location || "",
    phone: user.phone || "",
    age: user.age || "",
    skills: user.skills ? [...user.skills] : [],
    newSkill: "",
    experience: user.experience || "",
    wageMin: user.wageMin || "",
    wageMax: user.wageMax || "",
    availability: user.availability ? [...user.availability] : [],
    newAvailability: "",
    description: user.description || "",
    email: user.email || "",
  });

  useEffect(() => {
    // sync when user changes externally
    setForm(prev => ({
      ...prev,
      name: user.name || "",
      location: user.location || "",
      phone: user.phone || "",
      age: user.age || "",
      skills: user.skills ? [...user.skills] : [],
      experience: user.experience || "",
      wageMin: user.wageMin || "",
      wageMax: user.wageMax || "",
      availability: user.availability ? [...user.availability] : [],
      description: user.description || "",
      email: user.email || "",
    }));
    setAvatarPreview(user.avatar || "");
  }, [user]);

  const fileRef = useRef(null);

  // --- interactive helpers ---
  const addSkill = (skill) => {
    const s = (skill || form.newSkill || "").trim();
    if (!s) return;
    if (form.skills.includes(s)) {
      setMsg({ type: "warn", text: `${s} already added` });
      return;
    }
    setForm(prev => ({ ...prev, skills: [...prev.skills, s], newSkill: "" }));
    setMsg(null);
  };

  const removeSkill = (idx) => {
    setForm(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };

  const addAvailability = (val) => {
    const s = (val || form.newAvailability || "").trim();
    if (!s) return;
    if (form.availability.includes(s)) return;
    setForm(prev => ({ ...prev, availability: [...prev.availability, s], newAvailability: "" }));
  };

  const removeAvailability = (idx) => {
    setForm(prev => ({ ...prev, availability: prev.availability.filter((_, i) => i !== idx) }));
  };

  const handleImage = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    // NOTE: user can implement actual upload; we'll keep the preview client-side
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleKeyDownSkill = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleKeyDownAvail = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addAvailability();
    }
  };

  // --- submit ---
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(t("common.no_token") || "Not authenticated");

      // Validate wage range
      if (form.wageMin && form.wageMax && Number(form.wageMin) > Number(form.wageMax)) {
        setMsg({ type: "error", text: t("profile.wage_invalid") || "Minimum wage should not exceed maximum" });
        setLoading(false);
        return;
      }

      const payload = {
        name: form.name,
        location: form.location,
        phone: form.phone,
        age: form.age ? Number(form.age) : undefined,
        skills: form.skills,
        experience: form.experience ? Number(form.experience) : undefined,
        wageMin: form.wageMin ? Number(form.wageMin) : undefined,
        wageMax: form.wageMax ? Number(form.wageMax) : undefined,
        availability: form.availability,
        description: form.description,
        // avatar: avatarPreview // implement if you have an upload endpoint
      };

      const { data } = await axios.patch(`${API}/api/auth/me`, payload, { headers: { Authorization: `Bearer ${token}` } });
      onUserUpdate && onUserUpdate(data.user);
      setMsg({ type: "success", text: t("common.success") || "Saved" });
      setEditOpen(false);
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err?.response?.data?.message || t("common.error") || "Failed" });
    } finally {
      setLoading(false);
    }
  };

  // small animated counters to show profile stats
  const statVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl  mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-bl from-red-200 via-indigo-200 to-red-200 p-6 rounded-2xl shadow-xl border border-indigo-100">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-violet-400 shadow-md bg-gray-100">
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">{(user.name || "?").slice(0,1).toUpperCase()}</div>
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 bg-red-300 p-1 rounded-full shadow border hover:scale-105 transition-transform"
              aria-label="Upload avatar"
            >
              <Edit2 size={16} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e.target.files?.[0])} />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">{user.name || t("profile.no_name")}</h2>
                <p className="text-sm text-gray-700">{user.role ? user.role.toUpperCase() : "USER"} • {form.location || t("profile.no_location")}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge>{user.email}</Badge>
                  {user.phone && <Badge>{user.phone}</Badge>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setEditOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                  <Edit2 size={14} /> {t("profile.edit")}
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <motion.div variants={statVariants} initial="hidden" animate="visible" className="p-3 rounded-lg bg-violet-200 border shadow-sm">
                <div className="text-xs text-gray-700">{t("profile.age")}</div>
                <div className="text-lg font-medium">{user.age || "-"}</div>
              </motion.div>

              <motion.div variants={statVariants} initial="hidden" animate="visible" className="p-3 rounded-lg bg-violet-200 border shadow-sm">
                <div className="text-xs text-gray-700">{t("profile.experience")}</div>
                <div className="text-lg font-medium">{user.experience ? `${user.experience} ${t("common.years")}` : "-"}</div>
              </motion.div>

              <motion.div variants={statVariants} initial="hidden" animate="visible" className="p-3 rounded-lg bg-violet-200 border shadow-sm">
                <div className="text-xs text-gray-700">{t("profile.wageRange")}</div>
                <div className="text-lg font-medium">{user.wageMin && user.wageMax ? `${user.wageMin} - ${user.wageMax}` : "-"}</div>
              </motion.div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700">{t("profile.skills")}</h3>
              <div className="mt-2 flex gap-2 flex-wrap">
                {(user.skills || []).length ? (user.skills || []).map((s, i) => <Chip key={i} label={s} />) : <span className="text-sm text-gray-400">-</span>}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">{t("profile.availability")}</h3>
              <div className="mt-2 flex gap-2 flex-wrap">
                {(user.availability || []).length ? (user.availability || []).map((a, i) => <Chip key={i} label={a} />) : <span className="text-sm text-gray-400">-</span>}
              </div>
            </div>

            {user.description && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">{t("profile.description")}</h3>
                <p className="mt-2 text-sm text-gray-600">{user.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigator.clipboard?.writeText(user.email || "")} className="px-3 py-2 rounded bg-gray-50 border hover:bg-gray-100">Copy Email</button>
            <button onClick={() => { setMsg({ type: 'info', text: t('profile.profile_shared') || 'Profile link copied' }); navigator.clipboard?.writeText(window.location.href); }} className="px-3 py-2 rounded bg-gray-50 border hover:bg-gray-100">Share</button>
          </div>

          <div className="text-sm text-gray-500">{msg && (
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded ${msg.type === 'success' ? 'bg-green-50 text-green-700' : msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-indigo-50 text-indigo-700'}`}>
              {msg.type === 'success' && <CheckCircle size={14} />}
              {msg.text}
            </span>
          )}
          </div>
        </div>
      </motion.div>

      {/* Edit slide-over/modal */}
      <AnimatePresence>
        {editOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => !loading && setEditOpen(false)} />
            <motion.form initial={{ x: '30%' }} animate={{ x: 0 }} exit={{ x: '30%' }} transition={{ type: 'spring' }} onSubmit={handleSubmit} className="relative ml-auto w-full max-w-xl bg-white p-6 overflow-auto shadow-2xl h-full">

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
                    {avatarPreview ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl text-gray-400">{(user.name||'?').slice(0,1).toUpperCase()}</div>}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{t("profile.edit_profile")}</h3>
                    <p className="text-sm text-gray-500">{t("profile.edit_help") || "Update your public profile"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setEditOpen(false)} disabled={loading} className="p-2 rounded hover:bg-gray-100">
                    <X />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">{t("profile.name")}</label>
                  <input name="name" value={form.name} onChange={handleInput} className="input w-full mt-1" required />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.email")}</label>
                  <input name="email" value={form.email} onChange={handleInput} className="input w-full mt-1 bg-gray-50" disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.location")}</label>
                  <input name="location" value={form.location} onChange={handleInput} className="input w-full mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.phone")}</label>
                  <input name="phone" value={form.phone} onChange={handleInput} className="input w-full mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.age")}</label>
                  <input name="age" type="number" min="16" max="100" value={form.age} onChange={handleInput} className="input w-full mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.experience")}</label>
                  <input name="experience" type="number" min="0" max="80" value={form.experience} onChange={handleInput} className="input w-full mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.wageMin")}</label>
                  <input name="wageMin" type="number" min="0" value={form.wageMin} onChange={handleInput} className="input w-full mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.wageMax")}</label>
                  <input name="wageMax" type="number" min="0" value={form.wageMax} onChange={handleInput} className="input w-full mt-1" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium">{t("profile.skills")} <span className="text-xs text-gray-400">({t("common.comma_separated")})</span></label>
                  <div className="mt-2 flex gap-2 items-center flex-wrap">
                    {form.skills.map((s, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Chip label={s} onRemove={() => removeSkill(i)} />
                      </div>
                    ))}
                    <input name="newSkill" value={form.newSkill} onChange={handleInput} onKeyDown={handleKeyDownSkill} placeholder={t("profile.add_skill") || "Add skill + Enter"} className="input min-w-[160px]" />
                    <button type="button" onClick={() => addSkill()} className="px-3 py-1 rounded bg-indigo-600 text-white">Add</button>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium">{t("profile.availability")} <span className="text-xs text-gray-400">({t("common.comma_separated")})</span></label>
                  <div className="mt-2 flex gap-2 items-center flex-wrap">
                    {form.availability.map((a, i) => <Chip key={i} label={a} onRemove={() => removeAvailability(i)} />)}
                    <input name="newAvailability" value={form.newAvailability} onChange={handleInput} onKeyDown={handleKeyDownAvail} placeholder={t("profile.add_availability") || "e.g. Mon-Fri"} className="input min-w-[160px]" />
                    <button type="button" onClick={() => addAvailability()} className="px-3 py-1 rounded bg-indigo-600 text-white">Add</button>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium">{t("profile.description")}</label>
                  <textarea name="description" value={form.description} onChange={handleInput} className="input w-full mt-1 h-28" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Avatar</label>
                  <div className="mt-2 flex items-center gap-3">
                    <button type="button" onClick={() => fileRef.current?.click()} className="px-3 py-2 rounded bg-gray-50 border">Upload</button>
                    <button type="button" onClick={() => { setAvatarPreview(""); fileRef.current && (fileRef.current.value = null); }} className="px-3 py-2 rounded bg-red-50 border text-red-600">Remove</button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e.target.files?.[0])} />
                  </div>
                </div>

              </div>

              <div className="mt-6 flex items-center gap-3 justify-end">
                <button type="button" onClick={() => setEditOpen(false)} disabled={loading} className="px-4 py-2 rounded border">{t("profile.cancel")}</button>
                <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-indigo-600 text-white flex items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={14} />}
                  {t("profile.save")}
                </button>
              </div>

              {msg && (
                <div className={`mt-4 p-3 rounded ${msg.type === 'success' ? 'bg-green-50 text-green-700' : msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-indigo-50 text-indigo-700'}`}>{msg.text}</div>
              )}
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

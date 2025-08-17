import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SKILL_OPTIONS = [
  "Cleaning", "Painting", "Plumbing", "Electrician", "Gardening", "Carpentry", "Cooking", "Other"
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Dashboard() {
  const { t } = useI18n();
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "", location: "", phone: "", role: "user", age: "",
    skills: [], customSkill: "", experience: "", wageMin: "", wageMax: "",
    availability: [], description: ""
  });

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
        role: data.user.role || "user",
        age: data.user.age || "",
        skills: data.user.skills || [],
        customSkill: "",
        experience: data.user.experience || "",
        wageMin: data.user.wageMin || "",
        wageMax: data.user.wageMax || "",
        availability: data.user.availability || [],
        description: data.user.description || ""
      });
      if (!data.user.name || !data.user.phone || !data.user.location) setEdit(true);
    }).catch(() => setUser(null));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

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

  const handleUpdate = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let skills = form.skills;
    if (skills.includes("Other") && form.customSkill) {
      skills = skills.filter(s => s !== "Other").concat(form.customSkill);
    }
    const payload = {
      name: form.name,
      location: form.location,
      phone: form.phone,
      role: form.role,
      age: form.age,
      skills: form.role === "worker" ? skills : [],
      experience: form.role === "worker" ? form.experience : undefined,
      wageMin: form.role === "worker" ? form.wageMin : undefined,
      wageMax: form.role === "worker" ? form.wageMax : undefined,
      availability: form.role === "worker" ? form.availability : [],
      description: form.role === "worker" ? form.description : ""
    };
    const { data } = await axios.patch(`${API}/api/auth/me`, payload, {
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
          <input name="age" type="number" min="16" max="100" value={form.age} onChange={handleChange} placeholder="Age" className="w-full border rounded px-3 py-2" required />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border rounded px-3 py-2" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border rounded px-3 py-2" required />
          <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="user">User</option>
            <option value="worker">Worker</option>
          </select>
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
                <input name="customSkill" value={form.customSkill} onChange={handleChange}
                  placeholder="Enter custom skill" className="w-full border rounded px-3 py-2 mt-1" />
              )}

              <div className="grid grid-cols-2 gap-2">
                <input name="experience" type="number" min="0" max="80" value={form.experience}
                  onChange={handleChange} placeholder="Experience (years)" className="border rounded px-3 py-2" />
                <div className="flex gap-1">
                  <input name="wageMin" type="number" min="0" value={form.wageMin}
                    onChange={handleChange} placeholder="Wage from" className="border rounded px-3 py-2 w-1/2" />
                  <input name="wageMax" type="number" min="0" value={form.wageMax}
                    onChange={handleChange} placeholder="to" className="border rounded px-3 py-2 w-1/2" />
                </div>
              </div>

              <label className="block font-medium mt-2 mb-1">Availability</label>
              <select multiple name="availability" value={form.availability} onChange={handleAvailabilityChange}
                className="w-full border rounded px-3 py-2 h-24">
                {DAYS.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Describe your experience, specialties, etc."
                className="w-full border rounded px-3 py-2 mt-2" rows={3} />
            </div>
          )}
          <button className="bg-indigo-600 text-white px-3 py-2 rounded w-full">Update Profile</button>
        </form>
      ) : (
        <div className="bg-white rounded shadow p-4">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Age:</b> {user.age || "-"}</p>
          <p><b>Location:</b> {user.location || "-"}</p>
          <p><b>Phone:</b> {user.phone || "-"}</p>
          {user.role === "worker" && (
            <>
              <p><b>Skills:</b> {(user.skills || []).join(", ")}</p>
              <p><b>Experience:</b> {user.experience ? `${user.experience} years` : "-"}</p>
              <p><b>Wage Range:</b> {user.wageMin && user.wageMax ? `${user.wageMin} - ${user.wageMax}` : "-"}</p>
              <p><b>Availability:</b> {(user.availability || []).join(", ")}</p>
              <p><b>Description:</b> {user.description || "-"}</p>
            </>
          )}
          <button className="mt-3 bg-gray-200 px-3 py-1 rounded" onClick={() => setEdit(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
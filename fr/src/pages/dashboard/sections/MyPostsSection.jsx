import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyPostsSection() {
  const { t } = useI18n();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API}/api/jobs/my`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setJobs(data.jobs);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(t("myPosts.confirmDelete") || "Delete this job?")) return;
    const token = localStorage.getItem("token");
    await axios.delete(`${API}/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setJobs(jobs.filter(j => j._id !== id));
    setMsg(t("myPosts.deleted") || "Job deleted.");
  };

  const handleEdit = (job) => {
    setEditId(job._id);
    setEditForm({
      jobName: job.jobName,
      description: job.description,
      location: job.location,
      duration: job.duration,
      date: job.date ? job.date.slice(0, 10) : "",
      wageMin: job.wageMin,
      wageMax: job.wageMax,
      requirements: (job.requirements || []).join(", ")
    });
    setMsg("");
  };

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.patch(`${API}/api/jobs/${editId}`, {
      ...editForm,
      wageMin: editForm.wageMin ? Number(editForm.wageMin) : undefined,
      wageMax: editForm.wageMax ? Number(editForm.wageMax) : undefined,
      requirements: editForm.requirements.split(",").map(r => r.trim()).filter(Boolean)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setJobs(jobs.map(j => j._id === editId ? { ...j, ...editForm, requirements: editForm.requirements.split(",").map(r => r.trim()).filter(Boolean) } : j));
    setEditId(null);
    setMsg(t("myPosts.updated") || "Job updated.");
  };

  if (loading) return <div className="text-center mt-10">{t("common.loading")}</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t("myPosts.title") || "My Posts"}</h2>
      {msg && <div className="mb-4 text-green-600 text-center">{msg}</div>}
      {jobs.length === 0 ? (
        <div className="text-gray-500">{t("myPosts.noPosts") || "No jobs posted yet."}</div>
      ) : (
        <div className="space-y-6">
          {jobs.map(job => (
            <div key={job._id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
              {editId === job._id ? (
                <form className="space-y-2" onSubmit={handleEditSubmit}>
                  <input className="input w-full" name="jobName" value={editForm.jobName} onChange={handleEditChange} required />
                  <textarea className="input w-full" name="description" value={editForm.description} onChange={handleEditChange} required rows={2} />
                  <input className="input w-full" name="location" value={editForm.location} onChange={handleEditChange} required />
                  <input className="input w-full" name="duration" value={editForm.duration} onChange={handleEditChange} required />
                  <input className="input w-full" name="date" type="date" value={editForm.date} onChange={handleEditChange} required />
                  <div className="flex gap-2">
                    <input className="input flex-1" name="wageMin" type="number" min="0" value={editForm.wageMin} onChange={handleEditChange} required />
                    <input className="input flex-1" name="wageMax" type="number" min="0" value={editForm.wageMax} onChange={handleEditChange} required />
                  </div>
                  <input className="input w-full" name="requirements" value={editForm.requirements} onChange={handleEditChange} />
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">{t("myPosts.save") || "Save"}</button>
                    <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setEditId(null)}>{t("myPosts.cancel") || "Cancel"}</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="font-bold text-lg text-indigo-700">{job.jobName}</div>
                  <div className="text-gray-700">{job.description}</div>
                  <div className="text-sm text-gray-500">{job.location} | {job.duration} | {job.date ? job.date.slice(0, 10) : ""}</div>
                  <div className="text-sm text-gray-500">{t("addPost.wageMin") || "Wage Min"}: {job.wageMin} | {t("addPost.wageMax") || "Wage Max"}: {job.wageMax}</div>
                  <div className="text-sm text-gray-500">{t("addPost.requirements") || "Requirements"}: {(job.requirements || []).join(", ")}</div>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => handleEdit(job)}>{t("myPosts.edit") || "Edit"}</button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(job._id)}>{t("myPosts.delete") || "Delete"}</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
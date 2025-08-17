import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function JobPostsSection() {
  const { t } = useI18n();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/jobs/all`)
      .then(({ data }) => {
        setJobs(data.jobs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter(job => {
    const jobNameMatch = job.jobName.toLowerCase().includes(search.toLowerCase());
    const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
    return jobNameMatch && locationMatch;
  });

  if (loading) return <div className="text-center mt-10">{t("common.loading")}</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t("jobPosts.title") || "Job Posts"}</h2>
      <div className="flex gap-4 mb-6">
        <input
          className="input flex-1"
          type="text"
          placeholder={t("addPost.jobName") || "Search by job name"}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input
          className="input flex-1"
          type="text"
          placeholder={t("addPost.location") || "Search by location"}
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      {filteredJobs.length === 0 ? (
        <div className="text-gray-500">{t("jobPosts.noPosts") || "No job posts available."}</div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map(job => (
            <div key={job._id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
              <div className="font-bold text-lg text-indigo-700">{job.jobName}</div>
              <div className="text-gray-700">{job.description}</div>
              <div className="text-sm text-gray-500">{job.location} | {job.duration} | {job.date ? job.date.slice(0, 10) : ""}</div>
              <div className="text-sm text-gray-500">{t("addPost.wageMin") || "Wage Min"}: {job.wageMin} | {t("addPost.wageMax") || "Wage Max"}: {job.wageMax}</div>
              <div className="text-sm text-gray-500">{t("addPost.requirements") || "Requirements"}: {(job.requirements || []).join(", ")}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
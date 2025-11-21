import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";
import ApplyRequestButton from "../../../components/ApplyRequestButton"; // Adjust the import path as necessary
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, DollarSign, Clock, Briefcase } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function JobPostsSection({ initialRole = "worker" }) {
  const { t } = useI18n();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState(initialRole);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API}/api/jobs/all`)
      .then(({ data }) => {
        if (!mounted) return;
        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      })
      .catch(() => setJobs([]))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const jobNameMatch = job.jobName?.toLowerCase().includes(search.toLowerCase());
    const locationMatch = job.location?.toLowerCase().includes(location.toLowerCase());
    return jobNameMatch && locationMatch;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 mr-40">
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-purple-800">{t("jobPosts.title") || "Job Posts"}</h2>
            <p className="text-sm text-purple-600/80">{t("jobPosts.subtitle") || "Browse latest temporary jobs near you"}</p>
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2 bg-white border border-purple-100 rounded-lg px-3 py-2 shadow-sm">
              <Search className="h-4 w-4 text-purple-500" />
              <input
                className="outline-none placeholder:text-purple-300 text-sm bg-transparent"
                type="text"
                placeholder={t("addPost.jobName") || "Search by job name"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 bg-white border border-purple-100 rounded-lg px-3 py-2 shadow-sm">
              <MapPin className="h-4 w-4 text-purple-500" />
              <input
                className="outline-none placeholder:text-purple-300 text-sm bg-transparent"
                type="text"
                placeholder={t("addPost.location") || "Search by location"}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-purple-600/80">Role:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-sm rounded-md border border-purple-100 bg-white px-3 py-2"
              >
                <option value="worker">Worker</option>
                <option value="user">Customer</option>
              </select>
            </div>
          </div>
        </div>

        <div className="min-h-[120px]">
          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl p-4 border border-purple-50 shadow-sm" />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-8 text-purple-600/80">
              <p className="text-lg font-medium">{t("jobPosts.noPosts") || "No job posts available."}</p>
              <p className="text-sm mt-2">{t("jobPosts.tryAdjust") || "Try adjusting your filters or check back later."}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ translateY: -4 }}
                  className="bg-violet-100 border border-purple-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                  onClick={() => setSelectedJob(job._id === selectedJob ? null : job._id)}
                >
                  <div className="flex   items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg px-3 py-2 bg-purple-100 border border-purple-100">
                          <Briefcase className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold  text-lg">{job.jobName}</div>
                          <div className="text-sm ">{job.location} • {job.duration || "—"}</div>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-gray-700 line-clamp-2">{job.description}</p>

                      <div className="mt-3 flex flex-wrap gap-2 items-center">
                        {job.requirements && job.requirements.slice(0, 4).map((r, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">{r}</span>
                        ))}

                        <div className="ml-2 text-xs text-purple-500 flex items-center gap-1">
                          <DollarSign className="h-4 w-4" /> <span>{job.wageMin} - {job.wageMax}</span>
                        </div>

                        <div className="ml-2 text-xs text-purple-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> <span>{job.date ? job.date.slice(0, 10) : "—"}</span>
                        </div>

                        <div className="ml-auto text-xs text-purple-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" /> <span>{job.postedAgo || "Just now"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-sm text-purple-600">{t("addPost.wageMin") || "Wage"}</div>
                        <div className="font-semibold text-purple-800">{job.wageMin}</div>
                      </div>

                      {role === "worker" && (
                        <ApplyRequestButton jobId={job._id} />
                      )}
                    </div>
                  </div>

                  {selectedJob === job._id && (
                    <div className="mt-3 pt-3 border-t border-purple-50 text-sm text-gray-700">
                      <div className="mb-2"><strong>Full details:</strong></div>
                      <div className="whitespace-pre-wrap">{job.fullDescription || job.description}</div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

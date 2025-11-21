import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getMockUserRating(userId) {
  // Generate a consistent random rating between 7 and 10 for each user
  let hash = 0;
  for (let i = 0; i < (userId || "").length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rating = 7 + (Math.abs(hash) % 40) / 10; // 7.0 to 10.0
  return rating.toFixed(1);
}

export default function JoinRequestsSection() {
  const { t } = useI18n();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingInput, setRatingInput] = useState({});
  const [submitting, setSubmitting] = useState(null);
  const [rated, setRated] = useState({}); // Track which requests have just been rated
  const [workerRatings, setWorkerRatings] = useState({}); // { workerId: avgRating }

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API}/api/join-requests/user`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setRequests(data.requests);
      setLoading(false);

      // Fetch overall ratings for all workers in the requests
      const workerIds = [...new Set(data.requests.map(r => r.worker?._id).filter(Boolean))];
      if (workerIds.length) {
        axios.post(`${API}/api/join-requests/worker-ratings`, { workerIds }, {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
          setWorkerRatings(res.data); // { workerId: avgRating }
        });
      }
    }).catch(() => setLoading(false));
  }, []);

  const handleStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.patch(`${API}/api/join-requests/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRequests(requests.map(r => r._id === id ? { ...r, status } : r));
  };

  const handleRate = async (id) => {
    if (!ratingInput[id] || ratingInput[id] < 1 || ratingInput[id] > 10) return;
    setSubmitting(id);
    const token = localStorage.getItem("token");
    await axios.patch(`${API}/api/join-requests/${id}/rate`, { rating: ratingInput[id] }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRequests(requests.map(r => r._id === id ? { ...r, rating: ratingInput[id] } : r));
    setSubmitting(null);
    setRated(prev => ({ ...prev, [id]: true }));
  };

  if (loading) return <div className="text-center mt-10">{t("common.loading")}</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t("joinRequests.title") || "Join Requests"}</h2>
      {requests.length === 0 ? (
        <div className="text-gray-500">{t("joinRequests.noRequests") || "No join requests yet."}</div>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req._id} className="border rounded-lg p-4 bg-gray-50">
              <div className="font-bold flex items-center gap-2">
                {req.worker?.name}
                {req.worker?._id && (
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    {getMockUserRating(req.worker._id)} / 10
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600">{req.worker?.email} | {req.worker?.phone}</div>
              <div className="text-sm text-indigo-700">{req.job?.jobName}</div>
              <div className="text-gray-700">{req.message}</div>
              <div className="text-sm text-gray-500">{t("joinRequests.status") || "Status"}: {t(`joinRequests.${req.status}`) || req.status}</div>
              
              {/* Show overall worker rating */}
              {req.worker?._id && typeof workerRatings[req.worker._id] === "number" && (
                <div className="mt-1 text-xs text-blue-700">
                  {t("Requests.Rating") || "Worker Overall Rating"}: <span className="font-bold">{workerRatings[req.worker._id].toFixed(1)} / 10</span>
                </div>
              )}

              {/* Show rating if exists */}
              {typeof req.rating === "number" && (
                <div className="mt-2 text-sm text-yellow-700">
                  {t("Requests.rating") || "Your Rating"}: <span className="font-bold">{req.rating} / 10</span>
                </div>
              )}

              {/* Show rating input if accepted and not yet rated */}
              {req.status === "accepted" && typeof req.rating !== "number" && (
                <div className="mt-2 flex items-center gap-2">
                  {rated[req._id] ? (
                    <span className="text-green-600 font-semibold">{t("joinRequests.thanksForRating") || "Thanks for rating!"}</span>
                  ) : (
                    <>
                      <label className="text-sm">{t("requests.rateWorker") || "Rate worker:"}</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={ratingInput[req._id] || ""}
                        onChange={e => setRatingInput({ ...ratingInput, [req._id]: e.target.value })}
                        className="w-16 px-2 py-1 border rounded"
                      />
                      {!submitting && (
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                          onClick={() => handleRate(req._id)}
                        >
                          {t("joinRequests.Rating") || "Submit"}
                        </button>
                      )}
                      {submitting === req._id && (
                        <span className="text-blue-600">{t("common.submitting") || "Submitting..."}</span>
                      )}
                    </>
                  )}
                </div>
              )}

              {req.status === "pending" && (
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => handleStatus(req._id, "accepted")}>
                    {t("joinRequests.accept") || "Accept"}
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleStatus(req._id, "rejected")}>
                    {t("joinRequests.reject") || "Reject"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function JoinRequestsSection() {
  const { t } = useI18n();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API}/api/join-requests/user`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setRequests(data.requests);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.patch(`${API}/api/join-requests/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRequests(requests.map(r => r._id === id ? { ...r, status } : r));
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
              <div className="font-bold">{req.worker?.name}</div>
              <div className="text-sm text-gray-600">{req.worker?.email} | {req.worker?.phone}</div>
              <div className="text-sm text-indigo-700">{req.job?.jobName}</div>
              <div className="text-gray-700">{req.message}</div>
              <div className="text-sm text-gray-500">{t("joinRequests.status") || "Status"}: {t(`joinRequests.${req.status}`) || req.status}</div>
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";
import { motion } from "framer-motion";
import { Clock, X, CheckCircle, AlertTriangle, Info, DollarSign } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function RequestsSection({ showActions = true }) {
  const { t } = useI18n();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token");
    axios
      .get(`${API}/api/join-requests/worker`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if (!mounted) return;
        setRequests(Array.isArray(data.requests) ? data.requests : []);
      })
      .catch(() => setRequests([]))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const withdraw = async (id) => {
    if (!confirm(t("requests.withdrawConfirm") || "Withdraw this request?")) return;
    try {
      setProcessing(id);
      const token = localStorage.getItem("token");
      await axios.post(
        `${API}/api/join-requests/withdraw/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((r) => r.filter((x) => x._id !== id));
    } catch (e) {
      alert(t("requests.withdrawFailed") || "Could not withdraw. Try again.");
    } finally {
      setProcessing(null);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3" /> {t("joinRequests.pending") || 'Pending'}</span>;
      case "accepted":
        return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-800"><CheckCircle className="h-3 w-3" /> {t("joinRequests.accepted") || 'Accepted'}</span>;
      case "rejected":
        return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3" /> {t("joinRequests.rejected") || 'Rejected'}</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800"><Info className="h-3 w-3" /> {status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mr-40">
        <div className="bg-gradient-to-r from-purple-200 to-red-400 text-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold">{t("requests.title") || 'My Requests'}</h2>
          <p className="text-purple-100/90 mt-1">{t("requests.subtitle") || 'Requests you sent to job posters'}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[0,1].map(i => <div key={i} className="animate-pulse h-28 rounded-xl bg-white/20" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mr-40">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-300 to-purple-300 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{t("requests.title") || 'My Requests'}</h2>
              <p className="text-purple-100/90 mt-1">{t("requests.subtitle") || 'Requests you sent to job posters'}</p>
            </div>
            <div className="text-sm text-white/90">{requests.length} {t("requests.count") || 'requests'}</div>
          </div>
        </div>

        <div className="p-6 bg-white">
          {requests.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg font-medium">{t("requests.noRequests") || 'No requests sent yet.'}</p>
              <p className="mt-2">{t("requests.hint") || 'Browse jobs and send requests to apply.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {requests.map(req => (
                <motion.div key={req._id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border p-4 flex items-start gap-4 bg-gray-50 hover:shadow-lg transition">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-purple-800">{req.job?.jobName || t('requests.unknownJob') || 'Job'}</div>
                        <div className="text-sm text-gray-500 mt-1">{req.job?.location || '-'}</div>
                      </div>
                      <div>{statusBadge(req.status)}</div>
                    </div>

                    <p className="text-sm text-gray-700 mt-3">{req.message || t('requests.noMessage') || 'No message'}</p>

                    <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {req.job?.date ? req.job.date.slice(0,10) : '-'}</div>
                      <div className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> {req.job?.wageMin ?? '-'} - {req.job?.wageMax ?? '-'}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {showActions && (
                      <>
                        <button onClick={() => window.location.href = `/job/${req.job?._id || ''}`} className="px-3 py-2 rounded-lg bg-white border text-purple-700 hover:bg-purple-50">View</button>
                        <button disabled={processing === req._id} onClick={() => withdraw(req._id)} className="px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-100 hover:bg-red-100">
                          {processing === req._id ? (t('requests.withdrawing') || 'Withdrawing...') : (t('requests.withdraw') || 'Withdraw')}
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

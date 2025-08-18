import React, { useState } from "react";
import axios from "axios";
import { useI18n } from "../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ApplyRequestButton({ jobId }) {
  const { t } = useI18n();
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    setMsg("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/api/join-requests`, { jobId, message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg(t("joinRequests.applied") || "Request sent!");
      setOpen(false);
    } catch (err) {
      setMsg(err?.response?.data?.message || t("common.error"));
    }
    setLoading(false);
  };

  return (
    <div className="mt-2">
      <button
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {t("joinRequests.apply") || "Apply"}
      </button>
      {open && (
        <div className="mt-2">
          <textarea
            className="input w-full"
            placeholder={t("joinRequests.message") || "Message (optional)"}
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={2}
          />
          <div className="flex gap-2 mt-2">
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleApply}
              disabled={loading}
            >
              {loading ? t("common.loading") : t("joinRequests.send") || "Send"}
            </button>
            <button
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              {t("joinRequests.cancel") || "Cancel"}
            </button>
          </div>
        </div>
      )}
      {msg && <div className="text-green-600 mt-2">{msg}</div>}
    </div>
  );
}
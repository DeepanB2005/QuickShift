import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyBookingsSection() {
  const { t } = useI18n();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API}/api/join-requests/worker`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        // Defensive: ensure requests and job data exist
        const accepted = (data.requests || []).filter(
          (r) => r.status === "accepted" && r.job
        );
        setBookings(accepted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center mt-10">{t("common.loading")}</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {t("myBookings.title") || "My Bookings"}
      </h2>
      {bookings.length === 0 ? (
        <div className="text-gray-500">
          {t("myBookings.noBookings") || "No bookings yet."}
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <div className="font-bold text-lg text-indigo-700">
                {booking.job?.jobName}
              </div>
              <div className="text-gray-700 mb-2">
                {booking.job?.description}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <b>{t("addPost.location") || "Location"}:</b>{" "}
                {booking.job?.location}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <b>{t("addPost.duration") || "Duration"}:</b>{" "}
                {booking.job?.duration || "-"}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <b>{t("addPost.date") || "Date"}:</b>{" "}
                {booking.job?.date ? booking.job.date.slice(0, 10) : "-"}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <b>{t("addPost.wageMin") || "Wage Min"}:</b>{" "}
                {booking.job?.wageMin ?? "-"} &nbsp;
                <b>{t("addPost.wageMax") || "Wage Max"}:</b>{" "}
                {booking.job?.wageMax ?? "-"}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <b>{t("addPost.requirements") || "Requirements"}:</b>{" "}
                {(booking.job?.requirements || []).join(", ") || "-"}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <b>{t("myBookings.requestMessage") || "Your Message"}:</b>{" "}
                {booking.message || "-"}
              </div>
              <div className="text-sm text-green-600 font-semibold">
                {t("myBookings.status") || "Status"}:{" "}
                {t("joinRequests.accepted") || "Accepted"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
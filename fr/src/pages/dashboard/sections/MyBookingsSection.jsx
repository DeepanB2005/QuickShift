import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "../../../i18n/I18nProvider";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, DollarSign, X, MessageSquare } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyBookingsSection({ showActions = true }) {
  const { t } = useI18n();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token");
    axios
      .get(`${API}/api/join-requests/worker`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if (!mounted) return;
        const accepted = (data.requests || []).filter((r) => r.status === "accepted" && r.job);
        setBookings(accepted);
      })
      .catch(() => setBookings([]))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const handleCancel = async (id) => {
    if (!confirm(t("myBookings.cancelConfirm") || "Are you sure you want to cancel this booking?")) return;
    try {
      setCancelling(id);
      const token = localStorage.getItem("token");
      await axios.post(
        `${API}/api/join-requests/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings((b) => b.filter((x) => x._id !== id));
    } catch (e) {
      alert(t("myBookings.cancelFailed") || "Cancel failed. Try again.");
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mr-40">
        <div className="bg-gradient-to-br from-purple-200 to-red-400 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-semibold">{t("myBookings.title") || "My Bookings"}</h2>
          <p className="text-purple-100/90 mt-1">{t("myBookings.subtitle") || "Accepted bookings will appear here."}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[0, 1].map((i) => (
              <div key={i} className="animate-pulse h-40 rounded-xl bg-white/20 p-4" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mr-20">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-purple-300 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{t("myBookings.title") || "My Bookings"}</h2>
              <p className="text-purple-100/90 mt-1">{t("myBookings.subtitle") || "Your accepted bookings and details"}</p>
            </div>
            <div className="text-sm text-white/90">{bookings.length} {t("myBookings.count") || "bookings"}</div>
          </div>
        </div>

        <div className="p-6 bg-white">
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg font-medium">{t("myBookings.noBookings") || "No bookings yet."}</p>
              <p className="mt-2">{t("myBookings.hint") || "Accept jobs from job posts to see them here."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border p-4 hover:shadow-lg transition bg-gray-50"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-semibold text-purple-800">{booking.job?.jobName}</div>
                          <div className="text-sm text-gray-500 mt-1">{booking.job?.location}</div>
                          {/* Show latitude and longitude if available */}
                          {booking.job?.latitude && booking.job?.longitude && (
                            <div className="text-xs text-blue-700 mt-1">
                              Lat: {booking.job.latitude}, Lng: {booking.job.longitude}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">{t("addPost.date") || "Date"}</div>
                          <div className="font-semibold">{booking.job?.date ? booking.job.date.slice(0,10) : '-'}</div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mt-3 line-clamp-3">{booking.job?.description}</p>

                      <div className="mt-3 flex flex-wrap gap-2 items-center">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" /> {booking.job?.location}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" /> {booking.job?.duration || '-'}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <DollarSign className="h-4 w-4" /> {booking.job?.wageMin} - {booking.job?.wageMax}
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-gray-600">
                        <div><strong>{t("myBookings.requestMessage") || 'Your Message'}:</strong> {booking.message || '-'}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 items-end">
                      <div className="text-sm text-green-600 font-semibold">{t("joinRequests.accepted") || 'Accepted'}</div>

                      {showActions && (
                        <>
                          <button
                            onClick={() => window.location.href = `/chat/${booking.requesterId || booking.user || ''}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-100 text-purple-700 bg-white hover:bg-purple-50"
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">{t("myBookings.message") || 'Message'}</span>
                          </button>

                          <button
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancelling === booking._id}
                            className="px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-100 hover:bg-red-100"
                          >
                            {cancelling === booking._id ? (t("myBookings.cancelling") || 'Cancelling...') : (t("myBookings.cancel") || 'Cancel')}
                          </button>
                        </>
                      )}
                    </div>
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

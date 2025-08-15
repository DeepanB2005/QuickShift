import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await API.get("/api/workers"); // make sure backend route matches
        setWorkers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
        setWorkers([]);
      }
    };
    fetchWorkers();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-blue-100 p-4 rounded shadow">
        <h1 className="text-2xl font-bold">{t("Welcome, Worker!")}</h1>
        <p>{t("Here you can manage jobs, view earnings, and update your profile.")}</p>
      </div>

      {/* Worker Quick Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Link to="/worker/dashboard" className="bg-white p-4 rounded shadow hover:bg-gray-50 text-center">
          {t("worker_nav.dashboard")}
        </Link>
        <Link to="/worker/available-jobs" className="bg-white p-4 rounded shadow hover:bg-gray-50 text-center">
          {t("worker_nav.available_jobs")}
        </Link>
        <Link to="/worker/my-jobs" className="bg-white p-4 rounded shadow hover:bg-gray-50 text-center">
          {t("worker_nav.my_jobs")}
        </Link>
        <Link to="/worker/payments" className="bg-white p-4 rounded shadow hover:bg-gray-50 text-center">
          {t("worker_nav.payments")}
        </Link>
        <Link to="/worker/profile" className="bg-white p-4 rounded shadow hover:bg-gray-50 text-center">
          {t("worker_nav.profile")}
        </Link>
        <Link to="/worker/support" className="bg-white p-4 rounded shadow hover:bg-gray-50 text-center">
          {t("worker_nav.support")}
        </Link>
      </div>

      {/* Featured Workers (from API or sample) */}
      <div>
        <h2 className="text-xl font-bold mb-2">{t("Featured Workers")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workers.length > 0 ? (
            workers.map((worker) => (
              <div key={worker._id} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">{worker.name}</h3>
                <p>{t("Skills")}: {(worker.skills && worker.skills.length > 0) ? worker.skills.join(", ") : t("No Skills")}</p>
                <p>{t("Rate")}: ₹{worker.hourlyRate}/hr</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">{t("No workers available at the moment.")}</p>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p className="text-lg font-bold">₹15,000</p>
          <p>{t("Total Earnings")}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p className="text-lg font-bold">24</p>
          <p>{t("Jobs Completed")}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <p className="text-lg font-bold">2</p>
          <p>{t("Pending Jobs")}</p>
        </div>
      </div>
    </div>
  );
}

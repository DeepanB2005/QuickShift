import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-2">{t("worker_nav.dashboard")}</h1>
      <p className="text-gray-600 mb-6">{t("dashboard.welcome_message")}</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-2xl font-bold">₹15,000</p>
          <p>{t("total_earnings")}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center">
          <p className="text-2xl font-bold">24</p>
          <p>{t("jobs_completed")}</p>
        </div>
        <div className="bg-red-100 p-4 rounded text-center">
          <p className="text-2xl font-bold">2</p>
          <p>{t("pending_jobs")}</p>
        </div>
      </div>
    </div>
  );
}

import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-2">{t("worker_nav.profile")}</h1>
      <p className="text-gray-600 mb-6">{t("profile.description")}</p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder={t("profile.name")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder={t("profile.skills")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder={t("profile.hourly_rate")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {t("profile.update")}
        </button>
      </form>
    </div>
  );
}

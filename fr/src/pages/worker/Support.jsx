import { useTranslation } from "react-i18next";

export default function Support() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-2">{t("worker_nav.support")}</h1>
      <p className="text-gray-600 mb-6">{t("support.contact_message")}</p>

      <input
        type="text"
        placeholder={t("support.your_name")}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
      />
      <textarea
        rows="4"
        placeholder={t("support.your_message")}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-none focus:outline-none focus:border-blue-500"
      ></textarea>
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {t("support.send_message")}
      </button>
    </div>
  );
}

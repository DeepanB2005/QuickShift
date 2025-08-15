import { useTranslation } from "react-i18next";

export default function Payments() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-2">{t("worker_nav.payments")}</h1>
      <p className="text-gray-600 mb-6">{t("payments.description")}</p>

      <div className="text-center text-gray-400">{t("payments.no_payments")}</div>
    </div>
  );
}

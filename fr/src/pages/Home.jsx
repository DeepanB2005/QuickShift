import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

export default function Home() {
  const { t } = useI18n();
  return (
    <div className="text-center mt-16">
      <h1 className="text-3xl font-bold mb-3">{t("home.hero.title")}</h1>
      <p className="text-gray-600 mb-8">{t("home.hero.subtitle")}</p>
      <Link to="/auth" className="px-4 py-2 bg-indigo-600 text-white rounded">
        {t("home.login")}
      </Link>
    </div>
  );
}

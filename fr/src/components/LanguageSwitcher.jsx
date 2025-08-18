import React from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const change = (e) => {
    setLang(e.target.value);
    localStorage.setItem("lang", e.target.value);
  };
  return (
    <select
      value={lang}
      onChange={change}
      className="shadow-gray-800 shadow-3xl px-2 py-1 bg-gradient-to-l from-green-300 to-blue-300 rounded-3xl text-gray-700"
      aria-label="Change language"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="ta">தமிழ்</option>
    </select>
  );
}

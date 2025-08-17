import React from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const change = (e) => {
    setLang(e.target.value);
    localStorage.setItem("lang", e.target.value);
  };
  return (
    <select value={lang} onChange={change} className="border rounded px-2 py-1">
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="ta">தமிழ்</option>
    </select>
  );
}

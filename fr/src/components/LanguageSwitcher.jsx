import React from "react";
import { Globe } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "fr", label: "Français" },
];

export default function LanguageSwitcher() {
  const { lang, setLang, isTranslating } = useI18n();

  return (
    <div className="flex items-center space-x-2">
      <Globe className={`w-5 h-5 text-blue-400 ${isTranslating ? 'animate-spin' : ''}`} />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        disabled={isTranslating}
        className="bg-slate-900 text-gray-100 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        aria-label="Select language"
      >
        {LANGUAGES.map(language => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
      {isTranslating && (
        <span className="text-xs text-blue-400 animate-pulse">
          Translating...
        </span>
      )}
    </div>
  );
}     
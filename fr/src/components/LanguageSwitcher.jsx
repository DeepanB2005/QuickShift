import React from "react";
import { Globe, Loader2 } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function LanguageSwitcher() {
  const { lang, setLang, isTranslating } = useI18n();

  const currentLanguage = LANGUAGES.find(l => l.code === lang);

  return (
    <div className="flex items-center space-x-2">
      {isTranslating ? (
        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
      ) : (
        <Globe className="w-5 h-5 text-blue-400" />
      )}
      
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        disabled={isTranslating}
        className="bg-slate-900 text-gray-100 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Select language"
      >
        {LANGUAGES.map(language => (
          <option key={language.code} value={language.code}>
            {language.flag} {language.label}
          </option>
        ))}
      </select>
      
      {isTranslating && (
        <span className="text-xs text-blue-400 animate-pulse hidden sm:inline">
          Translating...
        </span>
      )}
    </div>
  );
}
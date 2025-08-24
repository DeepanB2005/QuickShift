import React, { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "./Translator";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "fr", label: "Français" },
];

export default function HomePage() {
  const { language, setLanguage, translateTexts } = useTranslation();
  const [translated, setTranslated] = useState([]);

  const originalTexts = [
    "Welcome to My Website",
    "This is a demo of multilingual support.",
    "Contact Us"
  ];

  useEffect(() => {
    (async () => {
      const result = await translateTexts(originalTexts);
      setTranslated(result);
    })();
  }, [language]);

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex items-center space-x-2">
        <Globe className="w-5 h-5 text-blue-400" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-900 text-gray-100 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select language"
        >
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <h1>{translated[0] || originalTexts[0]}</h1>
      <p>{translated[1] || originalTexts[1]}</p>
      <button>{translated[2] || originalTexts[2]}</button>
    </div>
  );
}

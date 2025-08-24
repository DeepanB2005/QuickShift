import React, { createContext, useContext, useState } from "react";
const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Async translation function
  async function translateText(text, fallback = "") {
    if (!text) return fallback;
    if (lang === "en") return text;
    try {
      const res = await fetch("http://localhost:3000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: [text], targetLanguage: lang }),
      });
      const data = await res.json();
      return data.translations?.[0] ?? fallback ?? text;
    } catch {
      return fallback ?? text;
    }
  }

  // Synchronous t for JSX (returns original text immediately)
  function t(text, fallback = "") {
    return text ?? fallback;
  }

  return (
    <I18nContext.Provider value={{ t, lang, setLang, translateText }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

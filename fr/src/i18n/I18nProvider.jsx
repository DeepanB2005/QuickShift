import React, { createContext, useContext, useMemo, useState } from "react";
import { translations } from "./translations";

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const t = useMemo(() => {
    const dict = translations[lang] || translations.en;
    return (path, vars={}) => {
      const parts = path.split(".");
      let cur = dict;
      for (const p of parts) cur = cur?.[p];
      if (typeof cur === "string") {
        return cur.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
      }
      return path;
    };
  }, [lang]);

  const value = useMemo(() => ({
    lang, setLang, t
  }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);

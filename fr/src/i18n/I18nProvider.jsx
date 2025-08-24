import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";
import { flattenTranslations } from "./flattenTranslations";

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [translatedMap, setTranslatedMap] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Async translation function for individual texts
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

  // Batch translation function
  async function translateTexts(texts) {
    if (lang === "en") return texts;
    if (!texts || !Array.isArray(texts)) return [];
    
    try {
      const response = await fetch("http://localhost:3000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texts,
          targetLanguage: lang,
        }),
      });
      const data = await response.json();
      return data.translations || texts;
    } catch (err) {
      console.error("Translation error:", err);
      return texts;
    }
  }

  // Function to get translated text by key
  function t(key, fallback = "") {
    if (!key) return fallback;
    
    // Handle nested keys like "home.hero.title"
    const keys = key.split('.');
    let value = translations.en;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = key; // Return the key itself if not found
        break;
      }
    }
    
    const originalText = typeof value === 'string' ? value : key;
    
    // If we have a translation in our map, use it
    if (translatedMap[key]) {
      return translatedMap[key];
    }
    
    // Otherwise return the original text or fallback
    return originalText || fallback;
  }

  // Effect to translate all texts when language changes
  useEffect(() => {
    async function fetchAllTranslations() {
      if (lang === "en") {
        // Use original English strings
        const flat = flattenTranslations(translations.en);
        const map = {};
        flat.forEach(({ key, text }) => { 
          map[key] = text; 
        });
        setTranslatedMap(map);
        setIsTranslating(false);
        return;
      }

      setIsTranslating(true);
      
      try {
        // Get all flattened translations
        const flat = flattenTranslations(translations.en);
        const texts = flat.map(({ text }) => text);
        
        // Translate all texts in batches to avoid overwhelming the API
        const batchSize = 50;
        const translatedTexts = [];
        
        for (let i = 0; i < texts.length; i += batchSize) {
          const batch = texts.slice(i, i + batchSize);
          const translatedBatch = await translateTexts(batch);
          translatedTexts.push(...translatedBatch);
        }
        
        // Create the translation map
        const map = {};
        flat.forEach(({ key }, i) => { 
          map[key] = translatedTexts[i] || texts[i]; 
        });
        
        setTranslatedMap(map);
      } catch (error) {
        console.error("Translation failed:", error);
        // Fallback to English
        const flat = flattenTranslations(translations.en);
        const map = {};
        flat.forEach(({ key, text }) => { 
          map[key] = text; 
        });
        setTranslatedMap(map);
      } finally {
        setIsTranslating(false);
      }
    }
    
    fetchAllTranslations();
  }, [lang]);

  return (
    <I18nContext.Provider value={{ 
      t, 
      lang, 
      setLang: setLang, // This will be used by LanguageSwitcher
      translateText, 
      translateTexts, 
      translatedMap,
      isTranslating 
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Hook for getting all translations (backward compatibility)
export function useAllTranslations() {
  const { translatedMap } = useI18n();
  return translatedMap;
}

// Hook for translation function (replaces the old useTranslation)
export function useTranslation() {
  const { lang, setLang, translateTexts } = useI18n();
  return { language: lang, setLanguage: setLang, translateTexts };
}
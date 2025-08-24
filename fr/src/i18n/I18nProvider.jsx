import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";
import { flattenTranslations } from "./flattenTranslations";

const I18nContext = createContext();

// Supported languages
const SUPPORTED_LANGUAGES = [
  "af","sq","am","ar","hy","az","eu","be","bn","bs","bg","ca","ceb","zh","zh-TW","co","hr","cs","da","nl","en","eo","et","fi","fr","fy","gl","ka","de","el","gu","ht","ha","haw","he","hi","hmn","hu","is","ig","id","ga","it","ja","jw","kn","kk","km","rw","ko","ku","ky","lo","la","lv","lt","lb","mk","mg","ms","ml","mt","mi","mr","mn","my","ne","no","ny","or","ps","fa","pl","pt","pa","ro","ru","sm","gd","sr","st","sn","sd","si","sk","sl","so","es","su","sw","sv","tl","tg","ta","tt","te","th","tr","tk","uk","ur","ug","uz","vi","cy","xh","yi","yo","zu"
];

export function I18nProvider({ children }) {
  // Initialize language from localStorage or default to "en"
  const [lang, setLang] = useState(() => {
    try {
      const savedLang = localStorage.getItem("selectedLanguage");
      // Validate that the saved language is supported
      if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        return savedLang;
      }
      return "en";
    } catch (error) {
      console.warn("Could not access localStorage:", error);
      return "en";
    }
  });
  
  const [translatedMap, setTranslatedMap] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Custom setLang function that persists to localStorage
  const setLanguage = (newLang) => {
    // Validate the language
    if (!SUPPORTED_LANGUAGES.includes(newLang)) {
      console.warn(`Unsupported language: ${newLang}`);
      return;
    }
    
    try {
      localStorage.setItem("selectedLanguage", newLang);
    } catch (error) {
      console.warn("Could not save language to localStorage:", error);
    }
    setLang(newLang);
  };

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
      
      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }
      
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

  // Effect to initialize English translations immediately
  useEffect(() => {
    // Always load English translations first for immediate display
    const flat = flattenTranslations(translations.en);
    const englishMap = {};
    flat.forEach(({ key, text }) => { 
      englishMap[key] = text; 
    });
    setTranslatedMap(englishMap);
  }, []); // Run only once on mount

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
        const batchSize = 30; // Reduced batch size for better reliability
        const translatedTexts = [];
        
        for (let i = 0; i < texts.length; i += batchSize) {
          const batch = texts.slice(i, i + batchSize);
          try {
            const translatedBatch = await translateTexts(batch);
            translatedTexts.push(...translatedBatch);
          } catch (batchError) {
            console.warn(`Batch translation failed for batch ${i / batchSize + 1}:`, batchError);
            // Use original texts as fallback for this batch
            translatedTexts.push(...batch);
          }
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
      setLang: setLanguage, // Use the custom function that persists to localStorage
      translateText, 
      translateTexts, 
      translatedMap,
      isTranslating,
      supportedLanguages: SUPPORTED_LANGUAGES
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
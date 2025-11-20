import { useState } from "react";
import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "https://quickshift-11fb.onrender.com") + "/translate";

export function useTranslation() {
  const [language, setLanguage] = useState("en");

  async function translateTexts(texts) {
    if (language === "en") return texts; 

    console.log("Translating to", language, "via", API_URL);
    try {
      const response = await axios.post(API_URL, { texts, targetLanguage: language }, { timeout: 15000 });
      return response.data.translations;
    } catch (err) {
      console.error("Translation error (network/response):", err?.message || err);
      // if network offline, provide original texts fallback
      return texts;
    }
  }

  return { language, setLanguage, translateTexts };
}

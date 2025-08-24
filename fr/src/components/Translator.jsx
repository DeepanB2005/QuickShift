import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/translate";

export function useTranslation() {
  const [language, setLanguage] = useState("en");

  async function translateTexts(texts) {
    if (language === "en") return texts; // No translation needed for English

    try {
      const response = await axios.post(API_URL, {
        texts,
        targetLanguage: language,
      });
      return response.data.translations;
    } catch (err) {
      console.error("Translation error:", err);
      return texts;
    }
  }

  return { language, setLanguage, translateTexts };
}

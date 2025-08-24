import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { translations } from "./translations";
import { flattenTranslations } from "./flattenTranslations";

export function useAllTranslations() {
  const { lang, translateText } = useI18n();
  const [translatedMap, setTranslatedMap] = useState({});

  useEffect(() => {
    async function fetchAllTranslations() {
      const flat = flattenTranslations(translations.en);
      if (lang === "en") {
        // Use original English strings
        const map = {};
        flat.forEach(({ key, text }) => { map[key] = text; });
        setTranslatedMap(map);
      } else {
        // Translate all strings
        const texts = flat.map(({ text }) => text);
        const translated = await Promise.all(texts.map(t => translateText(t)));
        const map = {};
        flat.forEach(({ key }, i) => { map[key] = translated[i]; });
        setTranslatedMap(map);
      }
    }
    fetchAllTranslations();
    // eslint-disable-next-line
  }, [lang]);

  return translatedMap;
}
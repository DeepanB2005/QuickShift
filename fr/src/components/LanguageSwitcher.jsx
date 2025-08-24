import React from "react";
import { Globe, Loader2 } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

const LANGUAGES = [
  { code: "af", label: "Afrikaans", flag: "🇿🇦" },           // Afrikaans is "Afrikaans"
  { code: "sq", label: "Shqip", flag: "🇦🇱" },                // Albanian — Shqip
  { code: "am", label: "አማርኛ", flag: "🇪🇹" },                 // Amharic — አማርኛ
  { code: "ar", label: "العربية", flag: "🇸🇦" },                // Arabic — العربية
  { code: "hy", label: "Հայերեն", flag: "🇦🇲" },               // Armenian — Հայերեն
  { code: "az", label: "Azərbaycan dili", flag: "🇦🇿" },       // Azerbaijani — Azərbaycan dili
  { code: "eu", label: "Euskara", flag: "🇪🇸" },                // Basque — Euskara
  { code: "be", label: "Беларуская", flag: "🇧🇾" },            // Belarusian — Беларуская
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },                  // Bengali — বাংলা
  { code: "bs", label: "Bosanski", flag: "🇧🇦" },              // Bosnian — Bosanski
  { code: "bg", label: "Български", flag: "🇧🇬" },             // Bulgarian — Български
  { code: "ca", label: "Català", flag: "🇪🇸" },                // Catalan — Català
  { code: "ceb", label: "Cebuano", flag: "🇵🇭" },              // Cebuano — Cebuano (same)
  { code: "zh", label: "中文 (简体)", flag: "🇨🇳" },             // Chinese (Simplified) — 中文 (简体)
  { code: "zh-TW", label: "中文 (繁體)", flag: "🇹🇼" },         // Chinese (Traditional) — 中文 (繁體)
  { code: "co", label: "Corsu", flag: "🇫🇷" },                 // Corsican — Corsu
  { code: "hr", label: "Hrvatski", flag: "🇭🇷" },              // Croatian — Hrvatski
  { code: "cs", label: "Česky", flag: "🇨🇿" },                 // Czech — Česky
  { code: "da", label: "Dansk", flag: "🇩🇰" },                 // Danish — Dansk
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },            // Dutch — Nederlands
  { code: "en", label: "English", flag: "🇺🇸" },               // English — English
  { code: "eo", label: "Esperanto", flag: "🏳️" },             // Esperanto — Esperanto
  { code: "et", label: "Eesti", flag: "🇪🇪" },                 // Estonian — Eesti
  { code: "fi", label: "Suomi", flag: "🇫🇮" },                 // Finnish — Suomi
  { code: "fr", label: "Français", flag: "🇫🇷" },              // French — Français
  { code: "fy", label: "Frysk", flag: "🇳🇱" },                 // Frisian — Frysk
  { code: "gl", label: "Galego", flag: "🇪🇸" },                // Galician — Galego
  { code: "ka", label: "ქართული", flag: "🇬🇪" },                // Georgian — ქართული
  { code: "de", label: "Deutsch", flag: "🇩🇪" },               // German — Deutsch
  { code: "el", label: "Ελληνικά", flag: "🇬🇷" },               // Greek — Ελληνικά
  { code: "gu", label: "ગુજરાતી", flag: "🇮🇳" },                // Gujarati — ગુજરાતી
  { code: "ht", label: "Kreyòl ayisyen", flag: "🇭🇹" },        // Haitian Creole — Kreyòl ayisyen
  { code: "ha", label: "Hausa", flag: "🇳🇬" },                 // Hausa — Hausa
  { code: "haw", label: "ʻŌlelo Hawaiʻi", flag: "🇺🇸" },         // Hawaiian — ʻŌlelo Hawaiʻi
  { code: "he", label: "עברית", flag: "🇮🇱" },                  // Hebrew — עברית
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },                 // Hindi — हिन्दी
  { code: "hmn", label: "Hmoob", flag: "🇨🇳" },                 // Hmong — Hmoob
  { code: "hu", label: "Magyar", flag: "🇭🇺" },                 // Hungarian — Magyar
  { code: "is", label: "Íslenska", flag: "🇮🇸" },               // Icelandic — Íslenska
  { code: "ig", label: "Igbo", flag: "🇳🇬" },                   // Igbo — Igbo
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },       // Indonesian — Bahasa Indonesia
  { code: "ga", label: "Gaeilge", flag: "🇮🇪" },                // Irish — Gaeilge
  { code: "it", label: "Italiano", flag: "🇮🇹" },               // Italian — Italiano
  { code: "ja", label: "日本語", flag: "🇯🇵" },                  // Japanese — 日本語
  { code: "jw", label: "Basa Jawa", flag: "🇮🇩" },              // Javanese — Basa Jawa
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },                   // Kannada — ಕನ್ನಡ
  { code: "kk", label: "Қазақ тілі", flag: "🇰🇿" },             // Kazakh — Қазақ тілі
  { code: "km", label: "ខ្មែរ", flag: "🇰🇭" },                    // Khmer — ខ្មែរ
  { code: "rw", label: "Kinyarwanda", flag: "🇷🇼" },             // Kinyarwanda — Kinyarwanda (same)
  { code: "ko", label: "한국어", flag: "🇰🇷" },                  // Korean — 한국어
  { code: "ku", label: "Kurdî", flag: "🇹🇷" },                   // Kurdish — Kurdî
  { code: "ky", label: "Кыргызча", flag: "🇰🇬" },                // Kyrgyz — Кыргызча
  { code: "lo", label: "ລາວ", flag: "🇱🇦" },                      // Lao — ລາວ
  { code: "la", label: "Latina", flag: "🏳️" },                   // Latin — Latina
  { code: "lv", label: "Latviešu", flag: "🇱🇻" },                // Latvian — Latviešu
  { code: "lt", label: "Lietuvių", flag: "🇱🇹" },                // Lithuanian — Lietuvių
  { code: "lb", label: "Lëtzebuergesch", flag: "🇱🇺" },          // Luxembourgish — Lëtzebuergesch
  { code: "mk", label: "Македонски", flag: "🇲🇰" },              // Macedonian — Македонски
  { code: "mg", label: "Malagasy", flag: "🇲🇬" },               // Malagasy — Malagasy
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },           // Malay — Bahasa Melayu
  { code: "ml", label: "മലയാളം", flag: "🇮🇳" },                  // Malayalam — മലയാളം
  { code: "mt", label: "Malti", flag: "🇲🇹" },                   // Maltese — Malti
  { code: "mi", label: "Māori", flag: "🇳🇿" },                    // Maori — Māori
  { code: "mr", label: "मराठी", flag: "🇮🇳" },                   // Marathi — मराठी
  { code: "mn", label: "Монгол", flag: "🇲🇳" },                  // Mongolian — Монгол
  { code: "my", label: "မြန်မာစာ", flag: "🇲🇲" },                // Burmese — မြန်မာစာ
  { code: "ne", label: "नेपाली", flag: "🇳🇵" },                   // Nepali — नेपाली
  { code: "no", label: "Norsk", flag: "🇳🇴" },                   // Norwegian — Norsk
  { code: "ny", label: "Chi-Cheŵa", flag: "🇲🇼" },                // Nyanja (Chichewa) — Chi-Cheŵa
  { code: "or", label: "ଓଡ଼ିଆ", flag: "🇮🇳" },                   // Odia (Oriya) — ଓଡ଼ିଆ
  { code: "ps", label: "پښتو", flag: "🇦🇫" },                    // Pashto — پښتو
  { code: "fa", label: "فارسی", flag: "🇮🇷" },                    // Persian — فارسی
  { code: "pl", label: "Polski", flag: "🇵🇱" },                  // Polish — Polski
  { code: "pt", label: "Português", flag: "🇵🇹" },               // Portuguese — Português
  { code: "pa", label: "ਪੰਜਾਬੀ", flag: "🇮🇳" },                  // Punjabi — ਪੰਜਾਬੀ
  { code: "ro", label: "Română", flag: "🇷🇴" },                  // Romanian — Română
  { code: "ru", label: "Русский", flag: "🇷🇺" },                 // Russian — Русский
  { code: "sm", label: "Gagana Sāmoa", flag: "🇼🇸" },             // Samoan — Gagana Sāmoa
  { code: "gd", label: "Gàidhlig", flag: "🏴" },                   // Scots Gaelic — Gàidhlig
  { code: "sr", label: "Српски", flag: "🇷🇸" },                   // Serbian — Српски
  { code: "st", label: "Sesotho", flag: "🇱🇸" },                 // Sesotho — Sesotho (same)
  { code: "sn", label: "ChiShona", flag: "🇿🇼" },                // Shona — ChiShona
  { code: "sd", label: "سنڌي", flag: "🇵🇰" },                     // Sindhi — سنڌي
  { code: "si", label: "සිංහල", flag: "🇱🇰" },                   // Sinhala — සිංහල
  { code: "sk", label: "Slovenčina", flag: "🇸🇰" },              // Slovak — Slovenčina
  { code: "sl", label: "Slovenščina", flag: "🇸🇮" },             // Slovenian — Slovenščina
  { code: "so", label: "Soomaali", flag: "🇸🇴" },                // Somali — Soomaali (also spelled)
  { code: "es", label: "Español", flag: "🇪🇸" },                 // Spanish — Español
  { code: "su", label: "Basa Sunda", flag: "🇮🇩" },              // Sundanese — Basa Sunda
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },               // Swahili — Kiswahili
  { code: "sv", label: "Svenska", flag: "🇸🇪" },                 // Swedish — Svenska
  { code: "tl", label: "Tagalog", flag: "🇵🇭" },                 // Tagalog — Tagalog
  { code: "tg", label: "Тоҷики", flag: "🇹🇯" },                   // Tajik — Тоҷикистон (Tojikiston) or тоҷикӣ; using "Тоҷики"
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },                   // Tamil — தமிழ்
  { code: "tt", label: "Татарча", flag: "🇷🇺" },                 // Tatar — Татарча
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },                  // Telugu — తెలుగు
  { code: "th", label: "ไทย", flag: "🇹🇭" },                      // Thai — ไทย
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },                  // Turkish — Türkçe
  { code: "tk", label: "Türkmen", flag: "🇹🇲" },                // Turkmen — Türkmen
  { code: "uk", label: "Українська", flag: "🇺🇦" },             // Ukrainian — Українська
  { code: "ur", label: "اردو", flag: "🇵🇰" },                     // Urdu — اردو
  { code: "ug", label: "ئۇيغۇرچە", flag: "🇨🇳" },                 // Uyghur — ئۇيغۇرچە
  { code: "uz", label: "Oʻzbek", flag: "🇺🇿" },                   // Uzbek — Oʻzbek
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },              // Vietnamese — Tiếng Việt
  { code: "cy", label: "Cymraeg", flag: "🏴" },                   // Welsh — Cymraeg
  { code: "xh", label: "isiXhosa", flag: "🇿🇦" },                // Xhosa — isiXhosa
  { code: "yi", label: "ייִדיש", flag: "🇮🇱" },                   // Yiddish — ייִדיש
  { code: "yo", label: "Yorùbá", flag: "🇳🇬" },                  // Yoruba — Yorùbá
  { code: "zu", label: "isiZulu", flag: "🇿🇦" }                  // Zulu — isiZulu
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
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      value={i18n.language}
      className="p-1 border rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="ta">தமிழ்</option>
    </select>
  );
}

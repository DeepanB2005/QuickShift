import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">QuickShift</Link>

      <div className="flex items-center space-x-4">
        <Link to="/">{t('home')}</Link>
        <Link to="/workers">{t('workers')}</Link>
        <Link to="/bookings">{t('bookings')}</Link>
        <Link to="/login">{t('login')}</Link>
        <Link to="/register">{t('register')}</Link>

        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

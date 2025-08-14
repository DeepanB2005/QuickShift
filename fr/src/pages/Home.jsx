import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">{t('welcome')}</h1>
      <p className="mt-4 text-gray-600">{t('service')}</p>
    </div>
  );
}

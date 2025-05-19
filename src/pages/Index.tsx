
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">TempMessage</h1>
        <p className="text-xl text-gray-600">{t('messages.title')}</p>
      </div>
    </div>
  );
};

export default Index;

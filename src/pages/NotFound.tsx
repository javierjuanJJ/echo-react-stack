import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

const NotFound = () => {
    const location = useLocation();
    const {t} = useTranslation();

    useEffect(() => {
        console.error(
            t('errors.error404'),
            location.pathname
        );
    }, [location.pathname, t]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
                <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
                <p className="text-xl text-gray-600 mb-6">{t('errors.notFound')}</p>
                <p className="text-gray-500 mb-8">
                    {t('errors.notFoundDesc')}
                </p>
                <Link
                    to="/"
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                    {t('errors.goHome')}
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

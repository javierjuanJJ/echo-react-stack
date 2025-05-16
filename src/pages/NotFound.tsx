
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuario intentó acceder a una ruta que no existe:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 mb-6">¡Oops! Página no encontrada</p>
        <p className="text-gray-500 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

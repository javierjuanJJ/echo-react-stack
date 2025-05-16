
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SignIn, useAuth } from "@clerk/clerk-react";

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isLoaded && userId && mounted) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [userId, isLoaded, navigate, location.state, mounted]);
  
  if (!mounted) {
    return null;
  }
  
  if (isLoaded && userId) {
    return <div className="flex justify-center items-center h-screen">Redirigiendo...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
              Registrarse
            </Link>
          </p>
        </div>
        
        <div className="mt-8">
          <SignIn 
            path="/signin"
            routing="path"
            signUpUrl="/signup"
            redirectUrl="/"
          />
        </div>
      </div>
    </div>
  );
}

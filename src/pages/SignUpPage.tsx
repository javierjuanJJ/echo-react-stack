import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {SignUp, useAuth} from "@clerk/clerk-react";

export default function SignUpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const {userId, isLoaded} = useAuth();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect if already authenticated
    useEffect(() => {
        if (isLoaded && userId && mounted) {
            const from = location.state?.from?.pathname || "/";
            navigate(from, {replace: true});
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
                        Crear una cuenta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/signin" className="font-medium text-primary hover:text-primary/80">
                            Iniciar sesión
                        </Link>
                    </p>
                </div>

                <div className="mt-8">
                    <SignUp/>
                </div>
            </div>
        </div>
    );
}

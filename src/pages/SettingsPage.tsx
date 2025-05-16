
import { useUser } from "@clerk/clerk-react";

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ajustes</h1>
      </div>
      
      <div className="grid gap-6">
        {/* Profile settings */}
        <div className="border rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Perfil</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {user?.profileImageUrl && (
                <div className="w-24 h-24">
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover" 
                  />
                </div>
              )}
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{user?.fullName || "Usuario"}</p>
                
                <p className="text-sm text-muted-foreground mt-2">Email</p>
                <p className="font-medium">{user?.primaryEmailAddress?.emailAddress || "email@ejemplo.com"}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm">
                Actualizar perfil
              </button>
            </div>
          </div>
        </div>
        
        {/* Preferences settings */}
        <div className="border rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preferencias</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notificaciones por email</h3>
                  <p className="text-sm text-muted-foreground">Recibir notificaciones por correo electrónico</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Modo oscuro</h3>
                  <p className="text-sm text-muted-foreground">Cambiar al tema oscuro</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security settings */}
        <div className="border rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
            
            <div className="space-y-4">
              <button className="text-primary hover:underline text-sm">
                Cambiar contraseña
              </button>
              
              <button className="text-primary hover:underline text-sm block">
                Activar autenticación de dos factores (2FA)
              </button>
              
              <button className="text-destructive hover:underline text-sm block">
                Eliminar cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

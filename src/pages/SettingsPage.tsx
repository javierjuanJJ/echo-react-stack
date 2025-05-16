
import { useUser } from '@clerk/clerk-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas correctamente"
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Perfil</h3>
          <p className="text-sm text-muted-foreground">
            Administra la información de tu perfil.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="fullName">
              Nombre completo
            </label>
            <Input
              id="fullName"
              value={user?.fullName || ''}
              disabled
              readOnly
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Correo electrónico
            </label>
            <Input
              id="email"
              value={user?.primaryEmailAddress?.emailAddress || ''}
              disabled
              readOnly
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="userId">
              ID de usuario
            </label>
            <Input
              id="userId"
              value={user?.id || ''}
              disabled
              readOnly
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium">Notificaciones</h3>
          <p className="text-sm text-muted-foreground">
            Configura tus preferencias de notificaciones.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">
                Notificaciones por correo
              </label>
              <p className="text-xs text-muted-foreground">
                Recibe notificaciones por correo cuando recibas un mensaje nuevo.
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">
                Notificaciones push
              </label>
              <p className="text-xs text-muted-foreground">
                Recibe notificaciones push en tu navegador cuando recibas un mensaje nuevo.
              </p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { user } = useUser();
  const [name, setName] = useState(user?.fullName || "");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ajustes</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            {user?.imageUrl && (
              <img 
                src={user.imageUrl} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover" 
              />
            )}
            <Button variant="outline">Cambiar imagen</Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input 
                id="name"
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                value={user?.primaryEmailAddress?.emailAddress || ""} 
                disabled 
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit">Guardar cambios</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

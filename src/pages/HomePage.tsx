
import { useUser } from "@clerk/clerk-react";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido, {user?.firstName || "Usuario"}</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Stats cards */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Mensajes</h3>
          </div>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">
            +10% desde el mes pasado
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Actividades</h3>
          </div>
          <div className="text-2xl font-bold">13</div>
          <p className="text-xs text-muted-foreground">
            +5% desde el mes pasado
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Completadas</h3>
          </div>
          <div className="text-2xl font-bold">85%</div>
          <p className="text-xs text-muted-foreground">
            +2% desde el mes pasado
          </p>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium">Resumen de actividad reciente</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Vista general de tu actividad en la plataforma.
          </p>
        </div>
      </div>
    </div>
  );
}

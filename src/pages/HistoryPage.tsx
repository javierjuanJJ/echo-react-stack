
export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Historial</h1>
      </div>
      <div className="border rounded-lg shadow-sm">
        <div className="p-6">
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-secondary-foreground font-medium">{i}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium leading-none">Actividad {i}</h3>
                      <p className="text-xs text-muted-foreground">Fecha: {new Date().toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Descripción de la actividad {i} en el sistema.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

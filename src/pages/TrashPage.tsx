
export default function TrashPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Papelera</h1>
        <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors text-sm">
          Vaciar papelera
        </button>
      </div>
      
      <div className="border rounded-lg shadow-sm">
        <div className="p-6">
          <div className="divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <span className="text-destructive font-medium">{i}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium leading-none">Elemento eliminado {i}</h3>
                      <div className="flex space-x-2">
                        <button className="text-xs text-primary hover:underline">Restaurar</button>
                        <button className="text-xs text-destructive hover:underline">Eliminar</button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este elemento fue eliminado el {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state */}
          {false && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">La papelera está vacía</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

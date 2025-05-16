
export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mensajes</h1>
      </div>
      <div className="border rounded-lg shadow-sm">
        <div className="p-6">
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">U{i}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium leading-none">Usuario {i}</h3>
                      <p className="text-xs text-muted-foreground">Hace {i} horas</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este es el contenido del mensaje {i}. Aquí iría el texto del mensaje.
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

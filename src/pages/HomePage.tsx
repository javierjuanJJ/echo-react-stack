
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import MessageComposer from '@/components/MessageComposer';
import { getReceivedMessages, Message, subscribeToMessages } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    
    const fetchReceivedMessages = async () => {
      setIsLoading(true);
      try {
        const messages = await getReceivedMessages(user.id);
        setRecentMessages(messages.slice(0, 5)); // Solo mostrar los 5 más recientes
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReceivedMessages();
    
    // Configurar suscripción a nuevos mensajes
    const subscription = subscribeToMessages(user.id, (payload) => {
      const newMessage = payload.new;
      toast({
        title: "Nuevo mensaje",
        description: "Has recibido un nuevo mensaje"
      });
      // Actualizar la lista de mensajes
      fetchReceivedMessages();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id, isLoaded, toast]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inicio</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MessageComposer />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Mensajes recientes</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Cargando mensajes...</p>
            </div>
          ) : recentMessages.length > 0 ? (
            <div className="space-y-2">
              {recentMessages.map(message => (
                <div key={message.id} className="border rounded-lg p-3 shadow-sm">
                  <h3 className="font-medium">
                    De: <span className="text-primary">{message.sender_id}</span>
                    {!message.is_read && (
                      <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                        Nuevo
                      </span>
                    )}
                  </h3>
                  <p className="text-sm line-clamp-1 text-muted-foreground mt-1">
                    {message.message}
                  </p>
                </div>
              ))}
              {recentMessages.length > 0 && (
                <div className="text-center mt-4">
                  <a href="/messages" className="text-sm text-primary hover:underline">
                    Ver todos los mensajes
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">No hay mensajes recientes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

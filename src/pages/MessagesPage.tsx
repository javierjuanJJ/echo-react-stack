import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getReceivedMessages, Message, subscribeToMessages } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';
import MessageItem from '@/components/MessageItem';
import {sendPushNotification, shouldSendNotifications} from "@/utils/notificationUtils.ts";
import {t} from "i18next";

export default function MessagesPage() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar mensajes
  const loadMessages = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const receivedMessages = await getReceivedMessages(user.id);
      setMessages(receivedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    loadMessages();
    
    // Configurar suscripción a nuevos mensajes
    const subscription = subscribeToMessages(user.id, (payload) => {

      toast({
        title: t('notifications.newMessage'),
        description: t('notifications.newMessageDesc')
      });



      if (shouldSendNotifications('push')) {
        sendPushNotification({
          title: t('notifications.newMessage'),
          message: t('notifications.newMessageDesc'),
          sender: payload.new?.sender_id
        });
      }

      // Actualizar la lista de mensajes
      loadMessages();
    });
    
    // Verificar mensajes expirados cada minuto
    const expirationInterval = setInterval(() => {
      setMessages(prevMessages => 
        prevMessages.filter(msg => new Date(msg.expires_at) > new Date())
      );
    }, 60000);
    
    return () => {
      subscription.unsubscribe();
      clearInterval(expirationInterval);
    };
  }, [user?.id, isLoaded, toast]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mensajes</h1>
      </div>
      
      <div className="border rounded-lg shadow-sm">
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando mensajes...</p>
            </div>
          ) : messages.length > 0 ? (
            <div className="divide-y">
              {messages.map(message => (
                <MessageItem 
                  key={message.id} 
                  message={message} 
                  type="received" 
                  onAction={loadMessages}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay mensajes recibidos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

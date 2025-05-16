
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getDeletedMessages, Message, deleteMessagePermanently } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';
import MessageItem from '@/components/MessageItem';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TrashPage() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);

  // Función para cargar mensajes eliminados
  const loadDeletedMessages = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const deletedMessages = await getDeletedMessages(user.id);
      setMessages(deletedMessages);
    } catch (error) {
      console.error('Error fetching deleted messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    loadDeletedMessages();
  }, [user?.id, isLoaded]);

  const emptyTrash = async () => {
    if (!user?.id || messages.length === 0) return;
    
    setIsEmptyingTrash(true);
    try {
      // Eliminar todos los mensajes en la papelera
      const deletePromises = messages.map(message => 
        deleteMessagePermanently(message.id)
      );
      
      await Promise.all(deletePromises);
      
      toast({
        title: "Papelera vaciada",
        description: "Todos los mensajes han sido eliminados permanentemente"
      });
      
      setMessages([]);
    } catch (error) {
      console.error('Error emptying trash:', error);
      toast({
        title: "Error",
        description: "No se pudo vaciar la papelera",
        variant: "destructive"
      });
    } finally {
      setIsEmptyingTrash(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Papelera</h1>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive"
              disabled={isEmptyingTrash || messages.length === 0}
            >
              Vaciar papelera
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Vaciar papelera?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará permanentemente todos los mensajes de la papelera y no se podrán recuperar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={emptyTrash}>Vaciar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="border rounded-lg shadow-sm">
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando papelera...</p>
            </div>
          ) : messages.length > 0 ? (
            <div className="divide-y">
              {messages.map(message => (
                <MessageItem 
                  key={message.id} 
                  message={message} 
                  type="deleted"
                  onAction={loadDeletedMessages}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">La papelera está vacía</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

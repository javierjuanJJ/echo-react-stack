
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Message, markMessageAsRead, markMessageAsDeleted, restoreMessage, deleteMessagePermanently } from '@/lib/supabaseClient';
import { Clock, Trash2, RefreshCcw, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
  type: 'received' | 'sent' | 'deleted';
  onAction?: () => void;
}

export default function MessageItem({ message, type, onAction }: MessageItemProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const isExpired = new Date(message.expires_at) < new Date();
  
  const handleReadMessage = async () => {
    if (!isExpanded && type === 'received') {
      setIsLoading(true);
      try {
        await markMessageAsRead(message.id);
      } catch (error) {
        console.error('Error marking message as read:', error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsExpanded(!isExpanded);
  };
  
  const handleDeleteMessage = async () => {
    setIsLoading(true);
    try {
      await markMessageAsDeleted(message.id);
      toast({
        title: "Mensaje eliminado",
        description: "El mensaje se ha movido a la papelera"
      });
      if (onAction) onAction();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el mensaje",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRestoreMessage = async () => {
    setIsLoading(true);
    try {
      await restoreMessage(message.id);
      toast({
        title: "Mensaje restaurado",
        description: "El mensaje ha sido restaurado correctamente"
      });
      if (onAction) onAction();
    } catch (error) {
      console.error('Error restoring message:', error);
      toast({
        title: "Error",
        description: "No se pudo restaurar el mensaje",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePermanentDelete = async () => {
    setIsLoading(true);
    try {
      await deleteMessagePermanently(message.id);
      toast({
        title: "Mensaje eliminado",
        description: "El mensaje ha sido eliminado permanentemente"
      });
      if (onAction) onAction();
    } catch (error) {
      console.error('Error permanently deleting message:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar permanentemente el mensaje",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 mb-3 transition-all",
        isExpanded ? "shadow-md" : "shadow-sm hover:shadow-md",
        isExpired ? "opacity-70" : "",
        !message.is_read && type === 'received' ? "bg-primary/5 border-primary/20" : ""
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-base">
            {type === 'received' ? 'De: ' : type === 'sent' ? 'Para: ' : ''}
            <span className="text-primary">
              {type === 'received' ? message.sender_id : message.recipient_id}
            </span>
            {!message.is_read && type === 'received' && (
              <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                Nuevo
              </span>
            )}
            {isExpired && (
              <span className="ml-2 flex items-center text-muted-foreground text-xs">
                <Clock className="h-3 w-3 mr-1" /> Expirado
              </span>
            )}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: es })}
            {' · '}
            Expira: {formatDistanceToNow(new Date(message.expires_at), { addSuffix: true, locale: es })}
          </p>
        </div>
        
        <div className="flex space-x-1">
          {type === 'deleted' ? (
            <>
              <Button 
                size="icon" 
                variant="ghost" 
                disabled={isLoading}
                onClick={handleRestoreMessage}
                title="Restaurar mensaje"
              >
                <RefreshCcw className="h-4 w-4 text-primary" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                disabled={isLoading}
                onClick={handlePermanentDelete}
                title="Eliminar permanentemente"
              >
                <X className="h-4 w-4 text-destructive" />
              </Button>
            </>
          ) : (
            <Button 
              size="icon" 
              variant="ghost" 
              disabled={isLoading}
              onClick={handleDeleteMessage}
              title="Eliminar mensaje"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      </div>
      
      <div 
        className={cn(
          "mt-3 cursor-pointer", 
          isExpanded ? "line-clamp-none" : "line-clamp-2"
        )}
        onClick={handleReadMessage}
      >
        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
      </div>
      
      {!isExpanded && message.message.length > 100 && (
        <button 
          className="text-xs text-primary mt-1 hover:underline"
          onClick={() => setIsExpanded(true)}
        >
          Ver más
        </button>
      )}
    </div>
  );
}

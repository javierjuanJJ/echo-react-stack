import {createClient, RealtimeChannel} from '@supabase/supabase-js';

// Usamos variables de entorno para las credenciales
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Exportamos el cliente de Supabase para usarlo en toda la aplicación
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para nuestras tablas de Supabase
export type Message = {
  id: string;
  sender_id: string;
  recipient_id: string;
  message: string;
  created_at: string;
  expires_at: string;
  is_read: boolean;
  is_deleted: boolean;
};

// Función para obtener mensajes recibidos
export async function getReceivedMessages(userId: string) {
  const nowISO = new Date().toISOString();

  const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('recipient_id', userId)
      .eq('is_deleted', false)
      .or(`expires_at.gt.${nowISO},expires_at.is.null`)
      .order('created_at', { ascending: false });

  console.log('Fetching messages for user:', userId);

  if (error) {
    console.error('Error fetching received messages:', error);
    return [];
  }

  console.log('Received messages:', data);
  return data as Message[];
}

// Función para obtener historial de mensajes enviados
export async function getSentMessages(userId: string) {
  const nowISO = new Date().toISOString();
  const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('sender_id', userId)
      .eq('is_deleted', false)
      .or(`expires_at.gt.${nowISO},expires_at.is.null`)
      .order('created_at', { ascending: false });


  if (error) {
    console.error('Error fetching sent messages:', error);
    return [];
  }
  return data as Message[];
}

// Función para obtener mensajes en la papelera
export async function getDeletedMessages(userId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .eq('is_deleted', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching deleted messages:', error);
    return [];
  }
  return data as Message[];
}

// Función para enviar un mensaje
export async function sendMessage({
  sender_id,
  recipient_id,
  message,
  expiration
}: {
  sender_id: string,
  recipient_id: string,
  message: string,
  expiration: '5min' | '1hour' | '1day' | '1week'
}) {
  // Calcular fecha de expiración
  const expirationMap = {
    '5min': 5 * 60 * 1000,
    '1hour': 60 * 60 * 1000,
    '1day': 24 * 60 * 60 * 1000,
    '1week': 7 * 24 * 60 * 60 * 1000
  };

  const expiresAt = new Date(Date.now() + expirationMap[expiration]).toISOString();
  console.log( sender_id , recipient_id , message)
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        sender_id,
        recipient_id,
        message,
        expires_at: expiresAt,
      }
    ]);

  if (error) {
    console.error('Error sending message:', error);
    return null;
  }

  return data;
}

// Función para marcar un mensaje como leído
export async function markMessageAsRead(messageId: string) {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', messageId);

  if (error) {
    console.error('Error marking message as read:', error);
    return false;
  }

  return true;
}

// Función para marcar un mensaje como eliminado
export async function markMessageAsDeleted(messageId: string) {
  const { error } = await supabase
    .from('messages')
    .update({ is_deleted: true })
    .eq('id', messageId);

  if (error) {
    console.error('Error marking message as deleted:', error);
    return false;
  }

  return true;
}

// Función para restaurar un mensaje eliminado
export async function restoreMessage(messageId: string) {
  const { error } = await supabase
    .from('messages')
    .update({ is_deleted: false })
    .eq('id', messageId);

  if (error) {
    console.error('Error restoring message:', error);
    return false;
  }

  return true;
}

// Función para eliminar permanentemente un mensaje
export async function deleteMessagePermanently(messageId: string) {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', messageId);

  if (error) {
    console.error('Error deleting message permanently:', error);
    return false;
  }

  return true;
}

// Suscripción a nuevos mensajes (realtime)
/*export function subscribeToMessages(userId: string, callback: (payload: any) => void): RealtimeChannel {
  return supabase
    .channel('messages-channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `recipient_id=eq.${userId}`
      },
      callback
    )
    .subscribe();
}*/
export function subscribeToMessages(userId: string, callback: (payload: any) => void): RealtimeChannel {
  return supabase
      .channel('messages-channel')
      .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `recipient_id=eq.${userId}`
          },
          (payload) => callback(payload)
      )
      .subscribe();
}
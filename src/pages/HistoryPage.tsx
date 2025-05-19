import {useEffect, useState} from 'react';
import {useUser} from '@clerk/clerk-react';
import {getSentMessages, Message} from '@/lib/supabaseClient';
import MessageItem from '@/components/MessageItem';

export default function HistoryPage() {
    const {user, isLoaded} = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Función para cargar mensajes enviados
    const loadSentMessages = async () => {
        if (!user?.id) return;

        setIsLoading(true);
        try {
            const sentMessages = await getSentMessages(user.id);
            setMessages(sentMessages);
        } catch (error) {
            console.error('Error fetching sent messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoaded || !user?.id) return;
        loadSentMessages();
    }, [user?.id, isLoaded]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Historial</h1>
            </div>

            <div className="border rounded-lg shadow-sm">
                <div className="p-6">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Cargando historial...</p>
                        </div>
                    ) : messages.length > 0 ? (
                        <div className="divide-y">
                            {messages.map(message => (
                                <MessageItem
                                    key={message.id}
                                    message={message}
                                    type="sent"
                                    onAction={loadSentMessages}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No hay mensajes enviados</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

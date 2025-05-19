import {useState} from 'react';
import {useUser} from '@clerk/clerk-react';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {useToast} from '@/hooks/use-toast';
import {sendMessage} from '@/lib/supabaseClient';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Input} from '@/components/ui/input';

export default function MessageComposer() {
    const {user} = useUser();
    const {toast} = useToast();

    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState('');
    const [expiration, setExpiration] = useState<'5min' | '1hour' | '1day' | '1week'>('1hour');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!user?.id || !recipient || !message.trim()) {
            toast({
                title: "Error",
                description: "Todos los campos son obligatorios",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            await sendMessage({
                sender_id: user.id,
                recipient_id: recipient,
                message: message.trim(),
                expiration
            });

            toast({
                title: "Mensaje enviado",
                description: "El mensaje se ha enviado correctamente",
            });

            // Limpiar formulario
            setMessage('');
            setRecipient('');
            setExpiration('1hour');
        } catch (error) {
            console.error('Error sending message:', error);
            toast({
                title: "Error",
                description: "No se pudo enviar el mensaje",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4 p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Nuevo Mensaje</h2>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="recipient">
                    Destinatario (ID o correo)
                </label>
                <Input
                    id="recipient"
                    placeholder="Ingrese ID o correo del destinatario"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="message">
                    Mensaje
                </label>
                <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] w-full"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="expiration">
                    Duración del mensaje
                </label>
                <Select
                    value={expiration}
                    onValueChange={(value: '5min' | '1hour' | '1day' | '1week') => setExpiration(value)}
                >
                    <SelectTrigger id="expiration" className="w-full">
                        <SelectValue placeholder="Seleccionar duración"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5min">5 minutos</SelectItem>
                        <SelectItem value="1hour">1 hora</SelectItem>
                        <SelectItem value="1day">1 día</SelectItem>
                        <SelectItem value="1week">1 semana</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim() || !recipient}
                className="w-full"
            >
                {isLoading ? "Enviando..." : "Enviar mensaje"}
            </Button>
        </div>
    );
}

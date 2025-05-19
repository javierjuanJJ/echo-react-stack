// Interface for notification content
import {toast} from '@/hooks/use-toast';

import {t} from "i18next";

export interface NotificationContent {
    title: string;
    message: string;
    sender?: string;
}

// Function to check if user has enabled notifications
export const shouldSendNotifications = (type: 'email' | 'push'): boolean => {
    return localStorage.getItem(`${type}Notifications`) === 'true';
};

// Function to send push notification

export const sendPushNotification = (content: NotificationContent) => toast({
    title: `${t('notifications.newMessage')}
    ${content.sender ? `from ${content.sender}` : ''}`,
    description: `${content.message}`
});
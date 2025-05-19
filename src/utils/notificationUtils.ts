// Interface for notification content
import { ToastContainer, toast } from 'react-toastify';

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

export const sendPushNotification = (content: NotificationContent) => toast(
    `${content.sender} - ${content.title}: ${content.message}`,
);
// src/app/lib/whatsapp.ts
import { trackConversion } from './analytics';

const WHATSAPP_NUMBER = '5591999999999'; // Replace with your number (e.g., 5511999999999)
const DEFAULT_MESSAGE = 'Olá! Gostaria de solicitar um orçamento para meu evento.';

/**
 * Opens a WhatsApp chat window with a pre-filled message.
 * @param message - The message to send. Defaults to a standard greeting.
 * @param eventName - The conversion event name to track.
 */
export const openWhatsApp = (message: string = DEFAULT_MESSAGE, eventName: string = 'whatsapp_click') => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    trackConversion(eventName);
};

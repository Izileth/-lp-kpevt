// src/app/lib/email.ts
import { trackConversion } from './analytics';

const EMAIL_ADDRESS = 'kprogecoes.oficial@gmail.com';

/**
 * Opens the default email client with a pre-filled address.
 * @param email - The email address to send to.
 * @param eventName - The conversion event name to track.
 */
export const openEmailClient = (email: string = EMAIL_ADDRESS, eventName: string = 'email_click') => {
    window.location.href = `mailto:${email}`;
    trackConversion(eventName);
};

// src/app/hooks/useEmail.ts
import { openEmailClient } from '../lib/email';

export const useEmail = () => {
  const handleEmailClick = (email: string, eventName: string) => {
    openEmailClient(email, eventName);
  };

  return { handleEmailClick };
};

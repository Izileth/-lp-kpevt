// src/app/components/k-projecoes/FloatingWhatsAppButton.tsx
import React from 'react';
import { openWhatsApp } from '../../lib/whatsapp';
import { useScrollVisibility } from '../../hooks/useScrollVisibility';
import { WhatsAppIcon } from './Icons';

export const FloatingWhatsAppButton: React.FC = () => {
    const isVisible = useScrollVisibility(300); // Show after 300px of scrolling

    return (
        <button
            onClick={() => openWhatsApp(undefined, 'floating_whatsapp')}
            className={`fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
            aria-label="Contato WhatsApp"
        >
            <WhatsAppIcon />
        </button>
    );
};

// src/app/components/k-projecoes/ContactInfo.tsx
import React from 'react';
import { openWhatsApp } from '../../lib/whatsapp';
import { PhoneIcon, MailIcon, MapPinIcon, WhatsAppIcon } from './Icons';

export const ContactInfo: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <PhoneIcon />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Telefone</h3>
                        <a href="tel:+5591999999999" className="text-white/70 hover:text-white transition block">(91) 99999-9999</a>
                        <a href="tel:+5591988888888" className="text-white/70 hover:text-white transition block">(91) 98888-8888</a>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MailIcon />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">E-mail</h3>
                        <a href="mailto:contato@kprojecoes.com.br" className="text-white/70 hover:text-white transition block">contato@kprojecoes.com.br</a>
                        <a href="mailto:orcamento@kprojecoes.com.br" className="text-white/70 hover:text-white transition block">orcamento@kprojecoes.com.br</a>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPinIcon />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Localização</h3>
                        <p className="text-white/70">Ananindeua, Pará - Brasil</p>
                        <p className="text-white/70">Atendemos toda região metropolitana</p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => openWhatsApp(undefined, 'sidebar_whatsapp')}
                className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white transition rounded-lg font-semibold flex items-center justify-center gap-3"
            >
                <WhatsAppIcon />
                Fale Conosco no WhatsApp
            </button>
        </div>
    );
};

import React from 'react';
import { openWhatsApp } from '../../lib/whatsapp';
import { useEmail } from '../../hooks/useEmail';
import { PhoneIcon, MailIcon, MapPinIcon, WhatsAppIcon } from './Icons';
import { AnimatedSection } from './AnimatedSection';

export const ContactInfo: React.FC = () => {
    const { handleEmailClick } = useEmail();

    return (
        <AnimatedSection className="space-y-6">
            <div id='contato' className="bg-black border border-white/10 rounded-lg p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center ">
                        <PhoneIcon />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Telefone</h3>
                        <a href="tel:+5591981125595" className="text-white/70 hover:text-white transition block">(91) 98112-5595</a>
                        <a href="tel:+5591981158273" className="text-white/70 hover:text-white transition block">(91) 98888-8888</a>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center ">
                        <MailIcon />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">E-mail</h3>
                        <a 
                            href="mailto:kprogecoes.oficial@gmail.com" 
                            onClick={(e) => {
                                e.preventDefault();
                                handleEmailClick('kprogecoes.oficial@gmail.com', 'contact_email_click');
                            }}
                            className="text-white/70 hover:text-white transition block"
                        >
                            kprogecoes.oficial@gmail.com
                        </a>
                        <a 
                            href="mailto:kprogecoes.oficial@gmail.com" 
                            onClick={(e) => {
                                e.preventDefault();
                                handleEmailClick('kprogecoes.oficial@gmail.com', 'orcamento_email_click');
                            }}
                            className="text-white/70 hover:text-white transition block"
                        >
                            kprogecoes.oficial@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
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
        </AnimatedSection>
    );
};

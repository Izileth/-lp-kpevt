import React from 'react';
import { openWhatsApp } from '../../lib/whatsapp';
import { WhatsAppIcon } from './Icons';
import { AnimatedSection } from './AnimatedSection';

export const ContactForm: React.FC = () => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // A simple way to get form data, consider using a state-based approach for more complex forms
        const data = Object.fromEntries(formData) as { [key: string]: string };

        const message = `
*Novo Orçamento - K Projeções*

*Nome:* ${data.name}
*E-mail:* ${data.email}
*Telefone:* ${data.phone}
*Tipo de Evento:* ${data.eventType}
*Mensagem:* ${data.message}
    `.trim();

        openWhatsApp(message, 'form_submit');
    };

    return (
        <AnimatedSection className="bg-black border border-white/10 rounded-lg p-8">
            <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">Nome Completo</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition"
                        placeholder="Seu nome"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition"
                        placeholder="seu@email.com"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">Telefone</label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition"
                        placeholder="(00) 00000-0000"
                    />
                </div>
                <div>
                    <label htmlFor="eventType" className="block text-sm font-semibold mb-2">Tipo de Evento</label>
                    <select
                        id="eventType"
                        name="eventType"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition appearance-none"
                    >
                        <option value="" className="bg-black">Selecione</option>
                        <option value="Formatura" className="bg-black">Formatura</option>
                        <option value="Solenidade" className="bg-black">Solenidade</option>
                        <option value="Baile/Festa" className="bg-black">Baile/Festa</option>
                        <option value="Casamento" className="bg-black">Casamento</option>
                        <option value="Show/Evento" className="bg-black">Show/Evento</option>
                        <option value="Evento Corporativo" className="bg-black">Evento Corporativo</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">Mensagem</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition resize-none"
                        placeholder="Conte-nos mais sobre seu evento..."
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white transition rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
                >
                    <WhatsAppIcon />
                    Enviar via WhatsApp
                </button>
            </form>
        </AnimatedSection>
    );
};


// src/app/components/k-projecoes/EventTypes.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { openWhatsApp } from '../../lib/whatsapp';
import type { EventType } from '../../lib/data';

interface EventTypesProps {
    eventTypes: EventType[];
}

export const EventTypes: React.FC<EventTypesProps> = ({ eventTypes }) => {
    return (
        <section id="eventos" className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Tipos de Eventos</h2>
                <p className="text-white/70 text-lg">Atendemos todos os tipos de celebrações</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventTypes.map((event, index) => (
                    <div
                        key={index}
                        onClick={() => openWhatsApp(`Olá! Gostaria de orçamento para ${event.title}.`, `event_type_${event.title.toLowerCase().replace(/\s+/g, '_')}`)}
                        className="bg-black border border-white/10 rounded-lg p-8 hover:border-white/30 transition group cursor-pointer"
                    >
                        <div className="text-5xl mb-4">{event.image}</div>
                        <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                        <p className="text-white/70 mb-4">{event.description}</p>
                        <div className="flex items-center text-white/50 group-hover:text-white transition">
                            <span className="text-sm font-semibold">Solicitar orçamento</span>
                            <ArrowRight size={16} className="ml-2" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

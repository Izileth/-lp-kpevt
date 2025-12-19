// src/app/components/k-projecoes/Services.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { openWhatsApp } from '../../lib/whatsapp';
import type { Service } from '../../lib/data';

interface ServicesProps {
    services: Service[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
    return (
        <section id="servicos" className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossos Serviços</h2>
                <p className="text-white/70 text-lg">Soluções completas para o seu evento</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => {
                    const IconComponent = service.Icon;
                    return (
                        <div
                            key={index}
                            className="bg-black border border-white/10 rounded-lg p-8 hover:border-white/30 transition group"
                        >
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition">
                                <IconComponent />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-white/70 mb-6">{service.description}</p>
                            <button
                                onClick={() => openWhatsApp(`Olá! Gostaria de saber mais sobre o serviço de ${service.title}.`, `service_${service.title.toLowerCase()}`)}
                                className="text-white/70 hover:text-white transition font-semibold flex items-center gap-2"
                            >
                                Saiba mais <ArrowRight size={16} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

// src/app/components/k-projecoes/Hero.tsx
import React from 'react';
import { openWhatsApp } from '../../lib/whatsapp';

export const Hero: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Transformamos Eventos<br />em <span className="bg-zinc-300 from-white to-white/60 bg-clip-text text-transparent">Experiências Memoráveis</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-3xl mx-auto">
                Sonorização, iluminação e estrutura completa para formaturas, solenidades, bailes, festas e eventos de todos os tipos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => openWhatsApp(undefined, 'hero_primary_cta')}
                    className="px-8 py-4 bg-white text-black hover:bg-white/90 transition rounded-lg font-semibold text-lg"
                >
                    Solicitar Orçamento
                </button>
                <a href="#servicos">
                    <button className="px-8 py-4 border border-white hover:bg-white/10 transition rounded-lg font-semibold text-lg">
                        Conheça Nossos Serviços
                    </button>
                </a>
            </div>
        </section>
    );
};

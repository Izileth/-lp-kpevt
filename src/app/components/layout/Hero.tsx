// src/app/components/k-projecoes/Hero.tsx
import React from 'react';
import { motion, easeInOut } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { openWhatsApp } from '../../lib/whatsapp';

export const Hero: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: easeInOut, // Use the easing function here
            },
        },
    };


    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://v1.pinimg.com/videos/mc/720p/61/ce/c1/61cec129c7a4db5adbdbd0d932499826.mp4" type="video/mp4" />
                    <source src="/videos/hero-background.webm" type="video/webm" />
                    {/* Fallback para navegadores sem suporte */}
                </video>

                {/* Overlay escuro para melhorar legibilidade */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Fade Top */}
            <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />

            {/* Fade Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />

            {/* Content - Acima de tudo */}
            <motion.div
                className="relative z-20 container mx-auto px-4 py-20 md:py-32 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge/Tag opcional */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
                    variants={itemVariants}
                >
                    <span className="w-2 h-2 bg-zinc-50 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">Bem Vindo</span>
                </motion.div>

                {/* Título Principal */}
                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                    variants={itemVariants}
                >
                    Transformamos Eventos<br />
                    em <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                        Experiências Memoráveis
                    </span>
                </motion.h1>

                {/* Subtítulo */}
                <motion.p
                    className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed bg-black/20 px-6 py-4 rounded-2xl"
                    variants={itemVariants}
                >
                    Sonorização, iluminação e estrutura completa para formaturas, solenidades, bailes, festas e eventos de todos os tipos
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    variants={itemVariants}
                >
                    <button
                        onClick={() => openWhatsApp(undefined, 'hero_primary_cta')}
                        className="group px-8 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-lg font-semibold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 relative overflow-hidden"
                    >
                        <span className="relative z-10">Solicitar Orçamento</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                    <a href="#servicos">
                        <button className="px-8 py-4 border-2 border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg font-semibold text-lg backdrop-blur-sm hover:scale-105 shadow-lg">
                            Conheça Nossos Serviços
                        </button>
                    </a>
                </motion.div>

                {/* Stats/Social Proof */}
                <motion.div
                    className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12"
                    variants={itemVariants}
                >
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
                        <div className="text-white/70 text-sm">Eventos Realizados</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-1">10+</div>
                        <div className="text-white/70 text-sm">Anos de Experiência</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-1">98%</div>
                        <div className="text-white/70 text-sm">Clientes Satisfeitos</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-white/70 rounded-full animate-scroll" />
                </div>
            </div>
        </section>
    );
};
// src/app/components/k-projecoes/Testimonials.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '../../lib/data';

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Calcula quantos cards mostrar por vez baseado no tamanho da tela
    const getCardsPerView = () => {
        if (typeof window === 'undefined') return 1;
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

    // Atualiza cards por view no resize
    useEffect(() => {
        const handleResize = () => setCardsPerView(getCardsPerView());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Duplica os depoimentos para criar efeito infinito
    const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];


    // Próximo slide
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => {
            const next = prev + 1;
            // Reseta para o início quando chega no final do primeiro ciclo duplicado
            if (next >= testimonials.length * 2) {
                return testimonials.length;
            }
            return next;
        });
    }, [testimonials.length]);

    // Slide anterior
    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => {
            const next = prev - 1;
            // Se volta antes do segundo ciclo, pula para o final do segundo ciclo
            if (next < testimonials.length) {
                return testimonials.length * 2 - 1;
            }
            return next;
        });
    }, [testimonials.length]);

    // Auto-play
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    // Para auto-play quando usuário interage
    const handleUserInteraction = () => {
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000); // Retoma após 10s
    };

    const handlePrevClick = () => {
        handleUserInteraction();
        prevSlide();
    };

    const handleNextClick = () => {
        handleUserInteraction();
        nextSlide();
    };

    return (
        <section id="depoimentos" className="container w-full mx-auto px-4 py-20 overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">O que dizem nossos clientes</h2>
                <p className="text-white/70 text-lg">Experiências reais de quem confiou em nós</p>
            </div>

            <div className="relative  mx-auto">
                {/* Fade Gradient Esquerda */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none hidden md:block" />
                
                {/* Fade Gradient Direita */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none hidden md:block" />

                {/* Botão Anterior */}
                <button
                    onClick={handlePrevClick}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="Depoimento anterior"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Botão Próximo */}
                <button
                    onClick={handleNextClick}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="Próximo depoimento"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Carousel Container */}
                <div className="overflow-hidden px-4 md:px-16">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${(currentIndex * (100 / cardsPerView))}%)`
                        }}
                    >
                        {extendedTestimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 px-3"
                                style={{ width: `${100 / cardsPerView}%` }}
                            >
                                <div className="bg-black border border-white/10 rounded-lg p-8 h-full hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-white/5">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={20} 
                                                className="text-yellow-400 fill-yellow-400"
                                                strokeWidth={0} 
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <div className="relative mb-6">
                                        <svg 
                                            className="absolute -top-2 -left-2 w-8 h-8 text-white/10" 
                                            fill="currentColor" 
                                            viewBox="0 0 32 32"
                                        >
                                            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z" />
                                        </svg>
                                        <p className="text-white/90 italic text-lg leading-relaxed pl-6">
                                            {testimonial.text}
                                        </p>
                                    </div>

                                    {/* Author Info */}
                                    <div className="border-t border-white/10 pt-4 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-lg font-bold">
                                                {testimonial.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-white/50 text-sm">
                                                {testimonial.event}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicadores */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                handleUserInteraction();
                                setCurrentIndex(testimonials.length + index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                (currentIndex % testimonials.length) === index
                                    ? 'bg-white w-8'
                                    : 'bg-white/30 w-2 hover:bg-white/50'
                            }`}
                            aria-label={`Ir para depoimento ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
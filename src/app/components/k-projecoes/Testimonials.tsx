// src/app/components/k-projecoes/Testimonials.tsx
import React from 'react';
import { Star } from 'lucide-react';
import type { Testimonial } from '../../lib/data';

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
    return (
        <section id="depoimentos" className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">O que dizem nossos clientes</h2>
                <p className="text-white/70 text-lg">Experiências reais de quem confiou em nós</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-lg p-8"
                    >
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill="white" strokeWidth={0} />
                            ))}
                        </div>
                        <p className="text-white/90 mb-6 italic">"{testimonial.text}"</p>
                        <div className="border-t border-white/10 pt-4">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-white/50 text-sm">{testimonial.event}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

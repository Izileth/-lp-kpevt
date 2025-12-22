import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { DifferentialsProps } from '../../lib/data';
import { AnimatedSection } from './AnimatedSection';

export const Differentials: React.FC<DifferentialsProps> = ({ differentials }) => {
    return (
        <AnimatedSection className="container mx-auto px-4 py-20">
            {/* Diferenciais */}
            <div className="bg-black border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full" />
                
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4 text-center">Por que escolher a K Projeções?</h2>
                    <p className="text-white/70 text-center mb-12">Excelência e compromisso em cada detalhe</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {differentials.map((item, index) => (
                            <div 
                                key={index} 
                                className="flex items-start gap-3 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
                            >
                                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                                    <CheckCircle className="text-white" size={16} strokeWidth={3} />
                                </div>
                                <span className="text-lg group-hover:text-white transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};
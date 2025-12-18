// src/app/components/k-projecoes/Differentials.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface DifferentialsProps {
    differentials: string[];
}

export const Differentials: React.FC<DifferentialsProps> = ({ differentials }) => {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
                <h2 className="text-4xl font-bold mb-8 text-center">Por que escolher a K Projeções?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {differentials.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="text-white mt-1 " size={20} />
                            <span className="text-lg">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

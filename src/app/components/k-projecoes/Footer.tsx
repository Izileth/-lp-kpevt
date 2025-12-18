// src/app/components/k-projecoes/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/10 mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            K Projeções <span className="text-white/60">& Eventos</span>
                        </h3>
                        <p className="text-white/70">
                            Sonorização, iluminação e estrutura completa para o seu evento perfeito.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Serviços</h4>
                        <ul className="space-y-2 text-white/70">
                            <li><a href="#servicos" className="hover:text-white transition">Sonorização</a></li>
                            <li><a href="#servicos" className="hover:text-white transition">Iluminação</a></li>
                            <li><a href="#servicos" className="hover:text-white transition">Palco e Estrutura</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contato</h4>
                        <ul className="space-y-2 text-white/70">
                            <li>(91) 99999-9999</li>
                            <li>contato@kprojecoes.com.br</li>
                            <li>Ananindeua, PA</li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/10 text-center text-white/50">
                    <p>&copy; {new Date().getFullYear()} K Projeções e Eventos. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

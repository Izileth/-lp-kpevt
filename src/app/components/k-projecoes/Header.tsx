// src/app/components/k-projecoes/Header.tsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { openWhatsApp } from '../../lib/whatsapp';

const navLinks = [
    { href: '#servicos', label: 'Serviços' },
    { href: '#eventos', label: 'Eventos' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#contato', label: 'Contato' },
];

export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleWhatsAppClick = (eventName: string) => {
        openWhatsApp(undefined, eventName);
    };

    return (
        <header className="border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur-sm z-50">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold">
                    K Projeções <span className="text-white/60">& Eventos</span>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="hover:text-white/70 transition">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden md:block">
                    <button
                        onClick={() => handleWhatsAppClick('header_cta')}
                        className="px-6 py-2 bg-white text-black hover:bg-white/90 transition rounded font-semibold"
                    >
                        Solicitar Orçamento
                    </button>
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {menuOpen && (
                <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-4">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="block hover:text-white/70"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            handleWhatsAppClick('mobile_menu_cta');
                        }}
                        className="w-full px-4 py-2 bg-white text-black hover:bg-white/90 transition rounded font-semibold"
                    >
                        Solicitar Orçamento
                    </button>
                </div>
            )}
        </header>
    );
};

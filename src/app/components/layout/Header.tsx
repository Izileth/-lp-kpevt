import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { openWhatsApp } from '../../lib/whatsapp';
import { useScrollVisibility } from '../../hooks/useScrollVisibility';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

const navLinks = [
    { href: '#servicos', label: 'Serviços' },
    { href: '#eventos', label: 'Eventos' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#contato', label: 'Contato' },
];

export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const isScrolled = useScrollVisibility(50);

    const handleWhatsAppClick = (eventName: string) => {
        openWhatsApp(undefined, eventName);
    };

    const headerClasses = `
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled || menuOpen ? 'bg-black/95 backdrop-blur-lg border-b border-white/10' : 'bg-transparent border-b border-transparent'}
    `;

    const sidebarVariants: Variants = {
        hidden: { x: '100%' },
        visible: {
            x: 0,
            transition: {
                duration: 0.4,
                ease: 'easeInOut',
            },
        },
        exit: { x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } },
    };

    const navLinkVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Previne scroll quando menu está aberto
    React.useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    return (
        <>
            <header className={headerClasses}>
                <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold">
                        K Projeções <span className="text-white/60">& Eventos</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="hover:text-white/70 transition">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <button
                            onClick={() => handleWhatsAppClick('header_cta')}
                            className="px-6 py-2 bg-white text-black hover:bg-white/90 transition rounded font-semibold"
                        >
                            Solicitar Orçamento
                        </button>
                    </div>

                    {/* Mobile Menu Button - Sempre visível */}
                    <button
                        className="md:hidden relative z-[60]"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Overlay de fundo */}
                        <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.div
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black border-l border-white/10 z-50 md:hidden overflow-y-auto"
                        >
                         =
                            {/* Navegação */}
                            <motion.nav
                                className="px-6 py-8"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
                                }}
                                initial="hidden"
                                animate="visible"
                            >
                                <ul className="space-y-6">
                                    {navLinks.map((link, index) => (
                                        <motion.li key={link.href} variants={navLinkVariants}>
                                            <a
                                                href={link.href}
                                                className="block text-2xl font-semibold hover:text-white/70 transition-colors py-2"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <span className="text-white/40 text-sm mr-3">0{index + 1}</span>
                                                {link.label}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <motion.div
                                    variants={navLinkVariants}
                                    className="mt-10 pt-8 border-t border-white/10"
                                >
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            handleWhatsAppClick('mobile_menu_cta');
                                        }}
                                        className="w-full px-6 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-lg font-semibold text-lg"
                                    >
                                        Solicitar Orçamento
                                    </button>
                                </motion.div>

                                {/* Info de Contato */}
                                <motion.div
                                    variants={navLinkVariants}
                                    className="mt-8 pt-8 border-t border-white/10 space-y-4"
                                >
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Telefone</p>
                                        <a href="tel:+5591999999999" className="text-white/90 hover:text-white transition">
                                            (91) 99999-9999
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-2">E-mail</p>
                                        <a href="mailto:contato@kprojecoes.com.br" className="text-white/90 hover:text-white transition">
                                            contato@kprojecoes.com.br
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Localização</p>
                                        <p className="text-white/70">Ananindeua, PA</p>
                                    </div>
                                </motion.div>
                            </motion.nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
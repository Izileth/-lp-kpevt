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
        hidden: { 
            clipPath: 'circle(0% at calc(100% - 56px) 28px)',
            transition: { 
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1]
            }
        },
        visible: {
            clipPath: 'circle(150% at calc(100% - 56px) 28px)',
            transition: {
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1],
            },
        },
    };

    const contentVariants: Variants = {
        hidden: { 
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                duration: 0.4,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
            }
        }
    };

    const navLinkVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
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

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        <AnimatePresence mode="wait">
                            {menuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={28} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={28} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Fullscreen */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 bg-black z-50 md:hidden"
                    >
                        {/* Header com Logo e Botão Fechar */}
                        <div className="absolute top-0 left-0 right-0 z-[60] bg-transparent">
                            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                                <motion.div 
                                    className="text-2xl font-bold"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.3 }}
                                >
                                    K Projeções <span className="text-white/60">& Eventos</span>
                                </motion.div>

                                {/* Botão Fechar na mesma posição */}
                                <button
                                    className="w-10 h-10 flex items-center justify-center"
                                    onClick={() => setMenuOpen(false)}
                                    aria-label="Fechar menu"
                                >
                                    <motion.div
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.3 }}
                                    >
                                        <X size={28} />
                                    </motion.div>
                                </button>
                            </div>
                        </div>

                        {/* Conteúdo do Menu */}
                        <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="h-full flex flex-col justify-center px-8"
                        >
                            {/* Navegação Principal */}
                            <motion.nav
                                variants={{
                                    visible: { 
                                        transition: { 
                                            staggerChildren: 0.08,
                                            delayChildren: 0.5
                                        } 
                                    }
                                }}
                                initial="hidden"
                                animate="visible"
                                className="mb-16"
                            >
                                <ul className="space-y-2">
                                    {navLinks.map((link, index) => (
                                        <motion.li 
                                            key={link.href} 
                                            variants={navLinkVariants}
                                            className="overflow-hidden"
                                        >
                                            <a
                                                href={link.href}
                                                className="block text-4xl md:text-5xl font-bold hover:text-white/70 transition-colors py-3 group"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <span className="text-white/30 text-base font-normal mr-4 inline-block w-8">
                                                    0{index + 1}
                                                </span>
                                                <span className="inline-block group-hover:translate-x-2 transition-transform">
                                                    {link.label}
                                                </span>
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.nav>

                            {/* CTA Button */}
                            <motion.div
                                variants={navLinkVariants}
                                className="mb-12"
                            >
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleWhatsAppClick('mobile_menu_cta');
                                    }}
                                    className="w-full max-w-md px-8 py-5 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-xl font-semibold text-xl"
                                >
                                    Solicitar Orçamento
                                </button>
                            </motion.div>

                            {/* Info de Contato */}
                            <motion.div
                                variants={navLinkVariants}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-4xl"
                            >
                                <div>
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Telefone</p>
                                    <a href="tel:+5591981125595" className="text-white/90 hover:text-white transition text-lg">
                                        (91) 998112-5595
                                    </a>
                                </div>
                                <div>
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">E-mail</p>
                                    <a href="mailto:kprogecoes.oficial@gmail.com" className="text-white/90 hover:text-white transition text-lg break-all">
                                        kprogecoes.oficial@gmail.com
                                    </a>
                                </div>
                                <div>
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Localização</p>
                                    <p className="text-white/70 text-lg">Belém, PA</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-[150px] pointer-events-none"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
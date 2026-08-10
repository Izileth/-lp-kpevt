import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../types/links';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Prevent scroll when menu is open
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
            <header className="w-full bg-white text-black border-b border-black/10 selection:bg-black selection:text-white" style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}>
                <nav className="mx-auto flex w-full max-w-[1400px] items-start justify-between px-5 py-6 sm:px-10 sm:py-8 lg:px-16 text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px]">
                    
                    {/* LOGO */}
                    <div className="order-1 flex-1">
                        <button onClick={() => navigate('/')} className="hover:opacity-60 transition-opacity">
                            K PROJEÇÕES
                        </button>
                    </div>

                    {/* DESKTOP LINKS */}
                    <div className="hidden sm:flex order-2 flex-1 justify-center gap-8">
                        {navLinks.map(link => (
                            <button 
                                key={link.path} 
                                onClick={() => navigate(link.path)} 
                                className={`hover:opacity-60 transition-opacity ${location.pathname === link.path ? 'opacity-50' : ''}`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* RIGHT CTA / MOBILE TOGGLE */}
                    <div className="order-3 flex-1 text-right flex justify-end items-center gap-4">
                        <button 
                            className="hidden sm:inline-block bg-black text-white px-4 py-2 hover:opacity-80 transition-opacity"
                            onClick={() => navigate('/contact')}
                        >
                            ORÇAMENTO
                        </button>
                        <button
                            className="sm:hidden hover:opacity-60 transition-opacity"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-[80px] bg-white z-40 sm:hidden flex flex-col px-5 py-10"
                        style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}
                    >
                        <div className="flex flex-col gap-8 text-[12vw] font-black uppercase leading-[0.9] tracking-tight">
                            {navLinks.map(link => (
                                <button
                                    key={link.path}
                                    onClick={() => {
                                        navigate(link.path);
                                        setMenuOpen(false);
                                    }}
                                    className="text-left hover:opacity-60 transition-opacity border-b border-black/10 pb-4"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    navigate('/contact');
                                    setMenuOpen(false);
                                }}
                                className="text-left hover:opacity-60 transition-opacity pb-4 text-black/50"
                            >
                                ORÇAMENTO
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
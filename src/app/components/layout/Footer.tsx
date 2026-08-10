import React from 'react';
import { useEmail } from '../../hooks/useEmail';

export const Footer: React.FC = () => {
    const { handleEmailClick } = useEmail();

    return (
        <footer 
            className="w-full bg-white text-black border-t border-black/10 selection:bg-black selection:text-white"
            style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}
        >
            <div className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-10 lg:px-16 flex flex-col md:flex-row justify-between gap-12 text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px]">
                
                {/* BRANDING */}
                <div className="flex flex-col gap-4 max-w-sm">
                    <div className="text-lg font-black tracking-tight">K PROJEÇÕES</div>
                    <p className="normal-case tracking-normal text-black/70 text-[12px] leading-relaxed">
                        Sonorização, iluminação e estrutura completa para transformar o seu evento em uma experiência inesquecível.
                    </p>
                </div>

                {/* LINKS & CONTATO */}
                <div className="flex flex-col sm:flex-row gap-12 sm:gap-24">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-black/50 mb-2">[&nbsp;CONTATO&nbsp;]</h4>
                        <a href="tel:+5591981125595" className="hover:opacity-60 transition-opacity">(91) 98112-5595</a>
                        <a 
                            href="mailto:kprogecoes.oficial@gmail.com"
                            onClick={(e) => {
                                e.preventDefault();
                                handleEmailClick('kprogecoes.oficial@gmail.com', 'footer_email_click');
                            }}
                            className="hover:opacity-60 transition-opacity"
                        >
                            kprogecoes.oficial@gmail.com
                        </a>
                        <span>Belém, PA</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-black/50 mb-2">[&nbsp;SOCIAL&nbsp;]</h4>
                        <a href="#" className="hover:opacity-60 transition-opacity">INSTAGRAM</a>
                        <a href="#" className="hover:opacity-60 transition-opacity">FACEBOOK</a>
                        <a href="#" className="hover:opacity-60 transition-opacity">WHATSAPP</a>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-black/10">
                <div className="mx-auto w-full max-w-[1400px] px-5 py-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-medium uppercase tracking-[0.18em] sm:text-[10px]">
                    <div>
                        &copy; {new Date().getFullYear()} K PROJEÇÕES E EVENTOS
                    </div>
                    <div>
                        ALL RIGHTS RESERVED
                    </div>
                </div>
            </div>
        </footer>
    );
};

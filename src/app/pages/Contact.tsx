import React, { useState } from 'react';


const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       // const text = `*Novo Orçamento - K Projeções*\n\n*Nome:* ${name}\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*Mensagem:* ${message}`;
     //   openWhatsApp(text, 'contact_form_submit');
    };

    return (
        <section
            className="w-full bg-white text-black selection:bg-black selection:text-white pb-24"
            style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}
        >
            <div className="mx-auto flex w-full max-w-[1400px] flex-col px-5 pt-16 sm:px-10 lg:px-16">
                
                {/* HERO */}
                <h1 className="text-[15vw] sm:text-[8vw] font-black uppercase leading-[0.86] tracking-tight mb-16 border-b border-black/10 pb-8">
                    FALE<br />CONOSCO
                </h1>

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* INFO E LINKS */}
                    <div className="flex flex-col gap-12">
                        <div>
                            <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] mb-4 text-black/50">
                                [&nbsp;INFORMAÇÕES&nbsp;]
                            </h3>
                            <p className="text-[12px] font-normal normal-case leading-relaxed tracking-normal text-black/90 max-w-xs mb-12">
                                Pronto para elevar o nível do seu evento? Preencha o formulário para um orçamento detalhado ou entre em contato diretamente pelos nossos canais.
                            </p>
                            
                            <div className="flex flex-col gap-6 text-[11vw] sm:text-[4vw] font-black uppercase leading-[0.9] tracking-tight">
                                <a href="mailto:kprogecoes.oficial@gmail.com" className="hover:opacity-60 transition-opacity block break-all">E-MAIL</a>
                                <a href="tel:+5591981125595" className="hover:opacity-60 transition-opacity block">WHATSAPP</a>
                                <a href="#" className="hover:opacity-60 transition-opacity block">INSTAGRAM</a>
                            </div>
                        </div>
                    </div>

                    {/* FORMULÁRIO */}
                    <div className="border-t border-black/10 pt-12 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
                        <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] mb-8 text-black/50">
                            [&nbsp;ORÇAMENTO RÁPIDO&nbsp;]
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <input 
                                type="text" placeholder="SEU NOME COMPLETO" required
                                value={name} onChange={e => setName(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-4 focus:outline-none focus:border-black transition text-[12px] sm:text-sm font-bold tracking-widest placeholder-black/30"
                            />
                            <input 
                                type="email" placeholder="SEU E-MAIL" required
                                value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-4 focus:outline-none focus:border-black transition text-[12px] sm:text-sm font-bold tracking-widest placeholder-black/30"
                            />
                            <input 
                                type="tel" placeholder="SEU WHATSAPP / TELEFONE" required
                                value={phone} onChange={e => setPhone(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-4 focus:outline-none focus:border-black transition text-[12px] sm:text-sm font-bold tracking-widest placeholder-black/30"
                            />
                            <textarea 
                                placeholder="DETALHES DO EVENTO (DATA, LOCAL, NECESSIDADES)" required rows={4}
                                value={message} onChange={e => setMessage(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-4 focus:outline-none focus:border-black transition text-[12px] sm:text-sm font-bold tracking-widest placeholder-black/30 resize-none"
                            />
                            <button 
                                type="submit" 
                                className="mt-8 bg-black text-white px-8 py-6 uppercase text-[11px] font-bold tracking-[0.18em] hover:opacity-80 transition-opacity text-center"
                            >
                                ENVIAR MENSAGEM VIA WHATSAPP
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
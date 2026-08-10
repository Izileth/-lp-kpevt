

const EVENTS_DATA = [
    { label: "FORMATURAS", desc: "Estrutura completa de som e luz para celebrar essa conquista com o impacto que ela merece." },
    { label: "CASAMENTOS", desc: "Iluminação cênica, sonorização impecável e efeitos mágicos para o dia perfeito." },
    { label: "SOLENIDADES", desc: "Microfonação precisa e painéis de alta definição para eventos corporativos e cerimônias solenes." },
    { label: "SHOWS E FESTAS", desc: "Palco robusto, line array, painéis de LED e tudo o que um grande espetáculo exige para levantar o público." },
];

const Events = () => {
    return (
        <section
            className="w-full bg-white text-black selection:bg-black selection:text-white pb-24"
            style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}
        >
            <div className="mx-auto flex w-full max-w-[1400px] flex-col px-5 pt-16 sm:px-10 lg:px-16">
                
                {/* HERO */}
                <h1 className="text-[15vw] sm:text-[8vw] font-black uppercase leading-[0.86] tracking-tight mb-16 border-b border-black/10 pb-8">
                    NOSSOS<br />EVENTOS
                </h1>

                {/* GRID */}
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-16">
                    {EVENTS_DATA.map((evt) => (
                        <div key={evt.label} className="flex flex-col gap-4 group">
                            {/* PLACEHOLDER IMAGEM */}
                            <div className="aspect-[4/3] w-full bg-neutral-200 overflow-hidden flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 transition-transform duration-700 group-hover:scale-105" />
                                <span className="text-[10px] uppercase tracking-widest text-neutral-500 relative z-10">
                                    [ IMAGEM: {evt.label} ]
                                </span>
                            </div>
                            
                            <div className="mt-4">
                                <h3 className="text-[8vw] sm:text-[3vw] lg:text-[40px] font-black uppercase leading-[0.9] tracking-tight">
                                    {evt.label}
                                </h3>
                                <p className="text-[12px] font-normal normal-case leading-relaxed tracking-normal text-black/80 mt-4 max-w-sm">
                                    {evt.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
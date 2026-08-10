
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <section
            className="w-full bg-white text-black selection:bg-black selection:text-white flex items-center justify-center min-h-screen"
            style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}
        >
            <div className="w-full max-w-md p-8 sm:p-12 border-t border-b sm:border border-black/10 text-center flex flex-col items-center gap-8">
                <h1 className="text-[25vw] sm:text-[120px] font-black uppercase leading-[0.8] tracking-tight">
                    404
                </h1>
                
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/70 leading-relaxed">
                    <p>[&nbsp;PÁGINA NÃO ENCONTRADA&nbsp;]</p>
                    <p className="mt-2 text-[10px]">O recurso que você tentou acessar não existe ou é restrito.</p>
                </div>

                <Link 
                    to="/" 
                    className="w-full bg-black text-white px-6 py-4 uppercase text-[11px] font-bold tracking-[0.18em] hover:opacity-80 transition-opacity"
                >
                    VOLTAR AO INÍCIO
                </Link>
            </div>
        </section>
    );
}

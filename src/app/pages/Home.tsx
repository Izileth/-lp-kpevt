import { useEffect, useState } from "react";

/**
 * Home
 * -----------------------------------------------------------------------
 * Réplica fiel do design de referência (portfólio "Katie Hunter — Digital
 * Designer"). Construído em TypeScript + Tailwind CSS, pensado para ser
 * plugado como a seção hero/landing de um site maior.
 *
 * - Grid de 2 colunas (label à esquerda / conteúdo a partir dos 50%),
 *   exatamente como no layout original.
 * - Relógio ao vivo de Nova Iorque no canto superior direito
 *   (o "NYC [ 11:44 PM ]" do design é dinâmico, não um texto fixo).
 * - As 3 imagens de projeto recebem placeholders em escala de cinza —
 *   troque as props `projects[i].image` pelas imagens reais.
 * - 100% responsivo: em telas pequenas as colunas empilham e as
 *   tipografias reduzem de escala com `clamp` via classes fluid.
 *
 * Fonte: o design usa uma grotesca bold/black condensada. Recomenda-se
 * carregar "Archivo Black" (ou "Inter" peso 900) no <head> do site host:
 *   <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;900&display=swap" rel="stylesheet" />
 * Caso a fonte não seja carregada, o componente cai para um fallback
 * sans-serif bold do sistema.
 */

type Project = {
    label: string;
    image?: string; // URL da imagem — deixe vazio para placeholder
};

type ReachOutLink = {
    label: string;
    href: string;
};

interface KatieHunterHeroProps {
    name?: string;
    role?: string[];
    aboutText?: string;
    projects?: Project[];
    reachOutLinks?: ReachOutLink[];
    year?: string;
    domain?: string;
}

const DEFAULT_PROJECTS: Project[] = [
    { label: "THE COOL EFFECT" },
    { label: "FRESH OLIVES" },
    { label: "NETWORKING" },
];

const DEFAULT_LINKS: ReachOutLink[] = [
    { label: "EMAIL", href: "mailto:hello@katiehunter.com" },
    { label: "BEHANCE", href: "https://behance.net" },
    { label: "ARE.NA", href: "https://are.na" },
];

function useNYCClock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/New_York",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        const update = () => setTime(formatter.format(new Date()));
        update();
        const id = setInterval(update, 1000 * 15);
        return () => clearInterval(id);
    }, []);

    return time;
}

export default function Home({
    name = "Katie Hunter",
    role = ["KATIE", "HUNTER", "DIGITAL", "DESIGNER"],
    aboutText = "Katie crafts digital experiences that blend creativity with precision, transforming ideas into captivating designs that resonate seamlessly with audiences.",
    projects = DEFAULT_PROJECTS,
    reachOutLinks = DEFAULT_LINKS,
    year = "'24",
    domain = "katiehunter.com",
}: KatieHunterHeroProps) {
    const time = useNYCClock();

    return (
        <section
            className="w-full bg-white text-black selection:bg-black selection:text-white"
            style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}
        >
            <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-5 py-6 sm:px-10 sm:py-8 lg:px-16">
                {/* ---------- HEADER ---------- */}
                <header className="grid grid-cols-2 items-start gap-y-2 text-[10px] font-medium uppercase tracking-[0.18em] sm:grid-cols-3 sm:text-[11px]">
                    <div className="order-1">{name}</div>

                    <div className="order-3 col-span-2 leading-[1.4] sm:order-2 sm:col-span-1 sm:text-center">
                        <a href="#reach-out" className="block hover:opacity-60 transition-opacity">
                            Reach Out
                        </a>
                        <a
                            href={`https://${domain}`}
                            className="block hover:opacity-60 transition-opacity"
                        >
                            {domain}
                        </a>
                    </div>

                    <div className="order-2 text-right sm:order-3">
                        NYC&nbsp;[&nbsp;{time || "—:— --"}&nbsp;]
                    </div>
                </header>

                {/* ---------- HERO ---------- */}
                <div className="flex flex-1 items-center py-16 sm:py-24 lg:py-28">
                    <h1 className="w-full sm:pl-[50%]">
                        {role.map((line) => (
                            <span
                                key={line}
                                className="block text-[15vw] font-black uppercase leading-[0.86] tracking-tight sm:text-[6.2vw] lg:text-[6vw] xl:text-[80px]"
                            >
                                {line}
                            </span>
                        ))}
                    </h1>
                </div>

                {/* ---------- ABOUT ---------- */}
                <div className="grid grid-cols-1 gap-3 border-t border-black/10 py-8 sm:grid-cols-2 sm:py-10">
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px]">
                        [&nbsp;About&nbsp;]
                    </div>
                    <p className="max-w-xs text-[11px] font-normal normal-case leading-relaxed tracking-normal text-black/90 sm:text-[12px]">
                        {aboutText}
                    </p>
                </div>

                {/* ---------- PROJECTS ---------- */}
                <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-3 sm:gap-6 sm:py-10">
                    {projects.map((project) => (
                        <figure key={project.label} className="flex flex-col gap-3">
                            <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-200">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.label}
                                        className="h-full w-full object-cover grayscale"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300">
                                        <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                                            Adicionar imagem
                                        </span>
                                    </div>
                                )}
                            </div>
                            <figcaption className="text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px]">
                                [&nbsp;{project.label}&nbsp;]
                            </figcaption>
                        </figure>
                    ))}
                </div>

                {/* ---------- REACH OUT ---------- */}
                <div
                    id="reach-out"
                    className="grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 sm:py-24 lg:py-28"
                >
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px]">
                        [&nbsp;Reach Out&nbsp;]
                    </div>
                    <div className="sm:pl-0">
                        {reachOutLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="block text-[13vw] font-black uppercase leading-[0.9] tracking-tight transition-opacity hover:opacity-60 sm:text-[6.2vw] lg:text-[6vw] xl:text-[64px]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* ---------- FOOTER ---------- */}
                <footer className="mt-auto flex items-center justify-between border-t border-black/10 pt-5 text-[9px] font-medium uppercase tracking-[0.18em] sm:text-[10px]">
                    <div>
                        {name} {year}
                    </div>
                    <div>All Rights Reserved</div>
                </footer>
            </div>
        </section>
    );
}
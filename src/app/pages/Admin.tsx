import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

type Template = { id: string; nome: string };
type Campaign = { id: string; nome: string; status: string };

export default function Admin() {
    const { signOut } = useAuth();

    const [templates, setTemplates] = useState<Template[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    // Template Form
    const [templateName, setTemplateName] = useState("");
    const [templateSubject, setTemplateSubject] = useState("");
    const [templateHtml, setTemplateHtml] = useState("");

    // Campaign Form
    const [campaignName, setCampaignName] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [senderName, setSenderName] = useState("Equipe");
    const [senderEmail, setSenderEmail] = useState("");

    const [statusMsg, setStatusMsg] = useState("");

    async function fetchData() {
        const { data: tData } = await supabase.from("email_templates").select("id, nome");
        if (tData) setTemplates(tData);

        const { data: cData } = await supabase.from("email_campaigns").select("id, nome, status");
        if (cData) setCampaigns(cData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateTemplate = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMsg("Salvando template...");
        const { error } = await supabase.from("email_templates").insert([
            { nome: templateName, assunto: templateSubject, conteudo_html: templateHtml }
        ]);
        if (error) {
            setStatusMsg(`Erro: ${error.message}`);
        } else {
            setStatusMsg("Template criado com sucesso!");
            setTemplateName("");
            setTemplateSubject("");
            setTemplateHtml("");
            fetchData();
        }
    };

    const handleCreateCampaign = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMsg("Salvando campanha...");
        const { error } = await supabase.from("email_campaigns").insert([
            {
                nome: campaignName,
                template_id: selectedTemplate,
                remetente_nome: senderName,
                remetente_email: senderEmail,
                status: 'rascunho'
            }
        ]);
        if (error) {
            setStatusMsg(`Erro: ${error.message}`);
        } else {
            setStatusMsg("Campanha criada como rascunho!");
            setCampaignName("");
            setSenderEmail("");
            fetchData();
        }
    };

    const handleSendCampaign = async (id: string) => {
        setStatusMsg("Agendando disparo...");
        const { error } = await supabase
            .from("email_campaigns")
            .update({ status: 'agendada' })
            .eq("id", id);

        if (error) {
            setStatusMsg(`Erro: ${error.message}`);
        } else {
            setStatusMsg("Campanha agendada para disparo (Edge Function assumirá)!");
            fetchData();
        }
    };

    return (
        <section
            className="w-full bg-white text-black selection:bg-black selection:text-white"
            style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}
        >
            <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-5 py-6 sm:px-10 sm:py-8 lg:px-16">
                <header className="mb-12 border-b border-black/10 pb-4 text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px] flex justify-between items-center">
                    <span>[&nbsp;ADMIN DASHBOARD - E-MAIL MARKETING&nbsp;]</span>
                    <button 
                        onClick={signOut}
                        className="hover:opacity-60 transition-opacity underline underline-offset-4"
                    >
                        SAIR
                    </button>
                </header>

                {statusMsg && (
                    <div className="mb-8 bg-black text-white px-4 py-3 text-[11px] font-bold uppercase tracking-widest">
                        {statusMsg}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* COL 1: TEMPLATES */}
                    <div className="flex flex-col gap-8 border-t border-black/10 pt-8 lg:border-t-0 lg:pt-0">
                        <h2 className="text-[6vw] font-black uppercase leading-[0.9] tracking-tight lg:text-[4vw]">
                            1. TEMPLATES
                        </h2>

                        <form onSubmit={handleCreateTemplate} className="flex flex-col gap-4">
                            <input
                                type="text" placeholder="Nome do Template" required
                                value={templateName} onChange={e => setTemplateName(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm"
                            />
                            <input
                                type="text" placeholder="Assunto do E-mail" required
                                value={templateSubject} onChange={e => setTemplateSubject(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm"
                            />
                            <textarea
                                placeholder="Conteúdo HTML" required rows={4}
                                value={templateHtml} onChange={e => setTemplateHtml(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm resize-none"
                            />
                            <button type="submit" className="mt-4 bg-black text-white px-6 py-4 uppercase text-[10px] font-bold tracking-[0.18em] hover:opacity-80 transition-opacity">
                                CRIAR TEMPLATE
                            </button>
                        </form>

                        <div className="mt-8">
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-4">Templates Existentes</h3>
                            <ul className="flex flex-col gap-2 text-sm font-normal">
                                {templates.map(t => (
                                    <li key={t.id} className="border border-black/10 p-3">{t.nome}</li>
                                ))}
                                {templates.length === 0 && <li className="text-black/50">Nenhum template.</li>}
                            </ul>
                        </div>
                    </div>

                    {/* COL 2: CAMPANHAS */}
                    <div className="flex flex-col gap-8 border-t border-black/10 pt-8 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
                        <h2 className="text-[6vw] font-black uppercase leading-[0.9] tracking-tight lg:text-[4vw]">
                            2. CAMPANHAS
                        </h2>

                        <form onSubmit={handleCreateCampaign} className="flex flex-col gap-4">
                            <input
                                type="text" placeholder="Nome da Campanha" required
                                value={campaignName} onChange={e => setCampaignName(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm"
                            />
                            <select
                                required value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm appearance-none"
                            >
                                <option value="" disabled>Selecione um Template</option>
                                {templates.map(t => (
                                    <option key={t.id} value={t.id}>{t.nome}</option>
                                ))}
                            </select>
                            <input
                                type="text" placeholder="Nome do Remetente" required
                                value={senderName} onChange={e => setSenderName(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm"
                            />
                            <input
                                type="email" placeholder="E-mail do Remetente (Verificado no Resend)" required
                                value={senderEmail} onChange={e => setSenderEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm"
                            />
                            <button type="submit" className="mt-4 bg-black text-white px-6 py-4 uppercase text-[10px] font-bold tracking-[0.18em] hover:opacity-80 transition-opacity">
                                CRIAR RASCUNHO
                            </button>
                        </form>

                        <div className="mt-8">
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-4">Campanhas Existentes</h3>
                            <ul className="flex flex-col gap-3 text-sm font-normal">
                                {campaigns.map(c => (
                                    <li key={c.id} className="border border-black/10 p-4 flex items-center justify-between">
                                        <div>
                                            <strong>{c.nome}</strong>
                                            <span className="block text-[10px] uppercase tracking-wider text-black/60 mt-1">Status: {c.status}</span>
                                        </div>
                                        {c.status === 'rascunho' && (
                                            <button
                                                onClick={() => handleSendCampaign(c.id)}
                                                className="bg-black text-white px-4 py-2 uppercase text-[9px] font-bold tracking-[0.1em] hover:opacity-80"
                                            >
                                                ENVIAR AGORA
                                            </button>
                                        )}
                                    </li>
                                ))}
                                {campaigns.length === 0 && <li className="text-black/50">Nenhuma campanha.</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

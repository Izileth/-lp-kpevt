import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { DateTimePicker } from "../components/ui/DateTimePicker";

type Template = { id: string; nome: string; assunto: string };
type Cliente = { id: string; nome: string; email: string; aceita_marketing: boolean };
type Campaign = {
    id: string;
    nome: string;
    status: string;
    remetente_nome: string;
    remetente_email: string;
    agendada_para: string | null;
    enviada_em: string | null;
    created_at: string;
};
type CampaignStats = {
    campaign_id: string;
    campanha: string;
    status: string;
    total_destinatarios: number;
    enviados: number;
    entregues: number;
    abertos: number;
    clicados: number;
    rejeitados: number;
    falhas: number;
};

export default function Admin() {
    const { signOut } = useAuth();

    const [templates, setTemplates] = useState<Template[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [stats, setStats] = useState<CampaignStats[]>([]);

    // Template Form
    const [templateName, setTemplateName] = useState("");
    const [templateSubject, setTemplateSubject] = useState("");
    const [templateHtml, setTemplateHtml] = useState("");
    const [ setTemplateText] = useState("");

    // Campaign Form
    const [campaignName, setCampaignName] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [senderName, setSenderName] = useState("K Projeções");
    const senderEmail = "contato@kprojecoes.online"; // FIXO
    const [scheduledFor, setScheduledFor] = useState("");
    const [selectedClientes, setSelectedClientes] = useState<string[]>([]);
    const [customRecipients, setCustomRecipients] = useState(""); // DESTINATÁRIOS CUSTOMIZADOS

    const [statusMsg, setStatusMsg] = useState("");
    const [activeTab, setActiveTab] = useState<"templates" | "campanhas" | "stats">("templates");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const { data: tData } = await supabase
            .from("email_templates")
            .select("id, nome, assunto")
            .order("created_at", { ascending: false });
        if (tData) setTemplates(tData);

        const { data: cData } = await supabase
            .from("email_campaigns")
            .select("id, nome, status, remetente_nome, remetente_email, agendada_para, enviada_em, created_at")
            .order("created_at", { ascending: false });
        if (cData) setCampaigns(cData);

        const { data: clData } = await supabase
            .from("clientes")
            .select("id, nome, email, aceita_marketing")
            .eq("ativo", true)
            .eq("aceita_marketing", true)
            .order("nome");
        if (clData) setClientes(clData);

        const { data: sData } = await supabase
            .from("v_campanha_stats")
            .select("*");
        if (sData) setStats(sData);
    }

    // Função simples para converter Markdown básico para HTML
    const parseMarkdown = (text: string) => {
        let html = text;
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/\n/gim, '<br />');
        return html;
    };

    // ── TEMPLATES ──────────────────────────────────────────
    const handleCreateTemplate = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMsg("Salvando template...");
        
        // Converte o que foi digitado em markdown para HTML antes de salvar
        const convertedHtml = parseMarkdown(templateHtml);

        const { error } = await supabase.from("email_templates").insert([{
            nome: templateName,
            assunto: templateSubject,
            conteudo_html: convertedHtml,
            conteudo_texto: templateHtml, // Guarda a versão original como texto fallback
        }]);
        if (error) {
            setStatusMsg(`Erro: ${error.message}`);
        } else {
            setStatusMsg("Template criado com sucesso!");
            setTemplateName(""); setTemplateSubject(""); setTemplateHtml(""); setTemplateText("");
            fetchData();
        }
    };

    // ── CAMPANHAS ──────────────────────────────────────────
    const toggleCliente = (id: string) => {
        setSelectedClientes(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const selectAllClientes = () => {
        if (selectedClientes.length === clientes.length) {
            setSelectedClientes([]);
        } else {
            setSelectedClientes(clientes.map(c => c.id));
        }
    };

    const handleCreateCampaign = async (e: React.FormEvent) => {
        e.preventDefault();

        // Processar destinatários customizados separados por vírgula
        const customEmails = customRecipients
            .split(',')
            .map(e => e.trim())
            .filter(e => e !== "");

        if (selectedClientes.length === 0 && customEmails.length === 0) {
            setStatusMsg("Selecione ao menos 1 destinatário na lista ou adicione um e-mail personalizado.");
            return;
        }

        setStatusMsg("Salvando campanha e registrando destinatários...");

        // 1) Criar a campanha
        const payload: Record<string, unknown> = {
            nome: campaignName,
            template_id: selectedTemplate,
            remetente_nome: senderName,
            remetente_email: senderEmail,
            status: "rascunho",
        };
        if (scheduledFor) {
            payload.agendada_para = new Date(scheduledFor).toISOString();
        }

        const { data: newCampaign, error: campErr } = await supabase
            .from("email_campaigns")
            .insert([payload])
            .select("id")
            .single();

        if (campErr || !newCampaign) {
            setStatusMsg(`Erro ao criar campanha: ${campErr?.message}`);
            return;
        }

        // 2) Inserir registros na tabela email_sends (fila de envio)
        const clientesParaEnvio = clientes.filter(c => selectedClientes.includes(c.id));
        
        const sends = clientesParaEnvio.map(c => ({
            campaign_id: newCampaign.id,
            cliente_id: c.id,
            email: c.email,
            status: "pendente" as const,
        }));

        // Adicionar os destinatários personalizados na fila (sem cliente_id vinculado)
        // OBS: A migration 002.sql obriga cliente_id como NOT NULL, para aceitar nulo você deve rodar no SQL:
        // ALTER TABLE public.email_sends ALTER COLUMN cliente_id DROP NOT NULL;
        customEmails.forEach(emailCustomizado => {
            sends.push({
                campaign_id: newCampaign.id,
                cliente_id: null as any, // Veja a nota acima
                email: emailCustomizado,
                status: "pendente" as const,
            });
        });

        const { error: sendsErr } = await supabase.from("email_sends").insert(sends);

        if (sendsErr) {
            setStatusMsg(`Campanha criada, mas erro ao registrar destinatários: ${sendsErr.message}`);
        } else {
            setStatusMsg(`Campanha criada com ${sends.length} destinatário(s) na fila!`);
        }

        setCampaignName(""); setScheduledFor(""); setSelectedClientes([]); setCustomRecipients("");
        fetchData();
    };

    const handleSendCampaign = async (id: string) => {
        setStatusMsg("Agendando disparo...");
        const { error } = await supabase
            .from("email_campaigns")
            .update({ status: "agendada" })
            .eq("id", id);

        if (error) {
            setStatusMsg(`Erro: ${error.message}`);
        } else {
            setStatusMsg("Campanha agendada para disparo (Edge Function assumirá)!");
            fetchData();
        }
    };

    // ── HELPERS ────────────────────────────────────────────
    const formatDate = (d: string | null) => {
        if (!d) return "—";
        return new Date(d).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    };

    const getStatsFor = (campaignId: string) => stats.find(s => s.campaign_id === campaignId);

    // ── TAB BUTTON ─────────────────────────────────────────
    const TabBtn = ({ tab, label }: { tab: typeof activeTab; label: string }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 uppercase text-[10px] font-bold tracking-[0.18em] transition-opacity border ${activeTab === tab ? "bg-black text-white border-black" : "bg-transparent text-black border-black/20 hover:border-black"}`}
        >
            {label}
        </button>
    );

    return (
        <section
            className="w-full bg-white text-black selection:bg-black selection:text-white"
            style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}
        >
            <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-5 py-6 sm:px-10 sm:py-8 lg:px-16">

                {/* HEADER */}
                <header className="mb-8 border-b border-black/10 pb-4 text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px] flex justify-between items-center">
                    <span>[&nbsp;ADMIN DASHBOARD — E-MAIL MARKETING&nbsp;]</span>
                    <button onClick={signOut} className="hover:opacity-60 transition-opacity underline underline-offset-4">SAIR</button>
                </header>

                {/* STATUS */}
                {statusMsg && (
                    <div className="mb-6 bg-black text-white px-4 py-3 text-[11px] font-bold uppercase tracking-widest flex justify-between items-center">
                        <span>{statusMsg}</span>
                        <button onClick={() => setStatusMsg("")} className="hover:opacity-60 ml-4">✕</button>
                    </div>
                )}

                {/* TABS */}
                <div className="flex gap-2 mb-12 flex-wrap">
                    <TabBtn tab="templates" label="1. Templates" />
                    <TabBtn tab="campanhas" label="2. Campanhas" />
                    <TabBtn tab="stats" label="3. Estatísticas" />
                </div>

                {/* ════════════ TAB: TEMPLATES ════════════ */}
                {activeTab === "templates" && (
                    <div className="flex flex-col gap-12">
                        <h2 className="text-[8vw] sm:text-[4vw] font-black uppercase leading-[0.9] tracking-tight">TEMPLATES</h2>

                        <form onSubmit={handleCreateTemplate} className="flex flex-col gap-4 max-w-2xl">
                            <input type="text" placeholder="Nome do Template" required value={templateName} onChange={e => setTemplateName(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm" />
                            <input type="text" placeholder="Assunto do E-mail" required value={templateSubject} onChange={e => setTemplateSubject(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm" />
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-black/50 mb-1">Mensagem do E-mail (Markdown suportado: # Título, **Negrito**)</label>
                                <textarea placeholder="# Olá {{nome}}&#10;&#10;Esta é uma **mensagem** formatada..." required rows={6} value={templateHtml} onChange={e => setTemplateHtml(e.target.value)}
                                    className="w-full bg-transparent border border-black/10 p-3 focus:outline-none focus:border-black transition text-sm resize-none font-mono" />
                            </div>
                            <button type="submit" className="mt-2 self-start bg-black text-white px-8 py-4 uppercase text-[10px] font-bold tracking-[0.18em] hover:opacity-80 transition-opacity">
                                CRIAR TEMPLATE
                            </button>
                        </form>

                        <div className="border-t border-black/10 pt-8">
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-4">Templates Existentes ({templates.length})</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {templates.map(t => (
                                    <div key={t.id} className="border border-black/10 p-4 flex flex-col gap-1">
                                        <strong className="text-sm">{t.nome}</strong>
                                        <span className="text-[10px] uppercase tracking-wider text-black/50">Assunto: {t.assunto}</span>
                                    </div>
                                ))}
                                {templates.length === 0 && <span className="text-black/50 text-sm">Nenhum template.</span>}
                            </div>
                        </div>
                    </div>
                )}

                {/* ════════════ TAB: CAMPANHAS ════════════ */}
                {activeTab === "campanhas" && (
                    <div className="flex flex-col gap-12">
                        <h2 className="text-[8vw] sm:text-[4vw] font-black uppercase leading-[0.9] tracking-tight">CAMPANHAS</h2>

                        <form onSubmit={handleCreateCampaign} className="flex flex-col gap-6 max-w-2xl">
                            <input type="text" placeholder="Nome da Campanha" required value={campaignName} onChange={e => setCampaignName(e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm" />

                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-black/50 mb-1">Template</label>
                                <select required value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)}
                                    className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm appearance-none">
                                    <option value="" disabled>Selecione um Template</option>
                                    {templates.map(t => (
                                        <option key={t.id} value={t.id}>{t.nome} — {t.assunto}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] uppercase font-bold tracking-widest text-black/50 mb-1">Nome do Remetente</label>
                                    <input type="text" placeholder="Nome do Remetente" required value={senderName} onChange={e => setSenderName(e.target.value)}
                                        className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm" />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase font-bold tracking-widest text-black/50 mb-1">E-mail Remetente</label>
                                    <input type="email" disabled value={senderEmail}
                                        className="w-full bg-transparent border-b border-black/20 px-0 py-3 text-sm text-black/50 cursor-not-allowed" />
                                </div>
                            </div>

                            <DateTimePicker
                                label="Agendada Para (Opcional)"
                                value={scheduledFor}
                                onChange={setScheduledFor}
                            />

                            {/* SELEÇÃO DE DESTINATÁRIOS — email_sends */}
                            <div className="border-t border-black/10 pt-6">
                                
                                <div className="mb-8">
                                    <label className="block text-[10px] uppercase font-bold tracking-widest text-black/50 mb-1">
                                        E-mails Personalizados (Separados por vírgula)
                                    </label>
                                    <input type="text" placeholder="exemplo@gmail.com, outro@hotmail.com" value={customRecipients} onChange={e => setCustomRecipients(e.target.value)}
                                        className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm" />
                                    <p className="text-[10px] text-black/50 mt-1">E-mails digitados aqui receberão a campanha independentemente da lista de clientes.</p>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-black/50">
                                        Destinatários Registrados ({selectedClientes.length} de {clientes.length})
                                    </label>
                                    <button type="button" onClick={selectAllClientes}
                                        className="text-[10px] uppercase font-bold tracking-widest underline underline-offset-4 hover:opacity-60 transition-opacity">
                                        {selectedClientes.length === clientes.length ? "DESMARCAR TODOS" : "SELECIONAR TODOS"}
                                    </button>
                                </div>

                                {clientes.length === 0 ? (
                                    <p className="text-sm text-black/50">Nenhum cliente com opt-in ativo encontrado.</p>
                                ) : (
                                    <div className="max-h-60 overflow-y-auto border border-black/10 divide-y divide-black/5">
                                        {clientes.map(cl => (
                                            <label key={cl.id} className="flex items-center gap-3 px-4 py-3 hover:bg-black/[0.02] cursor-pointer transition">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedClientes.includes(cl.id)}
                                                    onChange={() => toggleCliente(cl.id)}
                                                    className="accent-black w-4 h-4"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{cl.nome}</span>
                                                    <span className="text-[10px] text-black/50">{cl.email}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="mt-2 self-start bg-black text-white px-8 py-4 uppercase text-[10px] font-bold tracking-[0.18em] hover:opacity-80 transition-opacity">
                                CRIAR RASCUNHO ({selectedClientes.length} DESTINATÁRIO{selectedClientes.length !== 1 ? "S" : ""})
                            </button>
                        </form>

                        {/* LISTA DE CAMPANHAS EXISTENTES */}
                        <div className="border-t border-black/10 pt-8">
                            <h3 className="text-[12px] font-bold uppercase tracking-widest mb-4">Campanhas Existentes ({campaigns.length})</h3>
                            <div className="flex flex-col gap-4">
                                {campaigns.map(c => {
                                    const s = getStatsFor(c.id);
                                    return (
                                        <div key={c.id} className="border border-black/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <strong className="text-base">{c.nome}</strong>
                                                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-[10px] uppercase tracking-wider text-black/60">
                                                    <span>Status: <strong className="text-black">{c.status}</strong></span>
                                                    <span>Remetente: {c.remetente_nome} &lt;{c.remetente_email}&gt;</span>
                                                    {c.agendada_para && <span>Agendada: {formatDate(c.agendada_para)}</span>}
                                                    {c.enviada_em && <span>Enviada: {formatDate(c.enviada_em)}</span>}
                                                    <span>Criada: {formatDate(c.created_at)}</span>
                                                </div>
                                                {s && s.total_destinatarios > 0 && (
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] uppercase tracking-wider">
                                                        <span>Fila: <strong>{s.total_destinatarios}</strong></span>
                                                        <span className="text-blue-600">Env: {s.enviados}</span>
                                                        <span className="text-green-600">Entreg: {s.entregues}</span>
                                                        <span className="text-emerald-600">Abert: {s.abertos}</span>
                                                        <span className="text-teal-600">Clic: {s.clicados}</span>
                                                        <span className="text-red-600">Rej: {s.rejeitados}</span>
                                                        <span className="text-orange-600">Falha: {s.falhas}</span>
                                                    </div>
                                                )}
                                            </div>
                                            {c.status === "rascunho" && (
                                                <button onClick={() => handleSendCampaign(c.id)}
                                                    className="shrink-0 bg-black text-white px-6 py-3 uppercase text-[9px] font-bold tracking-[0.1em] hover:opacity-80 transition-opacity">
                                                    ENVIAR AGORA
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                                {campaigns.length === 0 && <span className="text-black/50 text-sm">Nenhuma campanha.</span>}
                            </div>
                        </div>
                    </div>
                )}

                {/* ════════════ TAB: ESTATÍSTICAS ════════════ */}
                {activeTab === "stats" && (
                    <div className="flex flex-col gap-12">
                        <h2 className="text-[8vw] sm:text-[4vw] font-black uppercase leading-[0.9] tracking-tight">ESTATÍSTICAS</h2>

                        {stats.length === 0 ? (
                            <p className="text-sm text-black/50">Nenhuma estatística disponível. Crie e envie campanhas primeiro.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="text-[10px] uppercase tracking-widest border-b-2 border-black">
                                        <tr>
                                            <th className="py-3 pr-4">Campanha</th>
                                            <th className="py-3 pr-4">Status</th>
                                            <th className="py-3 pr-4 text-center">Fila</th>
                                            <th className="py-3 pr-4 text-center">Enviados</th>
                                            <th className="py-3 pr-4 text-center">Entregues</th>
                                            <th className="py-3 pr-4 text-center">Abertos</th>
                                            <th className="py-3 pr-4 text-center">Clicados</th>
                                            <th className="py-3 pr-4 text-center">Rejeitados</th>
                                            <th className="py-3 text-center">Falhas</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/10">
                                        {stats.map(s => (
                                            <tr key={s.campaign_id} className="hover:bg-black/[0.02] transition">
                                                <td className="py-3 pr-4 font-medium">{s.campanha}</td>
                                                <td className="py-3 pr-4 text-[10px] uppercase tracking-wider">{s.status}</td>
                                                <td className="py-3 pr-4 text-center">{s.total_destinatarios}</td>
                                                <td className="py-3 pr-4 text-center text-blue-600 font-bold">{s.enviados}</td>
                                                <td className="py-3 pr-4 text-center text-green-600 font-bold">{s.entregues}</td>
                                                <td className="py-3 pr-4 text-center text-emerald-600 font-bold">{s.abertos}</td>
                                                <td className="py-3 pr-4 text-center text-teal-600 font-bold">{s.clicados}</td>
                                                <td className="py-3 pr-4 text-center text-red-600 font-bold">{s.rejeitados}</td>
                                                <td className="py-3 text-center text-orange-600 font-bold">{s.falhas}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

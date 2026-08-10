import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { user } = useAuth();

    // Se já estiver logado, redireciona para o admin
    if (user) {
        return <Navigate to="/admin" replace />;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <section
            className="w-full bg-white text-black selection:bg-black selection:text-white flex items-center justify-center min-h-screen"
            style={{ fontFamily: "'Archivo Black', 'Inter', Helvetica, Arial, sans-serif" }}
        >
            <div className="w-full max-w-md p-8 sm:p-12 border-t border-b sm:border border-black/10">
                <h1 className="text-[8vw] sm:text-[32px] font-black uppercase leading-[0.9] tracking-tight mb-8 text-center">
                    ACESSO RESTRITO
                </h1>

                {errorMsg && (
                    <div className="mb-6 bg-black text-white px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-[10px] font-medium uppercase tracking-[0.18em] mb-2">E-mail Administrativo</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm"
                            placeholder="admin@dominio.com"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-medium uppercase tracking-[0.18em] mb-2">Senha</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="mt-4 w-full bg-black text-white px-6 py-4 uppercase text-[11px] font-bold tracking-[0.18em] hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                        {loading ? 'AUTENTICANDO...' : 'ENTRAR'}
                    </button>
                </form>
            </div>
        </section>
    );
}

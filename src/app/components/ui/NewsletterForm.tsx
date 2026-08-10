import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export const NewsletterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const { error } = await supabase
                .from('clientes')
                .insert([
                    { nome: name, email: email, aceita_marketing: true }
                ]);

            if (error) throw error;
            
            setStatus('success');
            setMessage('Obrigado por se inscrever!');
            setName('');
            setEmail('');
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Erro ao se inscrever. Tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input 
                type="text" 
                placeholder="Seu nome"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm sm:text-base placeholder-black/50"
            />
            <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm sm:text-base placeholder-black/50"
            />
            <button 
                type="submit" 
                disabled={status === 'loading'}
                className="mt-4 bg-black text-white px-6 py-4 uppercase text-[10px] sm:text-[11px] font-bold tracking-[0.18em] hover:opacity-80 transition-opacity disabled:opacity-50"
            >
                {status === 'loading' ? 'Inscrevendo...' : 'Inscrever na Newsletter'}
            </button>
            {message && (
                <p className={`mt-2 text-[11px] font-medium uppercase tracking-[0.1em] ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </form>
    );
};

import React from 'react';
import { User, Mail, Phone, Calendar, Dumbbell, Shield, Award, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { mockAlunos } from '../../lib/mockData';

export const AlunoPerfil: React.FC = () => {
  const { user } = useAuth();
  const aluno = mockAlunos[0];

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <User className="h-6 w-6 text-cyan-400" /> Meu Perfil
        </h1>
        <p className="text-xs text-slate-400">
          Dados cadastrais, frequência e matrícula na academia.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        
        {/* Avatar e Nome */}
        <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
          <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-black text-xl">
            JS
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Aluno Regular Ativo
            </span>
            <h2 className="text-xl font-black text-white mt-1">{user?.full_name || aluno.nome}</h2>
            <p className="text-xs text-slate-400">Academia FIT POWER CENTRO</p>
          </div>
        </div>

        {/* Informações Cadastrais */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-500" /> E-mail
            </span>
            <span className="font-semibold text-white">{user?.email || aluno.email}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-500" /> WhatsApp
            </span>
            <span className="font-semibold text-white">{aluno.whatsapp}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-500" /> Início da Matrícula
            </span>
            <span className="font-semibold text-white">10/01/2025</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-slate-500" /> Objetivo
            </span>
            <span className="font-semibold text-cyan-400">{aluno.objetivo}</span>
          </div>
        </div>

        {/* Informações de Segurança LGPD */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-200">
            <Shield className="h-3.5 w-3.5 text-emerald-400" /> Privacidade & LGPD
          </div>
          <p>
            Seus dados são protegidos por criptografia de ponta e isolamento seguro pela academia.
          </p>
        </div>

      </div>

    </div>
  );
};

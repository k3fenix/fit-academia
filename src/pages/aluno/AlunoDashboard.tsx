import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, Play, Calendar, Activity, Bell, CheckCircle2, Flame, Award, Clock } from 'lucide-react';
import { mockTreinos, mockAulas } from '../../lib/mockData';

export const AlunoDashboard: React.FC = () => {
  const treinoHoje = mockTreinos[0];
  const proximaAula = mockAulas[0];

  return (
    <div className="space-y-6">
      
      {/* Saudação e Status */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="h-4 w-4 text-amber-400" /> Frequência: 3 dias seguidos
          </div>
          <h1 className="text-2xl font-extrabold text-white">Pronto para o treino de hoje?</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-sm">
            Sua ficha atual é <strong>{treinoHoje?.nome}</strong>. Mantenha o foco e hidrate-se!
          </p>

          <div className="mt-5">
            <NavLink
              to="/aluno/treino"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition shadow-lg shadow-cyan-500/25"
            >
              <Play className="h-4 w-4 fill-slate-950" />
              <span>COMEÇAR TREINO AGORA</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Cards de Acesso Rápido */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Card Próxima Aula */}
        <NavLink to="/aluno/aulas" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
          <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
            <Calendar className="h-4 w-4" />
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Próxima Aula</span>
          <h4 className="font-bold text-sm text-white truncate">{proximaAula.titulo}</h4>
          <span className="text-xs text-amber-400 font-semibold mt-1 block">Hoje às 18:00</span>
        </NavLink>

        {/* Card Evolução Física */}
        <NavLink to="/aluno/progresso" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            <Activity className="h-4 w-4" />
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Última Avaliação</span>
          <h4 className="font-bold text-sm text-white">78.5 kg</h4>
          <span className="text-xs text-emerald-400 font-semibold mt-1 block">IMC: 24.7 (Normal)</span>
        </NavLink>

      </div>

      {/* Resumo do Treino do Dia */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-cyan-400" /> Exercícios de Hoje
          </h3>
          <span className="text-xs text-slate-400">{treinoHoje?.exercicios?.length} exercícios</span>
        </div>

        <div className="space-y-2.5">
          {treinoHoje?.exercicios?.map((item, idx) => (
            <div key={item.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-md bg-slate-900 text-slate-400 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">{item.exercicio?.nome}</h5>
                  <p className="text-[11px] text-slate-400">{item.series} séries × {item.repeticoes}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                <span>{item.descanso_seg}s</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { Activity, TrendingDown, TrendingUp, Scale, Calendar } from 'lucide-react';

export const AlunoProgresso: React.FC = () => {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Activity className="h-6 w-6 text-cyan-400" /> Minha Evolução Corporal
        </h1>
        <p className="text-xs text-slate-400">
          Acompanhe suas medidas, peso, percentual de gordura e histórico de avaliações físicas.
        </p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Peso Atual</span>
          <span className="text-xl font-black text-white">78.5 kg</span>
          <span className="text-[10px] text-emerald-400 font-bold block mt-1 flex items-center justify-center gap-0.5">
            <TrendingDown className="h-3 w-3" /> -1.8 kg
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Gordura Est.</span>
          <span className="text-xl font-black text-cyan-400">14.2%</span>
          <span className="text-[10px] text-emerald-400 font-bold block mt-1 flex items-center justify-center gap-0.5">
            <TrendingDown className="h-3 w-3" /> -1.2%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Massa Magra</span>
          <span className="text-xl font-black text-emerald-400">67.3 kg</span>
          <span className="text-[10px] text-emerald-400 font-bold block mt-1 flex items-center justify-center gap-0.5">
            <TrendingUp className="h-3 w-3" /> +0.9 kg
          </span>
        </div>
      </div>

      {/* Medidas Corporais */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-white">Medidas Corporais (Última Avaliação)</h3>
          <span className="text-xs text-slate-500">10/05/2025</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            { label: 'Tórax / Peito', val: '102 cm' },
            { label: 'Cintura', val: '81 cm' },
            { label: 'Braço Direito', val: '38.5 cm' },
            { label: 'Braço Esquerdo', val: '38.0 cm' },
            { label: 'Coxa Direita', val: '58.0 cm' },
            { label: 'Coxa Esquerda', val: '58.0 cm' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">{item.label}</span>
              <span className="font-bold text-white">{item.val}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

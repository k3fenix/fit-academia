import React from 'react';
import { Bell, CheckCircle2, Clock } from 'lucide-react';

export const AlunoNotificacoes: React.FC = () => {
  const notificacoes = [
    {
      id: 'n-1',
      titulo: 'Novo Treino A Prescrito',
      mensagem: 'O Prof. Carlos Silva atualizou sua ficha de Peito e Tríceps com novas cargas.',
      tempo: 'Há 2 horas',
      lida: false
    },
    {
      id: 'n-2',
      titulo: 'Aviso da Academia FIT POWER',
      mensagem: 'Hoje teremos aulão especial de Funcional às 18:00 com vagas limitadas no app!',
      tempo: 'Há 1 dia',
      lida: true
    },
    {
      id: 'n-3',
      titulo: 'Avaliação Física Agendada',
      mensagem: 'Sua reavaliação corporal periódica está programada para próxima semana.',
      tempo: 'Há 3 dias',
      lida: true
    }
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Bell className="h-6 w-6 text-cyan-400" /> Notificações
        </h1>
        <p className="text-xs text-slate-400">
          Avisos da sua academia, comunicados de professores e atualizações de treino.
        </p>
      </div>

      <div className="space-y-3">
        {notificacoes.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition ${
              item.lida ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                {!item.lida && <span className="h-2 w-2 rounded-full bg-cyan-400" />}
                {item.titulo}
              </h3>
              <span className="text-[10px] text-slate-500">{item.tempo}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{item.mensagem}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

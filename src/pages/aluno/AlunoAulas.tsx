import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { mockAulas } from '../../lib/mockData';
import { Aula } from '../../types';

export const AlunoAulas: React.FC = () => {
  const [aulas, setAulas] = useState<Aula[]>(mockAulas);
  const [bookedAulas, setBookedAulas] = useState<Record<string, boolean>>({});

  const handleToggleBooking = (aulaId: string) => {
    const isBooked = bookedAulas[aulaId];
    if (isBooked) {
      // Cancelar
      setBookedAulas({ ...bookedAulas, [aulaId]: false });
      setAulas(aulas.map(a => a.id === aulaId ? { ...a, vagas_ocupadas: a.vagas_ocupadas - 1 } : a));
    } else {
      // Agendar
      const aula = aulas.find(a => a.id === aulaId);
      if (aula && aula.vagas_ocupadas >= aula.limite_vagas) {
        alert('Esta aula está lotada!');
        return;
      }
      setBookedAulas({ ...bookedAulas, [aulaId]: true });
      setAulas(aulas.map(a => a.id === aulaId ? { ...a, vagas_ocupadas: a.vagas_ocupadas + 1 } : a));
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-cyan-400" /> Aulas Coletivas
        </h1>
        <p className="text-xs text-slate-400">
          Reserve sua vaga em aulas de Funcional, Spinning, Pilates e Cross training.
        </p>
      </div>

      <div className="space-y-4">
        {aulas.map((aula) => {
          const isBooked = bookedAulas[aula.id];
          const isFull = aula.vagas_ocupadas >= aula.limite_vagas;

          return (
            <div
              key={aula.id}
              className={`p-5 rounded-3xl border transition ${
                isBooked
                  ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-black text-white">{aula.titulo}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{aula.descricao}</p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isFull && !isBooked ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                }`}>
                  {isFull && !isBooked ? 'Lotada' : `${aula.vagas_ocupadas}/${aula.limite_vagas} Vagas`}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-300 py-3 border-y border-slate-800/80 my-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span>Hoje, 18:00 - 19:00</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-cyan-400" />
                  <span>Prof. {aula.professor_nome}</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                {isBooked ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <CheckCircle2 className="h-4 w-4" /> Vaga Garantida
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">Compareça com 10min de antecedência</span>
                )}

                <button
                  onClick={() => handleToggleBooking(aula.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${
                    isBooked
                      ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20'
                      : isFull
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  {isBooked ? 'Cancelar Reserva' : isFull ? 'Aula Lotada' : 'AGENDAR AULA'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

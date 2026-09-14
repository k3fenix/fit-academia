import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle2, RotateCcw, Clock, ArrowRight, ArrowLeft, Dumbbell } from 'lucide-react';
import { mockTreinos } from '../../lib/mockData';
import { NavLink } from 'react-router-dom';
import { ExercicioMedia } from '../../components/ExercicioMedia';

export const AlunoTreino: React.FC = () => {
  const treino = mockTreinos[0];
  const exercicios = treino?.exercicios || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  
  // Timer de Descanso
  const currentEx = exercicios[currentIndex];
  const defaultDescanso = currentEx?.descanso_seg || 60;
  const [timeLeft, setTimeLeft] = useState(defaultDescanso);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(currentEx?.descanso_seg || 60);
    setTimerRunning(false);
  }, [currentIndex]);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const handleMarkComplete = () => {
    if (!currentEx) return;
    setCompletedItems(prev => ({ ...prev, [currentEx.id]: true }));
    
    // Inicia o timer de descanso automaticamente após concluir o exercício
    setTimeLeft(currentEx.descanso_seg);
    setTimerRunning(true);

    if (currentIndex < exercicios.length - 1) {
      setTimeout(() => {
        setCurrentIndex(c => c + 1);
      }, 600);
    }
  };

  const isAllFinished = exercicios.every(ex => completedItems[ex.id]);

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      
      {/* Top Header com Progresso */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-cyan-400">Divisão {treino.divisao}</span>
          <h2 className="text-xl font-black text-white">{treino.nome}</h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-300">
            {currentIndex + 1} de {exercicios.length}
          </span>
          <div className="w-24 h-2 rounded-full bg-slate-800 mt-1 overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / exercicios.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {isAllFinished ? (
        <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
          <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-black text-white">Treino Finalizado com Sucesso!</h3>
          <p className="text-xs text-slate-400">
            Excelente trabalho! Seu histórico de treino foi computado e sincronizado com a academia.
          </p>
          <div className="pt-2">
            <NavLink
              to="/aluno"
              className="inline-block px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Voltar ao Início
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
          
          {/* Mídia do Exercício com GIF Animado */}
          {currentEx?.exercicio && (
            <div className="h-64 w-full bg-slate-950 relative overflow-hidden">
              <ExercicioMedia exercicio={currentEx.exercicio} className="h-full w-full" />
              <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-cyan-400 uppercase border border-cyan-500/20">
                {currentEx.exercicio.categoria}
              </span>
            </div>
          )}

          {/* Dados do Exercício Atual */}
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-2xl font-black text-white">{currentEx?.exercicio?.nome}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{currentEx?.exercicio?.descricao}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Séries</span>
                <span className="text-2xl font-extrabold text-white">{currentEx?.series}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Repetições</span>
                <span className="text-2xl font-extrabold text-cyan-400">{currentEx?.repeticoes}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Carga</span>
                <span className="text-base font-extrabold text-slate-200">{currentEx?.carga || 'Livre'}</span>
              </div>
            </div>

            {/* Cronômetro de Descanso */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Timer de Descanso</span>
                  <div className="text-xl font-black text-white font-mono">{timeLeft}s</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                >
                  {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setTimeLeft(currentEx?.descanso_seg || 60)}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Botão Concluir Exercício */}
            <button
              onClick={handleMarkComplete}
              className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span>CONCLUÍDO & PRÓXIMO EXERCÍCIO</span>
            </button>

            {/* Navegação Entre Exercícios */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(c => c - 1)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" /> Anterior
              </button>

              <button
                disabled={currentIndex === exercicios.length - 1}
                onClick={() => setCurrentIndex(c => c + 1)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white disabled:opacity-30"
              >
                Próximo <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

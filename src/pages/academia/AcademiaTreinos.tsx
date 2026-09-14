import React, { useState } from 'react';
import { 
  Dumbbell, 
  Plus, 
  User, 
  Clock, 
  CheckCircle2, 
  Send, 
  Trash2, 
  ArrowUpDown, 
  ChevronRight, 
  Search,
  X,
  Sparkles
} from 'lucide-react';
import { mockTreinos, mockAlunos, mockProfessores, mockExercicios } from '../../lib/mockData';
import { Treino, Exercicio, TreinoExercicioItem } from '../../types';
import { ExercicioMedia } from '../../components/ExercicioMedia';

export const AcademiaTreinos: React.FC = () => {
  const [treinos, setTreinos] = useState<Treino[]>(mockTreinos);
  const [selectedTreino, setSelectedTreino] = useState<Treino | null>(mockTreinos[0] || null);

  // Estados do Modal "MONTAR NOVO TREINO"
  const [isModalNovoTreinoOpen, setIsModalNovoTreinoOpen] = useState(false);
  const [alunoSelecionadoId, setAlunoSelecionadoId] = useState(mockAlunos[0]?.id || '');
  const [nomeTreino, setNomeTreino] = useState('');
  const [divisaoTreino, setDivisaoTreino] = useState('A');
  const [observacoesTreino, setObservacoesTreino] = useState('');
  const [exerciciosDoTreino, setExerciciosDoTreino] = useState<Array<{
    exercicio: Exercicio;
    series: number;
    repeticoes: string;
    carga: string;
    descanso_seg: number;
    observacao: string;
  }>>([]);

  // Seletor de exercícios para adicionar
  const [termoBuscaExercicio, setTermoBuscaExercicio] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [sucessoEnvio, setSucessoEnvio] = useState(false);

  // Adicionar exercício na montagem
  const handleAdicionarExercicioAoTreino = (ex: Exercicio) => {
    setExerciciosDoTreino([
      ...exerciciosDoTreino,
      {
        exercicio: ex,
        series: ex.series_padrao || 3,
        repeticoes: ex.repeticoes_padrao || '10 a 12',
        carga: '',
        descanso_seg: ex.descanso_seg || 60,
        observacao: ''
      }
    ]);
  };

  // Remover exercício da montagem
  const handleRemoverExercicio = (index: number) => {
    setExerciciosDoTreino(exerciciosDoTreino.filter((_, i) => i !== index));
  };

  // Alterar ordem (subir / descer)
  const handleMoverExercicio = (index: number, direction: 'up' | 'down') => {
    const newItems = [...exerciciosDoTreino];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setExerciciosDoTreino(newItems);
  };

  // Salvar e prescrever treino
  const handleSalvarTreino = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeTreino) return;

    const novoTreino: Treino = {
      id: `treino-${Date.now()}`,
      academia_id: 'acad-1',
      aluno_id: alunoSelecionadoId,
      professor_id: 'prof-1',
      nome: nomeTreino,
      divisao: divisaoTreino,
      ativo: true,
      observacoes: observacoesTreino,
      created_at: new Date().toISOString(),
      exercicios: exerciciosDoTreino.map((item, idx) => ({
        id: `te-${Date.now()}-${idx}`,
        treino_id: `treino-${Date.now()}`,
        exercicio_id: item.exercicio.id,
        exercicio: item.exercicio,
        series: item.series,
        repeticoes: item.repeticoes,
        carga: item.carga,
        descanso_seg: item.descanso_seg,
        ordem: idx + 1,
        observacao: item.observacao
      }))
    };

    setTreinos([novoTreino, ...treinos]);
    setSelectedTreino(novoTreino);
    setIsModalNovoTreinoOpen(false);
    setSucessoEnvio(true);
    setTimeout(() => setSucessoEnvio(false), 3000);

    // Limpa o formulário
    setNomeTreino('');
    setExerciciosDoTreino([]);
    setObservacoesTreino('');
  };

  // Filtro de exercícios para o modal
  const exerciciosFiltrados = mockExercicios.filter(ex => {
    const matchCat = categoriaFiltro === 'Todas' || ex.categoria === categoriaFiltro;
    const matchBusca = ex.nome.toLowerCase().includes(termoBuscaExercicio.toLowerCase());
    return matchCat && matchBusca;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-emerald-400" /> Prescrição & Fichas de Treino
          </h1>
          <p className="text-sm text-slate-400">
            Selecione o aluno, adicione exercícios da biblioteca oficial, ordene e envie o treino direto para o aplicativo.
          </p>
        </div>

        {/* BOTÃO MONTAR NOVO TREINO QUE ABRE O FLUXO COMPLETO */}
        <button
          onClick={() => {
            setIsModalNovoTreinoOpen(true);
            setNomeTreino('Treino B — Costas e Bíceps');
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>MONTAR NOVO TREINO</span>
        </button>
      </div>

      {sucessoEnvio && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Ficha de treino salva com sucesso e notificação enviada para o aplicativo do aluno!</span>
        </div>
      )}

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Esquerda: Fichas Prescritas */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Fichas no Sistema</h3>

          {treinos.map(t => {
            const aluno = mockAlunos.find(a => a.id === t.aluno_id);
            const isSelected = selectedTreino?.id === t.id;

            return (
              <div
                key={t.id}
                onClick={() => setSelectedTreino(t)}
                className={`p-4 rounded-2xl border cursor-pointer transition ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-white">{t.nome}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    Divisão {t.divisao}
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-500" /> Aluno: <strong className="text-slate-200">{aluno?.nome}</strong>
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {t.exercicios?.length || 0} exercícios prescritos
                </p>
              </div>
            );
          })}
        </div>

        {/* Coluna Direita: Visualização Detalhada da Ficha Selecionada */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">
          {selectedTreino ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Ficha Ativa</span>
                  <h2 className="text-xl font-extrabold text-white">{selectedTreino.nome}</h2>
                  <p className="text-xs text-slate-400 mt-1">{selectedTreino.observacoes}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Sincronizado com o App
                  </span>
                </div>
              </div>

              {/* Lista de Exercícios Prescritos */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Exercícios na Ficha ({selectedTreino.exercicios?.length || 0}):
                </h4>

                {selectedTreino.exercicios?.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs text-emerald-400">
                        {idx + 1}
                      </div>

                      {item.exercicio && (
                        <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                          <ExercicioMedia exercicio={item.exercicio} className="h-full w-full" />
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-bold text-white">{item.exercicio?.nome}</h4>
                        <p className="text-xs text-slate-400">
                          {item.series} séries × {item.repeticoes} • Carga: <span className="text-slate-200 font-semibold">{item.carga || 'Livre'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <Clock className="h-4 w-4 text-emerald-400" />
                      <span>{item.descanso_seg}s descanso</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 text-sm">
              Selecione uma ficha de treino para ver os exercícios
            </div>
          )}
        </div>

      </div>

      {/* MODAL COMPLETO: PRESCRIÇÃO E MONTAGEM DE TREINO */}
      {isModalNovoTreinoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Montar & Prescrever Nova Ficha de Treino</h3>
                  <p className="text-xs text-slate-400">Adicione exercícios, regule cargas e envie diretamente para o aluno</p>
                </div>
              </div>
              <button onClick={() => setIsModalNovoTreinoOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSalvarTreino} className="space-y-6">
              
              {/* Dados do Treino e Aluno */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Selecione o Aluno *</label>
                  <select
                    value={alunoSelecionadoId}
                    onChange={(e) => setAlunoSelecionadoId(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-white font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    {mockAlunos.map(a => (
                      <option key={a.id} value={a.id}>{a.nome} ({a.objetivo || 'Geral'})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nome da Ficha *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Treino A — Peitoral e Tríceps"
                    value={nomeTreino}
                    onChange={(e) => setNomeTreino(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Divisão</label>
                  <select
                    value={divisaoTreino}
                    onChange={(e) => setDivisaoTreino(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-white font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="A">Divisão A</option>
                    <option value="B">Divisão B</option>
                    <option value="C">Divisão C</option>
                    <option value="D">Divisão D</option>
                    <option value="E">Divisão E</option>
                  </select>
                </div>
              </div>

              {/* Seletor Rápido de Exercícios da Biblioteca Oficial */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                    Buscar e Adicionar Exercício da Biblioteca Oficial
                  </h4>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={categoriaFiltro}
                      onChange={(e) => setCategoriaFiltro(e.target.value)}
                      className="rounded-xl bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value="Todas">Todas as Categorias</option>
                      <option value="Peitoral">Peitoral</option>
                      <option value="Costas">Costas</option>
                      <option value="Pernas">Pernas</option>
                      <option value="Glúteos">Glúteos</option>
                      <option value="Bíceps">Bíceps</option>
                      <option value="Tríceps">Tríceps</option>
                      <option value="Ombros">Ombros</option>
                      <option value="Cardio / Funcional">Cardio / Funcional</option>
                      <option value="Abdômen">Abdômen</option>
                    </select>

                    <div className="relative flex-1 sm:w-48">
                      <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Buscar..."
                        value={termoBuscaExercicio}
                        onChange={(e) => setTermoBuscaExercicio(e.target.value)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-8 pr-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Lista rolável de exercícios disponíveis para clique rápido */}
                <div className="max-h-48 overflow-y-auto divide-y divide-slate-800/60 border border-slate-800 rounded-xl">
                  {exerciciosFiltrados.slice(0, 15).map(ex => (
                    <div key={ex.id} className="p-2.5 flex items-center justify-between hover:bg-slate-900/60 transition gap-2">
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="h-9 w-9 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                          <ExercicioMedia exercicio={ex} className="h-full w-full" />
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-xs text-white truncate block">{ex.nome}</span>
                          <span className="text-[10px] text-slate-500 block truncate">{ex.categoria} • {ex.equipamento}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAdicionarExercicioAoTreino(ex)}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0"
                      >
                        + Adicionar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lista de Exercícios Adicionados ao Treino com Ordenação */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">
                  Exercícios na Ficha ({exerciciosDoTreino.length})
                </h4>

                {exerciciosDoTreino.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center text-slate-500 text-xs">
                    Nenhum exercício adicionado ainda. Busque acima e clique em <strong>+ Adicionar</strong>.
                  </div>
                ) : (
                  exerciciosDoTreino.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 font-bold text-sm text-white">
                          <span className="h-6 w-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-emerald-400">
                            {idx + 1}
                          </span>
                          <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                            <ExercicioMedia exercicio={item.exercicio} className="h-full w-full" />
                          </div>
                          <span>{item.exercicio.nome}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoverExercicio(idx, 'up')}
                            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 text-xs"
                            title="Subir Ordem"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            disabled={idx === exerciciosDoTreino.length - 1}
                            onClick={() => handleMoverExercicio(idx, 'down')}
                            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 text-xs"
                            title="Descer Ordem"
                          >
                            ▼
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoverExercicio(idx)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs ml-2"
                            title="Remover"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Configuração de Séries, Repetições, Carga e Descanso */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <label className="text-slate-500 block mb-1">Séries</label>
                          <input
                            type="number"
                            value={item.series}
                            onChange={(e) => {
                              const newItems = [...exerciciosDoTreino];
                              newItems[idx].series = Number(e.target.value);
                              setExerciciosDoTreino(newItems);
                            }}
                            className="w-full rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-white"
                          />
                        </div>

                        <div>
                          <label className="text-slate-500 block mb-1">Repetições</label>
                          <input
                            type="text"
                            value={item.repeticoes}
                            onChange={(e) => {
                              const newItems = [...exerciciosDoTreino];
                              newItems[idx].repeticoes = e.target.value;
                              setExerciciosDoTreino(newItems);
                            }}
                            className="w-full rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-white"
                          />
                        </div>

                        <div>
                          <label className="text-slate-500 block mb-1">Carga (kg)</label>
                          <input
                            type="text"
                            placeholder="Ex: 20kg"
                            value={item.carga}
                            onChange={(e) => {
                              const newItems = [...exerciciosDoTreino];
                              newItems[idx].carga = e.target.value;
                              setExerciciosDoTreino(newItems);
                            }}
                            className="w-full rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-white"
                          />
                        </div>

                        <div>
                          <label className="text-slate-500 block mb-1">Descanso (seg)</label>
                          <input
                            type="number"
                            value={item.descanso_seg}
                            onChange={(e) => {
                              const newItems = [...exerciciosDoTreino];
                              newItems[idx].descanso_seg = Number(e.target.value);
                              setExerciciosDoTreino(newItems);
                            }}
                            className="w-full rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div>
                <label className="block font-semibold text-xs text-slate-300 mb-1">Observações do Treino</label>
                <textarea
                  rows={2}
                  placeholder="Orientações de aquecimento, intensidade ou observações médicas..."
                  value={observacoesTreino}
                  onChange={(e) => setObservacoesTreino(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalNovoTreinoOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={exerciciosDoTreino.length === 0}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs disabled:opacity-40 shadow-lg shadow-emerald-500/20"
                >
                  <Send className="h-4 w-4" />
                  <span>SALVAR & ENVIAR AO ALUNO</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, User, Users, CheckCircle, X, Trash2 } from 'lucide-react';
import { mockAulas, mockProfessores } from '../../lib/mockData';
import { Aula } from '../../types';

export const AcademiaAgenda: React.FC = () => {
  const [aulas, setAulas] = useState<Aula[]>(mockAulas);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    professor_id: mockProfessores[0]?.id || '',
    limite_vagas: 15,
    horario_inicio: '18:00',
    horario_fim: '19:00'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo) return;

    const prof = mockProfessores.find(p => p.id === formData.professor_id);

    const newAula: Aula = {
      id: `aula-${Date.now()}`,
      academia_id: 'acad-1',
      professor_id: formData.professor_id,
      professor_nome: prof?.nome || 'Carlos Silva',
      titulo: formData.titulo,
      descricao: formData.descricao,
      data_hora_inicio: new Date().toISOString(),
      data_hora_fim: new Date().toISOString(),
      limite_vagas: Number(formData.limite_vagas),
      vagas_ocupadas: 0,
      status: 'agendada'
    };

    setAulas([...aulas, newAula]);
    setIsModalOpen(false);
    setFormData({
      titulo: '',
      descricao: '',
      professor_id: mockProfessores[0]?.id || '',
      limite_vagas: 15,
      horario_inicio: '18:00',
      horario_fim: '19:00'
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente cancelar esta aula?')) {
      setAulas(aulas.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-emerald-400" /> Grade de Aulas Coletivas & Agendamentos
          </h1>
          <p className="text-sm text-slate-400">
            Cadastre aulas de Funcional, Spinning, Pilates e controle a presença e limite de vagas dos alunos.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>NOVA AULA COLETIVA</span>
        </button>
      </div>

      {/* Grid de Aulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aulas.map(aula => (
          <div key={aula.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  {aula.status === 'agendada' ? 'Confirmada' : 'Em Andamento'}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">{aula.titulo}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{aula.descricao}</p>
              </div>

              <button
                onClick={() => handleDelete(aula.id)}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition"
                title="Cancelar Aula"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>Hoje • 18:00 às 19:00</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <User className="h-4 w-4 text-emerald-400" />
                <span>Prof. {aula.professor_nome}</span>
              </div>
            </div>

            {/* Ocupação e Barra de Lotação */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-slate-500" /> Alunos Inscritos:
                </span>
                <span className="text-white">
                  <strong>{aula.vagas_ocupadas}</strong> / {aula.limite_vagas} vagas
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    aula.vagas_ocupadas >= aula.limite_vagas ? 'bg-rose-500' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, (aula.vagas_ocupadas / aula.limite_vagas) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Cadastro de Aula */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleSave} className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Criar Nova Aula Coletiva</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Título da Aula *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Treinamento Funcional / Spinning Power"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Professor Responsável *</label>
                <select
                  value={formData.professor_id}
                  onChange={(e) => setFormData({ ...formData, professor_id: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  {mockProfessores.map(p => (
                    <option key={p.id} value={p.id}>{p.nome} — {p.especialidade}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Limite Máximo de Vagas</label>
                <input
                  type="number"
                  value={formData.limite_vagas}
                  onChange={(e) => setFormData({ ...formData, limite_vagas: Number(e.target.value) })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Descrição / Instruções</label>
                <textarea
                  rows={2}
                  placeholder="Trazer garrafa d'água e toalha individual..."
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition"
              >
                Publicar Aula
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

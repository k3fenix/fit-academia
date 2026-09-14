import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Dumbbell, 
  Activity,
  Phone,
  Mail
} from 'lucide-react';
import { mockAlunos } from '../../lib/mockData';
import { Aluno } from '../../types';

export const AcademiaAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>(mockAlunos);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlunoId, setEditingAlunoId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    data_nascimento: '',
    sexo: 'M' as 'M' | 'F' | 'Outro',
    whatsapp: '',
    email: '',
    objetivo: '',
    peso: '',
    altura: '',
    status: 'active' as 'active' | 'inactive' | 'suspended'
  });

  const handleOpenAdd = () => {
    setEditingAlunoId(null);
    setFormData({
      nome: '',
      cpf: '',
      data_nascimento: '',
      sexo: 'M',
      whatsapp: '',
      email: '',
      objetivo: '',
      peso: '',
      altura: '',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (aluno: Aluno) => {
    setEditingAlunoId(aluno.id);
    setFormData({
      nome: aluno.nome,
      cpf: aluno.cpf || '',
      data_nascimento: aluno.data_nascimento || '',
      sexo: aluno.sexo || 'M',
      whatsapp: aluno.whatsapp,
      email: aluno.email,
      objetivo: aluno.objetivo || '',
      peso: aluno.peso ? String(aluno.peso) : '',
      altura: aluno.altura ? String(aluno.altura) : '',
      status: aluno.status
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.whatsapp || !formData.email) return;

    if (editingAlunoId) {
      setAlunos(alunos.map(a => a.id === editingAlunoId ? {
        ...a,
        ...formData,
        peso: formData.peso ? parseFloat(formData.peso) : undefined,
        altura: formData.altura ? parseFloat(formData.altura) : undefined
      } : a));
    } else {
      const newAluno: Aluno = {
        id: `aluno-${Date.now()}`,
        academia_id: 'acad-1',
        nome: formData.nome,
        cpf: formData.cpf,
        data_nascimento: formData.data_nascimento,
        sexo: formData.sexo,
        whatsapp: formData.whatsapp,
        email: formData.email,
        objetivo: formData.objetivo,
        peso: formData.peso ? parseFloat(formData.peso) : undefined,
        altura: formData.altura ? parseFloat(formData.altura) : undefined,
        data_entrada: new Date().toISOString().split('T')[0],
        status: formData.status,
        created_at: new Date().toISOString()
      };
      setAlunos([...alunos, newAluno]);
    }
    setIsModalOpen(false);
  };

  // Regra de preservação de histórico: desativar em vez de deletar fisicamente
  const handleToggleStatus = (id: string) => {
    setAlunos(alunos.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'active' ? 'inactive' : 'active';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const filteredAlunos = alunos.filter(a => {
    const matchesSearch = 
      a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.whatsapp.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-emerald-400" /> Gestão de Alunos
          </h1>
          <p className="text-sm text-slate-400">
            Cadastre novos alunos, controle de status ativo/inativo para a regra de cobrança e histórico.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
        >
          <UserPlus className="h-4 w-4" />
          <span>NOVO ALUNO</span>
        </button>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por nome, WhatsApp ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Alunos Ativos (Contabilizados)</option>
            <option value="inactive">Inativos / Desativados</option>
          </select>
        </div>
      </div>

      {/* Tabela de Alunos */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Aluno</th>
                <th className="py-3 px-4">Contato</th>
                <th className="py-3 px-4">Objetivo / Medidas</th>
                <th className="py-3 px-4 text-center">Cobrança R$ 19,90</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredAlunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{aluno.nome}</div>
                    <div className="text-[11px] text-slate-500">CPF: {aluno.cpf || 'Não informado'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200">{aluno.whatsapp}</div>
                    <div className="text-[11px] text-slate-500">{aluno.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-300 font-medium">{aluno.objetivo || 'Musculação geral'}</div>
                    <div className="text-[11px] text-slate-500">
                      {aluno.peso ? `${aluno.peso} kg` : '-'} • {aluno.altura ? `${aluno.altura} m` : '-'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {aluno.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Incluso na Cobrança
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500">
                        Não Cobrado
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(aluno.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                        aluno.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {aluno.status === 'active' ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(aluno)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                        title="Editar Aluno"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro / Edição de Aluno */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleSave} className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">
                {editingAlunoId ? 'Editar Cadastro do Aluno' : 'Novo Aluno da Academia'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-300 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">WhatsApp *</label>
                <input
                  type="text"
                  required
                  placeholder="(11) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">E-mail *</label>
                <input
                  type="email"
                  required
                  placeholder="aluno@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">CPF</label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="active">Ativo (Cobrança válida)</option>
                  <option value="inactive">Inativo (Não cobrado)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 75.5"
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Altura (m)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Ex: 1.75"
                  value={formData.altura}
                  onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-300 mb-1">Objetivo do Aluno</label>
                <input
                  type="text"
                  placeholder="Ex: Hipertrofia, emagrecimento, condicionamento"
                  value={formData.objetivo}
                  onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
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
                Salvar Aluno
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

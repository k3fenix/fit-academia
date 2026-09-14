import React, { useState } from 'react';
import {
  Users, Search, X, Filter, Eye, CheckCircle2,
  XCircle, Clock, Building2, TrendingUp, UserCheck, UserX
} from 'lucide-react';
import { mockAlunos, mockAcademias } from '../../lib/mockData';
import { Aluno } from '../../types';

type ModalAluno = Aluno & { academia_nome?: string };

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  active:    { label: 'Ativo',      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: <CheckCircle2 className="h-3 w-3" /> },
  inactive:  { label: 'Inativo',   color: 'bg-slate-600/20 text-slate-400 border-slate-500/20',       icon: <XCircle className="h-3 w-3" /> },
  suspended: { label: 'Suspenso',  color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',          icon: <Clock className="h-3 w-3" /> },
};

export const AdminAlunos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAcademia, setFilterAcademia] = useState('all');
  const [selected, setSelected] = useState<ModalAluno | null>(null);

  // Enriquecer alunos com nome da academia
  const alunosEnriquecidos: ModalAluno[] = mockAlunos.map(a => ({
    ...a,
    academia_nome: mockAcademias.find(ac => ac.id === a.academia_id)?.nome || '—',
  }));

  const totalAtivos   = alunosEnriquecidos.filter(a => a.status === 'active').length;
  const totalInativos = alunosEnriquecidos.filter(a => a.status === 'inactive').length;
  const totalSuspensos = alunosEnriquecidos.filter(a => a.status === 'suspended').length;

  const filtered = alunosEnriquecidos.filter(a => {
    const q = searchTerm.toLowerCase();
    const matchSearch = a.nome.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      (a.cpf || '').includes(q) ||
      (a.academia_nome || '').toLowerCase().includes(q);
    const matchStatus   = filterStatus   === 'all' || a.status     === filterStatus;
    const matchAcademia = filterAcademia === 'all' || a.academia_id === filterAcademia;
    return matchSearch && matchStatus && matchAcademia;
  });

  const calcIdade = (dataNasc?: string) => {
    if (!dataNasc) return '—';
    const diff = Date.now() - new Date(dataNasc).getTime();
    return Math.floor(diff / (365.25 * 24 * 3600 * 1000)) + ' anos';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Users className="text-indigo-400" /> Alunos SaaS
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Visão global de todos os alunos cadastrados na rede de academias.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Alunos',   value: alunosEnriquecidos.length, sub: 'na rede',          icon: <Users className="h-4 w-4"/>,      color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Ativos',         value: totalAtivos,                sub: 'cobrados R$19,90', icon: <UserCheck className="h-4 w-4"/>,  color: 'text-emerald-400',bg: 'bg-emerald-500/10' },
          { label: 'Inativos',       value: totalInativos,              sub: 'sem cobrança',     icon: <UserX className="h-4 w-4"/>,      color: 'text-slate-400',  bg: 'bg-slate-700/30' },
          { label: 'Academias',      value: mockAcademias.length,       sub: 'com alunos',       icon: <Building2 className="h-4 w-4"/>,  color: 'text-cyan-400',   bg: 'bg-cyan-500/10' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{kpi.label}</span>
              <div className={`h-7 w-7 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center`}>{kpi.icon}</div>
            </div>
            <p className={`text-2xl font-extrabold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[11px] text-slate-500 mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Filtros */}
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar aluno, e-mail, CPF..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-9 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-2.5 text-slate-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={filterAcademia}
              onChange={e => setFilterAcademia(e.target.value)}
              className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Todas as Academias</option>
              {mockAcademias.map(ac => (
                <option key={ac.id} value={ac.id}>{ac.nome}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
              <option value="suspended">Suspensos</option>
            </select>
            <span className="text-xs text-slate-400">{filtered.length} alunos</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Aluno</th>
                <th className="py-3 px-4">Academia</th>
                <th className="py-3 px-4">Contato</th>
                <th className="py-3 px-4 text-center">Idade</th>
                <th className="py-3 px-4 text-center">Entrada</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    Nenhum aluno encontrado.
                  </td>
                </tr>
              ) : filtered.map(aluno => {
                const cfg = STATUS_CONFIG[aluno.status] || STATUS_CONFIG['inactive'];
                return (
                  <tr key={aluno.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {aluno.nome.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{aluno.nome}</div>
                          <div className="text-[11px] text-slate-400">{aluno.cpf || 'CPF não informado'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-200">{aluno.academia_nome}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-300">{aluno.whatsapp}</div>
                      <div className="text-[11px] text-slate-400">{aluno.email}</div>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">
                      {calcIdade(aluno.data_nascimento)}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">
                      {aluno.data_entrada ? new Date(aluno.data_entrada).toLocaleDateString('pt-BR') : '—'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.color}`}>
                        {cfg.icon}{cfg.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelected(aluno)}
                        className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition"
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal detalhes aluno */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-extrabold text-xl">
                {selected.nome.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">{selected.nome}</h2>
                <p className="text-slate-400 text-xs">{selected.academia_nome}</p>
              </div>
              <button onClick={() => setSelected(null)} className="ml-auto text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                ['E-mail',     selected.email],
                ['WhatsApp',   selected.whatsapp],
                ['CPF',        selected.cpf || '—'],
                ['Idade',      calcIdade(selected.data_nascimento)],
                ['Sexo',       selected.sexo === 'M' ? 'Masculino' : selected.sexo === 'F' ? 'Feminino' : '—'],
                ['Peso',       selected.peso ? `${selected.peso} kg` : '—'],
                ['Altura',     selected.altura ? `${selected.altura} m` : '—'],
                ['Status',     STATUS_CONFIG[selected.status]?.label || selected.status],
                ['Entrada',    selected.data_entrada ? new Date(selected.data_entrada).toLocaleDateString('pt-BR') : '—'],
                ['Objetivo',   selected.objetivo || '—'],
              ].map(([k, v]) => (
                <div key={k} className="bg-slate-800 rounded-xl p-3">
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">{k}</p>
                  <p className="text-white font-semibold break-words">{v}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)} className="mt-5 w-full py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold transition">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

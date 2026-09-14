import React, { useState } from 'react';
import {
  Building2, Search, Lock, Unlock, Eye, Trash2,
  Plus, CheckCircle2, AlertTriangle, Clock, XCircle,
  Users, DollarSign, TrendingUp, Filter, X
} from 'lucide-react';
import { mockAcademias } from '../../lib/mockData';
import { Academia } from '../../types';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  active:   { label: 'Ativa',         color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: <CheckCircle2 className="h-3 w-3" /> },
  trial:    { label: '15 Dias Grátis', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',    icon: <Clock className="h-3 w-3" /> },
  past_due: { label: 'Vencida',        color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',        icon: <AlertTriangle className="h-3 w-3" /> },
  blocked:  { label: 'Bloqueada',      color: 'bg-slate-600/20 text-slate-400 border-slate-500/20',     icon: <XCircle className="h-3 w-3" /> },
};

type ModalAcademia = Academia & { editing?: boolean };

export const AdminAcademias: React.FC = () => {
  const [academias, setAcademias] = useState<Academia[]>(mockAcademias);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAcademia, setSelectedAcademia] = useState<ModalAcademia | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const totalAlunos = academias.reduce((acc, a) => acc + (a.alunos_count || 0), 0);
  const mrr = academias.filter(a => a.status === 'active').reduce((acc, a) => acc + (a.alunos_count || 0) * 19.90, 0);

  const filtered = academias.filter(a => {
    const q = searchTerm.toLowerCase();
    const matchSearch = a.nome.toLowerCase().includes(q) ||
      a.responsavel_nome.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      (a.cidade || '').toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id: string) => {
    setAcademias(prev => prev.map(a => {
      if (a.id !== id) return a;
      return { ...a, status: a.status === 'blocked' ? 'active' : 'blocked' };
    }));
  };

  const deleteAcademia = (id: string) => {
    setAcademias(prev => prev.filter(a => a.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="text-indigo-400" />
            Academias
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Gerencie todas as academias cadastradas na plataforma.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition">
          <Plus className="h-4 w-4" /> Nova Academia
        </button>
      </div>

      {/* KPIs rápidos */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Academias', value: academias.length, sub: `${academias.filter(a=>a.status==='active').length} ativas`, icon: <Building2 className="h-4 w-4"/>, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Total Alunos',    value: totalAlunos,       sub: 'na rede',           icon: <Users className="h-4 w-4"/>,    color: 'text-cyan-400',   bg: 'bg-cyan-500/10' },
          { label: 'MRR (ativas)',    value: `R$ ${mrr.toLocaleString('pt-BR',{minimumFractionDigits:2})}`, sub: 'receita mensal', icon: <DollarSign className="h-4 w-4"/>, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Em Alerta',       value: academias.filter(a=>['past_due','blocked'].includes(a.status)).length, sub: 'vencidas/bloqueadas', icon: <AlertTriangle className="h-4 w-4"/>, color: 'text-rose-400', bg: 'bg-rose-500/10' },
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
        {/* Barra de busca */}
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 sm:max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar academia, responsável, cidade..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-2.5 text-slate-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativas</option>
              <option value="trial">Teste Grátis</option>
              <option value="past_due">Vencidas</option>
              <option value="blocked">Bloqueadas</option>
            </select>
            <span className="text-xs text-slate-400">{filtered.length} resultados</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Academia</th>
                <th className="py-3 px-4">Responsável</th>
                <th className="py-3 px-4 text-right">Alunos</th>
                <th className="py-3 px-4 text-right">Cobrança/mês</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Building2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    Nenhuma academia encontrada.
                  </td>
                </tr>
              ) : filtered.map(acad => {
                const cfg = STATUS_CONFIG[acad.status] || STATUS_CONFIG['active'];
                const cobranca = (acad.alunos_count || 0) * 19.90;
                return (
                  <tr key={acad.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{acad.nome}</div>
                      <div className="text-[11px] text-slate-400">{acad.cidade} - {acad.estado} • {acad.cnpj_cpf}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-200 font-medium">{acad.responsavel_nome}</div>
                      <div className="text-[11px] text-slate-400">{acad.email}</div>
                      <div className="text-[11px] text-slate-400">{acad.whatsapp}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-200">
                      {acad.alunos_count || 0}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-400">
                      R$ {cobranca.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.color}`}>
                        {cfg.icon}{cfg.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedAcademia(acad)}
                          title="Ver detalhes"
                          className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleStatus(acad.id)}
                          title={acad.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}
                          className={`p-1.5 rounded-lg transition ${acad.status === 'blocked' ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'}`}
                        >
                          {acad.status === 'blocked' ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(acad.id)}
                          title="Remover academia"
                          className="p-1.5 rounded-lg bg-slate-700/40 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Detalhes da academia */}
      {selectedAcademia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">{selectedAcademia.nome}</h2>
                <p className="text-slate-400 text-xs mt-0.5">{selectedAcademia.cidade} - {selectedAcademia.estado}</p>
              </div>
              <button onClick={() => setSelectedAcademia(null)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                ['Responsável', selectedAcademia.responsavel_nome],
                ['E-mail', selectedAcademia.email],
                ['WhatsApp', selectedAcademia.whatsapp],
                ['CNPJ/CPF', selectedAcademia.cnpj_cpf],
                ['Alunos Ativos', String(selectedAcademia.alunos_count || 0)],
                ['Cobrança Mensal', `R$ ${((selectedAcademia.alunos_count||0)*19.90).toLocaleString('pt-BR',{minimumFractionDigits:2})}`],
                ['Status', STATUS_CONFIG[selectedAcademia.status]?.label || selectedAcademia.status],
                ['Cadastro', new Date(selectedAcademia.created_at || '').toLocaleDateString('pt-BR')],
              ].map(([k,v]) => (
                <div key={k} className="bg-slate-800 rounded-xl p-3">
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">{k}</p>
                  <p className="text-white font-semibold">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => { toggleStatus(selectedAcademia.id); setSelectedAcademia(null); }}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${selectedAcademia.status === 'blocked' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-rose-600 hover:bg-rose-500 text-white'}`}
              >
                {selectedAcademia.status === 'blocked' ? 'Desbloquear Academia' : 'Bloquear Academia'}
              </button>
              <button onClick={() => setSelectedAcademia(null)} className="flex-1 py-2 rounded-xl text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-white transition">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirmar exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-rose-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Remover Academia?</h3>
              <p className="text-slate-400 text-sm">Esta ação não pode ser desfeita. Todos os dados associados serão removidos.</p>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold transition">Cancelar</button>
              <button onClick={() => deleteAcademia(showDeleteConfirm)} className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition">Remover</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

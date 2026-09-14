import React, { useState } from 'react';
import {
  CreditCard, CheckCircle2, AlertTriangle, Clock, XCircle,
  Building2, Users, DollarSign, TrendingUp, Eye, X,
  Search, Filter, RefreshCw, Lock, Unlock
} from 'lucide-react';
import { mockAcademias } from '../../lib/mockData';
import { Academia } from '../../types';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  active:   { label: 'Ativa',          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: <CheckCircle2 className="h-3 w-3" /> },
  trial:    { label: '15 Dias Grátis', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',       icon: <Clock className="h-3 w-3" /> },
  past_due: { label: 'Vencida',        color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',          icon: <AlertTriangle className="h-3 w-3" /> },
  blocked:  { label: 'Bloqueada',      color: 'bg-slate-600/20 text-slate-400 border-slate-500/20',       icon: <XCircle className="h-3 w-3" /> },
  canceled: { label: 'Cancelada',      color: 'bg-rose-900/30 text-rose-500 border-rose-900/30',          icon: <XCircle className="h-3 w-3" /> },
};

// Mock histórico de pagamentos por academia
const mockPagamentos = [
  { id: 'pag-1', academia_id: 'acad-1', academia: 'FIT POWER CENTRO', valor: 835.80, alunos: 42, metodo: 'PIX',           status: 'approved', data: '2025-05-01' },
  { id: 'pag-2', academia_id: 'acad-1', academia: 'FIT POWER CENTRO', valor: 756.20, alunos: 38, metodo: 'Cartão',        status: 'approved', data: '2025-04-01' },
  { id: 'pag-3', academia_id: 'acad-2', academia: 'CROSSFIT ELITE',   valor: 0,      alunos: 18, metodo: '—',             status: 'trial',    data: '2025-05-09' },
  { id: 'pag-4', academia_id: 'acad-3', academia: 'CORPO & RITMO',    valor: 1691.5, alunos: 85, metodo: 'PIX',           status: 'pending',  data: '2025-04-15' },
  { id: 'pag-5', academia_id: 'acad-3', academia: 'CORPO & RITMO',    valor: 1651.6, alunos: 83, metodo: 'Cartão',        status: 'approved', data: '2025-03-15' },
];

const PAG_STATUS: Record<string, { label: string; color: string }> = {
  approved: { label: 'Aprovado',  color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  pending:  { label: 'Pendente',  color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  trial:    { label: 'Em Teste',  color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  rejected: { label: 'Rejeitado', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
};

export const AdminAssinaturas: React.FC = () => {
  const [academias, setAcademias] = useState<Academia[]>(mockAcademias);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState<Academia | null>(null);
  const [tab, setTab] = useState<'assinaturas' | 'historico'>('assinaturas');

  const totalMRR = academias
    .filter(a => a.status === 'active')
    .reduce((acc, a) => acc + (a.alunos_count || 0) * 19.90, 0);
  const totalPrevisto = academias
    .reduce((acc, a) => acc + (a.alunos_count || 0) * 19.90, 0);
  const emTrial   = academias.filter(a => a.status === 'trial').length;
  const vencidas  = academias.filter(a => ['past_due', 'blocked'].includes(a.status)).length;

  const filtered = academias.filter(a => {
    const q = searchTerm.toLowerCase();
    const matchSearch = a.nome.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const toggleBlock = (id: string) => {
    setAcademias(prev => prev.map(a => {
      if (a.id !== id) return a;
      return { ...a, status: a.status === 'blocked' ? 'active' : 'blocked' };
    }));
  };

  const diasRestantes = (trial_until?: string) => {
    if (!trial_until) return 0;
    const diff = new Date(trial_until).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <CreditCard className="text-indigo-400" /> Assinaturas
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Gerencie planos, status de cobrança e histórico de pagamentos das academias.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'MRR (Ativas)',    value: `R$ ${totalMRR.toLocaleString('pt-BR',{minimumFractionDigits:2})}`,     sub: 'receita mensal real',      icon: <DollarSign className="h-4 w-4"/>, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'MRR Previsto',    value: `R$ ${totalPrevisto.toLocaleString('pt-BR',{minimumFractionDigits:2})}`, sub: 'se todas pagarem',         icon: <TrendingUp className="h-4 w-4"/>, color: 'text-indigo-400',  bg: 'bg-indigo-500/10' },
          { label: 'Em Teste (Trial)',value: emTrial,                                                                  sub: 'aguardando conversão',     icon: <Clock className="h-4 w-4"/>,      color: 'text-amber-400',   bg: 'bg-amber-500/10' },
          { label: 'Em Alerta',       value: vencidas,                                                                 sub: 'vencidas ou bloqueadas',   icon: <AlertTriangle className="h-4 w-4"/>,color:'text-rose-400',   bg: 'bg-rose-500/10' },
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

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-0">
        {(['assinaturas', 'historico'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition ${tab === t ? 'bg-slate-900 text-white border border-b-0 border-slate-700' : 'text-slate-400 hover:text-white'}`}
          >
            {t === 'assinaturas' ? 'Assinaturas por Academia' : 'Histórico de Pagamentos'}
          </button>
        ))}
      </div>

      {tab === 'assinaturas' ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {/* Filtros */}
          <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar academia..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
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
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Academia</th>
                  <th className="py-3 px-4 text-right">Alunos Ativos</th>
                  <th className="py-3 px-4 text-right">Valor/mês</th>
                  <th className="py-3 px-4 text-center">Plano</th>
                  <th className="py-3 px-4 text-center">Trial Restante</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map(acad => {
                  const cfg = STATUS_CONFIG[acad.status] || STATUS_CONFIG['active'];
                  const valor = (acad.alunos_count || 0) * 19.90;
                  const dias  = diasRestantes(acad.trial_until);
                  return (
                    <tr key={acad.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{acad.nome}</div>
                        <div className="text-[11px] text-slate-400">{acad.email}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-200">
                        {acad.alunos_count || 0}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-400">
                        R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.color}`}>
                          {cfg.icon}{cfg.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {acad.status === 'trial' ? (
                          <span className={`font-bold ${dias <= 3 ? 'text-rose-400' : 'text-amber-400'}`}>
                            {dias}d restantes
                          </span>
                        ) : <span className="text-slate-500">—</span>}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setSelected(acad)}
                            className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition"
                            title="Detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleBlock(acad.id)}
                            className={`p-1.5 rounded-lg transition ${acad.status === 'blocked' ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'}`}
                            title={acad.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}
                          >
                            {acad.status === 'blocked' ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
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
      ) : (
        /* Histórico de Pagamentos */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white">Histórico Global de Pagamentos SaaS</h2>
            <p className="text-xs text-slate-400 mt-0.5">Todos os pagamentos processados via Mercado Pago</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Academia</th>
                  <th className="py-3 px-4 text-right">Alunos</th>
                  <th className="py-3 px-4 text-right">Valor</th>
                  <th className="py-3 px-4 text-center">Método</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {mockPagamentos.map(pag => {
                  const cfg = PAG_STATUS[pag.status] || PAG_STATUS['pending'];
                  return (
                    <tr key={pag.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-semibold text-white">{pag.academia}</td>
                      <td className="py-3 px-4 text-right text-slate-300">{pag.alunos}</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-400">
                        {pag.valor > 0 ? `R$ ${pag.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—'}
                      </td>
                      <td className="py-3 px-4 text-center text-slate-300">{pag.metodo}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-slate-400">
                        {new Date(pag.data).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal detalhes */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-white">{selected.nome}</h2>
                <p className="text-slate-400 text-xs mt-0.5">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">Detalhes da Assinatura</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div><span className="text-slate-500">Alunos ativos:</span><span className="ml-1 text-white font-bold">{selected.alunos_count || 0}</span></div>
                  <div><span className="text-slate-500">Valor/mês:</span><span className="ml-1 text-emerald-400 font-bold">R$ {((selected.alunos_count||0)*19.90).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>
                  <div><span className="text-slate-500">Status:</span><span className="ml-1 text-white font-bold">{STATUS_CONFIG[selected.status]?.label}</span></div>
                  <div><span className="text-slate-500">Trial até:</span><span className="ml-1 text-amber-400 font-bold">{selected.trial_until ? new Date(selected.trial_until).toLocaleDateString('pt-BR') : '—'}</span></div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">Regra de Cobrança</p>
                <p className="text-xs text-slate-300">R$ 19,90 × {selected.alunos_count || 0} alunos ativos = <span className="text-emerald-400 font-bold">R$ {((selected.alunos_count||0)*19.90).toLocaleString('pt-BR',{minimumFractionDigits:2})}/mês</span></p>
              </div>
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

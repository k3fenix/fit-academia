import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Search,
  Filter,
  Eye,
  Lock,
  Unlock,
  Trash2
} from 'lucide-react';
import { mockAcademias } from '../../lib/mockData';
import { Academia } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [academias, setAcademias] = useState<Academia[]>(mockAcademias);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Cálculos globais de métricas SaaS
  const totalAcademias = academias.length;
  const academiasAtivas = academias.filter(a => a.status === 'active').length;
  const academiasTrial = academias.filter(a => a.status === 'trial').length;
  const academiasVencidas = academias.filter(a => a.status === 'past_due' || a.status === 'blocked').length;
  
  const totalAlunos = academias.reduce((acc, curr) => acc + (curr.alunos_count || 0), 0);
  const receitaMensal = academias
    .filter(a => a.status === 'active')
    .reduce((acc, curr) => acc + ((curr.alunos_count || 0) * 19.90), 0);
  
  const receitaPrevista = academias
    .reduce((acc, curr) => acc + ((curr.alunos_count || 0) * 19.90), 0);

  const toggleStatus = (id: string) => {
    setAcademias(academias.map(a => {
      if (a.id === id) {
        const newStatus = a.status === 'blocked' ? 'active' : 'blocked';
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  const filteredAcademias = academias.filter(a => {
    const matchesSearch = 
      a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.responsavel_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Painel Geral do SaaS</h1>
        <p className="text-sm text-slate-400">Visão executiva e controle de todas as academias cadastradas no FIT SAÚDE.</p>
      </div>

      {/* Grid de Métricas do Topo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Academias</span>
            <div className="h-8 w-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{totalAcademias}</span>
            <span className="text-xs text-emerald-400 font-semibold">{academiasAtivas} ativas</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
            <span className="text-amber-400 font-medium">{academiasTrial} em teste (15d)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Alunos na Rede</span>
            <div className="h-8 w-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{totalAlunos}</span>
            <span className="text-xs text-slate-400">alunos totais</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">Base para cobrança de R$ 19,90/mês</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Receita Mensal (MRR)</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">
              R$ {receitaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Previsto: R$ {receitaPrevista.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Assinaturas Alerta</span>
            <div className="h-8 w-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{academiasVencidas}</span>
            <span className="text-xs text-rose-400 font-semibold">vencidas / bloqueadas</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">Aguardando regularização Mercado Pago</p>
        </div>

      </div>

      {/* Tabela de Academias com Busca e Filtros */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Academias Cadastradas</h2>
            <p className="text-xs text-slate-400">Gerenciamento multi-tenant, visualização de alunos e assinaturas</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Campo de Busca */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar academia, responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Filtro de Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
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

        {/* Tabela Responsiva */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Academia</th>
                <th className="py-3 px-4">Responsável</th>
                <th className="py-3 px-4 text-right">Alunos Ativos</th>
                <th className="py-3 px-4 text-right">Mensalidade (R$ 19,90)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredAcademias.map((acad) => {
                const mensalidade = (acad.alunos_count || 0) * 19.90;
                return (
                  <tr key={acad.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{acad.nome}</div>
                      <div className="text-[11px] text-slate-400">{acad.cidade} - {acad.estado} • {acad.cnpj_cpf}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium">{acad.responsavel_nome}</div>
                      <div className="text-[11px] text-slate-400">{acad.email} • {acad.whatsapp}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-200">
                      {acad.alunos_count || 0} alunos
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-400">
                      R$ {mensalidade.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        acad.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : acad.status === 'trial'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {acad.status === 'trial' ? '15 Dias Grátis' : acad.status === 'active' ? 'Ativa' : 'Bloqueada'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleStatus(acad.id)}
                          title={acad.status === 'blocked' ? 'Desbloquear Academia' : 'Bloquear Academia'}
                          className={`p-1.5 rounded-lg transition ${
                            acad.status === 'blocked'
                              ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                          }`}
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

    </div>
  );
};

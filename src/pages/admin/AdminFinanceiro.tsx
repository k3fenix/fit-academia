import React, { useState } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, BarChart3,
  ArrowUpCircle, ArrowDownCircle, CheckCircle2, Clock,
  AlertTriangle, Search, Filter, X, Building2, Users
} from 'lucide-react';
import { mockAcademias } from '../../lib/mockData';

// ── Mock de receitas SaaS consolidadas ──────────────────────────────────────
const mockReceitas = [
  { id: 'r1', academia: 'FIT POWER CENTRO',  mes: 'Mai/2025', alunos: 42, valor: 835.80,  metodo: 'PIX',    status: 'pago',     data: '2025-05-01' },
  { id: 'r2', academia: 'FIT POWER CENTRO',  mes: 'Abr/2025', alunos: 38, valor: 756.20,  metodo: 'Cartão', status: 'pago',     data: '2025-04-01' },
  { id: 'r3', academia: 'FIT POWER CENTRO',  mes: 'Mar/2025', alunos: 35, valor: 696.50,  metodo: 'PIX',    status: 'pago',     data: '2025-03-01' },
  { id: 'r4', academia: 'CORPO & RITMO',      mes: 'Mai/2025', alunos: 85, valor: 1691.50, metodo: 'PIX',    status: 'pendente', data: '2025-05-15' },
  { id: 'r5', academia: 'CORPO & RITMO',      mes: 'Abr/2025', alunos: 83, valor: 1651.70, metodo: 'Cartão', status: 'pago',     data: '2025-04-15' },
  { id: 'r6', academia: 'CROSSFIT ELITE',     mes: 'Mai/2025', alunos: 18, valor: 0,        metodo: '—',      status: 'trial',    data: '2025-05-09' },
];

// ── Mock de despesas operacionais da plataforma ──────────────────────────────
const mockDespesas = [
  { id: 'd1', descricao: 'Supabase (Plano Pro)',         categoria: 'Infraestrutura', valor: 29.00,  status: 'pago',     data: '2025-05-01' },
  { id: 'd2', descricao: 'Netlify (Plano Business)',      categoria: 'Hospedagem',     valor: 19.00,  status: 'pago',     data: '2025-05-01' },
  { id: 'd3', descricao: 'Mercado Pago (Taxa Gateway)',   categoria: 'Pagamentos',     valor: 45.20,  status: 'pago',     data: '2025-05-05' },
  { id: 'd4', descricao: 'Google Workspace',              categoria: 'Comunicação',    valor: 18.00,  status: 'pendente', data: '2025-05-15' },
  { id: 'd5', descricao: 'Cloudflare (DNS + CDN)',        categoria: 'Infraestrutura', valor: 5.00,   status: 'pago',     data: '2025-05-01' },
];

const STATUS_PAG: Record<string, string> = {
  pago:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pendente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  trial:    'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  atrasado: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const LABEL_PAG: Record<string, string> = {
  pago: 'Pago', pendente: 'Pendente', trial: 'Em Teste', atrasado: 'Atrasado',
};

// Gera dados para mini-gráfico de barras (últimos 6 meses)
const chartData = [
  { mes: 'Dez',  receita: 1800 },
  { mes: 'Jan',  receita: 2100 },
  { mes: 'Fev',  receita: 2400 },
  { mes: 'Mar',  receita: 2750 },
  { mes: 'Abr',  receita: 3140 },
  { mes: 'Mai',  receita: 3720 },
];
const maxChart = Math.max(...chartData.map(d => d.receita));

export const AdminFinanceiro: React.FC = () => {
  const [tab, setTab] = useState<'receitas' | 'despesas' | 'mrr'>('receitas');
  const [searchTerm, setSearchTerm] = useState('');

  const totalReceitas = mockReceitas
    .filter(r => r.status === 'pago')
    .reduce((acc, r) => acc + r.valor, 0);
  const totalPendente = mockReceitas
    .filter(r => r.status === 'pendente')
    .reduce((acc, r) => acc + r.valor, 0);
  const totalDespesas = mockDespesas
    .filter(d => d.status === 'pago')
    .reduce((acc, d) => acc + d.valor, 0);
  const lucroLiquido  = totalReceitas - totalDespesas;

  const receitasFiltradas = mockReceitas.filter(r =>
    r.academia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.mes.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const despesasFiltradas = mockDespesas.filter(d =>
    d.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <DollarSign className="text-indigo-400" /> Financeiro SaaS
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Visão geral do MRR, receitas de assinaturas e despesas operacionais da plataforma.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Receita Confirmada', value: `R$ ${totalReceitas.toLocaleString('pt-BR',{minimumFractionDigits:2})}`, sub: 'pagamentos aprovados',   icon: <ArrowUpCircle className="h-4 w-4"/>,   color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'A Receber',          value: `R$ ${totalPendente.toLocaleString('pt-BR',{minimumFractionDigits:2})}`, sub: 'pagamentos pendentes',   icon: <Clock className="h-4 w-4"/>,           color: 'text-amber-400',   bg: 'bg-amber-500/10' },
          { label: 'Despesas Pagas',     value: `R$ ${totalDespesas.toLocaleString('pt-BR',{minimumFractionDigits:2})}`, sub: 'custos operacionais',    icon: <ArrowDownCircle className="h-4 w-4"/>, color: 'text-rose-400',    bg: 'bg-rose-500/10' },
          { label: 'Lucro Líquido',      value: `R$ ${lucroLiquido.toLocaleString('pt-BR',{minimumFractionDigits:2})}`,  sub: 'receita - despesas',     icon: <TrendingUp className="h-4 w-4"/>,      color: lucroLiquido >= 0 ? 'text-emerald-400' : 'text-rose-400', bg: lucroLiquido >= 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{kpi.label}</span>
              <div className={`h-7 w-7 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center`}>{kpi.icon}</div>
            </div>
            <p className={`text-xl font-extrabold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[11px] text-slate-500 mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800">
        {([
          { key: 'receitas',  label: 'Receitas SaaS' },
          { key: 'despesas',  label: 'Despesas Operacionais' },
          { key: 'mrr',       label: 'Evolução MRR' },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition ${tab === t.key ? 'bg-slate-900 text-white border border-b-0 border-slate-700' : 'text-slate-400 hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Receitas */}
      {tab === 'receitas' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar academia, mês..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <span className="text-xs text-slate-400">{receitasFiltradas.length} registros</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Academia</th>
                  <th className="py-3 px-4 text-center">Mês Ref.</th>
                  <th className="py-3 px-4 text-right">Alunos</th>
                  <th className="py-3 px-4 text-right">Valor</th>
                  <th className="py-3 px-4 text-center">Método</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {receitasFiltradas.map(r => (
                  <tr key={r.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-bold text-white">{r.academia}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{r.mes}</td>
                    <td className="py-3 px-4 text-right text-slate-300">{r.alunos}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-400">
                      {r.valor > 0 ? `R$ ${r.valor.toLocaleString('pt-BR',{minimumFractionDigits:2})}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{r.metodo}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_PAG[r.status]}`}>
                        {LABEL_PAG[r.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400">
                      {new Date(r.data).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-slate-700 bg-slate-950/40">
                <tr>
                  <td colSpan={3} className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Confirmado</td>
                  <td className="py-3 px-4 text-right font-extrabold text-emerald-400 text-sm">
                    R$ {totalReceitas.toLocaleString('pt-BR',{minimumFractionDigits:2})}
                  </td>
                  <td colSpan={3} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Despesas */}
      {tab === 'despesas' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar despesa ou categoria..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Descrição</th>
                  <th className="py-3 px-4">Categoria</th>
                  <th className="py-3 px-4 text-right">Valor</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {despesasFiltradas.map(d => (
                  <tr key={d.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-semibold text-white">{d.descricao}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">{d.categoria}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-rose-400">
                      R$ {d.valor.toLocaleString('pt-BR',{minimumFractionDigits:2})}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_PAG[d.status]}`}>
                        {LABEL_PAG[d.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400">
                      {new Date(d.data).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-slate-700 bg-slate-950/40">
                <tr>
                  <td colSpan={2} className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Despesas Pagas</td>
                  <td className="py-3 px-4 text-right font-extrabold text-rose-400 text-sm">
                    R$ {totalDespesas.toLocaleString('pt-BR',{minimumFractionDigits:2})}
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Tab: MRR (Gráfico) */}
      {tab === 'mrr' && (
        <div className="space-y-4">
          {/* Card gráfico */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Evolução do MRR</h2>
                <p className="text-xs text-slate-400">Últimos 6 meses — Receita Mensal Recorrente</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-emerald-400">R$ 3.720</p>
                <p className="text-xs text-emerald-300 flex items-center gap-1 justify-end">
                  <TrendingUp className="h-3 w-3" /> +18,5% vs mês anterior
                </p>
              </div>
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-3 h-40">
              {chartData.map((d, i) => {
                const pct = (d.receita / maxChart) * 100;
                const isLast = i === chartData.length - 1;
                return (
                  <div key={d.mes} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`text-[10px] font-bold ${isLast ? 'text-emerald-400' : 'text-slate-400'}`}>
                      R${(d.receita/1000).toFixed(1)}k
                    </span>
                    <div className="w-full relative rounded-t-md overflow-hidden" style={{ height: `${pct}%`, minHeight: 8 }}>
                      <div className={`absolute inset-0 rounded-t-md ${isLast ? 'bg-emerald-500' : 'bg-indigo-600/60'}`} />
                    </div>
                    <span className="text-[10px] text-slate-500">{d.mes}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sumário por academia */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">Contribuição por Academia</h3>
            <div className="space-y-3">
              {mockAcademias.map(ac => {
                const val = (ac.alunos_count || 0) * 19.90;
                const pct = totalReceitas > 0 ? Math.round((val / totalReceitas) * 100) : 0;
                return (
                  <div key={ac.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{ac.nome}</span>
                      <span className="text-emerald-400 font-bold">R$ {val.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500">{pct}% do faturamento total • {ac.alunos_count} alunos</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DRE simplificado */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">DRE Simplificado — Mai/2025</h3>
            <div className="space-y-2 text-xs">
              {[
                { label: '(+) Receita Bruta',        value: totalReceitas, color: 'text-emerald-400', bold: false },
                { label: '(+) A Receber (Pendente)',  value: totalPendente, color: 'text-amber-400',   bold: false },
                { label: '(-) Despesas Operacionais', value: -totalDespesas, color: 'text-rose-400',   bold: false },
                { label: '(=) Resultado Líquido',     value: lucroLiquido,  color: lucroLiquido >= 0 ? 'text-emerald-400' : 'text-rose-400', bold: true },
              ].map(item => (
                <div key={item.label} className={`flex justify-between items-center py-2 ${item.bold ? 'border-t-2 border-slate-700 pt-3 mt-1' : 'border-b border-slate-800/50'}`}>
                  <span className={`${item.bold ? 'font-bold text-white' : 'text-slate-400'}`}>{item.label}</span>
                  <span className={`font-bold ${item.color} ${item.bold ? 'text-base' : ''}`}>
                    R$ {Math.abs(item.value).toLocaleString('pt-BR',{minimumFractionDigits:2})}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

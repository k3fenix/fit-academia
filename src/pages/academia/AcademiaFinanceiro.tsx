import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Plus, Calendar, Filter, PieChart, Download } from 'lucide-react';
import { mockMovimentacoes } from '../../lib/mockData';
import { MovimentacaoFinanceira } from '../../types';

export const AcademiaFinanceiro: React.FC = () => {
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoFinanceira[]>(mockMovimentacoes);
  const [filterTipo, setFilterTipo] = useState<'todos' | 'receita' | 'despesa'>('todos');

  const totalReceitas = movimentacoes
    .filter(m => m.tipo === 'receita' && m.status === 'pago')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalDespesas = movimentacoes
    .filter(m => m.tipo === 'despesa')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const saldoLiquido = totalReceitas - totalDespesas;

  const filtered = movimentacoes.filter(m => {
    if (filterTipo === 'todos') return true;
    return m.tipo === filterTipo;
  });

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-400" /> Fluxo de Caixa & Financeiro da Academia
          </h1>
          <p className="text-sm text-slate-400">
            Controle de mensalidades de alunos, despesas operacionais e demonstrativo de resultado.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold">
            <Download className="h-4 w-4" />
            <span>Exportar Relatório</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20">
            <Plus className="h-4 w-4" />
            <span>NOVO LANÇAMENTO</span>
          </button>
        </div>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Receitas Recebidas</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Mensalidades pagas de alunos</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Despesas Totais</span>
            <div className="h-8 w-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <ArrowDownRight className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-400">
            R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Aluguel, energia, manutenção e contas</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Saldo Operacional</span>
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className={`text-3xl font-extrabold ${saldoLiquido >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
            R$ {saldoLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Receitas menos despesas do período</p>
        </div>

      </div>

      {/* Tabela de Lançamentos */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white">Extrato de Movimentações</h3>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterTipo('todos')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${filterTipo === 'todos' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterTipo('receita')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${filterTipo === 'receita' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'}`}
            >
              Receitas
            </button>
            <button
              onClick={() => setFilterTipo('despesa')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${filterTipo === 'despesa' ? 'bg-rose-500/20 text-rose-400' : 'text-slate-400'}`}
            >
              Despesas
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Descrição</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Vencimento</th>
                <th className="py-3 px-4 text-right">Valor</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map(mov => (
                <tr key={mov.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{mov.descricao}</div>
                    <div className="text-[11px] text-slate-500">{mov.fornecedor || 'Aluno'}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">{mov.categoria}</td>
                  <td className="py-3.5 px-4 text-slate-400">{mov.vencimento}</td>
                  <td className={`py-3.5 px-4 text-right font-bold ${mov.tipo === 'receita' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {mov.tipo === 'receita' ? '+' : '-'} R$ {mov.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      mov.status === 'pago' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {mov.status === 'pago' ? 'Pago' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

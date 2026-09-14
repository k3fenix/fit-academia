import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Dumbbell, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { mockAlunos, mockMovimentacoes, mockAulas } from '../../lib/mockData';
import { NavLink } from 'react-router-dom';

export const AcademiaDashboard: React.FC = () => {
  const alunosAtivos = mockAlunos.filter(a => a.status === 'active').length;
  const alunosTotais = mockAlunos.length;
  const aulasHoje = mockAulas.length;

  const totalReceitas = mockMovimentacoes
    .filter(m => m.tipo === 'receita' && m.status === 'pago')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalDespesas = mockMovimentacoes
    .filter(m => m.tipo === 'despesa')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const saldoMes = totalReceitas - totalDespesas;

  // Assinatura FIT SAÚDE (R$ 19,90 por aluno ativo)
  const valorAssinatura = alunosAtivos * 19.90;

  return (
    <div className="space-y-8">
      
      {/* Banner de Teste / Assinatura */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Período de Teste Gratuito em Andamento
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">
                12 Dias Restantes
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Alunos ativos para cálculo: <strong>{alunosAtivos}</strong> • Mensalidade prevista após o teste: <strong>R$ {valorAssinatura.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</strong> (R$ 19,90/aluno).
            </p>
          </div>
        </div>

        <NavLink
          to="/academia/assinatura"
          className="whitespace-nowrap px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20"
        >
          Ver Detalhes do Plano
        </NavLink>
      </div>

      {/* Grid de Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card Alunos */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Alunos Ativos</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{alunosAtivos}</span>
            <span className="text-xs text-slate-400">de {alunosTotais} cadastrados</span>
          </div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5" /> +2 novos alunos este mês
          </div>
        </div>

        {/* Card Aulas Hoje */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Aulas Hoje</span>
            <div className="h-8 w-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{aulasHoje}</span>
            <span className="text-xs text-slate-400">aulas agendadas</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">27 vagas preenchidas no total</p>
        </div>

        {/* Card Receitas Academia */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Receitas do Mês</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-400">
              R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Mensalidades recebidas</div>
        </div>

        {/* Card Despesas Academia */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Despesas do Mês</span>
            <div className="h-8 w-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-rose-400">
              R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Aluguel, energia e manutenção</div>
        </div>

      </div>

      {/* Ações Rápidas & Listas Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alunos Recentes */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-base">Alunos da Academia</h3>
            <NavLink to="/academia/alunos" className="text-xs text-emerald-400 hover:underline font-semibold">
              Gerenciar Todos →
            </NavLink>
          </div>

          <div className="divide-y divide-slate-800">
            {mockAlunos.map((aluno) => (
              <div key={aluno.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
                    {aluno.nome.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{aluno.nome}</h4>
                    <p className="text-xs text-slate-400">{aluno.whatsapp} • {aluno.objetivo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    aluno.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {aluno.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                  <NavLink
                    to="/academia/treinos"
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs"
                    title="Ficha de Treino"
                  >
                    <Dumbbell className="h-4 w-4" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Próximas Aulas Coletivas */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-base">Aulas do Dia</h3>
              <NavLink to="/academia/agenda" className="text-xs text-cyan-400 hover:underline font-semibold">
                Agenda Completa →
              </NavLink>
            </div>

            <div className="space-y-3">
              {mockAulas.map((aula) => (
                <div key={aula.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">{aula.titulo}</span>
                    <span className="text-xs text-cyan-400 font-semibold">{aula.vagas_ocupadas}/{aula.limite_vagas} vagas</span>
                  </div>
                  <p className="text-xs text-slate-400">Prof. {aula.professor_nome}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4">
            <NavLink
              to="/academia/alunos"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
            >
              <UserPlus className="h-4 w-4" />
              <span>CADASTRAR NOVO ALUNO</span>
            </NavLink>
          </div>
        </div>

      </div>

    </div>
  );
};

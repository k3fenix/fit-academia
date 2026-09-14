import React, { useState } from 'react';
import { Bell, Send, Users, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockAlunos } from '../../lib/mockData';

export const AcademiaNotificacoes: React.FC = () => {
  const [tipoEnvio, setTipoEnvio] = useState<'todos' | 'aluno'>('todos');
  const [selectedAlunoId, setSelectedAlunoId] = useState(mockAlunos[0]?.id || '');
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const [historico, setHistorico] = useState([
    {
      id: 'notif-1',
      titulo: 'Aulão Especial de Funcional',
      mensagem: 'Hoje às 18h teremos aula aberta para todos os alunos na sala principal!',
      tipo: 'todos',
      data: 'Hoje, 09:30',
      destinatario: 'Todos os Alunos'
    },
    {
      id: 'notif-2',
      titulo: 'Atualização de Ficha de Treino',
      mensagem: 'João, sua ficha de Treino A (Peito e Tríceps) foi atualizada pelo professor.',
      tipo: 'aluno',
      data: 'Ontem, 16:45',
      destinatario: 'João da Silva'
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !mensagem) return;

    const aluno = mockAlunos.find(a => a.id === selectedAlunoId);

    const novaNotif = {
      id: `notif-${Date.now()}`,
      titulo,
      mensagem,
      tipo: tipoEnvio,
      data: 'Agora',
      destinatario: tipoEnvio === 'todos' ? 'Todos os Alunos' : (aluno?.nome || 'Aluno')
    };

    setHistorico([novaNotif, ...historico]);
    setSentSuccess(true);
    setTitulo('');
    setMensagem('');
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Bell className="h-6 w-6 text-emerald-400" /> Central de Notificações & Avisos
        </h1>
        <p className="text-sm text-slate-400">
          Envie avisos broadcast para todos os alunos ou mensagens direcionadas com entrega direta no aplicativo do aluno.
        </p>
      </div>

      {sentSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Notificação enviada com sucesso e sincronizada no app dos alunos!
        </div>
      )}

      {/* Formulário de Envio */}
      <form onSubmit={handleSend} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">
          Nova Mensagem
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Destinatários</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTipoEnvio('todos')}
                className={`py-2 px-3 rounded-xl border font-bold transition flex items-center justify-center gap-1.5 ${
                  tipoEnvio === 'todos'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <Users className="h-4 w-4" /> Todos os Alunos
              </button>
              <button
                type="button"
                onClick={() => setTipoEnvio('aluno')}
                className={`py-2 px-3 rounded-xl border font-bold transition flex items-center justify-center gap-1.5 ${
                  tipoEnvio === 'aluno'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <User className="h-4 w-4" /> Aluno Específico
              </button>
            </div>
          </div>

          {tipoEnvio === 'aluno' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Selecione o Aluno</label>
              <select
                value={selectedAlunoId}
                onChange={(e) => setSelectedAlunoId(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                {mockAlunos.map(a => (
                  <option key={a.id} value={a.id}>{a.nome} — {a.email}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="text-xs space-y-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Título do Aviso *</label>
            <input
              type="text"
              required
              placeholder="Ex: Novo Treino Prescrito / Horário Especial no Feriado"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Conteúdo da Mensagem *</label>
            <textarea
              rows={3}
              required
              placeholder="Escreva a mensagem clara para exibição no aplicativo do aluno..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
          >
            <Send className="h-4 w-4" />
            <span>DISPARAR NOTIFICAÇÃO</span>
          </button>
        </div>
      </form>

      {/* Histórico de Envios */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-base text-white">Histórico Recente de Notificações</h3>

        <div className="space-y-3">
          {historico.map(item => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-white">{item.titulo}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">
                    {item.destinatario}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.mensagem}</p>
              </div>

              <span className="text-[11px] text-slate-500 shrink-0">{item.data}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

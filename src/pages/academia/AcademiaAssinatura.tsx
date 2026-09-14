import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  QrCode, 
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { mockAlunos } from '../../lib/mockData';

export const AcademiaAssinatura: React.FC = () => {
  // Alunos ativos para cobrança
  const alunosAtivos = mockAlunos.filter(a => a.status === 'active').length;
  const valorPorAluno = 19.90;
  const valorTotalMensal = alunosAtivos * valorPorAluno;

  const [diasRestantes, setDiasRestantes] = useState(12);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'card'>('pix');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'approved'>('idle');

  const handleSimularPagamento = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('approved');
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-white">Minha Assinatura FIT SAÚDE</h1>
        <p className="text-sm text-slate-400">
          Gerencie o plano da sua academia, acompanhe o período gratuito e realize pagamentos via Mercado Pago.
        </p>
      </div>

      {/* Banner de Teste 15 Dias */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="h-3.5 w-3.5" /> Período Gratuito Ativo
            </div>
            <h2 className="text-xl font-bold text-white">Seu período gratuito de 15 dias começou!</h2>
            <p className="text-xs text-slate-400 mt-1">
              Restam <strong>{diasRestantes} dias</strong> de teste gratuito com todas as funcionalidades liberadas.
            </p>
          </div>

          <button
            onClick={() => setShowCheckoutModal(true)}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 shrink-0"
          >
            <CreditCard className="h-4 w-4" />
            <span>ASSINAR ANTECIPADO / RENOVAR</span>
          </button>
        </div>
      </div>

      {/* Demonstrativo do Cálculo de Cobrança (R$ 19,90 por aluno ativo) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-base font-bold text-white">Cálculo Transparente de Cobrança</h3>
          <p className="text-xs text-slate-400">
            A cobrança é calculada automaticamente com base apenas nos alunos ativos cadastrados na sua academia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Alunos Ativos para Cobrança
            </span>
            <span className="text-3xl font-extrabold text-white">{alunosAtivos}</span>
            <span className="block text-[11px] text-slate-500 mt-1">Alunos desativados não são cobrados</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Valor por Aluno / Mês
            </span>
            <span className="text-3xl font-extrabold text-emerald-400">R$ {valorPorAluno.toFixed(2).replace('.', ',')}</span>
            <span className="block text-[11px] text-slate-500 mt-1">Preço único e fixo por licença</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block mb-1">
              Total Mensal Previsto
            </span>
            <span className="text-3xl font-extrabold text-emerald-300">
              R$ {valorTotalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="block text-[11px] text-emerald-400/80 mt-1">Calculado no vencimento</span>
          </div>

        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-2">
          <p className="font-bold text-slate-200">Como funciona a regra de cobrança?</p>
          <p>
            • Ao final dos 15 dias grátis, o sistema realiza uma contagem segura (snapshot) dos seus alunos com status <strong>ativo</strong>.<br />
            • Você escolhe pagar via <strong>PIX</strong> (aprovação instantânea) ou <strong>Cartão de Crédito</strong> pelo Mercado Pago.<br />
            • A confirmação é processada via Webhook seguro, atualizando seu status imediatamente sem risco de perda de dados.
          </p>
        </div>
      </div>

      {/* Modal de Checkout Mercado Pago */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Checkout Mercado Pago</h4>
                  <p className="text-[11px] text-slate-400">Ambiente Seguro FIT SAÚDE</p>
                </div>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Fechar
              </button>
            </div>

            {paymentStatus === 'approved' ? (
              <div className="text-center py-6 space-y-3">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-white text-lg">Pagamento Aprovado com Sucesso!</h4>
                <p className="text-xs text-slate-300">
                  Webhook do Mercado Pago processado. Sua assinatura está ativa pelos próximos 30 dias!
                </p>
                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setPaymentStatus('idle');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Concluir
                </button>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Total a Pagar (Referente a {alunosAtivos} alunos)</span>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                    R$ {valorTotalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Selecione o Método:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedMethod('pix')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                        selectedMethod === 'pix'
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <QrCode className="h-5 w-5" />
                      <span>PIX Instantâneo</span>
                    </button>

                    <button
                      onClick={() => setSelectedMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                        selectedMethod === 'card'
                          ? 'border-sky-500 bg-sky-500/10 text-sky-400'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Cartão de Crédito</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSimularPagamento}
                  disabled={paymentStatus === 'processing'}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  {paymentStatus === 'processing' ? 'Processando Webhook Mercado Pago...' : 'PAGAR AGORA COM MERCADO PAGO'}
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

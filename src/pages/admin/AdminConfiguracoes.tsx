import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Key, RefreshCw, Save, CheckCircle } from 'lucide-react';

export const AdminConfiguracoes: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [mpConfig, setMpConfig] = useState({
    publicKey: 'APP_USR-789012-345678-abcdef-test',
    accessToken: 'TEST-1234567890123456-091410-abcdef123456-123456789',
    clientId: '8493021948',
    clientSecret: 'shh_secret_mp_fitsaude',
    environment: 'sandbox' as 'sandbox' | 'production',
    webhookUrl: 'https://fitsaude.netlify.app/.netlify/functions/mercadopago-webhook'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-white">Configurações Gerais do SaaS</h1>
        <p className="text-sm text-slate-400">
          Credenciais do gateway de pagamentos Mercado Pago, regras de assinatura e webhooks.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> Configurações do Mercado Pago salvas com sucesso no banco de dados!
        </div>
      )}

      {/* Mercado Pago Gateway Card */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Integração Mercado Pago</h3>
              <p className="text-xs text-slate-400">Processamento de assinaturas via PIX e Cartão de Crédito</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Ambiente:</span>
            <select
              value={mpConfig.environment}
              onChange={(e) => setMpConfig({ ...mpConfig, environment: e.target.value as any })}
              className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="sandbox">Teste (Sandbox)</option>
              <option value="production">Produção</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Public Key *</label>
            <input
              type="text"
              required
              value={mpConfig.publicKey}
              onChange={(e) => setMpConfig({ ...mpConfig, publicKey: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Access Token (Protegido) *</label>
            <input
              type="password"
              required
              value={mpConfig.accessToken}
              onChange={(e) => setMpConfig({ ...mpConfig, accessToken: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Client ID</label>
            <input
              type="text"
              value={mpConfig.clientId}
              onChange={(e) => setMpConfig({ ...mpConfig, clientId: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Client Secret</label>
            <input
              type="password"
              value={mpConfig.clientSecret}
              onChange={(e) => setMpConfig({ ...mpConfig, clientSecret: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">URL do Webhook Netlify (Serverless)</label>
          <input
            type="text"
            readOnly
            value={mpConfig.webhookUrl}
            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3.5 py-2.5 text-xs text-slate-400 select-all"
          />
          <p className="mt-1.5 text-[11px] text-slate-500">
            Cadastre esta URL no portal de desenvolvedores do Mercado Pago para receber notificações instantâneas de pagamento.
          </p>
        </div>

        {/* Regra de Cobrança Padrão */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Regra de Cobrança Ativa</h4>
            <p className="text-xs text-slate-400">15 dias grátis + R$ 19,90 por aluno ativo / mês</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
            Fixado em R$ 19,90
          </span>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/20"
          >
            <Save className="h-4 w-4" />
            <span>SALVAR CONFIGURAÇÕES</span>
          </button>
        </div>

      </form>

    </div>
  );
};

import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Key, Save, CheckCircle, Lock, Eye, EyeOff, AlertCircle, User } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

export const AdminConfiguracoes: React.FC = () => {
  const { user, changePassword } = useAuth();

  // ── Mercado Pago ──────────────────────────────────────
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

  // ── Troca de Senha ────────────────────────────────────
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwLoading, setPwLoading]     = useState(false);
  const [pwResult, setPwResult]       = useState<{ ok: boolean; message: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwResult(null);

    if (pwForm.newPw !== pwForm.confirm) {
      setPwResult({ ok: false, message: 'A nova senha e a confirmação não conferem.' });
      return;
    }
    if (pwForm.newPw.length < 6) {
      setPwResult({ ok: false, message: 'A nova senha deve ter pelo menos 6 caracteres.' });
      return;
    }

    setPwLoading(true);
    const result = await changePassword(pwForm.current, pwForm.newPw);
    setPwResult(result);
    setPwLoading(false);

    if (result.ok) {
      setPwForm({ current: '', newPw: '', confirm: '' });
      setTimeout(() => setPwResult(null), 5000);
    }
  };

  const pwStrength = () => {
    const pw = pwForm.newPw;
    if (!pw) return null;
    if (pw.length < 6) return { level: 'Fraca', color: 'bg-rose-500', pct: '25%' };
    if (pw.length < 8)  return { level: 'Regular', color: 'bg-amber-500', pct: '50%' };
    if (/[A-Z]/.test(pw) && /\d/.test(pw)) return { level: 'Forte', color: 'bg-emerald-500', pct: '100%' };
    return { level: 'Boa', color: 'bg-indigo-500', pct: '75%' };
  };
  const strength = pwStrength();

  return (
    <div className="space-y-8 max-w-4xl">

      <div>
        <h1 className="text-2xl font-extrabold text-white">Configurações Gerais do SaaS</h1>
        <p className="text-sm text-slate-400">Credenciais do gateway de pagamentos, segurança da conta e webhooks.</p>
      </div>

      {/* ── SEÇÃO: TROCA DE SENHA ─────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Segurança da Conta Admin</h3>
            <p className="text-xs text-slate-400">Altere a senha de acesso ao painel administrativo</p>
          </div>
          {user && (
            <div className="ml-auto flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-1.5">
              <User className="h-4 w-4 text-indigo-400" />
              <span className="text-xs text-slate-300">{user.email}</span>
            </div>
          )}
        </div>

        {/* Feedback */}
        {pwResult && (
          <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
            pwResult.ok
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {pwResult.ok ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {pwResult.message}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Senha Atual */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Senha Atual</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                placeholder="Digite sua senha atual"
                value={pwForm.current}
                onChange={e => setPwForm({ ...pwForm, current: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition">
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Senha padrão inicial: <code className="text-amber-400 font-bold">admin123</code></p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nova Senha */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nova Senha</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={pwForm.newPw}
                  onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition">
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Força da senha */}
              {strength && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full ${strength.color} transition-all duration-300`} style={{ width: strength.pct }} />
                  </div>
                  <p className="text-[10px] text-slate-500">Força: <span className={`font-bold ${strength.color.replace('bg-', 'text-')}`}>{strength.level}</span></p>
                </div>
              )}
            </div>

            {/* Confirmar Nova Senha */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Confirmar Nova Senha</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Repita a nova senha"
                  value={pwForm.confirm}
                  onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })}
                  className={`w-full rounded-xl bg-slate-950 border py-2.5 text-sm text-white focus:outline-none pl-10 pr-10 ${
                    pwForm.confirm && pwForm.newPw !== pwForm.confirm
                      ? 'border-rose-500/50 focus:border-rose-500'
                      : 'border-slate-700 focus:border-indigo-500'
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {pwForm.confirm && pwForm.newPw !== pwForm.confirm && (
                <p className="mt-1 text-[11px] text-rose-400">As senhas não conferem.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={pwLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/20"
            >
              <Key className="h-4 w-4" />
              <span>{pwLoading ? 'Alterando...' : 'ALTERAR SENHA'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* ── SEÇÃO: MERCADO PAGO ───────────────────────────── */}
      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> Configurações do Mercado Pago salvas com sucesso!
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">

        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Integração Mercado Pago</h3>
              <p className="text-xs text-slate-400">Processamento de assinaturas via PIX e Cartão de Crédito</p>
            </div>
          </div>
          <select
            value={mpConfig.environment}
            onChange={e => setMpConfig({ ...mpConfig, environment: e.target.value as any })}
            className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="sandbox">Teste (Sandbox)</option>
            <option value="production">Produção</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Public Key *</label>
            <input type="text" required value={mpConfig.publicKey}
              onChange={e => setMpConfig({ ...mpConfig, publicKey: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Access Token (Protegido) *</label>
            <input type="password" required value={mpConfig.accessToken}
              onChange={e => setMpConfig({ ...mpConfig, accessToken: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Client ID</label>
            <input type="text" value={mpConfig.clientId}
              onChange={e => setMpConfig({ ...mpConfig, clientId: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Client Secret</label>
            <input type="password" value={mpConfig.clientSecret}
              onChange={e => setMpConfig({ ...mpConfig, clientSecret: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">URL do Webhook Netlify</label>
          <input type="text" readOnly value={mpConfig.webhookUrl}
            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3.5 py-2.5 text-xs text-slate-400 select-all" />
          <p className="mt-1.5 text-[11px] text-slate-500">
            Cadastre esta URL no portal de desenvolvedores do Mercado Pago para receber notificações instantâneas de pagamento.
          </p>
        </div>

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
          <button type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/20">
            <Save className="h-4 w-4" />
            <span>SALVAR CONFIGURAÇÕES</span>
          </button>
        </div>
      </form>
    </div>
  );
};

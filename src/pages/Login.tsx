import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Dumbbell, ShieldCheck, Building2, UserCheck, Lock, Mail, ArrowRight, Eye, EyeOff, Info } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { UserRole } from '../types';

const DEMO_LOGINS: { role: UserRole; label: string; email: string; password: string; color: string; icon: React.ReactNode }[] = [
  { role: 'admin',    label: 'Admin',    email: 'admin@fitsaude.com',          password: 'admin123',   color: 'indigo', icon: <ShieldCheck className="h-4 w-4" /> },
  { role: 'academia', label: 'Academia', email: 'contato@fitpower.com.br',      password: 'academia123',color: 'emerald',icon: <Building2 className="h-4 w-4" /> },
  { role: 'aluno',    label: 'Aluno',    email: 'joao.silva@email.com',         password: 'aluno123',   color: 'cyan',   icon: <UserCheck className="h-4 w-4" /> },
];

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roleSelection, setRoleSelection] = useState<UserRole>('academia');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showHint, setShowHint] = useState(false);

  const goTo = (role: UserRole) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'aluno') navigate('/aluno');
    else navigate('/academia');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const ok = await login(email, password, roleSelection);
      if (ok) {
        goTo(roleSelection);
      } else {
        setErrorMsg('E-mail ou senha incorretos. Verifique suas credenciais.');
      }
    } catch {
      setErrorMsg('Não foi possível realizar o login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: UserRole, demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setRoleSelection(role);
    setLoading(true);
    const ok = await login(demoEmail, demoPassword, role);
    setLoading(false);
    if (ok) goTo(role);
    else setErrorMsg('Erro ao entrar com perfil demo.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <NavLink to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Dumbbell className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold text-white">FIT <span className="text-emerald-400">SAÚDE</span></span>
        </NavLink>
        <h2 className="text-2xl font-extrabold text-white">Acesse sua Conta</h2>
        <p className="mt-1 text-sm text-slate-400">Entre com seu e-mail cadastrado ou selecione um perfil de demonstração</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">

        {/* Acesso Rápido Demo */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Acesso Rápido — Perfis Demo</p>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-slate-500 hover:text-slate-300 transition"
              title="Ver credenciais"
            >
              <Info className="h-4 w-4" />
            </button>
          </div>

          {showHint && (
            <div className="mb-3 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              {DEMO_LOGINS.map(d => (
                <div key={d.role} className="flex items-center gap-2 text-[11px]">
                  <span className="text-slate-400 w-16">{d.label}:</span>
                  <code className="text-slate-300">{d.email}</code>
                  <span className="text-slate-600">•</span>
                  <code className="text-amber-400 font-bold">{d.password}</code>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            {DEMO_LOGINS.map(d => (
              <button
                key={d.role}
                type="button"
                onClick={() => handleQuickDemo(d.role, d.email, d.password)}
                disabled={loading}
                className={`py-2.5 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition ${
                  roleSelection === d.role
                    ? `border-${d.color}-500 bg-${d.color}-500/10 text-${d.color}-400 font-bold`
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                {d.icon}
                <span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Formulário de login */}
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Tipo de acesso */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tipo de Acesso</label>
              <div className="grid grid-cols-3 gap-2">
                {DEMO_LOGINS.map(d => (
                  <button
                    key={d.role}
                    type="button"
                    onClick={() => { setRoleSelection(d.role); setEmail(d.email); setPassword(d.password); }}
                    className={`py-1.5 rounded-xl text-xs font-medium border flex items-center justify-center gap-1 transition ${
                      roleSelection === d.role
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {d.icon} {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-300">Senha</label>
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="text-xs text-emerald-400 hover:underline"
                >
                  Ver credenciais demo
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'Validando...' : 'ENTRAR NO FIT SAÚDE'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Não tem uma academia cadastrada?{' '}
              <NavLink to="/cadastro-academia" className="text-emerald-400 font-bold hover:underline">
                Começar 15 dias grátis
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

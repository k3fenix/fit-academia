import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Dumbbell, ShieldCheck, Building2, UserCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleSelection, setRoleSelection] = useState<UserRole>('academia');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const ok = await login(email, roleSelection);
      if (ok) {
        if (roleSelection === 'admin') navigate('/admin');
        else if (roleSelection === 'aluno') navigate('/aluno');
        else navigate('/academia');
      } else {
        setErrorMsg('Credenciais inválidas. Verifique seu e-mail e senha.');
      }
    } catch (err) {
      setErrorMsg('Não foi possível realizar o login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: UserRole, demoEmail: string) => {
    setEmail(demoEmail);
    setRoleSelection(role);
    setLoading(true);
    const ok = await login(demoEmail, role);
    setLoading(false);
    if (ok) {
      if (role === 'admin') navigate('/admin');
      else if (role === 'aluno') navigate('/aluno');
      else navigate('/academia');
    }
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
        <p className="mt-1 text-sm text-slate-400">
          Entre com seu e-mail cadastrado ou selecione um perfil de demonstração
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          
          {/* Seletor de Perfil Rápido */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Tipo de Acesso
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('academia', 'contato@fitpower.com.br')}
                className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition ${
                  roleSelection === 'academia'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>Academia</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('aluno', 'joao.silva@email.com')}
                className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition ${
                  roleSelection === 'aluno'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <UserCheck className="h-4 w-4" />
                <span>Aluno</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin', 'admin@fitsaude.com')}
                className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition ${
                  roleSelection === 'admin'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-300">Senha</label>
                <a href="#" className="text-xs text-emerald-400 hover:underline">Esqueceu a senha?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
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

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Dumbbell, 
  ShieldCheck, 
  Building2, 
  UserCheck, 
  Sparkles,
  LogOut
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { user, role, logout, switchRole } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover:border-emerald-400 transition-all">
            <Dumbbell className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              FIT <span className="text-emerald-400">SAÚDE</span>
            </span>
            <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              SaaS Academias
            </span>
          </div>
        </NavLink>

        {/* Links Públicos */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-emerald-400 font-semibold" : "hover:text-white transition"}>Início</NavLink>
          <a href="/#recursos" className="hover:text-white transition">Recursos</a>
          <a href="/#precos" className="hover:text-white transition">Planos</a>
          <a href="/#faq" className="hover:text-white transition">FAQ</a>
        </nav>

        {/* Acessos Rápidos & Simulador de Perfis */}
        <div className="flex items-center gap-3">
          
          {/* Seletor Rápido de Demonstração (Permite testar os 3 apps com 1 clique) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
            <span className="text-slate-400 px-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Perfil:
            </span>
            <button
              onClick={() => {
                switchRole('admin');
                window.location.href = '/admin';
              }}
              className={`px-2 py-1 rounded transition ${role === 'admin' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-300 hover:text-white'}`}
            >
              Admin
            </button>
            <button
              onClick={() => {
                switchRole('academia');
                window.location.href = '/academia';
              }}
              className={`px-2 py-1 rounded transition ${role === 'academia' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-300 hover:text-white'}`}
            >
              Academia
            </button>
            <button
              onClick={() => {
                switchRole('aluno');
                window.location.href = '/aluno';
              }}
              className={`px-2 py-1 rounded transition ${role === 'aluno' ? 'bg-cyan-600 text-white font-medium' : 'text-slate-300 hover:text-white'}`}
            >
              Aluno
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <NavLink
                to={role === 'admin' ? '/admin' : role === 'aluno' ? '/aluno' : '/academia'}
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-emerald-400 transition"
              >
                {role === 'admin' && <ShieldCheck className="h-4 w-4" />}
                {role === 'academia' && <Building2 className="h-4 w-4" />}
                {role === 'aluno' && <UserCheck className="h-4 w-4" />}
                <span>Acessar Painel</span>
              </NavLink>
              <button
                onClick={logout}
                title="Sair da conta"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5"
              >
                Entrar
              </NavLink>
              <NavLink
                to="/cadastro-academia"
                className="rounded-lg bg-emerald-500 px-3.5 py-1.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                15 Dias Grátis
              </NavLink>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};

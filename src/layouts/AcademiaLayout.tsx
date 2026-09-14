import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Dumbbell, 
  Calendar, 
  Bell, 
  DollarSign, 
  Settings, 
  CreditCard, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  Library
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface AcademiaLayoutProps {
  children: React.ReactNode;
}

export const AcademiaLayout: React.FC<AcademiaLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/academia', icon: LayoutDashboard, end: true },
    { label: 'Alunos', path: '/academia/alunos', icon: Users },
    { label: 'Professores', path: '/academia/professores', icon: GraduationCap },
    { label: 'Treinos', path: '/academia/treinos', icon: Dumbbell },
    { label: 'Biblioteca Exercícios', path: '/academia/exercicios', icon: Library },
    { label: 'Aulas & Agenda', path: '/academia/agenda', icon: Calendar },
    { label: 'Notificações', path: '/academia/notificacoes', icon: Bell },
    { label: 'Financeiro', path: '/academia/financeiro', icon: DollarSign },
    { label: 'Minha Assinatura', path: '/academia/assinatura', icon: CreditCard, highlight: true },
    { label: 'Configurações', path: '/academia/configuracoes', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span className="font-bold tracking-wide">FIT POWER <span className="text-emerald-400 text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10">Academia</span></span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900/95 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-200 md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="overflow-y-auto">
          <div className="p-5 border-b border-slate-800/80 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div className="truncate">
                <h1 className="font-bold text-white text-base tracking-tight truncate">FIT POWER</h1>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Teste: 12 dias
                </span>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : item.highlight
                        ? 'text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 font-bold text-emerald-300">
                      R$ 19,90
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="mb-3 px-2">
            <p className="text-xs font-semibold text-white truncate">{user?.full_name || 'Gestor Academia'}</p>
            <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair da Academia</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
};

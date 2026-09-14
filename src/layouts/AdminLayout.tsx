import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  CreditCard, 
  DollarSign, 
  Bot, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Dumbbell,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: Dumbbell, end: true },
    { label: 'Academias', path: '/admin/academias', icon: Building2 },
    { label: 'Alunos SaaS', path: '/admin/alunos', icon: Users },
    { label: 'Assinaturas', path: '/admin/assinaturas', icon: CreditCard },
    { label: 'Financeiro', path: '/admin/financeiro', icon: DollarSign },
    { label: 'Chatbot', path: '/admin/chatbot', icon: Bot },
    { label: 'Segurança', path: '/admin/seguranca', icon: ShieldCheck },
    { label: 'Configurações', path: '/admin/configuracoes', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
            FS
          </div>
          <span className="font-bold tracking-wide">FIT SAÚDE <span className="text-indigo-400 text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">ADMIN</span></span>
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
        <div>
          <div className="p-6 border-b border-slate-800/80 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-extrabold text-lg">
                FS
              </div>
              <div>
                <h1 className="font-bold text-white text-base tracking-tight">FIT SAÚDE</h1>
                <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Super Administrador
                </span>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">{user?.full_name || 'Admin Master'}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
};

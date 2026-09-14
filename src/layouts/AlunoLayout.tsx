import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Dumbbell, 
  Calendar, 
  Activity, 
  Bell, 
  User, 
  LogOut
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface AlunoLayoutProps {
  children: React.ReactNode;
}

export const AlunoLayout: React.FC<AlunoLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Início', path: '/aluno', icon: Home, end: true },
    { label: 'Meu Treino', path: '/aluno/treino', icon: Dumbbell },
    { label: 'Aulas', path: '/aluno/aulas', icon: Calendar },
    { label: 'Progresso', path: '/aluno/progresso', icon: Activity },
    { label: 'Notificações', path: '/aluno/notificacoes', icon: Bell, badge: 2 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 pb-20 md:pb-0">
      
      {/* Top Header Mobile e Desktop */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">
              JS
            </div>
            <div>
              <p className="text-xs text-slate-400">Olá, bem-vindo!</p>
              <h2 className="text-sm font-bold text-white leading-none">{user?.full_name || 'João da Silva'}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/aluno/perfil"
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              title="Meu Perfil"
            >
              <User className="h-5 w-5" />
            </NavLink>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar (Fiel ao App de Aluno de Alta Fidelidade) */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-slate-900/95 border-t border-slate-800/90 backdrop-blur-lg px-2 py-1.5 md:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-medium transition relative ${
                    isActive
                      ? 'text-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="absolute top-1 right-2 h-4 w-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

    </div>
  );
};

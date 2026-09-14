import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  academiaId: string | null;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ ok: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Credenciais demo com senha padrão
const DEMO_CREDENTIALS: Record<string, { password: string; role: UserRole }> = {
  'admin@fitsaude.com':         { password: 'admin123',  role: 'admin' },
  'contato@fitpower.com.br':    { password: 'academia123', role: 'academia' },
  'joao.silva@email.com':       { password: 'aluno123',  role: 'aluno' },
  'carlos.personal@fitsaude.com': { password: 'prof123', role: 'professor' },
};

// Perfis mock
const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  admin: {
    id: 'user-admin',
    email: 'admin@fitsaude.com',
    full_name: 'Administrador Fit Saúde',
    role: 'admin',
    created_at: new Date().toISOString()
  },
  academia: {
    id: 'user-acad',
    email: 'contato@fitpower.com.br',
    full_name: 'Marcos Aurelio (Fit Power)',
    role: 'academia',
    academia_id: 'acad-1',
    created_at: new Date().toISOString()
  },
  professor: {
    id: 'user-prof',
    email: 'carlos.personal@fitsaude.com',
    full_name: 'Prof. Carlos Silva',
    role: 'professor',
    academia_id: 'acad-1',
    created_at: new Date().toISOString()
  },
  aluno: {
    id: 'user-aluno',
    email: 'joao.silva@email.com',
    full_name: 'João da Silva',
    role: 'aluno',
    academia_id: 'acad-1',
    created_at: new Date().toISOString()
  }
};

// Armazena senhas customizadas no localStorage
const STORAGE_PASSWORDS_KEY = 'fitsaude_demo_passwords';

const getSavedPasswords = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(STORAGE_PASSWORDS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const savePassword = (email: string, password: string) => {
  const current = getSavedPasswords();
  current[email] = password;
  localStorage.setItem(STORAGE_PASSWORDS_KEY, JSON.stringify(current));
};

const getEffectivePassword = (email: string): string => {
  const saved = getSavedPasswords();
  if (saved[email]) return saved[email];
  return DEMO_CREDENTIALS[email]?.password || '';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('fitsaude_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('fitsaude_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fitsaude_user');
    }
  }, [user]);

  const login = async (email: string, password: string, explicitRole?: UserRole): Promise<boolean> => {
    setLoading(true);
    try {
      // Tenta Supabase real
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
          if (profile) {
            setUser(profile);
            setLoading(false);
            return true;
          }
        }
      }

      // Fallback demo: valida senha
      const cred = DEMO_CREDENTIALS[email.toLowerCase()];
      const effectivePassword = getEffectivePassword(email.toLowerCase());

      if (cred && password === effectivePassword) {
        const role = explicitRole || cred.role;
        const profile = DEMO_PROFILES[role];
        setUser({ ...profile, email: email.toLowerCase() });
        setLoading(false);
        return true;
      }

      // Aceitação por role sem senha (atalho demo pelos botões)
      if (explicitRole && !password) {
        setUser({ ...DEMO_PROFILES[explicitRole] });
        setLoading(false);
        return true;
      }

      setLoading(false);
      return false;
    } catch (err) {
      console.error('Erro no login:', err);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    if (isSupabaseConfigured()) supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('fitsaude_user');
  };

  const switchRole = (newRole: UserRole) => {
    setUser(DEMO_PROFILES[newRole]);
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ ok: boolean; message: string }> => {
    if (!user) return { ok: false, message: 'Usuário não autenticado.' };
    if (newPassword.length < 6) return { ok: false, message: 'A nova senha deve ter ao menos 6 caracteres.' };

    // Valida senha atual
    const effectiveCurrent = getEffectivePassword(user.email);
    if (currentPassword !== effectiveCurrent) {
      return { ok: false, message: 'Senha atual incorreta.' };
    }
    if (currentPassword === newPassword) {
      return { ok: false, message: 'A nova senha não pode ser igual à atual.' };
    }

    // Atualiza no Supabase se configurado
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { ok: false, message: `Erro Supabase: ${error.message}` };
    }

    // Salva localmente no modo demo
    savePassword(user.email, newPassword);
    return { ok: true, message: 'Senha alterada com sucesso!' };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        academiaId: user?.academia_id || null,
        loading,
        login,
        logout,
        switchRole,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

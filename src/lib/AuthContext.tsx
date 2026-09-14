import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  academiaId: string | null;
  loading: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Perfis mock para teste instantâneo
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('fitsaude_user');
    return saved ? JSON.parse(saved) : DEMO_PROFILES.academia; // Default direto na academia para teste rápido
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('fitsaude_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fitsaude_user');
    }
  }, [user]);

  const login = async (email: string, explicitRole?: UserRole): Promise<boolean> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: 'dummy-password'
        });
        if (error) throw error;
        // Carrega o profile do Supabase
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

      // Detecção inteligente por e-mail ou fallback
      let determinedRole: UserRole = explicitRole || 'academia';
      if (email.includes('admin')) determinedRole = 'admin';
      else if (email.includes('prof')) determinedRole = 'professor';
      else if (email.includes('aluno') || email.includes('joao')) determinedRole = 'aluno';

      const matchedProfile = DEMO_PROFILES[determinedRole];
      setUser({ ...matchedProfile, email });
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Erro no login:', err);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    if (isSupabaseConfigured()) {
      supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('fitsaude_user');
  };

  const switchRole = (newRole: UserRole) => {
    setUser(DEMO_PROFILES[newRole]);
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
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

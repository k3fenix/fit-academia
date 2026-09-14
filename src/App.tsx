import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';

// Páginas Públicas
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { CadastroAcademia } from './pages/CadastroAcademia';

// Layouts
import { AdminLayout } from './layouts/AdminLayout';
import { AcademiaLayout } from './layouts/AcademiaLayout';
import { AlunoLayout } from './layouts/AlunoLayout';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAcademias } from './pages/admin/AdminAcademias';
import { AdminAlunos } from './pages/admin/AdminAlunos';
import { AdminAssinaturas } from './pages/admin/AdminAssinaturas';
import { AdminFinanceiro } from './pages/admin/AdminFinanceiro';
import { AdminChatbot } from './pages/admin/AdminChatbot';
import { AdminConfiguracoes } from './pages/admin/AdminConfiguracoes';
import { AdminSeguranca } from './pages/admin/AdminSeguranca';

// Páginas Academia
import { AcademiaDashboard } from './pages/academia/AcademiaDashboard';
import { AcademiaAlunos } from './pages/academia/AcademiaAlunos';
import { AcademiaProfessores } from './pages/academia/AcademiaProfessores';
import { AcademiaExercicios } from './pages/academia/AcademiaExercicios';
import { AcademiaTreinos } from './pages/academia/AcademiaTreinos';
import { AcademiaAgenda } from './pages/academia/AcademiaAgenda';
import { AcademiaNotificacoes } from './pages/academia/AcademiaNotificacoes';
import { AcademiaFinanceiro } from './pages/academia/AcademiaFinanceiro';
import { AcademiaAssinatura } from './pages/academia/AcademiaAssinatura';
import { AcademiaConfiguracoes } from './pages/academia/AcademiaConfiguracoes';

// Páginas Aluno
import { AlunoDashboard } from './pages/aluno/AlunoDashboard';
import { AlunoTreino } from './pages/aluno/AlunoTreino';
import { AlunoAulas } from './pages/aluno/AlunoAulas';
import { AlunoProgresso } from './pages/aluno/AlunoProgresso';
import { AlunoNotificacoes } from './pages/aluno/AlunoNotificacoes';
import { AlunoPerfil } from './pages/aluno/AlunoPerfil';

// Componente para rotas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: 'admin' | 'academia' | 'aluno' | 'professor' }> = ({ children, allowedRole }) => {
  const { user, switchRole } = useAuth();
  
  // Se não houver usuário ou se o role for diferente do permitido (ex: admin entrando via URL direta), sincroniza automaticamente
  React.useEffect(() => {
    if (allowedRole && user && user.role !== allowedRole) {
      switchRole(allowedRole);
    }
  }, [allowedRole, user, switchRole]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro-academia" element={<CadastroAcademia />} />

          {/* Rotas do Super Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/academias"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout>
                  <AdminAcademias />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/alunos"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout>
                  <AdminAlunos />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/assinaturas"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout>
                  <AdminAssinaturas />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/financeiro"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout>
                  <AdminFinanceiro />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chatbot"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout>
                  <AdminChatbot />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/seguranca"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout>
                  <AdminSeguranca />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/configuracoes"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout>
                  <AdminConfiguracoes />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Rotas da Academia */}
          <Route
            path="/academia"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaDashboard />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/academia/alunos"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaAlunos />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/academia/professores"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaProfessores />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/academia/exercicios"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaExercicios />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/academia/treinos"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaTreinos />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/academia/agenda"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaAgenda />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/academia/notificacoes"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaNotificacoes />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/academia/financeiro"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaFinanceiro />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/academia/assinatura"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaAssinatura />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/academia/configuracoes"
            element={
              <ProtectedRoute allowedRole="academia">
                <AcademiaLayout>
                  <AcademiaConfiguracoes />
                </AcademiaLayout>
              </ProtectedRoute>
            }
          />

          {/* Rotas do Aluno */}
          <Route
            path="/aluno"
            element={
              <ProtectedRoute allowedRole="aluno">
                <AlunoLayout>
                  <AlunoDashboard />
                </AlunoLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/aluno/treino"
            element={
              <ProtectedRoute allowedRole="aluno">
                <AlunoLayout>
                  <AlunoTreino />
                </AlunoLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/aluno/aulas"
            element={
              <ProtectedRoute allowedRole="aluno">
                <AlunoLayout>
                  <AlunoAulas />
                </AlunoLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/aluno/progresso"
            element={
              <ProtectedRoute allowedRole="aluno">
                <AlunoLayout>
                  <AlunoProgresso />
                </AlunoLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/aluno/notificacoes"
            element={
              <ProtectedRoute allowedRole="aluno">
                <AlunoLayout>
                  <AlunoNotificacoes />
                </AlunoLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/aluno/perfil"
            element={
              <ProtectedRoute allowedRole="aluno">
                <AlunoLayout>
                  <AlunoPerfil />
                </AlunoLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;

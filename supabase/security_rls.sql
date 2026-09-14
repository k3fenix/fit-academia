-- ==============================================================================
-- FIT SAÚDE — ARQUITETURA DE SEGURANÇA E RLS AVANÇADO (OWASP 2025 COMPLIANT)
-- Multi-Tenant Isolation, Anti-Tenant Escape, RBAC e Prevenção de Mass Assignment
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TIPOS DE ROLES (RBAC ESTRITO)
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('super_admin', 'academia_admin', 'professor', 'aluno');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABELA DE AUDITORIA DE SEGURANÇA (AUDIT LOGS)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    academia_id UUID,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255),
    ip_hash VARCHAR(64),
    user_agent TEXT,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. FUNÇÕES AUXILIARES DE SEGURANÇA NO BANCO
-- Obtém o papel (role) verificado do usuário autenticado no JWT / profiles
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS VARCHAR AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Obtém a academia_id verificada do usuário autenticado
CREATE OR REPLACE FUNCTION public.current_user_academia_id()
RETURNS UUID AS $$
    SELECT academia_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Valida se o usuário é super_admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'super_admin'
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 4. ATIVAÇÃO DE ROW LEVEL SECURITY (RLS) EM TODAS AS TABELAS
ALTER TABLE public.academias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treinos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treino_exercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avaliacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notificacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assinaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamentos_saas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES ESTRITAS: ISOLAMENTO MULTI-TENANT & ANTI-TENANT ESCAPE

-- ACADEMIAS
DROP POLICY IF EXISTS "Super Admin acesso total academias" ON public.academias;
CREATE POLICY "Super Admin acesso total academias" ON public.academias
    FOR ALL USING (public.is_super_admin());

DROP POLICY IF EXISTS "Academia visualiza e edita apenas a sua propria organizacao" ON public.academias;
CREATE POLICY "Academia visualiza e edita apenas a sua propria organizacao" ON public.academias
    FOR SELECT USING (id = public.current_user_academia_id());

-- PROFILES (IMPEDE ALTERAÇÃO DE ROLE / MASS ASSIGNMENT PELO CLIENTE)
DROP POLICY IF EXISTS "Usuario visualiza seu proprio perfil" ON public.profiles;
CREATE POLICY "Usuario visualiza seu proprio perfil" ON public.profiles
    FOR SELECT USING (id = auth.uid() OR public.is_super_admin());

DROP POLICY IF EXISTS "Usuario edita apenas seu proprio nome/avatar (nao role nem academia_id)" ON public.profiles;
CREATE POLICY "Usuario edita apenas seu proprio nome/avatar (nao role nem academia_id)" ON public.profiles
    FOR UPDATE USING (id = auth.uid())
    WITH CHECK (
        id = auth.uid() 
        AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
        AND academia_id IS NOT DISTINCT FROM (SELECT academia_id FROM public.profiles WHERE id = auth.uid())
    );

-- ALUNOS (ISOLAMENTO TOTAL ENTRE ACADEMIAS E PRIVACIDADE DO ALUNO)
DROP POLICY IF EXISTS "Acesso isolado a alunos por academia" ON public.alunos;
CREATE POLICY "Acesso isolado a alunos por academia" ON public.alunos
    FOR ALL USING (
        public.is_super_admin()
        OR (
            academia_id = public.current_user_academia_id() 
            AND public.current_user_role() IN ('academia_admin', 'professor')
        )
        OR (
            profile_id = auth.uid()
        )
    );

-- TREINOS (ALUNO ACESSA APENAS SEUS TREINOS, PROFESSOR APENAS DA SUA ACADEMIA)
DROP POLICY IF EXISTS "Acesso isolado a treinos" ON public.treinos;
CREATE POLICY "Acesso isolado a treinos" ON public.treinos
    FOR ALL USING (
        public.is_super_admin()
        OR (
            academia_id = public.current_user_academia_id()
            AND (
                public.current_user_role() IN ('academia_admin', 'professor')
                OR aluno_id = (SELECT id FROM public.alunos WHERE profile_id = auth.uid())
            )
        )
    );

-- FINANCEIRO DA ACADEMIA (RECEITAS E DESPESAS NUNCA VISÍVEIS ENTRE ACADEMIAS)
DROP POLICY IF EXISTS "Isolamento estrito receitas" ON public.receitas;
CREATE POLICY "Isolamento estrito receitas" ON public.receitas
    FOR ALL USING (
        public.is_super_admin()
        OR (
            academia_id = public.current_user_academia_id() 
            AND public.current_user_role() = 'academia_admin'
        )
    );

DROP POLICY IF EXISTS "Isolamento estrito despesas" ON public.despesas;
CREATE POLICY "Isolamento estrito despesas" ON public.despesas
    FOR ALL USING (
        public.is_super_admin()
        OR (
            academia_id = public.current_user_academia_id() 
            AND public.current_user_role() = 'academia_admin'
        )
    );

-- ASSINATURAS DO SAAS (APENAS A ACADEMIA DONA E SUPER ADMIN)
DROP POLICY IF EXISTS "Assinaturas isoladas" ON public.assinaturas;
CREATE POLICY "Assinaturas isoladas" ON public.assinaturas
    FOR SELECT USING (
        public.is_super_admin() 
        OR (academia_id = public.current_user_academia_id() AND public.current_user_role() = 'academia_admin')
    );

-- CHATBOT RESPOSTAS (LEITURA PÚBLICA, GESTÃO EXCLUSIVA SUPER ADMIN)
DROP POLICY IF EXISTS "Chatbot leitura publica" ON public.chat_respostas;
CREATE POLICY "Chatbot leitura publica" ON public.chat_respostas
    FOR SELECT USING (ativo = TRUE OR public.is_super_admin());

DROP POLICY IF EXISTS "Chatbot edicao apenas super admin" ON public.chat_respostas;
CREATE POLICY "Chatbot edicao apenas super admin" ON public.chat_respostas
    FOR ALL USING (public.is_super_admin());

-- 6. TRIGGER DE AUDITORIA CONTRA ESCALAÇÃO DE PRIVILÉGIOS
CREATE OR REPLACE FUNCTION public.audit_profile_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.role IS DISTINCT FROM NEW.role THEN
        IF NOT public.is_super_admin() THEN
            RAISE EXCEPTION 'Acesso Negado: Apenas super_admin pode alterar roles de usuarios.';
        END IF;

        INSERT INTO public.audit_logs (user_id, academia_id, action, resource, resource_id, details)
        VALUES (
            auth.uid(), 
            NEW.academia_id, 
            'alteracao_role', 
            'profiles', 
            NEW.id::text, 
            jsonb_build_object('old_role', OLD.role, 'new_role', NEW.role)
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_audit_profile_role ON public.profiles;
CREATE TRIGGER trg_audit_profile_role
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.audit_profile_changes();

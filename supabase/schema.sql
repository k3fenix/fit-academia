-- ==============================================================================
-- FIT SAÚDE - SCHEMA COMPLETO DE BANCO DE DADOS POSTGRESQL / SUPABASE
-- Arquitetura Multi-tenant com RLS e Cálculo Dinâmico de Assinaturas
-- ==============================================================================

-- Habilita extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE ACADEMIAS (ORGANIZAÇÃO MULTI-TENANT)
CREATE TABLE IF NOT EXISTS public.academias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    responsavel_nome VARCHAR(255) NOT NULL,
    cnpj_cpf VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    whatsapp VARCHAR(30) NOT NULL,
    telefone VARCHAR(30),
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(20),
    logo_url TEXT,
    horario_funcionamento TEXT,
    descricao TEXT,
    -- Status do SaaS: trial (15 dias grátis), active, past_due, blocked, canceled
    status VARCHAR(30) NOT NULL DEFAULT 'trial',
    trial_until TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '15 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE PERFIS DE USUÁRIOS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    academia_id UUID REFERENCES public.academias(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('admin', 'academia', 'professor', 'aluno')),
    avatar_url TEXT,
    whatsapp VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELA DE ALUNOS
CREATE TABLE IF NOT EXISTS public.alunos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(30),
    data_nascimento DATE,
    sexo VARCHAR(20),
    telefone VARCHAR(30),
    whatsapp VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL,
    endereco TEXT,
    foto_url TEXT,
    objetivo TEXT,
    peso NUMERIC(5,2),
    altura NUMERIC(5,2),
    observacoes TEXT,
    data_entrada DATE DEFAULT CURRENT_DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA DE PROFESSORES
CREATE TABLE IF NOT EXISTS public.professores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(30),
    cref VARCHAR(50),
    telefone VARCHAR(30),
    whatsapp VARCHAR(30),
    email VARCHAR(255) NOT NULL,
    especialidade VARCHAR(255),
    foto_url TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. BIBLIOTECA DE EXERCÍCIOS
CREATE TABLE IF NOT EXISTS public.exercicios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID REFERENCES public.academias(id) ON DELETE CASCADE, -- NULL significa exercício global do sistema
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL, -- Peito, Costas, Pernas, Abdômen, Funcional, etc.
    descricao TEXT,
    series_padrao INT DEFAULT 3,
    repeticoes_padrao VARCHAR(50) DEFAULT '10 a 12',
    descanso_seg INT DEFAULT 60,
    media_url TEXT, -- Imagem, GIF ou vídeo explicativo
    is_custom BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TREINOS
CREATE TABLE IF NOT EXISTS public.treinos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    aluno_id UUID NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
    professor_id UUID REFERENCES public.professores(id) ON DELETE SET NULL,
    nome VARCHAR(255) NOT NULL, -- ex: Treino A - Peito e Tríceps
    divisao VARCHAR(10) DEFAULT 'A',
    ativo BOOLEAN DEFAULT TRUE,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. ITENS DO TREINO (EXERCÍCIOS DENTRO DO TREINO)
CREATE TABLE IF NOT EXISTS public.treino_exercicios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    treino_id UUID NOT NULL REFERENCES public.treinos(id) ON DELETE CASCADE,
    exercicio_id UUID NOT NULL REFERENCES public.exercicios(id) ON DELETE CASCADE,
    series INT NOT NULL DEFAULT 3,
    repeticoes VARCHAR(50) NOT NULL DEFAULT '12',
    carga VARCHAR(50),
    descanso_seg INT NOT NULL DEFAULT 60,
    ordem INT NOT NULL DEFAULT 1,
    observacao TEXT
);

-- 8. HISTÓRICO DE EXECUÇÃO DE TREINOS PELO ALUNO
CREATE TABLE IF NOT EXISTS public.treino_execucoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    aluno_id UUID NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
    treino_id UUID NOT NULL REFERENCES public.treinos(id) ON DELETE CASCADE,
    concluido_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    duracao_minutos INT,
    feedback TEXT
);

-- 9. AVALIAÇÕES FÍSICAS
CREATE TABLE IF NOT EXISTS public.avaliacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    aluno_id UUID NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
    professor_id UUID REFERENCES public.professores(id) ON DELETE SET NULL,
    data_avaliacao DATE NOT NULL DEFAULT CURRENT_DATE,
    peso NUMERIC(5,2) NOT NULL,
    altura NUMERIC(5,2) NOT NULL,
    imc NUMERIC(5,2),
    percentual_gordura NUMERIC(5,2),
    massa_muscular NUMERIC(5,2),
    braco_direito NUMERIC(5,2),
    braco_esquerdo NUMERIC(5,2),
    peito NUMERIC(5,2),
    cintura NUMERIC(5,2),
    quadril NUMERIC(5,2),
    coxa_direita NUMERIC(5,2),
    coxa_esquerda NUMERIC(5,2),
    panturrilha NUMERIC(5,2),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. AULAS COLETIVAS / HORÁRIOS
CREATE TABLE IF NOT EXISTS public.aulas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    professor_id UUID REFERENCES public.professores(id) ON DELETE SET NULL,
    titulo VARCHAR(255) NOT NULL, -- Ex: Funcional, Spinning, Pilates
    descricao TEXT,
    data_hora_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_hora_fim TIMESTAMP WITH TIME ZONE NOT NULL,
    limite_vagas INT NOT NULL DEFAULT 15,
    status VARCHAR(30) DEFAULT 'agendada' CHECK (status IN ('agendada', 'em_andamento', 'concluida', 'cancelada')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. AGENDAMENTOS DE AULAS
CREATE TABLE IF NOT EXISTS public.agendamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    aula_id UUID NOT NULL REFERENCES public.aulas(id) ON DELETE CASCADE,
    aluno_id UUID NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'confirmado' CHECK (status IN ('confirmado', 'cancelado', 'espera')),
    presenca BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(aula_id, aluno_id)
);

-- 12. NOTIFICAÇÕES
CREATE TABLE IF NOT EXISTS public.notificacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    remetente_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    tipo VARCHAR(30) NOT NULL CHECK (tipo IN ('todos', 'aluno', 'grupo', 'sistema')),
    destinatario_aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notificacao_leituras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    notificacao_id UUID NOT NULL REFERENCES public.notificacoes(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lida_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(notificacao_id, profile_id)
);

-- 13. FINANCEIRO DA ACADEMIA: RECEITAS E DESPESAS
CREATE TABLE IF NOT EXISTS public.receitas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    aluno_id UUID REFERENCES public.alunos(id) ON DELETE SET NULL,
    descricao VARCHAR(255) NOT NULL,
    valor NUMERIC(10,2) NOT NULL,
    categoria VARCHAR(100) NOT NULL, -- Mensalidade, Matrícula, Produtos, Aulas
    vencimento DATE NOT NULL,
    data_pagamento DATE,
    metodo VARCHAR(50), -- PIX, Cartão, Boleto, Dinheiro
    status VARCHAR(30) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pago', 'pendente', 'atrasado', 'cancelado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.despesas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    fornecedor VARCHAR(255),
    descricao VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL, -- Aluguel, Energia, Equipamentos, Salários, etc.
    valor NUMERIC(10,2) NOT NULL,
    vencimento DATE NOT NULL,
    data_pagamento DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pago', 'pendente', 'atrasado')),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. ASSINATURAS DO SAAS FIT SAÚDE (R$ 19,90 / ALUNO ATIVO)
CREATE TABLE IF NOT EXISTS public.assinaturas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL UNIQUE REFERENCES public.academias(id) ON DELETE CASCADE,
    valor_por_aluno NUMERIC(10,2) NOT NULL DEFAULT 19.90,
    alunos_ativos_cobrados INT NOT NULL DEFAULT 0,
    valor_total NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(30) NOT NULL DEFAULT 'trial' CHECK (status IN ('trial', 'active', 'pending', 'past_due', 'blocked', 'canceled')),
    data_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_vencimento TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '15 days'),
    ultimo_pagamento TIMESTAMP WITH TIME ZONE,
    metodo_preferido VARCHAR(50),
    mercado_pago_subscription_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. PAGAMENTOS DO SAAS (HISTÓRICO FINANCEIRO DO ADMIN)
CREATE TABLE IF NOT EXISTS public.pagamentos_saas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID NOT NULL REFERENCES public.academias(id) ON DELETE CASCADE,
    assinatura_id UUID REFERENCES public.assinaturas(id) ON DELETE SET NULL,
    valor NUMERIC(10,2) NOT NULL,
    quantidade_alunos INT NOT NULL,
    metodo VARCHAR(50) NOT NULL, -- pix, credit_card
    status VARCHAR(50) NOT NULL, -- approved, pending, rejected, refunded
    mercado_pago_payment_id VARCHAR(255),
    detalhes_webhook JSONB,
    pago_em TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. CONFIGURAÇÕES DO MERCADO PAGO (PAINEL ADMIN)
CREATE TABLE IF NOT EXISTS public.mercado_pago_config (
    id INT PRIMARY KEY DEFAULT 1,
    public_key TEXT,
    access_token TEXT,
    client_id TEXT,
    client_secret TEXT,
    environment VARCHAR(20) DEFAULT 'sandbox' CHECK (environment IN ('sandbox', 'production')),
    webhook_secret TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. CHATBOT DO SAAS (BASE DE RESPOSTAS CONFIGURÁVEL)
CREATE TABLE IF NOT EXISTS public.chat_respostas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pergunta_exemplo VARCHAR(255) NOT NULL,
    palavras_chave TEXT NOT NULL, -- Ex: "preço, valor, quanto custa, mensalidade"
    resposta TEXT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    ordem INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 18. LOGS DE AUDITORIA
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academia_id UUID REFERENCES public.academias(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    acao VARCHAR(100) NOT NULL, -- 'login', 'create_aluno', 'payment_received', etc.
    entidade VARCHAR(100) NOT NULL,
    entidade_id VARCHAR(255),
    detalhes JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- FUNÇÕES DE CÁLCULO E REGRAS DE NEGÓCIO
-- ==============================================================================

-- Função para calcular com segurança o valor da assinatura da academia
CREATE OR REPLACE FUNCTION public.calculate_subscription_amount(p_academia_id UUID)
RETURNS NUMERIC AS $$
DECLARE
    v_active_students INT;
    v_rate NUMERIC := 19.90;
    v_total NUMERIC;
BEGIN
    -- Aluno ativo: cadastrado, pertence à academia e com status 'active'
    SELECT COUNT(*)
    INTO v_active_students
    FROM public.alunos
    WHERE academia_id = p_academia_id AND status = 'active';

    v_total := v_active_students * v_rate;

    -- Atualiza ou inicializa a assinatura
    UPDATE public.assinaturas
    SET alunos_ativos_cobrados = v_active_students,
        valor_por_aluno = v_rate,
        valor_total = v_total,
        updated_at = NOW()
    WHERE academia_id = p_academia_id;

    RETURN v_total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_academias_updated_at
BEFORE UPDATE ON public.academias
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER trigger_assinaturas_updated_at
BEFORE UPDATE ON public.assinaturas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================
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
ALTER TABLE public.chat_respostas ENABLE ROW LEVEL SECURITY;

-- POLICIES EXAMPLES (ADMIN total, ACADEMIA isolada, ALUNO no próprio perfil)
CREATE POLICY "Admin tem acesso total às academias" ON public.academias
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
    );

CREATE POLICY "Academia gerencia apenas seus próprios dados" ON public.academias
    FOR ALL USING (
        id = (SELECT academia_id FROM public.profiles WHERE profiles.id = auth.uid())
    );

CREATE POLICY "Acesso a alunos isolado por academia" ON public.alunos
    FOR ALL USING (
        academia_id = (SELECT academia_id FROM public.profiles WHERE profiles.id = auth.uid())
        OR EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
    );

CREATE POLICY "Chatbot respostas leitura pública e gestão admin" ON public.chat_respostas
    FOR SELECT USING (true);

CREATE POLICY "Apenas admin edita respostas do chatbot" ON public.chat_respostas
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
    );

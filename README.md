# GUIA DE INSTALAÇÃO E EXECUÇÃO — FIT SAÚDE

O **FIT SAÚDE** foi construído com arquitetura profissional completa:

- **Super Admin**: Gestão de Academias, MRR, Alunos, Assinaturas, Configuração de Mercado Pago e CRUD de Chatbot.
- **Academia**: Gestão de Alunos, Professores, Treinos com Séries/Cargas, Biblioteca de Exercícios, Fluxo de Caixa e Assinatura R$ 19,90/aluno.
- **Aluno**: Mobile-First, Execução passo a passo de treino com Timer de descanso automático, Agendamento de aulas com limite de vagas e Notificações.
- **Backend & Database**: Supabase SQL Schema completo com RLS (`supabase/schema.sql`) e Netlify Serverless Webhook para Mercado Pago (`netlify/functions/mercadopago-webhook.ts`).

---

## 🚀 Como Iniciar o Projeto Localmente

Abra o seu terminal na pasta do projeto (`c:\Users\Luciano\Desktop\fit-saude`) e execute:

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

O sistema ficará disponível no seu navegador em: `http://localhost:5173`

---

## 🔑 Acessos Rápidos de Demonstração

Para testar os três perfis sem digitar credenciais, utilize o seletor no topo da tela ou faça login com:

1. **Super Admin**: `admin@fitsaude.com` (Senha: qualquer valor)
2. **Academia**: `contato@fitpower.com.br` (Senha: qualquer valor)
3. **Aluno**: `joao.silva@email.com` (Senha: qualquer valor)

---

## 🗄️ Configuração do Supabase (Opcional)

O projeto já funciona no modo de demonstração interativa. Para conectar ao seu banco de dados real:
1. Acesse o painel do seu projeto no Supabase.
2. No **SQL Editor**, copie e execute o arquivo `supabase/schema.sql`.
3. Crie um arquivo `.env` na raiz baseado no `.env.example` com suas chaves:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

---

## 🌐 Deploy na Netlify

O repositório já conta com o arquivo `netlify.toml` com suporte para Single Page Application (SPA redirects) e Netlify Functions para processar os webhooks do Mercado Pago. Basta conectar o repositório no dashboard da Netlify!

# POLÍTICA DE SEGURANÇA — FIT SAÚDE (OWASP Top 10:2025)

Este documento descreve a arquitetura de segurança, isolamento multi-tenant e mitigação de vulnerabilidades do **FIT SAÚDE**.

---

## 1. Arquitetura de Defesa em Profundidade

O sistema segue o princípio fundamental de que o frontend é puramente para experiência do usuário e não um mecanismo de controle de segurança.

```
USUÁRIO
   ↓ (HTTPS obrigatório + Strict-Transport-Security)
NETLIFY (Security Headers: CSP, Frame-Ancestors 'none', X-Content-Type-Options)
   ↓
FRONTEND (Sanitização XSS, sem segredos no bundle)
   ↓
SUPABASE AUTH (JWT Seguro, senhas com hash criptográfico, MFA preparado)
   ↓
POSTGRESQL + ROW LEVEL SECURITY (RLS Ativo em 100% das tabelas)
```

---

## 2. Isolamento Multi-Tenant & Anti-Tenant Escape

- Cada tabela operacional possui uma coluna `academia_id`.
- O banco de dados **nunca** confia no `academia_id` enviado pelo navegador. As consultas utilizam a função `current_user_academia_id()` baseada no `auth.uid()`.
- O isolamento RLS impede qualquer visualização de dados financeiros, alunos, treinos ou agendamentos entre organizações distintas (Academia A jamais enxerga Academia B).

---

## 3. Gestão de Segredos & Gateway Mercado Pago

- **Nenhum segredo no Frontend**: Chaves como `service_role`, `SUPABASE_SECRET_KEY` ou `MERCADOPAGO_ACCESS_TOKEN` residem estritamente no ambiente do servidor/Netlify Functions.
- **Validação de Webhooks**: Os webhooks recebidos em `/api/mercadopago/webhook` são validados via assinatura criptográfica HMAC SHA-256 e o status de pagamento é conferido diretamente na API do Mercado Pago antes da ativação do plano.
- **Proteção contra Adulteração de Valores**: A cobrança é recalculada no banco (`alunos ativos × R$ 19,90`). Valores enviados pelo cliente não são aceitos.

---

## 4. Auditoria de Código & Scan de Segredos

O projeto conta com o comando automatizado de varredura:

```bash
npm run security:check
```

Esse comando analisa todos os arquivos do frontend garantindo a ausência de chaves secretas ou credenciais sensíveis.

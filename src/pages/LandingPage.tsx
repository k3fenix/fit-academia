import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Dumbbell, 
  Users, 
  Calendar, 
  Bell, 
  DollarSign, 
  BarChart3, 
  MessageSquare, 
  Smartphone, 
  CheckCircle, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ChatbotFloating } from '../components/ChatbotFloating';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Glow de Fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" /> 15 Dias de Teste Gratuito Sem Compromisso
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Sua academia mais organizada. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Seus alunos mais conectados.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            O <strong>FIT SAÚDE</strong> reúne gestão completa, controle de alunos, montagem de treinos, agendamentos, comunicação e financeiro em uma única plataforma SaaS moderna.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink
              to="/cadastro-academia"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <span>COMEÇAR GRÁTIS</span>
              <ArrowRight className="h-5 w-5" />
            </NavLink>

            <a
              href="#recursos"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base transition border border-slate-800 flex items-center justify-center gap-2"
            >
              <span>CONHECER O SISTEMA</span>
            </a>
          </div>

          {/* Pricing Highlight Banner */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 bg-slate-900/60 border border-slate-800/80 px-6 py-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span><strong>15 dias grátis</strong> sem cartão inicial</span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Apenas <strong>R$ 19,90</strong> por aluno ativo/mês</span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Mercado Pago: PIX & Cartão</span>
            </div>
          </div>

        </div>
      </section>

      {/* Recursos Principais */}
      <section id="recursos" className="py-20 bg-slate-900/50 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-2">Recursos Poderosos</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Tudo o que sua academia precisa para escalar</h3>
            <p className="mt-3 text-slate-400">Desenvolvido sob medida para gestores, professores e alunos terem a melhor experiência diária.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Gestão de Alunos</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Cadastre, acompanhe dados corporais, históricos de frequência e controle quem está ativo de verdade.</p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Dumbbell className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Montagem de Treinos</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Crie divisões de treino (A, B, C) com exercícios detalhados, repetições, carga e descanso direto no app.</p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Calendar className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Agendamento de Aulas</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Controle lotação de aulas coletivas como Funcional, Spinning e Pilates sem overbooking.</p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="h-12 w-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Bell className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Notificações Diretas</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Envie avisos gerais para todos os alunos ou mensagens direcionadas sobre alterações de treinos.</p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <DollarSign className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Financeiro Completo</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Receitas, despesas, contas a pagar, fluxo de caixa e relatórios financeiros sem complicação.</p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Relatórios & Evolução</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Gráficos de evolução corporal (IMC, gordura, medidas) e métricas gerenciais da academia.</p>
            </div>

            {/* Card 7 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Chatbot Integrado</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Tire dúvidas de visitantes e alunos 24 horas por dia com respostas dinâmicas configuráveis.</p>
            </div>

            {/* Card 8 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Smartphone className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">App Exclusivo do Aluno</h4>
              <p className="text-sm text-slate-400 leading-relaxed">O aluno executa a ficha com timer de descanso, acompanha suas medidas e reserva aulas com facilidade.</p>
            </div>

          </div>

        </div>
      </section>

      {/* Planos e Precificação Justa */}
      <section id="precos" className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-2">Preço Transparente</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Você só paga pelos alunos ativos</h3>
            <p className="mt-3 text-slate-400">Sem surpresas ou taxas escondidas. Se a academia cresce, o sistema cresce com você.</p>
          </div>

          {/* Pricing Card Principal */}
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/50 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-extrabold text-xs uppercase px-6 py-1.5 rounded-bl-xl tracking-wider">
              Mais Popular
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">Plano FIT SAÚDE Pro</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white">R$ 19,90</span>
                  <span className="text-slate-400 text-sm font-medium">/ aluno ativo por mês</span>
                </div>
                <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                  Totalmente ilimitado para treinos, professores e agendamentos. Você só é cobrado pela quantidade real de alunos que frequentam sua academia.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <p className="font-bold text-white">Exemplo de cálculo transparente:</p>
                  <p>• 20 alunos ativos = <strong>R$ 398,00/mês</strong></p>
                  <p>• 50 alunos ativos = <strong>R$ 995,00/mês</strong></p>
                  <p>• 100 alunos ativos = <strong>R$ 1.990,00/mês</strong></p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  '15 dias totalmente grátis',
                  'Gestão completa de alunos e professores',
                  'Fichas de treino personalizadas com exercícios',
                  'App exclusivo para o aluno (celular e tablet)',
                  'Módulo financeiro (receitas, despesas, fluxo de caixa)',
                  'Agendamento de aulas coletivas com limite de vagas',
                  'Módulo de avaliação física e evolução corporal',
                  'Integração Mercado Pago (PIX e Cartão de Crédito)',
                  'Chatbot inteligente para seu site'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}

                <div className="pt-4">
                  <NavLink
                    to="/cadastro-academia"
                    className="w-full block text-center py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition shadow-lg shadow-emerald-500/20"
                  >
                    ATIVAR 15 DIAS GRÁTIS
                  </NavLink>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-2">Dúvidas Frequentes</h2>
            <h3 className="text-3xl font-extrabold text-white">Tudo que você precisa saber</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "O que é o FIT SAÚDE?",
                a: "É uma plataforma moderna de gestão para academias, estúdios e boxes de crossfit, conectando a administração, professores e alunos em um único ecossistema em nuvem."
              },
              {
                q: "Como funciona o período gratuito de 15 dias?",
                a: "Ao cadastrar sua academia, você recebe acesso imediato a todos os recursos durante 15 dias sem a necessidade de informar dados de pagamento antecipados."
              },
              {
                q: "Quem é considerado aluno ativo para a cobrança?",
                a: "Aluno ativo é aquele devidamente cadastrado na academia que não está desativado ou suspenso. Alunos excluídos ou inativos não entram no cálculo de cobrança."
              },
              {
                q: "Quais são as formas de pagamento disponíveis?",
                a: "Aceitamos PIX instantâneo e Cartão de Crédito processados com máxima segurança através do Mercado Pago."
              },
              {
                q: "O sistema funciona em celular e tablet?",
                a: "Sim! A plataforma é 100% responsiva e conta com uma interface mobile-first desenvolvida especialmente para o aluno usar na musculação e para o gestor acompanhar os resultados de qualquer lugar."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800/90">
                <h4 className="font-bold text-base text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Dumbbell className="h-4 w-4" />
            </div>
            <span className="font-bold text-white">FIT SAÚDE</span>
            <span>— Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <NavLink to="/login" className="hover:text-white transition">Área do Cliente</NavLink>
            <NavLink to="/cadastro-academia" className="hover:text-white transition">Criar Academia</NavLink>
            <a href="mailto:suporte@fitsaude.com.br" className="hover:text-white transition">Suporte Técnico</a>
          </div>
        </div>
      </footer>

      {/* Chatbot Flutuante Conectado */}
      <ChatbotFloating />

    </div>
  );
};

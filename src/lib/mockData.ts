import { Academia, Aluno, Professor, Exercicio, Treino, Aula, ChatResposta, AssinaturaSaas, MovimentacaoFinanceira } from '../types';
import { exerciciosCatalog } from './exerciciosCatalog';

export const mockAcademias: Academia[] = [
  {
    id: 'acad-1',
    nome: 'FIT POWER CENTRO',
    responsavel_nome: 'Marcos Aurelio',
    cnpj_cpf: '12.345.678/0001-90',
    email: 'contato@fitpower.com.br',
    whatsapp: '(11) 98888-7777',
    telefone: '(11) 3333-2222',
    cidade: 'São Paulo',
    estado: 'SP',
    status: 'active',
    trial_until: new Date(Date.now() + 15 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    alunos_count: 42
  },
  {
    id: 'acad-2',
    nome: 'CROSSFIT ELITE',
    responsavel_nome: 'Fernanda Lima',
    cnpj_cpf: '98.765.432/0001-10',
    email: 'elite@crossfitelite.com',
    whatsapp: '(21) 97777-6666',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    status: 'trial',
    trial_until: new Date(Date.now() + 10 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    alunos_count: 18
  },
  {
    id: 'acad-3',
    nome: 'ACADEMIA CORPO & RITMO',
    responsavel_nome: 'Roberto Santos',
    cnpj_cpf: '45.123.789/0001-55',
    email: 'adm@corpoeritmo.com',
    whatsapp: '(31) 99999-1234',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    status: 'past_due',
    trial_until: new Date(Date.now() - 2 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    alunos_count: 85
  }
];

export const mockAlunos: Aluno[] = [
  {
    id: 'aluno-1',
    academia_id: 'acad-1',
    nome: 'João da Silva',
    cpf: '123.456.789-00',
    data_nascimento: '1995-04-12',
    sexo: 'M',
    whatsapp: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    objetivo: 'Hipertrofia e condicionamento físico',
    peso: 78.5,
    altura: 1.78,
    data_entrada: '2025-01-10',
    status: 'active',
    created_at: new Date(Date.now() - 60 * 86400000).toISOString()
  },
  {
    id: 'aluno-2',
    academia_id: 'acad-1',
    nome: 'Camila Rodrigues',
    cpf: '321.654.987-11',
    data_nascimento: '1998-09-22',
    sexo: 'F',
    whatsapp: '(11) 99887-1122',
    email: 'camila.fit@email.com',
    objetivo: 'Emagrecimento e definição',
    peso: 62.0,
    altura: 1.65,
    data_entrada: '2025-02-01',
    status: 'active',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: 'aluno-3',
    academia_id: 'acad-1',
    nome: 'Lucas Mendes',
    cpf: '555.444.333-22',
    data_nascimento: '2001-11-05',
    sexo: 'M',
    whatsapp: '(11) 96543-9876',
    email: 'lucas.mendes@email.com',
    objetivo: 'Ganho de força',
    peso: 84.0,
    altura: 1.82,
    data_entrada: '2024-11-15',
    status: 'inactive',
    created_at: new Date(Date.now() - 90 * 86400000).toISOString()
  }
];

export const mockProfessores: Professor[] = [
  {
    id: 'prof-1',
    academia_id: 'acad-1',
    nome: 'Carlos Silva',
    cpf: '999.888.777-66',
    cref: '012345-G/SP',
    whatsapp: '(11) 98111-2233',
    email: 'carlos.personal@fitsaude.com',
    especialidade: 'Musculação e Treinamento Funcional',
    status: 'active'
  },
  {
    id: 'prof-2',
    academia_id: 'acad-1',
    nome: 'Mariana Duarte',
    cpf: '111.222.333-44',
    cref: '054321-G/SP',
    whatsapp: '(11) 98222-3344',
    email: 'mariana.spinning@fitsaude.com',
    especialidade: 'Spinning, HIIT e Pilates',
    status: 'active'
  }
];

export const mockExercicios: Exercicio[] = exerciciosCatalog;

export const mockTreinos: Treino[] = [
  {
    id: 'treino-1',
    academia_id: 'acad-1',
    aluno_id: 'aluno-1',
    professor_id: 'prof-1',
    nome: 'TREINO A — Peitoral e Tríceps',
    divisao: 'A',
    ativo: true,
    observacoes: 'Foco em controle excêntrico de 2 segundos. Aquecer manguito rotador antes.',
    created_at: new Date().toISOString(),
    exercicios: [
      {
        id: 'te-1',
        treino_id: 'treino-1',
        exercicio_id: 'peito-1',
        exercicio: exerciciosCatalog[0],
        series: 4,
        repeticoes: '12',
        carga: '25kg cada lado',
        descanso_seg: 60,
        ordem: 1
      },
      {
        id: 'te-2',
        treino_id: 'treino-1',
        exercicio_id: 'peito-2',
        exercicio: exerciciosCatalog[1],
        series: 4,
        repeticoes: '10',
        carga: '22kg halteres',
        descanso_seg: 60,
        ordem: 2
      },
      {
        id: 'te-3',
        treino_id: 'treino-1',
        exercicio_id: 'triceps-1',
        exercicio: exerciciosCatalog.find(e => e.id === 'triceps-1'),
        series: 3,
        repeticoes: '12 a 15',
        carga: '35kg',
        descanso_seg: 45,
        ordem: 3
      }
    ]
  }
];

export const mockAulas: Aula[] = [
  {
    id: 'aula-1',
    academia_id: 'acad-1',
    professor_id: 'prof-1',
    professor_nome: 'Carlos Silva',
    titulo: 'Treinamento Funcional Avançado',
    descricao: 'Circuito dinâmico para queima calórica e condicionamento geral.',
    data_hora_inicio: new Date(Date.now() + 3600000 * 2).toISOString(),
    data_hora_fim: new Date(Date.now() + 3600000 * 3).toISOString(),
    limite_vagas: 15,
    vagas_ocupadas: 8,
    status: 'agendada'
  },
  {
    id: 'aula-2',
    academia_id: 'acad-1',
    professor_id: 'prof-2',
    professor_nome: 'Mariana Duarte',
    titulo: 'Spinning Power Hour',
    descricao: 'Ciclismo indoor de alta intensidade com trilha sonora energizante.',
    data_hora_inicio: new Date(Date.now() + 3600000 * 5).toISOString(),
    data_hora_fim: new Date(Date.now() + 3600000 * 6).toISOString(),
    limite_vagas: 20,
    vagas_ocupadas: 19,
    status: 'agendada'
  }
];

export const mockChatRespostas: ChatResposta[] = [
  {
    id: 'chat-1',
    pergunta_exemplo: 'Quanto custa o FIT SAÚDE?',
    palavras_chave: 'preço, valor, plano, mensalidade, quanto custa, custo',
    resposta: 'O FIT SAÚDE funciona no modelo justo de R$ 19,90 por aluno ativo ao mês. Você ganha 15 dias de teste grátis com todos os recursos liberados para testar!',
    ativo: true,
    ordem: 1
  },
  {
    id: 'chat-2',
    pergunta_exemplo: 'Como funciona o teste grátis?',
    palavras_chave: 'teste, gratis, gratuito, 15 dias, experimentar',
    resposta: 'Ao cadastrar sua academia, você recebe automaticamente 15 dias grátis sem necessidade de cartão de crédito antecipado. Você pode cadastrar alunos, montar treinos e testar o app!',
    ativo: true,
    ordem: 2
  },
  {
    id: 'chat-3',
    pergunta_exemplo: 'Quais as formas de pagamento disponíveis?',
    palavras_chave: 'pix, cartao, pagamento, mercado pago, boleto',
    resposta: 'Trabalhamos com o Mercado Pago integrado. Sua assinatura e pagamentos podem ser efetuados via PIX instantâneo ou Cartão de Crédito com renovação facilitada.',
    ativo: true,
    ordem: 3
  },
  {
    id: 'chat-4',
    pergunta_exemplo: 'Os alunos têm aplicativo próprio?',
    palavras_chave: 'aluno, aplicativo, app, painel aluno, celular',
    resposta: 'Sim! Os alunos possuem um painel moderno otimizado para celular, onde visualizam treinos passo a passo com timer de descanso, reservam aulas e acompanham a evolução corporal.',
    ativo: true,
    ordem: 4
  },
  {
    id: 'chat-5',
    pergunta_exemplo: 'Como entrar em contato com o suporte?',
    palavras_chave: 'suporte, contato, ajuda, falar, telefone, whatsapp',
    resposta: 'Nossa equipe está pronta para atendê-lo! Envie uma mensagem pelo WhatsApp de suporte no número (11) 98888-FIT1 ou pelo e-mail suporte@fitsaude.com.br.',
    ativo: true,
    ordem: 5
  }
];

export const mockMovimentacoes: MovimentacaoFinanceira[] = [
  {
    id: 'mov-1',
    academia_id: 'acad-1',
    tipo: 'receita',
    descricao: 'Mensalidade - João da Silva',
    valor: 129.90,
    categoria: 'Mensalidade',
    vencimento: '2025-05-10',
    data_pagamento: '2025-05-09',
    metodo: 'PIX',
    status: 'pago'
  },
  {
    id: 'mov-2',
    academia_id: 'acad-1',
    tipo: 'receita',
    descricao: 'Mensalidade - Camila Rodrigues',
    valor: 129.90,
    categoria: 'Mensalidade',
    vencimento: '2025-05-12',
    data_pagamento: '2025-05-12',
    metodo: 'Cartão de Crédito',
    status: 'pago'
  },
  {
    id: 'mov-3',
    academia_id: 'acad-1',
    tipo: 'despesa',
    descricao: 'Aluguel do Espaço Centro',
    valor: 3500.00,
    categoria: 'Aluguel',
    vencimento: '2025-05-15',
    status: 'pendente',
    fornecedor: 'Imobiliária Alvorada'
  },
  {
    id: 'mov-4',
    academia_id: 'acad-1',
    tipo: 'despesa',
    descricao: 'Conta de Energia Elétrica',
    valor: 840.50,
    categoria: 'Energia',
    vencimento: '2025-05-20',
    status: 'pendente',
    fornecedor: 'Enel'
  }
];

export type UserRole = 'admin' | 'academia' | 'professor' | 'aluno';

export type SubscriptionStatus = 'trial' | 'active' | 'pending' | 'past_due' | 'blocked' | 'canceled';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  academia_id?: string;
  avatar_url?: string;
  whatsapp?: string;
  created_at: string;
}

export interface Academia {
  id: string;
  nome: string;
  responsavel_nome: string;
  cnpj_cpf: string;
  email: string;
  whatsapp: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  logo_url?: string;
  horario_funcionamento?: string;
  descricao?: string;
  status: SubscriptionStatus;
  trial_until: string;
  created_at: string;
  alunos_count?: number;
}

export interface Aluno {
  id: string;
  academia_id: string;
  profile_id?: string;
  nome: string;
  cpf?: string;
  data_nascimento?: string;
  sexo?: 'M' | 'F' | 'Outro';
  telefone?: string;
  whatsapp: string;
  email: string;
  endereco?: string;
  foto_url?: string;
  objetivo?: string;
  peso?: number;
  altura?: number;
  observacoes?: string;
  data_entrada: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
}

export interface Professor {
  id: string;
  academia_id: string;
  profile_id?: string;
  nome: string;
  cpf?: string;
  cref: string;
  telefone?: string;
  whatsapp?: string;
  email: string;
  especialidade: string;
  foto_url?: string;
  status: 'active' | 'inactive';
}

export interface Exercicio {
  id: string;
  academia_id?: string;
  nome: string;
  nome_tecnico?: string;
  categoria: string; // Peitoral, Costas, Pernas, Glúteos, Bíceps, Tríceps, Ombros, Cardio / Funcional, Kettlebell, Abdômen
  subcategoria?: string;
  musculo_principal: string;
  musculos_secundarios?: string[];
  equipamento: string; // Barra, Halteres, Polia, Máquina, Caneleira, Peso corporal, Kettlebell, Step, Esteira, etc.
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  tipo_movimento?: 'Composto' | 'Isolador' | 'Cardiovascular' | 'Isométrico';
  descricao: string;
  execucao?: string;
  erros_comuns?: string;
  dicas?: string;
  series_padrao: number;
  repeticoes_padrao: string;
  descanso_seg: number;
  media_url?: string;
  media_type?: 'gif' | 'video' | 'imagem' | 'pendente';
  media_source?: string;
  media_license?: string;
  media_attribution?: string;
  is_verified?: boolean;
  is_custom?: boolean;
  is_favorite?: boolean;
}

export interface TreinoExercicioItem {
  id: string;
  treino_id: string;
  exercicio_id: string;
  exercicio?: Exercicio;
  series: number;
  repeticoes: string;
  carga?: string;
  descanso_seg: number;
  ordem: number;
  observacao?: string;
}

export interface Treino {
  id: string;
  academia_id: string;
  aluno_id: string;
  professor_id?: string;
  nome: string;
  divisao: string; // A, B, C, etc.
  ativo: boolean;
  observacoes?: string;
  exercicios?: TreinoExercicioItem[];
  created_at: string;
}

export interface Aula {
  id: string;
  academia_id: string;
  professor_id?: string;
  professor_nome?: string;
  titulo: string;
  descricao?: string;
  data_hora_inicio: string;
  data_hora_fim: string;
  limite_vagas: number;
  vagas_ocupadas: number;
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
}

export interface Agendamento {
  id: string;
  academia_id: string;
  aula_id: string;
  aluno_id: string;
  aluno_nome?: string;
  status: 'confirmado' | 'cancelado' | 'espera';
  presenca: boolean;
  created_at: string;
}

export interface AvaliacaoFisica {
  id: string;
  academia_id: string;
  aluno_id: string;
  data_avaliacao: string;
  peso: number;
  altura: number;
  imc: number;
  percentual_gordura?: number;
  massa_muscular?: number;
  braco_direito?: number;
  braco_esquerdo?: number;
  peito?: number;
  cintura?: number;
  quadril?: number;
  coxa_direita?: number;
  coxa_esquerda?: number;
  panturrilha?: number;
  observacoes?: string;
}

export interface Notificacao {
  id: string;
  academia_id: string;
  tipo: 'todos' | 'aluno' | 'grupo' | 'sistema';
  destinatario_aluno_id?: string;
  titulo: string;
  mensagem: string;
  created_at: string;
  lida?: boolean;
}

export interface MovimentacaoFinanceira {
  id: string;
  academia_id: string;
  tipo: 'receita' | 'despesa';
  descricao: string;
  valor: number;
  categoria: string;
  vencimento: string;
  data_pagamento?: string;
  metodo?: string;
  status: 'pago' | 'pendente' | 'atrasado' | 'cancelado';
  aluno_id?: string;
  fornecedor?: string;
}

export interface AssinaturaSaas {
  id: string;
  academia_id: string;
  valor_por_aluno: number;
  alunos_ativos_cobrados: number;
  valor_total: number;
  status: SubscriptionStatus;
  data_inicio: string;
  data_vencimento: string;
  metodo_preferido?: string;
}

export interface ChatResposta {
  id: string;
  pergunta_exemplo: string;
  palavras_chave: string;
  resposta: string;
  ativo: boolean;
  ordem: number;
}

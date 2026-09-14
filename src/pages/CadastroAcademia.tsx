import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dumbbell, Sparkles, CheckCircle2, Building, Shield, User, Mail, Phone, MapPin, Lock, Clock } from 'lucide-react';
import { mockAcademias } from '../lib/mockData';

export const CadastroAcademia: React.FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    responsavel_nome: '',
    cnpj_cpf: '',
    email: '',
    whatsapp: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    senha: '',
    confirmar_senha: '',
    horario_funcionamento: 'Seg a Sex: 06h às 22h | Sáb: 08h às 14h',
    descricao: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmar_senha) {
      alert('As senhas não coincidem!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Simula o registro e inclusão da nova academia no mock / supabase
      const newAcad = {
        id: `acad-${Date.now()}`,
        nome: formData.nome,
        responsavel_nome: formData.responsavel_nome,
        cnpj_cpf: formData.cnpj_cpf,
        email: formData.email,
        whatsapp: formData.whatsapp,
        telefone: formData.telefone,
        endereco: formData.endereco,
        cidade: formData.cidade,
        estado: formData.estado,
        status: 'trial' as const,
        trial_until: new Date(Date.now() + 15 * 86400000).toISOString(),
        created_at: new Date().toISOString(),
        alunos_count: 0
      };

      mockAcademias.push(newAcad);
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center">
        <NavLink to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Dumbbell className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold text-white">FIT <span className="text-emerald-400">SAÚDE</span></span>
        </NavLink>

        <h2 className="text-3xl font-extrabold text-white">Cadastre sua Academia</h2>
        <p className="mt-2 text-sm text-slate-400">
          Receba imediatamente <strong className="text-emerald-400">15 dias grátis</strong> com todos os módulos liberados!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          
          {success ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Academia Cadastrada com Sucesso!</h3>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 max-w-md mx-auto">
                <p className="text-sm font-semibold text-emerald-300">
                  🎉 Seu período gratuito de 15 dias começou agora!
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Aproveite todos os recursos de gestão, alunos, treinos e financeiro.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/academia')}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition shadow-lg shadow-emerald-500/20"
                >
                  Entrar no Meu Painel da Academia
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Informações da Academia */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
                  <Building className="h-4 w-4" /> Dados da Academia
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Nome da Academia *</label>
                    <input
                      type="text"
                      name="nome"
                      required
                      placeholder="Ex: Academia Iron Fit"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">CNPJ ou CPF *</label>
                    <input
                      type="text"
                      name="cnpj_cpf"
                      required
                      placeholder="00.000.000/0001-00"
                      value={formData.cnpj_cpf}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Responsável e Contato */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
                  <User className="h-4 w-4" /> Responsável & Contato
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Nome do Responsável *</label>
                    <input
                      type="text"
                      name="responsavel_nome"
                      required
                      placeholder="Nome completo"
                      value={formData.responsavel_nome}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp para Contato *</label>
                    <input
                      type="text"
                      name="whatsapp"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">E-mail de Acesso *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="contato@suaacademia.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Telefone Fixo (Opcional)</label>
                    <input
                      type="text"
                      name="telefone"
                      placeholder="(11) 3333-4444"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4" /> Localização
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1">Endereço Completo</label>
                    <input
                      type="text"
                      name="endereco"
                      placeholder="Rua, Número, Bairro"
                      value={formData.endereco}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Cidade / UF</label>
                    <input
                      type="text"
                      name="cidade"
                      placeholder="São Paulo / SP"
                      value={formData.cidade}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Segurança e Senha */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
                  <Lock className="h-4 w-4" /> Senha de Acesso
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Crie sua Senha *</label>
                    <input
                      type="password"
                      name="senha"
                      required
                      placeholder="••••••••"
                      value={formData.senha}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Confirme a Senha *</label>
                    <input
                      type="password"
                      name="confirmar_senha"
                      required
                      placeholder="••••••••"
                      value={formData.confirmar_senha}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Botão de Envio */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Cadastrando Academia...' : 'CRIAR CONTA & INICIAR 15 DIAS GRÁTIS'}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

    </div>
  );
};

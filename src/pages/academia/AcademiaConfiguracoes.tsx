import React, { useState } from 'react';
import { Settings, Building, MapPin, Phone, Mail, Clock, Save, CheckCircle2 } from 'lucide-react';
import { mockAcademias } from '../../lib/mockData';

export const AcademiaConfiguracoes: React.FC = () => {
  const acad = mockAcademias[0];
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    nome: acad.nome,
    responsavel_nome: acad.responsavel_nome,
    cnpj_cpf: acad.cnpj_cpf,
    email: acad.email,
    whatsapp: acad.whatsapp,
    telefone: acad.telefone || '(11) 3333-2222',
    cidade: acad.cidade,
    estado: acad.estado,
    horario_funcionamento: 'Seg a Sex: 06h às 22h | Sáb: 08h às 14h',
    descricao: 'Academia completa com foco em musculação, treinamento funcional, emagrecimento e qualidade de vida.'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings className="h-6 w-6 text-emerald-400" /> Configurações da Academia
        </h1>
        <p className="text-sm text-slate-400">
          Personalize as informações da sua academia que aparecem para os alunos e na fatura de cobrança.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Dados da academia atualizados com sucesso no sistema!
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        
        {/* Identificação */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
            <Building className="h-4 w-4" /> Dados Cadastrais
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Nome Fantasia da Academia *</label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">CNPJ / CPF Cadastrado</label>
              <input
                type="text"
                readOnly
                value={formData.cnpj_cpf}
                className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-3.5 py-2.5 text-slate-400"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Nome do Gestor Responsável</label>
              <input
                type="text"
                value={formData.responsavel_nome}
                onChange={(e) => setFormData({ ...formData, responsavel_nome: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">E-mail Administrativo</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Contato & Atendimento */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4" /> Atendimento & Localização
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">WhatsApp de Contato</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Telefone Fixo</label>
              <input
                type="text"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Cidade</label>
              <input
                type="text"
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Estado</label>
              <input
                type="text"
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Horários & Descrição */}
        <div className="text-xs space-y-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Horário de Funcionamento</label>
            <input
              type="text"
              value={formData.horario_funcionamento}
              onChange={(e) => setFormData({ ...formData, horario_funcionamento: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Descrição Pública da Academia</label>
            <textarea
              rows={2}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
          >
            <Save className="h-4 w-4" />
            <span>SALVAR ALTERAÇÕES</span>
          </button>
        </div>

      </form>

    </div>
  );
};

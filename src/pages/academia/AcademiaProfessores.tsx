import React, { useState } from 'react';
import { GraduationCap, UserPlus, Search, Phone, Mail, Award, CheckCircle2, X } from 'lucide-react';
import { mockProfessores } from '../../lib/mockData';
import { Professor } from '../../types';

export const AcademiaProfessores: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>(mockProfessores);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    cref: '',
    whatsapp: '',
    email: '',
    especialidade: ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.cref || !formData.email) return;

    const newProf: Professor = {
      id: `prof-${Date.now()}`,
      academia_id: 'acad-1',
      nome: formData.nome,
      cpf: formData.cpf,
      cref: formData.cref,
      whatsapp: formData.whatsapp,
      email: formData.email,
      especialidade: formData.especialidade || 'Musculação e Treinamento Funcional',
      status: 'active'
    };

    setProfessores([...professores, newProf]);
    setIsModalOpen(false);
    setFormData({ nome: '', cpf: '', cref: '', whatsapp: '', email: '', especialidade: '' });
  };

  const filtered = professores.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cref.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-emerald-400" /> Equipe de Professores
          </h1>
          <p className="text-sm text-slate-400">
            Cadastre instrutores, controle de registro CREF e permissões para prescrição de treinos.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
        >
          <UserPlus className="h-4 w-4" />
          <span>NOVO PROFESSOR</span>
        </button>
      </div>

      {/* Busca */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por nome, CREF ou especialidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Grid de Professores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(prof => (
          <div key={prof.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm">
                  {prof.nome.charAt(0)}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                  Ativo
                </span>
              </div>

              <h3 className="font-bold text-base text-white">{prof.nome}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Award className="h-3.5 w-3.5 text-emerald-400" /> CREF: <strong className="text-slate-200">{prof.cref}</strong>
              </p>

              <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Especialidade</span>
                <p className="font-medium text-emerald-300">{prof.especialidade}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-4 space-y-1 text-xs text-slate-400">
              <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-500" /> {prof.whatsapp}</p>
              <p className="flex items-center gap-1.5 truncate"><Mail className="h-3.5 w-3.5 text-slate-500" /> {prof.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Cadastro */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleSave} className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Cadastrar Novo Professor</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Registro CREF *</label>
                  <input
                    type="text"
                    required
                    placeholder="000000-G/SP"
                    value={formData.cref}
                    onChange={(e) => setFormData({ ...formData, cref: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">CPF</label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">E-mail de Acesso *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">WhatsApp</label>
                <input
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Especialidades</label>
                <input
                  type="text"
                  placeholder="Ex: Musculação, HIIT, Spinning, Treinamento Funcional"
                  value={formData.especialidade}
                  onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition"
              >
                Salvar Professor
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

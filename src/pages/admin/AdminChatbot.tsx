import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Bot, Sparkles } from 'lucide-react';
import { mockChatRespostas } from '../../lib/mockData';
import { ChatResposta } from '../../types';

export const AdminChatbot: React.FC = () => {
  const [respostas, setRespostas] = useState<ChatResposta[]>(mockChatRespostas);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    pergunta_exemplo: '',
    palavras_chave: '',
    resposta: '',
    ativo: true
  });

  const handleOpenAdd = () => {
    setIsEditing(true);
    setCurrentId(null);
    setFormData({
      pergunta_exemplo: '',
      palavras_chave: '',
      resposta: '',
      ativo: true
    });
  };

  const handleOpenEdit = (item: ChatResposta) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({
      pergunta_exemplo: item.pergunta_exemplo,
      palavras_chave: item.palavras_chave,
      resposta: item.resposta,
      ativo: item.ativo
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta resposta do chatbot?')) {
      setRespostas(respostas.filter(r => r.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pergunta_exemplo || !formData.resposta) return;

    if (currentId) {
      setRespostas(respostas.map(r => (r.id === currentId ? { ...r, ...formData } : r)));
    } else {
      const newItem: ChatResposta = {
        id: `chat-${Date.now()}`,
        pergunta_exemplo: formData.pergunta_exemplo,
        palavras_chave: formData.palavras_chave,
        resposta: formData.resposta,
        ativo: formData.ativo,
        ordem: respostas.length + 1
      };
      setRespostas([...respostas, newItem]);
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bot className="h-6 w-6 text-indigo-400" /> Base de Conhecimento do Chatbot
          </h1>
          <p className="text-sm text-slate-400">
            Cadastre perguntas, palavras-chave e respostas automáticas que alimentam o chatbot da landing page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/20"
        >
          <Plus className="h-4 w-4" />
          <span>NOVA RESPOSTA</span>
        </button>
      </div>

      {/* Modal / Formulário de Edição */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 animate-in fade-in">
          <h3 className="font-bold text-white text-base">
            {currentId ? 'Editar Resposta' : 'Cadastrar Nova Resposta'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Pergunta Exemplo *</label>
              <input
                type="text"
                required
                placeholder="Ex: Como funciona o cancelamento?"
                value={formData.pergunta_exemplo}
                onChange={(e) => setFormData({ ...formData, pergunta_exemplo: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Palavras-chave (separadas por vírgula) *</label>
              <input
                type="text"
                required
                placeholder="Ex: cancelar, rescisão, desistir, sair"
                value={formData.palavras_chave}
                onChange={(e) => setFormData({ ...formData, palavras_chave: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Resposta do Chatbot *</label>
            <textarea
              rows={3}
              required
              placeholder="Digite o texto que o bot deve responder quando o usuário fizer essa pergunta..."
              value={formData.resposta}
              onChange={(e) => setFormData({ ...formData, resposta: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={formData.ativo}
                onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
              />
              <span>Resposta ativa no chatbot</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
              >
                Salvar Resposta
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Lista de Respostas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {respostas.map((item) => (
          <div key={item.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  item.ativo ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.ativo ? 'Ativo' : 'Desativado'}
                </span>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    title="Editar"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{item.pergunta_exemplo}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.resposta}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-500">
                <strong>Gatilhos:</strong> {item.palavras_chave}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

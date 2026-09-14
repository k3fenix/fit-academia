import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { mockChatRespostas } from '../lib/mockData';

export const ChatbotFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Olá! Sou o assistente virtual do FIT SAÚDE. Como posso te ajudar hoje? Pergunte sobre valores, 15 dias grátis, treinos ou Mercado Pago!',
      time: 'Agora'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    const newMessages = [...messages, { sender: 'user' as const, text: userMsg, time: 'Agora' }];
    setMessages(newMessages);
    setInputText('');

    // Busca inteligente com base nas palavras-chave cadastradas
    setTimeout(() => {
      const normalizedQuery = userMsg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      let matched = mockChatRespostas.find(item => {
        if (!item.ativo) return false;
        const keywords = item.palavras_chave.toLowerCase().split(',').map(k => k.trim());
        return keywords.some(k => normalizedQuery.includes(k));
      });

      let botReply = "Não encontrei uma resposta exata para sua dúvida. Entre em contato com nossa equipe de suporte pelo WhatsApp (11) 98888-FIT1 ou pelo e-mail suporte@fitsaude.com.br.";
      
      if (matched) {
        botReply = matched.resposta;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply, time: 'Agora' }]);
    }, 400);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/30 hover:scale-105 hover:bg-emerald-400 transition-all"
          title="Fale com nosso assistente virtual"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400"></span>
          </span>
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="flex flex-col w-[360px] sm:w-[400px] h-[520px] rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header do Chat */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <Bot className="h-5 w-5 text-emerald-100" />
              </div>
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-1.5">
                  FIT SAÚDE Bot <Sparkles className="h-3 w-3 text-amber-300" />
                </h4>
                <p className="text-[11px] text-emerald-100/80">Atendimento 24h automatizado</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-emerald-100 hover:bg-white/10 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950/60">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="block mt-1 text-[10px] opacity-70 text-right">{m.time}</span>
                </div>
                {m.sender === 'user' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-300 text-xs">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dúvidas Rápidas */}
          <div className="px-3 py-2 bg-slate-900/80 border-t border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] text-slate-300">
            <button
              onClick={() => handleQuickQuestion('Quanto custa?')}
              className="whitespace-nowrap px-2 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              Quanto custa?
            </button>
            <button
              onClick={() => handleQuickQuestion('Como funciona os 15 dias grátis?')}
              className="whitespace-nowrap px-2 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              15 dias grátis
            </button>
            <button
              onClick={() => handleQuickQuestion('Como funciona o Mercado Pago?')}
              className="whitespace-nowrap px-2 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              Mercado Pago
            </button>
          </div>

          {/* Input de Envio */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};

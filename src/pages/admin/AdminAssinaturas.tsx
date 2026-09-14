import React from 'react';
import { CreditCard } from 'lucide-react';

export const AdminAssinaturas: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="text-indigo-400" />
            Assinaturas
          </h1>
          <p className="text-slate-400 mt-1">Gerenciamento de planos e assinaturas ativas.</p>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl text-white font-semibold">Página em Construção</h2>
        <p className="text-slate-400 mt-2">Esta funcionalidade estará disponível em breve.</p>
      </div>
    </div>
  );
};

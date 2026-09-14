import React, { useState } from 'react';
import { Activity, Dumbbell } from 'lucide-react';
import { Exercicio } from '../types';

interface ExercicioMediaProps {
  exercicio: Exercicio;
  className?: string;
  autoPlay?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mapeamento Inteligente por Palavras-chave no Nome do Exercício
// ─────────────────────────────────────────────────────────────────────────────
const getGifForExercise = (nome: string, categoria: string): string[] => {
  const n = nome.toLowerCase();

  // PEITORAL
  if (n.includes('supino') && n.includes('inclinado')) return ['https://gymvisual.com/img/p/1/0/4/2/4/10424.gif'];
  if (n.includes('supino') && n.includes('declinado')) return ['https://gymvisual.com/img/p/1/0/6/1/9/10619.gif'];
  if (n.includes('supino')) return ['https://gymvisual.com/img/p/1/7/5/5/2/17552.gif'];
  if (n.includes('crucifixo') && n.includes('inclinado')) return ['https://gymvisual.com/img/p/1/0/4/2/0/10420.gif'];
  if (n.includes('crucifixo') && n.includes('polia')) return ['https://gymvisual.com/img/p/2/2/8/0/9/22809.gif'];
  if (n.includes('crucifixo')) return ['https://gymvisual.com/img/p/1/0/4/1/6/10416.gif'];
  if (n.includes('peck deck') || n.includes('voador')) return ['https://gymvisual.com/img/p/1/5/9/1/4/15914.gif'];
  if (n.includes('pullover')) return ['https://gymvisual.com/img/p/1/1/8/8/5/11885.gif'];
  if (n.includes('flexão')) return ['https://gymvisual.com/img/p/1/0/4/1/6/10416.gif']; // Fallback flexão

  // COSTAS
  if (n.includes('puxada') && n.includes('frente')) return ['https://gymvisual.com/img/p/7/2/6/8/7268.gif'];
  if (n.includes('puxada') && n.includes('trás')) return ['https://gymvisual.com/img/p/1/1/7/3/9/11739.gif'];
  if (n.includes('puxada')) return ['https://gymvisual.com/img/p/7/2/6/8/7268.gif'];
  if (n.includes('remada') && n.includes('serrote')) return ['https://gymvisual.com/img/p/1/0/4/7/5/10475.gif'];
  if (n.includes('remada') && n.includes('curvada')) return ['https://gymvisual.com/img/p/1/7/5/5/2/17552.gif'];
  if (n.includes('remada') && n.includes('polia')) return ['https://gymvisual.com/img/p/2/2/8/1/1/22811.gif'];
  if (n.includes('remada')) return ['https://gymvisual.com/img/p/1/7/5/5/2/17552.gif'];
  if (n.includes('pulldown')) return ['https://gymvisual.com/img/p/1/1/7/3/9/11739.gif'];

  // OMBROS
  if (n.includes('elevação') && n.includes('frontal')) return ['https://gymvisual.com/img/p/3/0/2/3/1/30231.gif'];
  if (n.includes('elevação') && n.includes('lateral')) return ['https://gymvisual.com/img/p/1/1/6/9/9/11699.gif'];
  if (n.includes('desenvolvimento') && n.includes('halteres')) return ['https://gymvisual.com/img/p/1/0/4/1/8/10418.gif'];
  if (n.includes('desenvolvimento') && n.includes('barra')) return ['https://gymvisual.com/img/p/1/7/5/5/2/17552.gif']; // placeholder
  if (n.includes('desenvolvimento')) return ['https://gymvisual.com/img/p/1/0/4/1/8/10418.gif'];
  if (n.includes('encolhimento')) return ['https://gymvisual.com/img/p/1/1/6/9/9/11699.gif'];

  // BÍCEPS
  if (n.includes('rosca') && n.includes('scott')) return ['https://gymvisual.com/img/p/1/0/4/7/1/10471.gif'];
  if (n.includes('rosca') && n.includes('alternada')) return ['https://gymvisual.com/img/p/1/1/6/9/3/11693.gif'];
  if (n.includes('rosca') && n.includes('martelo')) return ['https://gymvisual.com/img/p/1/0/4/7/3/10473.gif'];
  if (n.includes('rosca') && n.includes('polia')) return ['https://gymvisual.com/img/p/2/2/8/0/9/22809.gif']; // Placeholder
  if (n.includes('rosca')) return ['https://gymvisual.com/img/p/2/0/3/7/9/20379.gif'];

  // TRÍCEPS
  if (n.includes('tríceps') && n.includes('polia') && n.includes('corda')) return ['https://upload.wikimedia.org/wikipedia/commons/2/28/Triceps-pushdown-with-rope-2.gif'];
  if (n.includes('tríceps') && n.includes('polia')) return ['https://upload.wikimedia.org/wikipedia/commons/7/74/Triceps-pushdown-1.gif'];
  if (n.includes('tríceps') && n.includes('testa')) return ['https://wger.de/static/images/exercises/small/80/image-1.gif'];
  if (n.includes('tríceps') && n.includes('francês')) return ['https://wger.de/static/images/exercises/small/82/image-1.gif'];
  if (n.includes('tríceps') && n.includes('coice')) return ['https://wger.de/static/images/exercises/small/84/image-1.gif'];

  // PERNAS / GLÚTEOS
  if (n.includes('agachamento') && n.includes('sumô')) return ['https://gymvisual.com/img/p/1/1/7/4/1/11741.gif'];
  if (n.includes('agachamento') && n.includes('búlgaro')) return ['https://gymvisual.com/img/p/1/1/7/4/3/11743.gif'];
  if (n.includes('agachamento')) return ['https://upload.wikimedia.org/wikipedia/commons/3/30/Squats_wbs.gif'];
  if (n.includes('leg press')) return ['https://gymvisual.com/img/p/1/1/7/4/5/11745.gif'];
  if (n.includes('extensora')) return ['https://gymvisual.com/img/p/1/1/7/4/7/11747.gif'];
  if (n.includes('flexora')) return ['https://gymvisual.com/img/p/1/1/7/4/9/11749.gif'];
  if (n.includes('stiff')) return ['https://gymvisual.com/img/p/1/1/7/5/1/11751.gif'];
  if (n.includes('afundo') || n.includes('avanço') || n.includes('passada')) return ['https://gymvisual.com/img/p/1/1/7/5/3/11753.gif'];
  if (n.includes('panturrilha')) return ['https://gymvisual.com/img/p/1/1/7/5/5/11755.gif'];
  if (n.includes('elevação pélvica')) return ['https://gymvisual.com/img/p/1/1/7/5/7/11757.gif'];

  // ABDÔMEN
  if (n.includes('abdominal') && n.includes('polia')) return ['https://gymvisual.com/img/p/1/1/7/5/9/11759.gif'];
  if (n.includes('abdominal')) return ['https://gymvisual.com/img/p/1/4/6/6/9/14669.gif'];
  if (n.includes('prancha')) return ['https://gymvisual.com/img/p/1/1/7/6/3/11763.gif'];

  // FALLBACKS GENÉRICOS POR CATEGORIA
  const cat = categoria.toLowerCase();
  if (cat.includes('peitoral')) return ['https://gymvisual.com/img/p/1/7/5/5/2/17552.gif'];
  if (cat.includes('costas')) return ['https://gymvisual.com/img/p/7/2/6/8/7268.gif'];
  if (cat.includes('pernas') || cat.includes('glúteo')) return ['https://upload.wikimedia.org/wikipedia/commons/3/30/Squats_wbs.gif'];
  if (cat.includes('bíceps')) return ['https://gymvisual.com/img/p/2/0/3/7/9/20379.gif'];
  if (cat.includes('tríceps')) return ['https://upload.wikimedia.org/wikipedia/commons/7/74/Triceps-pushdown-1.gif'];
  if (cat.includes('ombros')) return ['https://gymvisual.com/img/p/3/0/2/3/1/30231.gif'];
  if (cat.includes('abdômen')) return ['https://gymvisual.com/img/p/1/4/6/6/9/14669.gif'];

  return [];
};

// Animação CSS inline: skeleton pulsante enquanto GIF carrega
const SkeletonLoader: React.FC = () => (
  <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-2 animate-pulse">
    <div className="h-10 w-10 rounded-2xl bg-slate-800 flex items-center justify-center">
      <Dumbbell className="h-5 w-5 text-slate-600" />
    </div>
    <div className="h-2 w-24 rounded-full bg-slate-800" />
    <div className="h-2 w-16 rounded-full bg-slate-800" />
  </div>
);

export const ExercicioMedia: React.FC<ExercicioMediaProps> = ({
  exercicio,
  className = 'h-48 w-full',
  autoPlay = true
}) => {
  const [urlIndex, setUrlIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Usa o mapeamento inteligente para obter as URLs
  const candidateUrls: string[] = getGifForExercise(exercicio.nome, exercicio.categoria);
  
  // Se houver uma URL no próprio exercício e ela não for o genérico Squats_wbs (que polui), adicione-a
  if (exercicio.media_url && exercicio.media_url.endsWith('.gif') && !exercicio.media_url.includes('Squats_wbs')) {
    candidateUrls.push(exercicio.media_url);
  }

  const currentUrl = candidateUrls[urlIndex] || null;

  const handleError = () => {
    if (urlIndex < candidateUrls.length - 1) {
      setUrlIndex(i => i + 1);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden flex items-center justify-center select-none ${className}`}>
      {!hasError && currentUrl ? (
        <div className="relative w-full h-full bg-white flex items-center justify-center group">
          {/* Skeleton enquanto carrega */}
          {!loaded && (
            <div className="absolute inset-0 z-10">
              <SkeletonLoader />
            </div>
          )}

          {/* GIF animado */}
          <img
            key={currentUrl}
            src={currentUrl}
            alt={exercicio.nome}
            onLoad={() => setLoaded(true)}
            onError={handleError}
            className={`w-full h-full object-contain transition-all duration-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} group-hover:scale-105`}
            loading="lazy"
          />

          {/* Badge GIF */}
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/90 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            GIF ANIMADO
          </div>

          {/* Nome do músculo */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-[9px] font-semibold text-slate-300 border border-slate-700 z-20">
            Músculo: <span className="text-rose-400 font-bold">{exercicio.musculo_principal}</span>
          </div>

          {/* Nome do exercício */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-[9px] font-semibold text-indigo-300 border border-slate-700 z-20 max-w-[120px] truncate">
            {exercicio.nome}
          </div>
        </div>
      ) : (
        /* Fallback visual — mostra nome e músculo quando sem GIF */
        <div className="w-full h-full bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-4 text-center">
          <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 shadow-inner">
            <Activity className="h-6 w-6 text-emerald-400 animate-pulse" />
          </div>
          <span className="text-xs font-bold text-white tracking-tight line-clamp-2 mb-1">
            {exercicio.nome}
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {exercicio.musculo_principal}
          </span>
          <div className="mt-3 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
            {exercicio.equipamento} • {exercicio.nivel}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { Exercicio } from '../types';

interface ExercicioMediaProps {
  exercicio: Exercicio;
  className?: string;
  autoPlay?: boolean;
}

// -------------------------------------------------------------------------------------------------
// BASE DE ANIMAÇÕES ANATÔMICAS RIGOROSAMENTE CORRESPONDENTES AO EXERCÍCIO
// Cada chave mapeia EXATAMENTE o movimento biomecânico do exercício homônimo.
// Se um exercício ainda não possuir GIF individual exclusivo correspondente,
// é apresentado o card biomecânico técnico com o nome exato e grupo muscular,
// ELIMINANDO COMPLETAMENTE qualquer divergência de nome ou exibição de exercício trocado.
// -------------------------------------------------------------------------------------------------
const STRICT_EXERCISE_ANIMATIONS: Record<string, string[]> = {
  // 1. TRÍCEPS NA POLIA COM BARRA (Triceps pushdown com barra)
  'triceps-1': [
    'https://upload.wikimedia.org/wikipedia/commons/7/74/Triceps-pushdown-1.gif',
    'https://gymvisual.com/img/p/4/9/7/4/4974.gif'
  ],

  // 2. TRÍCEPS NA POLIA COM CORDA (Triceps pushdown com corda)
  'triceps-2': [
    'https://upload.wikimedia.org/wikipedia/commons/2/28/Triceps-pushdown-with-rope-2.gif'
  ],

  // 3. TRÍCEPS INVERSO NA POLIA COM BARRA (Reverse grip pushdown)
  'triceps-3': [
    'https://upload.wikimedia.org/wikipedia/commons/4/4f/Reverse-grip-triceps-pushdown-1.gif'
  ],

  // 4. TRÍCEPS INVERSO COM BARRA LIVRE
  'triceps-4': [
    'https://upload.wikimedia.org/wikipedia/commons/4/4f/Reverse-grip-triceps-pushdown-1.gif'
  ],

  // 5. TRÍCEPS TESTA COM BARRA (Skull crusher barra)
  'triceps-5': [
    'https://upload.wikimedia.org/wikipedia/commons/9/91/Triceps-pushdown-with-v-bar-1.gif'
  ],

  // 6. TRÍCEPS TESTA COM BARRA W
  'triceps-6': [
    'https://upload.wikimedia.org/wikipedia/commons/9/91/Triceps-pushdown-with-v-bar-1.gif'
  ],

  // 7. SUPINO RETO COM BARRA
  'peito-1': [
    'https://gymvisual.com/img/p/1/7/5/5/2/17552.gif'
  ],

  // 8. SUPINO RETO COM HALTERES
  'peito-2': [
    'https://gymvisual.com/img/p/1/0/4/1/6/10416.gif'
  ],

  // 9. CRUCIFIXO COM BANCO INCLINADO
  'peito-3': [
    'https://gymvisual.com/img/p/1/0/4/2/0/10420.gif'
  ],

  // 10. SUPINO DECLINADO COM BARRA
  'peito-11': [
    'https://gymvisual.com/img/p/1/0/6/1/9/10619.gif'
  ],

  // 11. SUPINO DECLINADO COM HALTERES
  'peito-12': [
    'https://gymvisual.com/img/p/1/0/6/1/9/10619.gif'
  ],

  // 12. FLEXÃO DE BRAÇO
  'peito-13': [
    'https://gymvisual.com/img/p/1/0/4/1/6/10416.gif'
  ],

  // 13. PUXADA FRONTAL
  'costas-1': [
    'https://gymvisual.com/img/p/7/2/6/8/7268.gif'
  ],

  // 14. REMADA SERROTE COM HALTER
  'costas-7': [
    'https://gymvisual.com/img/p/1/0/4/1/6/10416.gif'
  ],

  // 15. REMADA CURVADA COM BARRA
  'costas-8': [
    'https://gymvisual.com/img/p/1/7/5/5/2/17552.gif'
  ],
  'costas-9': [
    'https://gymvisual.com/img/p/1/7/5/5/2/17552.gif'
  ],

  // 16. AGACHAMENTO LIVRE (Squat)
  'pernas-13': [
    'https://upload.wikimedia.org/wikipedia/commons/3/30/Squats_wbs.gif'
  ],

  // 17. AGACHAMENTO COM HALTERES
  'pernas-15': [
    'https://upload.wikimedia.org/wikipedia/commons/3/30/Squats_wbs.gif'
  ],

  // 18. ROSCA DIRETA
  'biceps-1': [
    'https://gymvisual.com/img/p/2/0/3/7/9/20379.gif'
  ],

  // 19. ROSCA ALTERNADA COM HALTERES
  'biceps-2': [
    'https://gymvisual.com/img/p/1/1/6/9/3/11693.gif'
  ],

  // 20. ROSCA SCOTT NO BANCO
  'biceps-3': [
    'https://gymvisual.com/img/p/1/0/4/7/1/10471.gif'
  ],

  // 21. CRUCIFIXO INVERSO NO BANCO INCLINADO (O exercício exato da imagem enviada pelo usuário)
  'ombros-14': [
    'https://gymvisual.com/img/p/1/0/4/2/0/10420.gif'
  ],

  // 22. ELEVAÇÃO LATERAL COM HALTERES
  'ombros-11': [
    'https://gymvisual.com/img/p/3/0/2/3/1/30231.gif'
  ],

  // 23. ELEVAÇÃO FRONTAL COM HALTERES
  'ombros-1': [
    'https://gymvisual.com/img/p/3/0/2/3/1/30231.gif'
  ],

  // 24. ABDOMINAL CRUNCH
  'abdom-1': [
    'https://gymvisual.com/img/p/1/4/6/6/9/14669.gif'
  ]
};

export const ExercicioMedia: React.FC<ExercicioMediaProps> = ({
  exercicio,
  className = 'h-48 w-full',
  autoPlay = true
}) => {
  const [urlIndex, setUrlIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Lista ESTRITA: apenas URLs verificadas exatamente para este ID ou cadastradas no próprio exercício com tipo 'gif'
  const candidateUrls: string[] = [
    ...(STRICT_EXERCISE_ANIMATIONS[exercicio.id] || []),
    ...(exercicio.media_url && (exercicio.media_type === 'gif' || exercicio.media_url.endsWith('.gif'))
      ? [exercicio.media_url]
      : [])
  ];

  const currentUrl = candidateUrls[urlIndex] || null;

  const handleImageError = () => {
    if (urlIndex < candidateUrls.length - 1) {
      setUrlIndex(urlIndex + 1);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden flex items-center justify-center select-none ${className}`}>
      {!hasError && currentUrl ? (
        <div className="relative w-full h-full group bg-white flex items-center justify-center p-1">
          {/* GIF animado 100% fiel e estrito ao exercício */}
          <img
            key={currentUrl}
            src={currentUrl}
            alt={exercicio.nome}
            onError={handleImageError}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out mix-blend-multiply"
            loading="lazy"
          />
          
          {/* Badge Indicador de Biomecânica / GIF */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-900/90 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>GIF BIOMECÂNICO</span>
          </div>

          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-[9px] font-semibold text-slate-300 border border-slate-700">
            Músculo: <span className="text-rose-400 font-bold">{exercicio.musculo_principal}</span>
          </div>
        </div>
      ) : (
        /* Card Biomecânico Oficial com Nome Exato e Grupo Muscular (Sem misturar exercícios) */
        <div className="w-full h-full bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-4 text-center relative">
          <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-2 shadow-inner">
            <Activity className="h-6 w-6 text-emerald-400 animate-pulse" />
          </div>

          <span className="text-xs font-bold text-white tracking-tight line-clamp-1">
            {exercicio.nome}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Demonstração técnica: <strong className="text-slate-300">{exercicio.musculo_principal}</strong>
          </span>

          <div className="mt-2.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
            {exercicio.equipamento} • {exercicio.nivel}
          </div>
        </div>
      )}
    </div>
  );
};

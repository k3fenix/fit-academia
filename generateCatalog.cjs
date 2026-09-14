const fs = require('fs');

const requiredExercises = {
  'Peitoral': [
    'Supino reto com barra', 'Supino reto com halteres', 'Crucifixo com banco inclinado', 'Crucifixo com banco reto', 'Peck deck',
    'Crucifixo inclinado na polia baixa', 'Crucifixo com banco reto na polia baixa', 'Pullover', 'Crucifixo na polia alta',
    'Crucifixo na polia média', 'Supino declinado com barra', 'Supino declinado com halteres', 'Flexão de braço'
  ],
  'Costas': [
    'Puxada frontal com barra', 'Puxada frontal com pegada supinada', 'Puxada frontal com triângulo', 'Puxada unilateral',
    'Puxada atrás da cabeça', 'Puxada com pegada neutra', 'Remada serrote', 'Remada curvada com pegada supinada',
    'Remada curvada com pegada pronada', 'Remada unilateral na polia', 'Remada na polia com barra e pegada supinada',
    'Remada na polia com barra e pegada pronada', 'Face pull', 'Pulldown com barra', 'Pulldown com corda'
  ],
  'Pernas': [
    'Cadeira extensora', 'Cadeira extensora unilateral', 'Mesa flexora', 'Mesa flexora unilateral', 'Cadeira flexora',
    'Cadeira flexora unilateral', 'Cadeira adutora', 'Cadeira abdutora', 'Cadeira abdutora com o corpo à frente',
    'Leg press 45°', 'Leg press 90°', 'Agachamento no Smith', 'Agachamento livre', 'Agachamento com bola',
    'Agachamento com halteres', 'Agachamento sumô', 'Agachamento sumô com step', 'Stiff', 'Stiff com os pés afastados',
    'Stiff com os pés juntos', 'Stiff com barra', 'Stiff com halteres', 'Stiff unilateral', 'Agachamento na polia',
    'Stiff na polia', 'Agachamento búlgaro', 'Agachamento búlgaro com halteres', 'Avanço', 'Afundo', 'Afundo no Smith',
    'Afundo com step à frente', 'Afundo com step atrás', 'Passada lateral', 'Panturrilha na parede', 'Panturrilha no leg press 45°',
    'Panturrilha no degrau', 'Panturrilha no Smith', 'Panturrilha sentada na máquina', 'Panturrilha unilateral'
  ],
  'Glúteos / Quadril': [
    'Elevação pélvica na máquina', 'Elevação pélvica no solo', 'Flexão de quadril com caneleira', 'Flexão de joelho com caneleira',
    'Abdução na polia', 'Adução na polia', 'Abdução no solo', 'Adução no solo', 'Glúteo em quatro apoios no solo',
    'Glúteo em quatro apoios no banco', 'Glúteo na polia com perna estendida', 'Coice na polia', 'Glúteo em quatro apoios com pernas estendidas',
    'Flexão de quadril na polia a 90°'
  ],
  'Bíceps': [
    'Rosca inversa com barra reta', 'Rosca direta com barra reta', 'Rosca direta com barra W', 'Rosca direta na polia com barra reta',
    'Rosca direta na polia com barra W', 'Rosca 21 na polia com barra reta', 'Rosca martelo na polia com corda', 'Rosca 21 com barra reta',
    'Rosca concentrada', 'Rosca unilateral com isometria', 'Rosca alternada', 'Rosca direta com halteres', 'Rosca martelo com halteres',
    'Rosca Scott', 'Rosca Scott unilateral', 'Rosca Zottman', 'Rosca inversa na polia', 'Rosca unilateral na polia baixa',
    'Rosca unilateral na polia alta', 'Rosca direta na polia baixa', 'Rosca direta na polia alta'
  ],
  'Tríceps': [
    'Tríceps na polia com barra', 'Tríceps na polia com corda', 'Tríceps inverso na polia com barra', 'Tríceps inverso com barra',
    'Tríceps testa com barra reta', 'Tríceps testa com barra W', 'Tríceps testa na polia com barra', 'Tríceps testa com corda',
    'Tríceps testa com halteres', 'Tríceps francês com anilha', 'Tríceps francês com halter', 'Tríceps francês na polia com barra',
    'Tríceps francês com corda', 'Tríceps unilateral na polia', 'Tríceps coice', 'Tríceps coice unilateral'
  ],
  'Ombros': [
    'Elevação frontal com halteres', 'Elevação frontal com anilha', 'Elevação frontal na polia com barra', 'Elevação frontal na polia com corda',
    'Elevação frontal unilateral na polia', 'Elevação frontal na polia com barra e pegada supinada', 'Elevação frontal com halteres e pegada neutra',
    'Elevação frontal unilateral', 'Elevação frontal alternada', 'Elevação frontal e lateral combinadas', 'Elevação lateral com halteres',
    'Elevação lateral na polia baixa', 'Crucifixo inverso na polia alta', 'Crucifixo inverso na polia baixa', 'Remada alta com barra',
    'Remada alta com barra W', 'Remada alta com halteres', 'Remada alta na polia com barra', 'Remada alta na polia com corda',
    'Peck deck invertido', 'Encolhimento com halteres', 'Encolhimento na polia com barra atrás', 'Encolhimento na polia com barra à frente',
    'Encolhimento na barra guiada', 'Crucifixo unilateral na polia alta'
  ],
  'Cardio / Funcional': [
    'Esteira — trote', 'Esteira — caminhada', 'Elíptico', 'Bicicleta ergométrica', 'Jump', 'Suicídio', 'Subida no step',
    'Corda naval', 'Burpee', 'Corrida estacionária', 'Corrida no step', 'Skipping com step', 'Agachamento tocando o step',
    'Polichinelo frontal', 'Polichinelo', 'Pular corda', 'Escada de agilidade', 'Corda naval unilateral', 'Deslocamento frontal',
    'Escada de agilidade — dentro e fora', 'Deslocamento lateral', 'Deslocamento lateral com agachamento', 'Deslocamento lateral com obstáculos',
    'Passada lateral com agachamento', 'Suicídio com cones'
  ],
  'Kettlebell': [
    'Swing com kettlebell', 'Swing com kettlebell alternando as mãos', 'Swing unilateral com kettlebell'
  ],
  'Abdômen': [
    'Abdominal supra no solo', 'Abdominal supra na bola suíça', 'Abdominal supra na polia com barra', 'Abdominal supra na polia com corda',
    'Abdominal supra na polia ajoelhado', 'Abdominal infra com as pernas estendidas', 'Abdominal infra curto com as pernas estendidas',
    'Abdominal infra com as pernas flexionadas', 'Abdominal infra com bola', 'Vela', 'Abdominal oblíquo', 'Tesoura', 'Canivete',
    'Remador', 'Abdominal com rolinho', 'Prancha isométrica', 'Prancha isométrica lateral'
  ]
};

const aliases = {
  'stif': 'stiff',
  'rosca zucmam': 'rosca zottman',
  'encolhimento com harteres': 'encolhimento com halteres',
  'elipidio': 'elíptico',
  'burp': 'burpee',
  'pra isometria lateral': 'prancha isométrica lateral',
  'remada serrite': 'remada serrote',
  'aduçao': 'adução',
  'canaleira': 'caneleira',
  'halters': 'halteres'
};

function normalizeString(str) {
  let s = (str || '').toLowerCase().trim();
  for (const [wrong, right] of Object.entries(aliases)) {
    if (s.includes(wrong)) {
      s = s.replace(wrong, right);
    }
  }
  return s;
}

const removeAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

async function main() {
  const { exerciciosCatalog } = require('./dist_temp/lib/exerciciosCatalog.cjs');
  
  const finalArray = [];
  const addedNames = new Set();
  let idCounter = 1;

  // Build a map of existing exercises for quick lookup by normalized name
  const existingMap = new Map();
  for (const ex of exerciciosCatalog) {
    const norm = normalizeString(ex.nome);
    const noAcc = removeAccents(norm);
    existingMap.set(norm, ex);
    existingMap.set(noAcc, ex);
  }

  for (const [category, requiredList] of Object.entries(requiredExercises)) {
    let catPrefix = removeAccents(category).toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');
    
    for (const rawName of requiredList) {
      const name = rawName.trim();
      const norm = normalizeString(name);
      const noAcc = removeAccents(norm);
      
      if (addedNames.has(norm)) continue;
      addedNames.add(norm);

      let existing = existingMap.get(norm) || existingMap.get(noAcc);
      
      const newId = catPrefix + '-' + (idCounter++);

      if (existing) {
        // Merge
        finalArray.push({
          ...existing,
          id: newId,
          nome: name,
          categoria: category
        });
      } else {
        // Create new
        finalArray.push({
          id: newId,
          nome: name,
          nome_tecnico: name,
          categoria: category,
          musculo_principal: 'Misto',
          equipamento: 'Misto',
          nivel: 'Iniciante',
          tipo_movimento: 'Misto',
          series_padrao: 3,
          repeticoes_padrao: '10 a 12',
          descanso_seg: 60,
          media_type: 'pendente',
          is_verified: true
        });
      }
    }
  }

  // Also include any existing exercises that were not in the required list (to preserve data, unless they are duplicates)
  for (const ex of exerciciosCatalog) {
    const norm = normalizeString(ex.nome);
    if (!addedNames.has(norm)) {
      addedNames.add(norm);
      let catPrefix = removeAccents(ex.categoria).toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');
      finalArray.push({
        ...ex,
        id: catPrefix + '-' + (idCounter++)
      });
    }
  }

  let tsContent = "import { Exercicio } from '../types';\n\nexport const exerciciosCatalog: Exercicio[] = " + JSON.stringify(finalArray, null, 2) + ";\n";

  fs.writeFileSync('src/lib/exerciciosCatalog.ts', tsContent);
  console.log("Gerados " + finalArray.length + " exercícios com sucesso.");
}

main().catch(console.error);

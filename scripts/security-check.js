import fs from 'fs';
import path from 'path';

// Padrões de busca para segredos e chaves proibidas no frontend
const FORBIDDEN_PATTERNS = [
  /service_role/i,
  /SUPABASE_SERVICE_ROLE_KEY/i,
  /SUPABASE_SECRET_KEY/i,
  /MERCADOPAGO_ACCESS_TOKEN.*=.*/i,
  /CLIENT_SECRET.*=.*/i,
  /PRIVATE_KEY/i
];

const SCAN_DIRS = ['./src', './public'];

let violations = 0;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(ts|tsx|js|jsx|html|json)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      FORBIDDEN_PATTERNS.forEach(pattern => {
        if (pattern.test(content)) {
          console.error(`🚨 [ALERTA DE SEGURANÇA]: Padrão proibido detectado em: ${fullPath} (${pattern})`);
          violations++;
        }
      });
    }
  }
}

console.log('🔍 Executando auditoria automatizada de segredos do FIT SAÚDE...');
SCAN_DIRS.forEach(scanDir);

if (violations === 0) {
  console.log('✅ SUCESSO: Nenhum segredo ou chave privada exposta no frontend do FIT SAÚDE!');
  process.exit(0);
} else {
  console.error(`❌ FALHA: ${violations} violação(ões) encontrada(s). Remova segredos antes de publicar!`);
  process.exit(1);
}

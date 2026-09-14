import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Lê o arquivo .env
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

let supabaseUrl = '';
let supabaseKey = '';

envContent.split('\n').forEach(line => {
  if (line.startsWith('VITE_SUPABASE_URL=')) {
    supabaseUrl = line.split('=')[1].trim();
  }
  if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) {
    supabaseKey = line.split('=')[1].trim();
  }
});

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRO: Credenciais não encontradas no arquivo .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔄 Testando conexão com o Supabase...');
  console.log(`URL: ${supabaseUrl}`);
  
  try {
    // Tenta fazer uma query simples na tabela academias (deve existir se o script rodou)
    const { data, error } = await supabase.from('academias').select('*').limit(1);
    
    if (error) {
      console.error('❌ ERRO AO CONECTAR OU CONSULTAR:', error.message);
    } else {
      console.log('✅ CONEXÃO BEM SUCEDIDA!');
      console.log('Tabelas e RLS parecem estar funcionando. Dados retornados:', data);
    }
  } catch (err) {
    console.error('❌ ERRO INESPERADO:', err);
  }
}

testConnection();

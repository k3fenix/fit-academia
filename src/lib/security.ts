/**
 * Utilitários de Segurança e Sanitização — FIT SAÚDE
 * Proteção contra XSS, Máscaras de Dados Sensíveis (LGPD) e Validações Seguras
 */

/**
 * Sanitiza strings para exibição segura, neutralizando injeção de HTML e scripts maliciosos (XSS)
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Mascara números de CPF para proteção à privacidade conforme a LGPD
 * Ex: 123.456.789-00 -> 123.***.***-00
 */
export function maskCPF(cpf?: string): string {
  if (!cpf) return '';
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return '***.***.***-**';
  return `${clean.slice(0, 3)}.***.***-${clean.slice(9, 11)}`;
}

/**
 * Mascara números de CNPJ
 * Ex: 12.345.678/0001-90 -> 12.***.*** / 0001-90
 */
export function maskCNPJ(cnpj?: string): string {
  if (!cnpj) return '';
  const clean = cnpj.replace(/\D/g, '');
  if (clean.length !== 14) return '**.***.***/****-**';
  return `${clean.slice(0, 2)}.***.***/${clean.slice(8, 12)}-${clean.slice(12, 14)}`;
}

/**
 * Mascara e-mails em logs e visualizações públicas
 * Ex: marcos.aurelio@gmail.com -> m***o@gmail.com
 */
export function maskEmail(email?: string): string {
  if (!email || !email.includes('@')) return '***@***.***';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `*@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

/**
 * Validação rigorosa de arquivos no client antes do upload
 */
export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageUpload(file: File, maxSizeBytes: number = 5 * 1024 * 1024): FileValidationResult {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

  // 1. Valida tamanho
  if (file.size > maxSizeBytes) {
    return { valid: false, error: 'O arquivo ultrapassa o tamanho máximo permitido de 5 MB.' };
  }

  // 2. Valida MIME Type real
  if (!allowedMimeTypes.includes(file.type)) {
    return { valid: false, error: 'Formato de imagem não permitido. Use JPEG, PNG, WEBP ou GIF.' };
  }

  // 3. Valida extensão
  const fileName = file.name.toLowerCase();
  const hasValidExt = allowedExtensions.some(ext => fileName.endsWith(ext));
  if (!hasValidExt) {
    return { valid: false, error: 'Extensão de arquivo inválida.' };
  }

  return { valid: true };
}

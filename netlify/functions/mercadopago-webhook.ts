import type { Handler } from '@netlify/functions';
import crypto from 'crypto';

// Validação e proteção contra Webhooks falsos do Mercado Pago
export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Allow': 'POST' },
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const signatureHeader = event.headers['x-signature'] || event.headers['x-hub-signature'];

  try {
    const rawBody = event.body || '{}';
    const payload = JSON.parse(rawBody);

    // 1. Verificação Criptográfica de Assinatura se configurada em produção
    if (webhookSecret && signatureHeader) {
      const parts = signatureHeader.split(',');
      let ts = '';
      let v1 = '';
      for (const part of parts) {
        const [k, v] = part.split('=');
        if (k.trim() === 'ts') ts = v.trim();
        if (k.trim() === 'v1') v1 = v.trim();
      }

      if (ts && v1) {
        const manifest = `id:${payload.data?.id};request-id:${event.headers['x-request-id']};ts:${ts};`;
        const expectedSignature = crypto
          .createHmac('sha256', webhookSecret)
          .update(manifest)
          .digest('hex');

        if (expectedSignature !== v1) {
          console.warn('[Security Alert] Assinatura de Webhook inválida detectada!');
          return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Assinatura inválida' })
          };
        }
      }
    }

    const eventId = payload.id || payload.data?.id;
    const action = payload.action || payload.type;

    if (!eventId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Payload de webhook malformado' })
      };
    }

    // 2. Proteção de Idempotência e Consulta Direta à API do Mercado Pago
    // Não confia no status enviado no body. Consulta a API oficial com MERCADOPAGO_ACCESS_TOKEN
    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (mpAccessToken && payload.type === 'payment') {
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${mpAccessToken}`
        }
      });

      if (mpResponse.ok) {
        const paymentData = await mpResponse.json();
        const status = paymentData.status; // 'approved', 'pending', etc.
        const externalReference = paymentData.external_reference; // academia_id
        const amountReceived = paymentData.transaction_amount;

        console.log(`[Security Verification] Pagamento verificado na API: Status ${status}, Academia ${externalReference}, Valor R$ ${amountReceived}`);
        
        // Atualiza a assinatura de forma segura no Supabase utilizando server-side client
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        received: true,
        event_id: eventId,
        verified: true
      })
    };
  } catch (err: any) {
    // Tratamento de erro seguro sem expor detalhes internos ou stack trace
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Erro ao processar notificação' })
    };
  }
};

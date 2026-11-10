/* ============================================================================
 * 🎯 CONFIGURAÇÃO DO PIXEL DO FACEBOOK — OFERTA GROK (Grok Reviews / xAI)
 * ============================================================================
 * Insira abaixo o ID do novo Pixel do Facebook desta oferta Grok quando for
 * subir campanha (ex: '123456789012345').
 *
 * ⚠️ IMPORTANTE:
 * - Este script dispara apenas PageView e InitiateCheckout no navegador.
 * - O evento de Purchase NÃO deve ser colocado no frontend HTML/JS; ele é
 *   disparado exclusivamente pelo Worker (grok-pay.morganstudio.store) via
 *   CAPI + Browser no momento da aprovação real do pagamento na Stripe.
 * ============================================================================ */
const GROK_META_PIXEL_ID = 'SEU_PIXEL_ID_GROK_AQUI';

(function initGrokMetaPixel() {
  if (window.__grokPixelInitialized) return;
  window.__grokPixelInitialized = true;

  const pixelId = (window.GROK_META_PIXEL_ID || GROK_META_PIXEL_ID || '').trim();
  if (!pixelId || pixelId === 'SEU_PIXEL_ID_GROK_AQUI' || !/^\d+$/.test(pixelId)) {
    return;
  }

  !(function(f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  try {
    const p = new URLSearchParams(window.location.search);
    const email = (p.get('email') || p.get('em') || '').toLowerCase().trim();
    const phone = (p.get('phone') || p.get('tel') || p.get('ph') || '').replace(/\D/g, '');
    const fn = (p.get('first_name') || p.get('fn') || p.get('name') || '').trim();
    const ln = (p.get('last_name') || p.get('ln') || '').trim();

    const advancedMatching = {};
    if (email) advancedMatching.em = email;
    if (phone) advancedMatching.ph = phone;
    if (fn) advancedMatching.fn = fn;
    if (ln) advancedMatching.ln = ln;

    fbq('init', pixelId, advancedMatching);
    fbq('track', 'PageView');

    // Se estiver na página de pagamento final pré-checkout (/pay/), dispara InitiateCheckout
    if (window.location.pathname.includes('/pay')) {
      fbq('track', 'InitiateCheckout', {
        value: 19.00,
        currency: 'USD'
      });
    }
  } catch (e) {
    console.warn('[Grok Pixel Error]', e);
  }
})();

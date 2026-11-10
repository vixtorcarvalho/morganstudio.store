/* ============================================================================
 * CONFIGURAÇÃO DO PIXEL DO FACEBOOK — OFERTA YOUTUBE (Video Evaluator)
 * ============================================================================
 * Insira abaixo o ID do novo Pixel do Facebook desta oferta YouTube quando for
 * subir campanha (ex: '123456789012345').
 *
 * IMPORTANTE:
 * - Este arquivo dispara apenas PageView e InitiateCheckout no navegador.
 * - O evento de Purchase NÃO deve ser colocado no frontend HTML/JS; ele é
 *   disparado exclusivamente pelo Worker (yt-pay.morganstudio.store) via
 *   CAPI + Browser no momento da aprovação real do pagamento.
 * ============================================================================ */
const YT_META_PIXEL_ID = 'SEU_PIXEL_ID_YOUTUBE_AQUI';

(function initYtMetaPixel() {
  if (window.__ytPixelInitialized) return;
  window.__ytPixelInitialized = true;

  const pixelId = (window.YT_META_PIXEL_ID || YT_META_PIXEL_ID || '').trim();
  if (!pixelId || pixelId === 'SEU_PIXEL_ID_YOUTUBE_AQUI' || !/^\d+$/.test(pixelId)) {
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
    const email = (p.get('email') || '').toLowerCase().trim();
    const phone = (p.get('phone') || p.get('tel') || '').replace(/\D/g, '');
    const advancedMatching = {};
    if (email) advancedMatching.em = email;
    if (phone) advancedMatching.ph = phone;

    fbq('init', pixelId, advancedMatching);
    fbq('track', 'PageView');
  } catch (e) {}
})();

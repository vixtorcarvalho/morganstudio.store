# Instrumentação para IA — Guia de Configuração

Este documento é para ser colado em uma IA (ChatGPT, Claude, Lovable etc.) junto com o código do projeto.
A IA deve usar os marcadores abaixo para saber EXATAMENTE onde cada coisa é configurada.

## Regra geral para a IA

- NÃO reescrever páginas inteiras. Apenas substituir os marcadores listados, mantendo todo o resto do código igual.
- NÃO criar ou adicionar scripts de pixel em outras páginas. Todo o rastreamento de Meta Pixel é centralizado em um único arquivo (ver seção Pixel abaixo).
- NÃO adicionar eventos de compra (Purchase). O checkout é externo e quem gerencia o evento de compra é o provedor de checkout.
- Os marcadores usam nomes óbvios em português ("SEU-...", "COLE_AQUI..."). Buscar pelo texto exato no arquivo indicado.

## Estrutura do funil

| Página | Caminho | Função |
|---|---|---|
| Principal (VSL) | `public/sp/type/index.html` | Página de vídeo com VSL e checkout |
| Landing alternativa | `public/w/index.html` | Página de vendas com botões de checkout |
| Upsell 1 | `public/sp/up1/index.html` | Oferta 1 após a compra |
| Upsell 2 | `public/sp/up2/index.html` | Oferta 2 após a compra |
| App | `public/sp/app/*` | Área do produto (não precisa configurar) |
| Outras | `public/sp/index.html`, `receipt`, `songs` | Páginas de apoio (não precisa configurar) |

## 1. Vídeos do Vturb (2 embeds)

Arquivo: `public/sp/type/index.html`

Procurar os dois trechos abaixo e substituir `COLE_AQUI_SEU_EMBED_VTURB` pelo embed do Vturb do mentorado (o código completo de embed, sem o `<script>` de tracking externo):

```
media('COLE_AQUI_SEU_EMBED_VTURB', 620);      // vídeo principal da VSL
player('COLE_AQUI_SEU_EMBED_VTURB', 56.25);   // player do checkout
```

- O mesmo vídeo pode ser usado nos dois lugares, ou vídeos diferentes se a IA indicar qual é qual.
- Manter as proporções (620 de altura no primeiro, 56.25 no segundo) conforme o layout existente.

## 2. Meta Pixel (1 único ID)

Arquivo: `public/sp/meta-pixel.js`

```
var ID = 'SEU_PIXEL_ID';
```

- Substituir `SEU_PIXEL_ID` pelo ID numérico do Pixel do mentorado (apenas números).
- Esse arquivo é carregado por todas as páginas automaticamente (`<script src="/sp/meta-pixel.js">`). NÃO adicionar outro script de pixel em nenhuma página.
- Se o ID continuar como `SEU_PIXEL_ID`, o arquivo não inicializa o pixel (comportamento seguro para teste).

## 3. Link de checkout principal

Aparece em 2 arquivos:

a) `public/sp/type/index.html`:

```
var CHECKOUT = 'https://SEU-CHECKOUT-AQUI.com/';
```

b) `public/w/index.html` (2 ocorrências):

```
href="https://SEU-CHECKOUT-AQUI.com/"
```

- Substituir `https://SEU-CHECKOUT-AQUI.com/` pelo link de checkout do mentorado em TODAS as ocorrências.
- O sistema preserva os parâmetros de rastreamento (utm, fbclid etc.) ao redirecionar automaticamente — não precisa adicionar nada no link.
- Evento `InitiateCheckout` é disparado automaticamente antes do redirect. NÃO adicionar código extra para isso.

## 4. Upsell 1 — cobrança

Arquivo: `public/sp/up1/index.html`

```
var WORKER_URL = 'https://SEU-WORKER-AQUI.workers.dev/api/stripe-charge-upsell';
```

- Substituir `SEU-WORKER-AQUI` pelo subdomínio do worker do mentorado (o worker em `cloudflare-worker.js` cuida da cobrança do upsell).

## 5. Upsell 2 — cobrança e link de acesso

Arquivo: `public/sp/up2/index.html`

```
var REDIRECT_URL = 'https://SEU-LINK-DE-ACESSO-AQUI.com';
var WORKER_URL = 'https://SEU-WORKER-AQUI.workers.dev/api/stripe-charge-upsell';
```

- `REDIRECT_URL`: para onde o cliente vai depois de aceitar o upsell 2 (link de acesso ao produto).
- `WORKER_URL`: mesmo worker do upsell 1.

## 6. Upsell antigo (checkout direto, versão de chat)

Arquivo: `public/sp/up2/index-chat-old.html` — versão antiga/reserva.

```
https://SEU-CHECKOUT-UPSELL-AQUI.com/?upsell=true
```

- Substituir pelo checkout do upsell, se essa versão for usada. Manter `?upsell=true` no final.

## 7. Como testar (regra do gate de produção)

- A página inicial (`/`) só abre o funil se a URL tiver `utm_campaign` contendo "spot" **E** `fbclid` preenchido. Exemplo de URL de teste:
  `https://SEU-DOMINIO.com/?utm_campaign=spot-test&fbclid=teste123`
- Sem esses parâmetros, `/` redireciona para `https://open.spotify.com` (comportamento intencional, para a visita parecer tráfego do Spotify).
- Em desenvolvimento local o gate fica desativado.

## Resumo rápido para a IA (checklist)

1. `public/sp/meta-pixel.js` → trocar `SEU_PIXEL_ID`
2. `public/sp/type/index.html` → trocar 2x `COLE_AQUI_SEU_EMBED_VTURB`
3. `public/sp/type/index.html` → trocar `var CHECKOUT = 'https://SEU-CHECKOUT-AQUI.com/'`
4. `public/w/index.html` → trocar 2x `https://SEU-CHECKOUT-AQUI.com/`
5. `public/sp/up1/index.html` → trocar `SEU-WORKER-AQUI`
6. `public/sp/up2/index.html` → trocar `SEU-LINK-DE-ACESSO-AQUI` e `SEU-WORKER-AQUI`
7. (opcional) `public/sp/up2/index-chat-old.html` → trocar `https://SEU-CHECKOUT-UPSELL-AQUI.com/?upsell=true`

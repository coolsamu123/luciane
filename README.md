# luciane

Site de Luciane Ramos-Silva — bailarina, coreógrafa, antropóloga.

## Estado atual

Duas versões em paralelo, acessíveis pela landing:

- **`/[locale]/a`** — **Polirritmia.** Mosaico 3×3 de loops de corpo em ritmos diferentes.
- **`/[locale]/b`** — **Legenda do corpo.** Vídeo contínuo fullscreen; texto serve à imagem.

Locales: `pt` (padrão), `en`, `fr`. Middleware redireciona `/` para o locale preferido.

## Dev

```bash
npm install
npm run dev
# http://localhost:3000
```

## Pipeline de clipes

O vídeo-fonte fica fora do repo (ex.: `/home/ubuntu/Downloads/download`).
Edite `scripts/clips.json` para definir cortes (start, duration, name) e rode:

```bash
npm run clips             # corta todos
npm run clips -- bio      # apenas o clip "bio"
```

Saídas em `public/clips/{name}-720.mp4`, `-720.webm`, `-1080.mp4`, e poster em `public/posters/{name}.jpg`.

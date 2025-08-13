# La Vie Esbella Spa

Site institucional do La Vie Esbella Spa desenvolvido em React + TypeScript + Vite.

## Deploy no Vercel

### Opção 1: Via GitHub (Recomendado)

1. Faça push do código para um repositório GitHub
2. Conecte sua conta Vercel ao GitHub
3. Importe o projeto no Vercel
4. O deploy será automático

### Opção 2: Via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Na pasta do projeto
vercel

# Seguir as instruções
```

### Opção 3: Via Upload Manual

1. Execute `npm run build`
2. Faça upload da pasta `dist` no Vercel
3. Configure como Static Site

## Comandos

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Estrutura

- `src/` - Código fonte
- `public/` - Arquivos estáticos
- `dist/` - Build de produção (gerado)
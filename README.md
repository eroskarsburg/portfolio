# Eros Karsburg — Portfolio

Portfólio pessoal de **Eros Karsburg**, Full Stack Software Engineer (.NET / C#).

Construído do zero com **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4** e **Motion**.

## Destaques

- **Retrato em ASCII** renderizado em `<canvas>` a partir da foto, com equalização de histograma e uma lente "raio-x" que segue o mouse/toque e revela a foto real.
- **Simulador de transações ao vivo** — um pacote percorre App → API .NET → Regras → Adquirente → Emissor e volta aprovado/negado, com `transaction.log` e métricas.
- **Experiência como `git log`** — cada cargo é um commit expansível.
- **Stack como `.csproj`** com `PackageReference` animados.
- **Atividade recente do GitHub** buscada em tempo real da API pública.
- **Terminal interativo** — aperte <kbd>`</kbd> ou <kbd>Ctrl</kbd>+<kbd>K</kbd> (`help`, `whoami`, `experience`, `goto projects`, `sudo hire eros`…).
- Bilíngue **PT / EN** (persistido em `localStorage`), boot screen, cursor customizado, film grain, `prefers-reduced-motion` respeitado.

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run start
```

## Estrutura

```
src/
  app/            layout, página e estilos globais (tokens de cor no :root)
  components/     seções (Hero, About, PaymentFlow, Experience, Projects, Stack, Education, Contact) e UI
  lib/content.ts  todo o conteúdo e as traduções PT/EN — edite aqui
public/me.png     foto usada no retrato ASCII
```

## Deploy

Pronto para a [Vercel](https://vercel.com/new): importe o repositório e faça o deploy, sem nenhuma configuração extra.

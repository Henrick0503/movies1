PlayerFlix — Como colocar o site no ar
=====================================

1) Testar localmente (rápido)
- No terminal, dentro da pasta do projeto:
  - Python 3: python -m http.server 8000
  - Acesse: http://localhost:8000

2) Deploy rápido (GitHub Pages)
- Crie um repositório no GitHub e envie (push) o conteúdo desta pasta.
- Opção manual:
  - Vá em Settings -> Pages e escolha publicar da branch gh-pages (ou main/docs).
- Opção automática (workflow incluído neste repo):
  - Faça push para a branch main; o workflow .github/workflows/gh-pages.yml criará/atualizará a branch gh-pages.
  - Depois, em Settings -> Pages, selecione branch gh-pages como fonte de publicação.

3) Deploy no Netlify (arrastar/auto)
- Arraste a pasta do projeto para app.netlify.com/drop (deploy instantâneo).
- Ou conecte o repositório na dashboard do Netlify e configure Build settings:
  - Build command: (nenhum, site estático)
  - Publish directory: /

4) Deploy no Vercel
- Instale CLI (opcional) ou conecte repositório:
  - npm i -g vercel
  - vercel (siga prompts)
- Vercel detecta static sites automaticamente.

5) Observações
- Se usar imagens externas verifique hotlinking/CORS; prefira arquivos locais se precisar offline.
- Para domínios personalizados, configure DNS na plataforma escolhida.
- Se desejar ajuda com um dos fluxos (GitHub Pages / Netlify / Vercel), diga qual e eu envio passos detalhados.


# Contáser Contabilidade · site institucional

Site estático da Contáser Contabilidade (Chapecó/SC, desde 1978). HTML, CSS e JavaScript puros, sem dependências nem banco de dados.

## Estrutura

```
contaser/
├── src/                     ← código-fonte (edite aqui)
│   ├── pages/               ← conteúdo de cada página
│   ├── templates/           ← cabeçalho e rodapé comuns a todas as páginas
│   ├── assets/
│   │   ├── css/style.css
│   │   ├── js/config.js     ← dados de contato (WhatsApp, e-mail, horário…)
│   │   ├── js/main.js       ← interações e animações
│   │   ├── img/             ← logotipos, ícones e imagens
│   │   └── video/           ← vinheta da marca
│   ├── public/              ← arquivos copiados para a raiz (robots, .htaccess, manifest)
│   └── site.json            ← domínio do site (gera sitemap e endereços canônicos)
├── dist/                    ← site pronto para publicar (gerado pelo build, não edite)
├── scripts/
│   ├── build.ps1            ← gera dist/ e confere os links
│   ├── serve.ps1            ← servidor local para testar
│   └── preview/             ← prévia em arquivo único (opcional)
├── brand/                   ← identidade visual: design system, logos e vinheta originais
├── references/              ← design systems usados como referência visual
├── docs/                    ← guias de configuração, deploy e pendências
└── netlify.toml             ← configuração para publicar na Netlify
```

## Comandos

Rode na raiz do projeto, no PowerShell:

| Ação | Comando |
|---|---|
| Gerar o site | `powershell -ExecutionPolicy Bypass -File scripts\build.ps1` |
| Gerar o site e o ZIP para upload | `powershell -ExecutionPolicy Bypass -File scripts\build.ps1 -Zip` |
| Testar no navegador | `powershell -ExecutionPolicy Bypass -File scripts\serve.ps1` e abra http://localhost:8080 |

O build falha com mensagem clara se algum link ou arquivo referenciado estiver quebrado.

## Fluxo de trabalho

1. Edite os arquivos em `src/` (textos em `src/pages/`, contatos em `src/assets/js/config.js`).
2. Rode o build.
3. Teste com o servidor local.
4. Publique a pasta `dist/` (veja [docs/DEPLOY.md](docs/DEPLOY.md)).

## Documentação

- [docs/CONFIGURACAO.md](docs/CONFIGURACAO.md): dados de contato, formulário, domínio e animações
- [docs/DEPLOY.md](docs/DEPLOY.md): como publicar (Hostinger/Locaweb/HostGator, Netlify)
- [docs/PENDENCIAS.md](docs/PENDENCIAS.md): informações que ainda faltam confirmar
- [brand/design-system.html](brand/design-system.html): cores, tipografia, componentes e regras da marca

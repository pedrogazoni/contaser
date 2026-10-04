# Deploy

O site publicado é **somente a pasta `dist/`**. Gere antes de cada publicação:

```
powershell -ExecutionPolicy Bypass -File scripts\build.ps1 -Zip
```

Isso cria `dist/` e o pacote `releases/contaser-site-AAAA-MM-DD.zip`.

## Checklist antes de publicar

- [ ] `src/site.json` com o domínio definitivo em `"url"`
- [ ] WhatsApp testado no celular (o número precisa estar no WhatsApp Business)
- [ ] Política de Privacidade e Termos de Uso revisados por um advogado
- [ ] Itens de [PENDENCIAS.md](PENDENCIAS.md) resolvidos ou aceitos
- [ ] Build rodou sem erros e o site foi testado com `scripts\serve.ps1`

## Hospedagem tradicional (Hostinger, Locaweb, HostGator, KingHost)

1. Abra o **Gerenciador de Arquivos** do painel da hospedagem (ou use FTP).
2. Entre na pasta pública: `public_html` (Hostinger/HostGator) ou `www`/`public` (Locaweb).
3. Envie o **conteúdo** de `dist/`, não a pasta em si. O `index.html` precisa ficar direto na pasta pública. Também dá para enviar o ZIP de `releases/` e extrair lá.
4. Confira se o arquivo oculto `.htaccess` foi enviado. Ele força HTTPS, ativa compressão, cache e a página 404.
5. Ative o certificado SSL gratuito (Let's Encrypt) no painel.

## Netlify (gratuito)

- **Mais rápido:** arraste a pasta `dist/` em [app.netlify.com/drop](https://app.netlify.com/drop).
- **Com repositório Git:** o `netlify.toml` já aponta para `dist/`. Como o build é feito no Windows (PowerShell), rode-o antes de cada envio e inclua a pasta `dist/` no repositório.

Depois, em *Domain settings*, conecte o domínio da Contáser.

## Depois de publicar

1. Cadastre o site no [Google Search Console](https://search.google.com/search-console) e envie o `sitemap.xml`.
2. Atualize o endereço do site no perfil do **Google Meu Negócio**.
3. Teste a prévia do link: cole o endereço numa conversa do WhatsApp e veja se aparecem a imagem e o título.

## Atualizações futuras

Edite em `src/`, rode o build e envie de novo o conteúdo de `dist/`. Os arquivos CSS e JS recebem uma versão nova a cada build (`?v=`), então os visitantes nunca ficam com a versão antiga em cache.

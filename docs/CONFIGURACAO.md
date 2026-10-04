# Configuração

Depois de qualquer alteração, rode `scripts\build.ps1` para atualizar a pasta `dist/`.

## Dados de contato · `src/assets/js/config.js`

| Campo | Situação | Uso |
|---|---|---|
| `whatsapp` | `554933225766` | Botões de WhatsApp, botão flutuante e formulário. Só números: 55 + DDD + número. |
| `telefone` | `(49) 3322-5766` | Texto exibido. |
| `email` | `fabiola@contaser.com.br` | Contato e rodapé. |
| `horario` | `Segunda a sexta, 8h às 12h e 13h20 às 18h` | Contato, rodapé e chamada final da página inicial. |
| `crc` | vazio | Rodapé. Ex.: `CRC/SC 000000/O`. |
| `areaCliente` | vazio | Link no rodapé. Vazio = escondido. |
| `webmail` | vazio | Link no rodapé. Vazio = escondido. |
| `formEndpoint` | vazio | Veja "Formulário" abaixo. |
| `respeitarMovimentoReduzido` | `false` | Veja "Animações" abaixo. |

Campo vazio faz o item sumir do site automaticamente.

> O número `(49) 3322-5766` é fixo. Os botões só abrem conversa se ele estiver cadastrado no **WhatsApp Business**.

## Formulário de contato

O site é estático, então o envio segue esta ordem:

1. `formEndpoint` preenchido: envia para o serviço indicado e as mensagens chegam por e-mail. Opção gratuita: crie um formulário em [formspree.io](https://formspree.io) com o e-mail que vai receber e cole o endereço gerado (ex.: `https://formspree.io/f/abcdwxyz`).
2. Senão, `whatsapp` preenchido: abre o WhatsApp com a mensagem já escrita. **Configuração atual.**
3. Senão, `email` preenchido: abre o programa de e-mail do visitante.
4. Nenhum dos três: o formulário pede para a pessoa ligar.

## Domínio · `src/site.json`

Preencha `"url"` com o endereço definitivo, por exemplo `"https://www.contaser.com.br"`. O build passa a gerar:

- `sitemap.xml` e a linha `Sitemap:` no `robots.txt`
- endereço canônico (`<link rel="canonical">`) em cada página
- imagem de compartilhamento com endereço completo (melhora a prévia do link no WhatsApp e nas redes)

## Animações

`respeitarMovimentoReduzido: false` deixa as animações sempre ligadas. Com `true`, quem ativou "reduzir movimento" no sistema (Windows: *Efeitos de animação* desligado) vê o site sem animações. É a opção recomendada para acessibilidade, porque algumas pessoas sentem enjoo ou tontura com movimento forte na tela.

## Textos

- Conteúdo de cada página: `src/pages/*.html`. O comentário no topo de cada arquivo define título e descrição para o Google.
- Cabeçalho e menu: `src/templates/header.html`
- Rodapé: `src/templates/footer.html`

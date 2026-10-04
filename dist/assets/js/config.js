/* =========================================================
   Contáser Contabilidade · configuração do site
   ---------------------------------------------------------
   Edite só este arquivo para mudar dados de contato.
   Tudo no site que depende deles (botões de WhatsApp, e-mail,
   horário, CRC, links do rodapé) se atualiza sozinho.
   Campo vazio = o item fica escondido.
   Depois de editar, rode scripts/build.ps1 de novo.
   ========================================================= */
window.CONTASER = {
  /* Contato */
  whatsapp: "554933225766",               // só números: 55 + DDD + número
  telefone: "(49) 3322-5766",
  telefoneLink: "+554933225766",
  email: "fabiola@contaser.com.br",
  horario: "Segunda a sexta, 8h às 12h e 13h20 às 18h",

  /* Empresa */
  crc: "",                                // ex.: "CRC/SC 000000/O"

  /* Links do rodapé (vazio = escondido) */
  areaCliente: "",                        // ex.: "https://..."
  webmail: "",                            // ex.: "https://webmail.contaser.com.br"

  /* Formulário de contato
     formEndpoint vazio = abre o WhatsApp com a mensagem pronta.
     Preenchido (ex.: Formspree) = as mensagens chegam por e-mail. */
  formEndpoint: "",
  mensagemWhatsapp: "Olá! Vim pelo site da Contáser e gostaria de falar com um contador.",

  /* Acessibilidade
     true = quem ativou "reduzir movimento" no sistema vê o site sem animações. */
  respeitarMovimentoReduzido: false
};

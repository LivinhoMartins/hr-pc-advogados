document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. CRONÔMETRO DE PLANTÃO ATIVO (TEMPO REAL)
  // ==========================================================================
  const campoCronometro = document.getElementById("cronometro-plantao");
  let segundos = 0;
  let minutos = 0;

  if (campoCronometro) {
    setInterval(() => {
      segundos++;
      if (segundos >= 60) {
        segundos = 0;
        minutos++;
      }
      // Formata para manter o padrão 00:00 na tela
      const minFormatado = minutos < 10 ? "0" + minutos : minutos;
      const segFormatado = segundos < 10 ? "0" + segundos : segundos;

      campoCronometro.textContent = `${minFormatado}:${segFormatado}`;
    }, 1000);
  }

  // ==========================================================================
  // 2. SAUDAÇÃO INTELIGENTE NO WHATSAPP BASEADA NO HORÁRIO
  // ==========================================================================
  const botoesWhatsapp = document.querySelectorAll("a[href*='wa.me']");
  const horaAtual = new Date().getHours();
  let mensagemCustomizada = "";

  // Determina o texto de acordo com o período do dia
  if (horaAtual >= 18 || horaAtual < 6) {
    mensagemCustomizada = encodeURIComponent(
      "Olá! Estou com uma emergência médica de urgência com plano de saúde agora à noite e preciso do suporte de um advogado especialista.",
    );
  } else {
    mensagemCustomizada = encodeURIComponent(
      "Olá! Recebi uma negativa do meu plano de saúde e gostaria de agendar uma consulta com um advogado especialista.",
    );
  }

  // Altera o link de todos os botões de WhatsApp do site de forma automática
  botoesWhatsapp.forEach((botao) => {
    // Altere o número abaixo para o número oficial dos advogados quando tiver
    const numeroTelefone = "5500999999999";
    botao.href = `https://wa.me{numeroTelefone}?text=${mensagemCustomizada}`;
  });

  // ==========================================================================
  // 3. EFEITO DE SURGIMENTO AO ROLAR A PÁGINA (SCROLL REVEAL)
  // ==========================================================================
  const secoesParaAnimar = document.querySelectorAll(".efeito-surgir");

  const checarRolagem = () => {
    const gatilhoAtivacao = (window.innerHeight / 5) * 4; // Ativa quando a seção chega a 80% da tela

    secoesParaAnimar.forEach((secao) => {
      const topoDaSecao = secao.getBoundingClientRect().top;

      if (topoDaSecao < gatilhoAtivacao) {
        secao.classList.add("secao-visivel");
      }
    });
  };

  // Executa uma vez ao carregar para mostrar o que já está na tela e depois monitora a rolagem
  checarRolagem();
  window.addEventListener("scroll", checarRolagem);
});

// ==========================================================================
// HOLOFOTE SEGUIDOR: ACENDE APENAS UM CARD POR VEZ NA ROLAGEM MOBILE
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Agora o JavaScript vai achar seus cards certinho!
    const cards = document.querySelectorAll('.card-medico');

    const checarScroll = () => {
        const alturaDispositivo = window.innerHeight;

        cards.forEach(card => {
            const posicaoCard = card.getBoundingClientRect().top;
            const fimDoCard = card.getBoundingClientRect().bottom;

            // Ativa o card quando ele entra na tela ao descer
            if (posicaoCard < (alturaDispositivo * 0.85) && fimDoCard > 0) {
                card.classList.add('ativo');
            } 
            // Reseta o card se o usuário subir a tela totalmente
            else if (posicaoCard > alturaDispositivo) {
                card.classList.remove('ativo');
            }
        });
    };

    checarScroll();
    window.addEventListener('scroll', checarScroll);
});

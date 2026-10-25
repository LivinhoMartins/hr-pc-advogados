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
// CARDS MÉDICOS: no celular, destaca apenas o card mais próximo do centro
// da tela conforme a rolagem (para cima ou para baixo). No desktop, o hover
// continua sendo controlado pelo CSS.
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".card-medico"));
  const somenteToque = window.matchMedia("(hover: none), (pointer: coarse)");

  if (!cards.length || !somenteToque.matches) return;

  let quadroPendente = false;

  const atualizarCardAtivo = () => {
    quadroPendente = false;
    const linhaAtivacao = window.innerHeight * 0.52;
    let cardMaisProximo = null;
    let menorDistancia = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const centroCard = rect.top + rect.height / 2;
      const distancia = Math.abs(centroCard - linhaAtivacao);
      // Considera apenas cartões que estejam visíveis na tela.
      const visivel = rect.bottom > 0 && rect.top < window.innerHeight;

      if (visivel && distancia < menorDistancia) {
        menorDistancia = distancia;
        cardMaisProximo = card;
      }
    });

    // Remove o destaque dos outros antes de ativar o escolhido: só um por vez.
    cards.forEach((card) => {
      card.classList.toggle("ativo", card === cardMaisProximo);
    });
  };

  const agendarAtualizacao = () => {
    if (quadroPendente) return;
    quadroPendente = true;
    window.requestAnimationFrame(atualizarCardAtivo);
  };

  atualizarCardAtivo();
  window.addEventListener("scroll", agendarAtualizacao, { passive: true });
  window.addEventListener("resize", agendarAtualizacao);
});

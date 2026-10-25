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
const cardsMedicos = document.querySelectorAll(".card-medico");

const focarCardNoScroll = () => {
  // Só roda em telas menores (celular) para não brigar com o mouse no PC
  if (window.innerWidth < 768) {
    // Linha de leitura virtual no centro da tela
    const centroDaTela = window.innerHeight / 2;

    let cardMaisProximo = null;
    let menorDistancia = Infinity;

    // Passo 1: Descobrir qual dos 3 cartões está mais perto do centro da visão
    cardsMedicos.forEach((card) => {
      const posicao = card.getBoundingClientRect();
      // Calcula o centro do próprio cartão na vertical
      const centroDoCard = posicao.top + posicao.height / 2;
      // Distância matemática absoluta entre o centro do cartão e o centro da tela
      const distancia = Math.abs(centroDaTela - centroDoCard);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        cardMaisProximo = card;
      }
    });

    // Passo 2: Acender o mais próximo e apagar todos os outros na mesma hora
    cardsMedicos.forEach((card) => {
      if (card === cardMaisProximo) {
        card.classList.add("card-ativo"); // Acende o atual
      } else {
        card.classList.remove("card-ativo"); // Apaga o anterior ou o próximo
      }
    });
  }
};

// Monitora a rolagem para cima e para baixo continuamente
window.addEventListener("scroll", focarCardNoScroll);
// Executa uma vez ao carregar a página caso o primeiro já comece no meio
window.addEventListener("load", focarCardNoScroll);

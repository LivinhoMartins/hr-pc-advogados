document.addEventListener("DOMContentLoaded", () => {
  // 1. CRONÔMETRO DE PLANTÃO ATIVO
  const campoCronometro = document.getElementById("cronometro-plantao");
  let segundos = 0,
    minutos = 0;
  if (campoCronometro) {
    setInterval(() => {
      segundos++;
      if (segundos >= 60) {
        segundos = 0;
        minutos++;
      }
      campoCronometro.textContent = `${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`;
    }, 1000);
  }

  // 2. MENU INTELIGENTE (GLASSMORPHISM NO SCROLL)
  const menu = document.getElementById("js-menu");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      menu.classList.add("menu-scrolled");
    } else {
      menu.classList.get && menu.classList.remove("menu-scrolled");
    }
  });

  // 3. SAUDAÇÃO INTELIGENTE WHATSAPP
  const botoesWhatsapp = document.querySelectorAll("a[href*='wa.me']");
  const hora = new Date().getHours();
  let msg =
    hora >= 18 || hora < 6
      ? "Olá! Estou com uma emergência médica de urgência com plano de saúde agora à noite e preciso do suporte de um advogado especialista."
      : "Olá! Recebi uma negativa do meu plano de saúde e gostaria de agendar uma consulta com um advogado especialista.";

  botoesWhatsapp.forEach(
    (b) => (b.href = `https://wa.me{encodeURIComponent(msg)}`),
  );

  // 4. SCROLL REVEAL (ENTRADA FLUIDA)
  const secoes = document.querySelectorAll(".efeito-surgir");
  const animarScroll = () => {
    secoes.forEach((s) => {
      if (s.getBoundingClientRect().top < (window.innerHeight / 5) * 4)
        s.classList.add("secao-visivel");
    });
  };
  animarScroll();
  window.addEventListener("scroll", animarScroll);
});

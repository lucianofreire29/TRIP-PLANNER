import {
  buscarJSON,
  configurarImagem,
  escaparHTML,
  formatarMoeda,
} from "./api.js";

const slider = document.querySelector(".slider");
const indicators = document.querySelector(".hero-indicators");
const heroTitle = document.querySelector(".hero-content h1");
const heroDescription = document.querySelector(".hero-content p");
const prevButton = document.querySelector(".prev-slide");
const nextButton = document.querySelector(".next-slide");
const hero = document.querySelector("#hero");
const heroLocation = document.querySelector(".hero-location");
const heroStars = document.querySelector(".hero-stars");
const heroPrice = document.querySelector(".hero-price");
const heroButton = document.querySelector(".hero-button");

let heroData = [];
let currentSlide = 0;
let autoPlay;

function montarSlider() {
  slider.innerHTML = "";
  indicators.innerHTML = "";

  heroData.forEach((destino, index) => {
    const slide = document.createElement("div");
    slide.className = `slide ${index === 0 ? "active" : ""}`;

    const imagem = document.createElement("img");
    configurarImagem(imagem, destino.imagem, destino.nome);
    slide.appendChild(imagem);
    slider.appendChild(slide);

    const indicador = document.createElement("button");
    indicador.type = "button";
    indicador.className =
      `indicator ${index === 0 ? "active" : ""}`;
    indicador.dataset.slide = index;
    indicador.setAttribute(
      "aria-label",
      `Mostrar ${escaparHTML(destino.nome)}`,
    );
    indicators.appendChild(indicador);
  });

  indicators.querySelectorAll(".indicator").forEach((indicador) => {
    indicador.addEventListener("click", () => {
      currentSlide = Number(indicador.dataset.slide);
      mostrarSlide(currentSlide);
    });
  });

  mostrarSlide(0);
}

function mostrarSlide(index) {
  if (!heroData.length) return;

  const slides = slider.querySelectorAll(".slide");
  const indicadores = indicators.querySelectorAll(".indicator");

  slides.forEach((slide) => slide.classList.remove("active"));
  indicadores.forEach((indicador) => indicador.classList.remove("active"));

  slides[index]?.classList.add("active");
  indicadores[index]?.classList.add("active");

  const destino = heroData[index];
  heroTitle.textContent = destino.nome;
  heroDescription.textContent =
    destino.descricao ||
    `Conheça ${destino.nome} e viva uma experiência inesquecível.`;
  heroLocation.innerHTML = `
    <i class="fa-solid fa-location-dot"></i>
    ${escaparHTML(destino.pais || "Local não informado")}
  `;
  heroStars.innerHTML =
    '<i class="fa-solid fa-star"></i>'.repeat(
      Math.min(5, Math.max(0, Number(destino.estrelas) || 0)),
    );
  heroPrice.textContent = `A partir de ${formatarMoeda(destino.preco)}`;
  heroButton.textContent = "Ver detalhes";
  heroButton.href =
    `destino.html?id=${encodeURIComponent(destino.id)}`;
}

function proximoSlide() {
  if (heroData.length < 2) return;
  currentSlide = (currentSlide + 1) % heroData.length;
  mostrarSlide(currentSlide);
}

function slideAnterior() {
  if (heroData.length < 2) return;
  currentSlide =
    (currentSlide - 1 + heroData.length) % heroData.length;
  mostrarSlide(currentSlide);
}

function iniciarAutoPlay() {
  pararAutoPlay();
  if (heroData.length > 1) {
    autoPlay = setInterval(proximoSlide, 5000);
  }
}

function pararAutoPlay() {
  if (autoPlay) clearInterval(autoPlay);
}

nextButton.addEventListener("click", proximoSlide);
prevButton.addEventListener("click", slideAnterior);
hero.addEventListener("mouseenter", pararAutoPlay);
hero.addEventListener("mouseleave", iniciarAutoPlay);

async function iniciar() {
  heroTitle.textContent = "Carregando destinos...";
  heroDescription.textContent = "";

  try {
    const dados = await buscarJSON("/destinos");

    if (!Array.isArray(dados) || !dados.length) {
      heroTitle.textContent = "Novos destinos em breve";
      heroDescription.textContent =
        "Estamos preparando experiências incríveis para você.";
      heroLocation.textContent = "";
      heroStars.textContent = "";
      heroPrice.textContent = "";
      heroButton.textContent = "Fale conosco";
      heroButton.href = "form.html";
      prevButton.hidden = true;
      nextButton.hidden = true;
      return;
    }

    heroData = dados.slice(0, 5);
    montarSlider();
    iniciarAutoPlay();
  } catch (erro) {
    console.error("Erro ao carregar o destaque:", erro);
    heroTitle.textContent = "Planeje sua próxima viagem";
    heroDescription.textContent =
      "Não foi possível carregar os destaques neste momento.";
    heroLocation.textContent = "";
    heroStars.textContent = "";
    heroPrice.textContent = "";
    heroButton.textContent = "Ver destinos";
    heroButton.href = "#destinos";
    prevButton.hidden = true;
    nextButton.hidden = true;
  }
}

iniciar();

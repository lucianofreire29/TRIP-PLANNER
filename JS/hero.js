let autoPlay;

const heroData = [
  {
    imagem: "img/banner 1.jpg",
    titulo: "Fernando de Noronha",
    descricao:
      "Descubra praias paradisíacas com águas cristalinas e paisagens inesquecíveis.",
    pais: "Brasil",
    preco: "A partir de R$ 2.990",
    botao: "Ver Pacotes",
    link: "#pacotes",
    estrelas: 5,
  },

  {
    imagem: "img/banner 2.jpg",
    titulo: "Paris",
    descricao:
      "Conheça a cidade mais romântica do mundo e viva experiências inesquecíveis.",
    pais: "França",
    preco: "A partir de R$ 5.490",
    botao: "Explorar",
    link: "#pacotes",
    estrelas: 5,
  },

  {
    imagem: "img/banner 3.jpg",
    titulo: "Suíça",
    descricao:
      "Explore montanhas nevadas, vilarejos encantadores e paisagens incríveis.",
    pais: "Suíça",
    preco: "A partir de R$ 7.990",
    botao: "Conhecer",
    link: "#pacotes",
    estrelas: 5,
  },
];

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

let slidesHTML = "";

heroData.forEach((item, index) => {
  slidesHTML += `
        <div class="slide ${index === 0 ? "active" : ""}">
            <img src="${item.imagem}" alt="${item.titulo}">
        </div>
    `;
});

slider.innerHTML = slidesHTML;

let indicatorsHTML = "";

heroData.forEach((item, index) => {
  indicatorsHTML += `
        <span class="indicator ${index === 0 ? "active" : ""}" data-slide="${index}"></span>
    `;
});

indicators.innerHTML = indicatorsHTML;

const slides = document.querySelectorAll(".slide");
const allIndicators = document.querySelectorAll(".indicator");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  allIndicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });

  slides[index].classList.add("active");
  allIndicators[index].classList.add("active");

  heroTitle.textContent = heroData[index].titulo;
  heroDescription.textContent = heroData[index].descricao;

  heroLocation.innerHTML = `
      <i class="fa-solid fa-location-dot"></i>
      ${heroData[index].pais}
  `;

  heroPrice.textContent = heroData[index].preco;

  heroButton.textContent = heroData[index].botao;

  heroButton.href = heroData[index].link;

  let stars = "";

  for (let i = 0; i < heroData[index].estrelas; i++) {
    stars += `<i class="fa-solid fa-star"></i>`;
  }

  heroStars.innerHTML = stars;
}

function nextSlide() {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

function previousSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
}

nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);

allIndicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    currentSlide = Number(indicator.dataset.slide);

    showSlide(currentSlide);
  });
});

showSlide(currentSlide);

function startAutoPlay() {
  autoPlay = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlay);
}

hero.addEventListener("mouseenter", stopAutoPlay);

hero.addEventListener("mouseleave", startAutoPlay);

startAutoPlay();

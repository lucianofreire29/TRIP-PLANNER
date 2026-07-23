const comentarios = [
  {
    id: 1,
    foto: "img/user-1.jpg",
    nome: "Ana Oliveira",
    destino: "Paris",
    estrelas: 5,
    curtidas: 348,
    texto:
      "Foi a melhor viagem da minha vida. Atendimento impecável e organização perfeita.",
  },
  {
    id: 2,
    foto: "img/user-5.jpg",
    nome: "Carlos Mendes",
    destino: "Suíça",
    estrelas: 5,
    curtidas: 271,
    texto:
      "Tudo ocorreu exatamente como planejado. Recomendo muito a Trip Planner.",
  },
  {
    id: 3,
    foto: "img/user-3.jpg",
    nome: "Fernanda Lima",
    destino: "Fernando de Noronha",
    estrelas: 5,
    curtidas: 415,
    texto:
      "Hotel maravilhoso, praias incríveis e suporte durante toda a viagem.",
  },
  {
    id: 4,
    foto: "img/user-2.jpg",
    nome: "João Pedro",
    destino: "Canadá",
    estrelas: 5,
    curtidas: 199,
    texto: "Experiência excelente. Voltarei a comprar com a agência.",
  },
  {
    id: 5,
    foto: "img/user-4.jpg",
    nome: "Mariana Costa",
    destino: "Grécia",
    estrelas: 5,
    curtidas: 387,
    texto: "Superou minhas expectativas. Valeu cada centavo.",
  },
];

const curtidasSalvas = JSON.parse(localStorage.getItem("curtidas"));

if (curtidasSalvas) {
  comentarios.forEach((comentario) => {
    if (curtidasSalvas[comentario.id] != null) {
      comentario.curtidas = curtidasSalvas[comentario.id];
    }
  });
}

const slider = document.querySelector(".comentarios-slider");

const btnPrev = document.querySelector(".comentario-prev");

const btnNext = document.querySelector(".comentario-next");

let inicio = 0;

function renderizarComentarios() {
  slider.innerHTML = "";

  for (let i = inicio; i < inicio + 3; i++) {
    const comentario = comentarios[i];

    if (!comentario) break;

    let estrelas = "";

    for (let j = 0; j < comentario.estrelas; j++) {
      estrelas += `<i class="fa-solid fa-star"></i>`;
    }

    slider.innerHTML += `

        <div class="comentario-card">

            <img src="${comentario.foto}" alt="">

            <h3>${comentario.nome}</h3>

            <span>${comentario.destino}</span>

            <div class="cliente-verificado">

                <i class="fa-solid fa-circle-check"></i>

                Cliente Verificado

            </div>

            <div class="stars">

                ${estrelas}

            </div>

            <p>

                ${comentario.texto}

            </p>

            <div class="likes">
                <div class="likes">
                    <button class="like" data-id="${comentario.id}">

                        <i class="fa-regular fa-heart"></i>

                        <span>${comentario.curtidas}</span>

                    </button>

            </div>

        </div>

        `;
  }

  adicionarEventos();
}

function adicionarEventos() {
  const curtidos = JSON.parse(localStorage.getItem("curtidos")) || {};

  document.querySelectorAll(".like").forEach((botao) => {
    const id = Number(botao.dataset.id);

    const comentario = comentarios.find((c) => c.id === id);

    const icone = botao.querySelector("i");
    const numero = botao.querySelector("span");

    if (curtidos[id]) {
      icone.classList.remove("fa-regular");
      icone.classList.add("fa-solid");

      botao.classList.add("active");
    }

    botao.onclick = () => {
      if (curtidos[id]) {
        comentario.curtidas--;

        delete curtidos[id];

        icone.classList.remove("fa-solid");
        icone.classList.add("fa-regular");

        botao.classList.remove("active");
      } else {
        comentario.curtidas++;

        curtidos[id] = true;

        icone.classList.remove("fa-regular");
        icone.classList.add("fa-solid");

        botao.classList.add("active");
      }

      numero.textContent = comentario.curtidas;

      const salvar = {};

      comentarios.forEach((c) => {
        salvar[c.id] = c.curtidas;
      });

      localStorage.setItem("curtidas", JSON.stringify(salvar));
      localStorage.setItem("curtidos", JSON.stringify(curtidos));
    };
  });
}

btnNext.addEventListener("click", () => {
  inicio++;

  if (inicio > comentarios.length - 3) {
    inicio = 0;
  }

  renderizarComentarios();
});

btnPrev.addEventListener("click", () => {
  inicio--;

  if (inicio < 0) {
    inicio = comentarios.length - 3;
  }

  renderizarComentarios();
});

renderizarComentarios();

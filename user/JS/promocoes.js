const promocoes = [
  {
    id: 1,
    destino: "Fernando de Noronha",
    pais: "Brasil",
    imagem: "img/card1.jpg",
    precoOriginal: 4990,
    precoPromocional: 2990,
    destaque: true,
    desconto: 40,
    estrelas: 5,
  },

  {
    id: 2,
    destino: "Paris",
    pais: "França",
    imagem: "img/card2.jpg",
    precoOriginal: 6990,
    precoPromocional: 5490,
    desconto: 22,
    estrelas: 5,
  },

  {
    id: 3,
    destino: "Suíça",
    pais: "Suíça",
    imagem: "img/card3.jpg",
    precoOriginal: 9990,
    precoPromocional: 7990,
    desconto: 20,
    destaque: true,
    estrelas: 5,
  },

  {
    id: 4,
    destino: "Maldivas",
    pais: "Maldivas",
    imagem: "img/card4.jpg",
    precoOriginal: 12990,
    precoPromocional: 9990,
    desconto: 25,
    estrelas: 5,
  },
];

const cards = document.querySelector(".cards-promocoes");

function criarEstrelas(qtd) {
  let estrelas = "";

  for (let i = 0; i < qtd; i++) {
    estrelas += '<i class="fa-solid fa-star"></i>';
  }

  return estrelas;
}

function carregarPromocoes(lista) {
  cards.innerHTML = "";

  lista.forEach((promocao) => {
    cards.innerHTML += `

        <div class="card-promocao">
                <div class="imagem-promocao">

                    <img src="${promocao.imagem}" alt="${promocao.destino}">

                    <span class="badge">
                        ${promocao.desconto}% OFF
                    </span>

                    ${
                      promocao.destaque
                        ? `
                        <span class="badge-destaque">
                            ⭐ Mais Vendido
                        </span>
                    `
                        : ""
                    }

                </div>

            <div class="conteudo-promocao">

                <h3>${promocao.destino}</h3>

                <span class="pais">

                    <i class="fa-solid fa-location-dot"></i>

                    ${promocao.pais}

                </span>

                <div class="estrelas">

                    ${criarEstrelas(promocao.estrelas)}

                </div>

                    <div class="precos">

                        <small class="preco-antigo">
                            R$ ${promocao.precoOriginal.toLocaleString("pt-BR")}
                        </small>

                        <h2>
                            R$ ${promocao.precoPromocional.toLocaleString("pt-BR")}
                        </h2>

                        <span class="economia">
                            Economize R$ ${(promocao.precoOriginal - promocao.precoPromocional).toLocaleString("pt-BR")}
                        </span>

                    </div>

                <a
                    href="destino.html?id=${promocao.id}"
                    class="btn-promocao">

                    Aproveitar Oferta

                </a>

            </div>

        </div>

        `;
  });
}

carregarPromocoes(promocoes);

const dataFinal = new Date("2026-12-31T23:59:59");

function atualizarContador() {
  const agora = new Date();

  const diferenca = dataFinal - agora;

  if (diferenca <= 0) {
    document.getElementById("dias").textContent = "00";
    document.getElementById("horas").textContent = "00";
    document.getElementById("minutos").textContent = "00";
    document.getElementById("segundos").textContent = "00";

    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

  const horas = Math.floor(
    (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = String(dias).padStart(2, "0");

  document.getElementById("horas").textContent = String(horas).padStart(2, "0");

  document.getElementById("minutos").textContent = String(minutos).padStart(
    2,
    "0",
  );

  document.getElementById("segundos").textContent = String(segundos).padStart(
    2,
    "0",
  );
}

atualizarContador();

setInterval(atualizarContador, 1000);

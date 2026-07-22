const destinos = [
  {
    id: 1,
    nome: "Fernando de Noronha",
    pais: "Brasil",
    regiao: "Nordeste",
    preco: 2990,
    imagem: "img/card1.jpg",
    estrelas: 5,
    categoria: "Praia",
  },

  {
    id: 2,
    nome: "Paris",
    pais: "França",
    regiao: "Europa",
    preco: 5490,
    imagem: "img/card2.jpg",
    estrelas: 5,
    categoria: "Cidade",
  },

  {
    id: 3,
    nome: "Suíça",
    pais: "Suíça",
    regiao: "Europa",
    preco: 7990,
    imagem: "img/card3.jpg",
    estrelas: 5,
    categoria: "Montanha",
  },

  {
    id: 4,
    nome: "Maldivas",
    pais: "Maldivas",
    regiao: "Ásia",
    preco: 9990,
    imagem: "img/card4.jpg",
    estrelas: 5,
    categoria: "Praia",
  },

  {
    id: 5,
    nome: "Cancún",
    pais: "México",
    regiao: "América",
    preco: 4890,
    imagem: "img/card5.jpg",
    estrelas: 5,
    categoria: "Praia",
  },

  {
    id: 6,
    nome: "Tóquio",
    pais: "Japão",
    regiao: "Ásia",
    preco: 8900,
    imagem: "img/card6.jpg",
    estrelas: 5,
    categoria: "Cidade",
  },

  {
    id: 7,
    nome: "Dubai",
    pais: "Emirados Árabes Unidos",
    regiao: "Oriente Médio",
    preco: 9800,
    imagem: "img/card7.jpg",
    estrelas: 5,
    categoria: "Cidade",
  },

  {
    id: 8,
    nome: "Santorini",
    pais: "Grécia",
    regiao: "Europa",
    preco: 8200,
    imagem: "img/card8.jpg",
    estrelas: 5,
    categoria: "Praia",
  },
];

// ELEMENTOS

const cardsContainer = document.querySelector(".cards-destinos");
const searchInput = document.querySelector("#searchDestino");
const filtroPais = document.querySelector("#filtroPais");
const filtroPreco = document.querySelector("#filtroPreco");

// CARREGAR PAÍSES

function carregarPaises() {
  filtroPais.innerHTML = `
        <option value="">
            🌎 Todos os países
        </option>
    `;

  const paises = destinos.map((destino) => destino.pais);

  const paisesUnicos = [...new Set(paises)];

  paisesUnicos.sort();

  paisesUnicos.forEach((pais) => {
    const option = document.createElement("option");

    option.value = pais;
    option.textContent = pais;

    filtroPais.appendChild(option);
  });
}

// FILTROS

function aplicarFiltros() {
  const texto = searchInput.value.toLowerCase();

  const paisSelecionado = filtroPais.value;

  const precoSelecionado = filtroPreco.value;

  const resultado = destinos.filter((destino) => {
    // Pesquisa

    const correspondePesquisa =
      destino.nome.toLowerCase().includes(texto) ||
      destino.pais.toLowerCase().includes(texto) ||
      destino.regiao.toLowerCase().includes(texto) ||
      destino.categoria.toLowerCase().includes(texto);

    // País

    const correspondePais =
      paisSelecionado === "" || destino.pais === paisSelecionado;

    // Preço

    let correspondePreco = true;

    if (precoSelecionado === "3000") {
      correspondePreco = destino.preco <= 3000;
    } else if (precoSelecionado === "6000") {
      correspondePreco = destino.preco <= 6000;
    } else if (precoSelecionado === "10000") {
      correspondePreco = destino.preco > 6000;
    }

    return correspondePesquisa && correspondePais && correspondePreco;
  });

  carregarDestinos(resultado);
}

function carregarDestinos(listaDestinos) {
  let html = "";

  listaDestinos.forEach((destino) => {
    html += `

        <div class="card-destino">

            <div class="card-image">

                <img src="${destino.imagem}" alt="${destino.nome}">

                <button class="favorite-btn" data-id="${destino.id}">
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>

            <div class="card-info">

                <div class="card-stars">
                    ⭐⭐⭐⭐⭐
                </div>

                <h3>${destino.nome}</h3>

                <span class="card-country">
                    <i class="fa-solid fa-location-dot"></i>
                    ${destino.pais}
                </span>

                <div class="card-price">
                    <small>A partir de</small>
                    <strong>R$ ${destino.preco}</strong>
                </div>

                <button class="details-btn">
                    Ver detalhes
                    <i class="fa-solid fa-arrow-right"></i>
                </button>

            </div>

        </div>

        `;
  });

  cardsContainer.innerHTML = html;
}

function iniciarFavoritos() {
  const botoes = document.querySelectorAll(".favorite-btn");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const icone = botao.querySelector("i");

      if (icone.classList.contains("fa-regular")) {
        icone.classList.remove("fa-regular");
        icone.classList.add("fa-solid");
      } else {
        icone.classList.remove("fa-solid");
        icone.classList.add("fa-regular");
      }
    });
  });
}

carregarDestinos(destinos);

carregarPaises();

iniciarFavoritos();

searchInput.addEventListener("input", aplicarFiltros);

filtroPais.addEventListener("change", aplicarFiltros);

filtroPreco.addEventListener("change", aplicarFiltros);

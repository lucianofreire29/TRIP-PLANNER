import {
  buscarJSON,
  configurarImagem,
  escaparHTML,
  formatarMoeda,
} from "./api.js";

const cardsContainer = document.querySelector(".cards-destinos");
const searchInput = document.querySelector("#searchDestino");
const filtroPais = document.querySelector("#filtroPais");
const filtroPreco = document.querySelector("#filtroPreco");

let destinos = [];
let destinosExibidos = [];
let favoritos = carregarFavoritos();

function carregarFavoritos() {
  try {
    const salvos = JSON.parse(localStorage.getItem("favoritos")) || [];
    return salvos.map(Number).filter(Number.isFinite);
  } catch {
    return [];
  }
}

function mostrarEstado(mensagem, tipo = "") {
  cardsContainer.innerHTML = `
    <div class="estado-destinos ${tipo}">
      <i class="fa-solid ${tipo === "erro" ? "fa-triangle-exclamation" : "fa-spinner fa-spin"}"></i>
      <p>${escaparHTML(mensagem)}</p>
    </div>
  `;
}

function normalizarDestino(destino) {
  return {
    ...destino,
    id: Number(destino.id),
    nome: destino.nome || "Destino sem nome",
    pais: destino.pais || "Local não informado",
    regiao: destino.regiao || "",
    categoria: destino.categoria || "",
    preco: Number(destino.preco) || 0,
    estrelas: Math.min(5, Math.max(0, Number(destino.estrelas) || 0)),
    descricao: destino.descricao || "",
    imagem: destino.imagem || "",
  };
}

function carregarPaises() {
  const paisSelecionado = filtroPais.value;
  const paises = [...new Set(destinos.map((destino) => destino.pais))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  filtroPais.innerHTML =
    '<option value="">🌎 Todos os países</option>';

  paises.forEach((pais) => {
    const option = document.createElement("option");
    option.value = pais;
    option.textContent = pais;
    filtroPais.appendChild(option);
  });

  if (paises.includes(paisSelecionado)) {
    filtroPais.value = paisSelecionado;
  }
}

function renderizarDestinos(lista) {
  destinosExibidos = lista;
  cardsContainer.innerHTML = "";

  if (!lista.length) {
    cardsContainer.innerHTML = `
      <div class="estado-destinos vazio">
        <i class="fa-solid fa-map-location-dot"></i>
        <p>Nenhum destino encontrado.</p>
      </div>
    `;
    return;
  }

  lista.forEach((destino) => {
    const estaFavoritado = favoritos.includes(destino.id);
    const card = document.createElement("article");
    card.className = "card-destino";

    card.innerHTML = `
      <div class="card-image">
        <img alt="">
        <button
          type="button"
          class="favorite-btn ${estaFavoritado ? "favoritado" : ""}"
          data-id="${destino.id}"
          aria-label="${estaFavoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
        >
          <i class="${estaFavoritado ? "fa-solid" : "fa-regular"} fa-heart"></i>
        </button>
      </div>

      <div class="card-info">
        <div class="card-stars" aria-label="${destino.estrelas} estrelas">
          ${"⭐".repeat(destino.estrelas)}
        </div>
        <h3>${escaparHTML(destino.nome)}</h3>
        <span class="card-country">
          <i class="fa-solid fa-location-dot"></i>
          ${escaparHTML(destino.pais)}
        </span>
        <div class="card-price">
          <small>A partir de</small>
          <strong>${formatarMoeda(destino.preco)}</strong>
        </div>
        <a href="destino.html?id=${encodeURIComponent(destino.id)}" class="details-btn">
          Ver detalhes
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    `;

    configurarImagem(
      card.querySelector(".card-image img"),
      destino.imagem,
      destino.nome,
    );

    cardsContainer.appendChild(card);
  });
}

function aplicarFiltros() {
  const texto = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const paisSelecionado = filtroPais.value;
  const precoSelecionado = filtroPreco.value;

  const resultado = destinos.filter((destino) => {
    const conteudo = [
      destino.nome,
      destino.pais,
      destino.regiao,
      destino.categoria,
    ]
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    const correspondePesquisa = conteudo.includes(texto);
    const correspondePais =
      !paisSelecionado || destino.pais === paisSelecionado;

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

  renderizarDestinos(resultado);
}

cardsContainer.addEventListener("click", (evento) => {
  const botao = evento.target.closest(".favorite-btn");
  if (!botao) return;

  const id = Number(botao.dataset.id);

  if (favoritos.includes(id)) {
    favoritos = favoritos.filter((item) => item !== id);
  } else {
    favoritos.push(id);
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  renderizarDestinos(destinosExibidos);
});

searchInput.addEventListener("input", aplicarFiltros);
filtroPais.addEventListener("change", aplicarFiltros);
filtroPreco.addEventListener("change", aplicarFiltros);

async function iniciar() {
  mostrarEstado("Carregando destinos...");

  try {
    const dados = await buscarJSON("/destinos");

    if (!Array.isArray(dados)) {
      throw new Error("A API retornou um formato inválido.");
    }

    destinos = dados.map(normalizarDestino);
    carregarPaises();
    renderizarDestinos(destinos);
  } catch (erro) {
    console.error("Erro ao carregar destinos:", erro);
    mostrarEstado(
      "Não foi possível carregar os destinos. Verifique se a API está rodando.",
      "erro",
    );
  }
}

iniciar();

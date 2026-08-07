import {
  buscarJSON,
  configurarImagem,
  escaparHTML,
  formatarMoeda,
} from "./api.js";

const cards = document.querySelector(".cards-promocoes");
const pesquisa = document.querySelector("#searchPromocao");
const filtroPais = document.querySelector("#filtroPais");
const filtroDesconto = document.querySelector("#filtroDesconto");
const secaoContador = document.querySelector(".contador");

let promocoes = [];
let intervaloContador = null;

function mostrarEstado(mensagem, tipo = "") {
  cards.innerHTML = `
    <div class="estado-promocoes ${tipo}">
      <i class="fa-solid ${tipo === "erro" ? "fa-triangle-exclamation" : "fa-spinner fa-spin"}"></i>
      <p>${escaparHTML(mensagem)}</p>
    </div>
  `;
}

function normalizarPromocao(promocao) {
  return {
    ...promocao,
    id: Number(promocao.id),
    nome: promocao.nome || "Promoção sem nome",
    pais: promocao.pais || "Local não informado",
    regiao: promocao.regiao || "",
    categoria: promocao.categoria || "",
    preco: Number(promocao.preco) || 0,
    desconto: Number(promocao.desconto) || 0,
    precoPromocional:
      Number(promocao.preco_promocional) ||
      Number(promocao.preco) ||
      0,
    inicio: promocao.inicio || null,
    fim: promocao.fim || null,
    destaque: Boolean(promocao.destaque),
    descricao: promocao.descricao || "",
    imagem: promocao.imagem || "",
  };
}

function carregarPaises() {
  const paises = [...new Set(promocoes.map((promocao) => promocao.pais))]
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
}

function renderizarPromocoes(lista) {
  cards.innerHTML = "";

  if (!lista.length) {
    cards.innerHTML = `
      <div class="estado-promocoes vazio">
        <i class="fa-solid fa-tags"></i>
        <p>Nenhuma promoção encontrada.</p>
      </div>
    `;
    return;
  }

  lista.forEach((promocao) => {
    const economia = Math.max(
      0,
      promocao.preco - promocao.precoPromocional,
    );
    const card = document.createElement("article");
    card.className = "card-promocao";

    card.innerHTML = `
      <div class="imagem-promocao">
        <img alt="">
        <span class="badge">${promocao.desconto}% OFF</span>
        ${promocao.destaque
          ? '<span class="badge-destaque">⭐ Destaque</span>'
          : ""}
      </div>

      <div class="conteudo-promocao">
        <h3>${escaparHTML(promocao.nome)}</h3>
        <span class="pais">
          <i class="fa-solid fa-location-dot"></i>
          ${escaparHTML(promocao.pais)}
        </span>
        ${promocao.categoria
          ? `<span class="categoria-promocao">${escaparHTML(promocao.categoria)}</span>`
          : ""}
        ${promocao.descricao
          ? `<p class="descricao-promocao">${escaparHTML(promocao.descricao)}</p>`
          : ""}

        <div class="precos">
          <small class="preco-antigo">${formatarMoeda(promocao.preco)}</small>
          <h2>${formatarMoeda(promocao.precoPromocional)}</h2>
          <span class="economia">
            Economize ${formatarMoeda(economia)}
          </span>
        </div>

        <a
          href="form.html?promocao=${encodeURIComponent(promocao.nome)}&id=${promocao.id}"
          class="btn-promocao"
        >
          Aproveitar oferta
        </a>
      </div>
    `;

    configurarImagem(
      card.querySelector(".imagem-promocao img"),
      promocao.imagem,
      promocao.nome,
    );
    cards.appendChild(card);
  });
}

function aplicarFiltros() {
  const texto = pesquisa.value.trim().toLocaleLowerCase("pt-BR");
  const pais = filtroPais.value;
  const descontoMinimo = Number(filtroDesconto.value) || 0;

  const resultado = promocoes.filter((promocao) => {
    const conteudo = [
      promocao.nome,
      promocao.pais,
      promocao.regiao,
      promocao.categoria,
      promocao.descricao,
    ]
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    return (
      conteudo.includes(texto) &&
      (!pais || promocao.pais === pais) &&
      promocao.desconto >= descontoMinimo
    );
  });

  renderizarPromocoes(resultado);
}

function obterFimMaisProximo() {
  const datas = promocoes
    .filter((promocao) => promocao.fim)
    .map((promocao) => {
      const data = String(promocao.fim).slice(0, 10);
      return new Date(`${data}T23:59:59`);
    })
    .filter((data) => !Number.isNaN(data.getTime()) && data > new Date())
    .sort((a, b) => a - b);

  return datas[0] || null;
}

function atualizarContador(dataFinal) {
  const diferenca = Math.max(0, dataFinal - new Date());
  const valores = {
    dias: Math.floor(diferenca / 86400000),
    horas: Math.floor((diferenca % 86400000) / 3600000),
    minutos: Math.floor((diferenca % 3600000) / 60000),
    segundos: Math.floor((diferenca % 60000) / 1000),
  };

  Object.entries(valores).forEach(([id, valor]) => {
    document.querySelector(`#${id}`).textContent =
      String(valor).padStart(2, "0");
  });
}

function iniciarContador() {
  if (intervaloContador) clearInterval(intervaloContador);

  const dataFinal = obterFimMaisProximo();

  if (!dataFinal) {
    secaoContador.hidden = true;
    return;
  }

  secaoContador.hidden = false;
  atualizarContador(dataFinal);
  intervaloContador = setInterval(
    () => atualizarContador(dataFinal),
    1000,
  );
}

pesquisa.addEventListener("input", aplicarFiltros);
filtroPais.addEventListener("change", aplicarFiltros);
filtroDesconto.addEventListener("change", aplicarFiltros);

async function iniciar() {
  mostrarEstado("Carregando promoções...");

  try {
    const dados = await buscarJSON("/promocoes/publicas");

    if (!Array.isArray(dados)) {
      throw new Error("A API retornou um formato inválido.");
    }

    promocoes = dados.map(normalizarPromocao);
    carregarPaises();
    renderizarPromocoes(promocoes);
    iniciarContador();
  } catch (erro) {
    console.error("Erro ao carregar promoções:", erro);
    secaoContador.hidden = true;
    mostrarEstado(
      "Não foi possível carregar as promoções. Verifique se a API está rodando.",
      "erro",
    );
  }
}

iniciar();

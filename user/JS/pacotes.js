import {
  buscarJSON,
  configurarImagem,
  escaparHTML,
  formatarMoeda,
} from "./api.js";

const container = document.querySelector(".cards-pacotes");
const pesquisa = document.querySelector("#searchPacote");
const filtroDuracao = document.querySelector("#filtroDuracao");
const filtroPreco = document.querySelector("#filtroPreco");

let pacotes = [];

function mostrarEstado(mensagem, tipo = "") {
  container.innerHTML = `
    <div class="estado-pacotes ${tipo}">
      <i class="fa-solid ${tipo === "erro" ? "fa-triangle-exclamation" : "fa-spinner fa-spin"}"></i>
      <p>${escaparHTML(mensagem)}</p>
    </div>
  `;
}

function normalizarPacote(pacote) {
  return {
    ...pacote,
    id: Number(pacote.id),
    titulo: pacote.titulo || "Pacote sem título",
    descricao: pacote.descricao || "Detalhes disponíveis sob consulta.",
    preco: Number(pacote.preco) || 0,
    dias: Math.max(1, Number(pacote.dias) || 1),
    imagem: pacote.imagem || "",
  };
}

function renderizarPacotes(lista) {
  container.innerHTML = "";

  if (!lista.length) {
    container.innerHTML = `
      <div class="estado-pacotes vazio">
        <i class="fa-solid fa-suitcase-rolling"></i>
        <p>Nenhum pacote encontrado.</p>
      </div>
    `;
    return;
  }

  lista.forEach((pacote) => {
    const card = document.createElement("article");
    card.className = "card-pacote";

    card.innerHTML = `
      <div class="imagem-pacote">
        <img alt="">
      </div>

      <div class="card-content">
        <h3>${escaparHTML(pacote.titulo)}</h3>

        <span class="dias">
          <i class="fa-solid fa-calendar-days"></i>
          ${pacote.dias} ${pacote.dias === 1 ? "dia" : "dias"}
        </span>

        <p class="descricao-pacote">
          ${escaparHTML(pacote.descricao)}
        </p>

        <div class="preco">
          <small>A partir de</small>
          <h2>${formatarMoeda(pacote.preco)}</h2>
        </div>

        <a
          class="btn-reservar"
          href="form.html?pacote=${encodeURIComponent(pacote.titulo)}&id=${pacote.id}"
        >
          Reservar agora
        </a>
      </div>
    `;

    configurarImagem(
      card.querySelector(".imagem-pacote img"),
      pacote.imagem,
      pacote.titulo,
    );

    container.appendChild(card);
  });
}

function filtrarPacotes() {
  const texto = pesquisa.value.trim().toLocaleLowerCase("pt-BR");
  const duracao = filtroDuracao.value;
  const faixaPreco = filtroPreco.value;

  const resultado = pacotes.filter((pacote) => {
    const conteudo = [pacote.titulo, pacote.descricao]
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    let correspondeDuracao = true;
    if (duracao === "5") {
      correspondeDuracao = pacote.dias <= 5;
    } else if (duracao === "10") {
      correspondeDuracao = pacote.dias > 5 && pacote.dias <= 10;
    } else if (duracao === "11") {
      correspondeDuracao = pacote.dias > 10;
    }

    let correspondePreco = true;
    if (faixaPreco === "3000") {
      correspondePreco = pacote.preco <= 3000;
    } else if (faixaPreco === "6000") {
      correspondePreco = pacote.preco > 3000 && pacote.preco <= 6000;
    } else if (faixaPreco === "10000") {
      correspondePreco = pacote.preco > 6000;
    }

    return (
      conteudo.includes(texto) &&
      correspondeDuracao &&
      correspondePreco
    );
  });

  renderizarPacotes(resultado);
}

pesquisa.addEventListener("input", filtrarPacotes);
filtroDuracao.addEventListener("change", filtrarPacotes);
filtroPreco.addEventListener("change", filtrarPacotes);

async function iniciar() {
  mostrarEstado("Carregando pacotes...");

  try {
    const dados = await buscarJSON("/pacotes");

    if (!Array.isArray(dados)) {
      throw new Error("A API retornou um formato inválido.");
    }

    pacotes = dados.map(normalizarPacote);
    renderizarPacotes(pacotes);
  } catch (erro) {
    console.error("Erro ao carregar pacotes:", erro);
    mostrarEstado(
      "Não foi possível carregar os pacotes. Verifique se a API está rodando.",
      "erro",
    );
  }
}

iniciar();

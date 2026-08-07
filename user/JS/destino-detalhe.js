import {
  buscarJSON,
  configurarImagem,
  escaparHTML,
  formatarMoeda,
} from "./api.js";

const parametros = new URLSearchParams(window.location.search);
const idDestino = Number(parametros.get("id"));
const pagina = document.querySelector(".destino-detalhe");

const pessoasInput = document.querySelector("#qtdPessoas");
const diasInput = document.querySelector("#qtdDias");
const hospedagemInput = document.querySelector("#tipoHospedagem");
const passagemInput = document.querySelector("#passagem");
const seguroInput = document.querySelector("#seguro");
const valorFinal = document.querySelector("#valorFinal");

let destino = null;

function mostrarCarregamento() {
  pagina.classList.add("carregando");
  pagina.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="estado-detalhe" id="estadoDetalhe">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <p>Carregando destino...</p>
      </div>
    `,
  );
}

function mostrarErro(mensagem) {
  pagina.classList.remove("carregando");
  pagina.innerHTML = `
    <div class="estado-detalhe erro">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <h1>Não foi possível abrir este destino</h1>
      <p>${escaparHTML(mensagem)}</p>
      <a href="index.html#destinos">Voltar para os destinos</a>
    </div>
  `;
}

function preencherDestino(dados) {
  destino = {
    ...dados,
    id: Number(dados.id),
    nome: dados.nome || "Destino sem nome",
    pais: dados.pais || "Local não informado",
    categoria: dados.categoria || "Não informada",
    descricao: dados.descricao || "Descrição ainda não disponível.",
    estrelas: Math.min(5, Math.max(0, Number(dados.estrelas) || 0)),
    preco: Number(dados.preco) || 0,
    imagem: dados.imagem || "",
  };

  configurarImagem(
    document.querySelector(".destino-imagem"),
    destino.imagem,
    destino.nome,
  );
  configurarImagem(
    document.querySelector(".imagem-principal"),
    destino.imagem,
    destino.nome,
  );

  document.querySelector(".destino-titulo").textContent = destino.nome;
  document.querySelector(".destino-pais").innerHTML = `
    <i class="fa-solid fa-location-dot"></i>
    ${escaparHTML(destino.pais)}
  `;
  document.querySelector(".destino-estrelas").textContent =
    "⭐".repeat(destino.estrelas);
  document.querySelector(".destino-descricao").textContent =
    destino.descricao;
  document.querySelector(".info-pais").textContent = destino.pais;
  document.querySelector(".info-avaliacao").textContent =
    `${destino.estrelas} estrelas`;
  document.querySelector(".info-categoria").textContent =
    destino.categoria;

  const miniaturas = document.querySelector(".galeria-miniaturas");
  miniaturas.innerHTML = "";
  const miniatura = document.createElement("img");
  miniatura.className = "miniatura ativa";
  configurarImagem(miniatura, destino.imagem, destino.nome);
  miniaturas.appendChild(miniatura);

  document.querySelector("#estadoDetalhe")?.remove();
  pagina.classList.remove("carregando");
  calcularOrcamento();
}

function calcularOrcamento() {
  if (!destino) return;

  const pessoas = Math.max(1, Number(pessoasInput.value) || 1);
  const dias = Math.max(1, Number(diasInput.value) || 1);
  const hospedagem = Number(hospedagemInput.value) || 1;

  let valor = destino.preco * pessoas * hospedagem * (dias / 7);

  if (passagemInput.checked) valor += 800 * pessoas;
  if (seguroInput.checked) valor += 150 * pessoas;

  valorFinal.textContent = formatarMoeda(valor);
}

[
  pessoasInput,
  diasInput,
  hospedagemInput,
  passagemInput,
  seguroInput,
].forEach((campo) => {
  campo.addEventListener("input", calcularOrcamento);
  campo.addEventListener("change", calcularOrcamento);
});

document.querySelector(".btn-orcamento")?.addEventListener("click", () => {
  if (!destino) return;
  window.location.href =
    `form.html?destino=${encodeURIComponent(destino.nome)}&id=${destino.id}`;
});

async function iniciar() {
  mostrarCarregamento();

  if (!Number.isInteger(idDestino) || idDestino <= 0) {
    mostrarErro("O endereço não contém um destino válido.");
    return;
  }

  try {
    const dados = await buscarJSON(`/destinos/${idDestino}`);
    preencherDestino(dados);
  } catch (erro) {
    console.error("Erro ao carregar destino:", erro);
    mostrarErro(
      erro.message ||
        "Verifique se a API está rodando e tente novamente.",
    );
  }
}

iniciar();

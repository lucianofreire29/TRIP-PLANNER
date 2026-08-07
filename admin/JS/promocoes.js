import {
  ativarPreviewImagem,
  configurarImagem,
  normalizarUrlImagem,
} from "./imagens.js";

const API_URL = "http://localhost:3000/promocoes";

const modal = document.querySelector("#modalPromocoes");
const modalExcluir = document.querySelector("#modalExcluir");
const form = document.querySelector("#form");
const tbody = document.querySelector("#tbodypromocoes");
const btnNovo = document.querySelector("#btnNovo");
const btnFechar = document.querySelector("#fecharModal");
const btnCancelarExcluir = document.querySelector("#cancelarExcluir");
const btnConfirmarExcluir = document.querySelector("#confirmarExcluir");
const inputPreco = document.querySelector("#preco");
const inputDesconto = document.querySelector("#desconto");
const inputPrecoPromocional = document.querySelector("#precoPromocional");
const inputImagem = document.querySelector("#imagem");

ativarPreviewImagem(inputImagem);

let promocaoEditando = null;
let promocaoExcluir = null;
let promocoes = [];

btnNovo.addEventListener("click", abrirModal);
btnFechar.addEventListener("click", fecharModal);
btnCancelarExcluir.addEventListener("click", fecharModalExcluir);
btnConfirmarExcluir.addEventListener("click", confirmarExclusao);
form.addEventListener("submit", salvarPromocao);
inputPreco.addEventListener("input", calcularPrecoPromocional);
inputDesconto.addEventListener("input", calcularPrecoPromocional);

function abrirModal() {
  if (!promocaoEditando) {
    form.reset();
    inputDesconto.value = 0;
    document.querySelector("#destaque").value = "false";
    document.querySelector(".modal-header h2").textContent = "Nova Promoção";
  }

  modal.classList.add("ativo");
}

function fecharModal() {
  modal.classList.remove("ativo");
  form.reset();
  promocaoEditando = null;
}

function fecharModalExcluir() {
  modalExcluir.classList.remove("ativo");
  promocaoExcluir = null;
}

function calcularPrecoPromocional() {
  const preco = Number(inputPreco.value);
  const desconto = Number(inputDesconto.value);

  if (!Number.isFinite(preco) || !Number.isFinite(desconto)) {
    inputPrecoPromocional.value = "";
    return;
  }

  inputPrecoPromocional.value = (preco * (1 - desconto / 100)).toFixed(2);
}

function obterDadosFormulario() {
  return {
    nome: document.querySelector("#nome").value,
    pais: document.querySelector("#pais").value,
    regiao: document.querySelector("#regiao").value,
    categoria: document.querySelector("#categoria").value,
    preco: Number(inputPreco.value),
    desconto: Number(inputDesconto.value),
    precoPromocional: Number(inputPrecoPromocional.value),
    inicio: document.querySelector("#inicio").value || null,
    fim: document.querySelector("#fim").value || null,
    destaque: document.querySelector("#destaque").value === "true",
    status: document.querySelector("#status").value,
    descricao: document.querySelector("#descricao").value,
    imagem: normalizarUrlImagem(inputImagem.value),
  };
}

async function lerResposta(resposta) {
  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(dados.erro || "Não foi possível concluir a operação.");
  }

  return dados;
}

async function salvarPromocao(evento) {
  evento.preventDefault();

  const promocao = obterDadosFormulario();
  const url = promocaoEditando
    ? `${API_URL}/${promocaoEditando}`
    : API_URL;

  try {
    const resposta = await fetch(url, {
      method: promocaoEditando ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promocao),
    });

    await lerResposta(resposta);
    fecharModal();
    await carregarPromocoes();
  } catch (erro) {
    console.error(erro);
    alert(erro.message);
  }
}

async function carregarPromocoes() {
  try {
    const resposta = await fetch(API_URL);
    promocoes = await lerResposta(resposta);
    renderizarPromocoes();
  } catch (erro) {
    console.error(erro);
    tbody.innerHTML =
      '<tr><td colspan="12">Não foi possível carregar as promoções.</td></tr>';
  }
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(data) {
  if (!data) return "-";
  return new Date(`${String(data).slice(0, 10)}T00:00:00`).toLocaleDateString(
    "pt-BR",
  );
}

function escaparHTML(valor) {
  const elemento = document.createElement("div");
  elemento.textContent = valor ?? "";
  return elemento.innerHTML;
}

function renderizarPromocoes() {
  tbody.innerHTML = "";

  if (!promocoes.length) {
    tbody.innerHTML =
      '<tr><td colspan="12">Nenhuma promoção cadastrada.</td></tr>';
    return;
  }

  promocoes.forEach((promocao) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>
        ${promocao.imagem
          ? `<img class="thumb" alt="">`
          : "-"}
      </td>
      <td>${escaparHTML(promocao.nome)}</td>
      <td>${escaparHTML(promocao.pais)}</td>
      <td>${escaparHTML(promocao.regiao) || "-"}</td>
      <td>${escaparHTML(promocao.categoria) || "-"}</td>
      <td>${formatarMoeda(promocao.preco)}</td>
      <td>${Number(promocao.desconto)}%</td>
      <td>${formatarMoeda(promocao.preco_promocional)}</td>
      <td>${formatarData(promocao.inicio)}</td>
      <td>${formatarData(promocao.fim)}</td>
      <td>${promocao.status === "ativa" ? "Ativa" : "Inativa"}</td>
      <td>
        <button class="btn-editar" data-acao="editar" data-id="${promocao.id}">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn-excluir" data-acao="excluir" data-id="${promocao.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;

    const imagem = linha.querySelector(".thumb");
    if (imagem) configurarImagem(imagem, promocao.imagem, promocao.nome);

    tbody.appendChild(linha);
  });
}

tbody.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;

  const id = Number(botao.dataset.id);
  const promocao = promocoes.find((item) => Number(item.id) === id);
  if (!promocao) return;

  if (botao.dataset.acao === "editar") {
    editarPromocao(promocao);
  } else {
    promocaoExcluir = id;
    modalExcluir.classList.add("ativo");
  }
});

function editarPromocao(promocao) {
  promocaoEditando = promocao.id;
  document.querySelector(".modal-header h2").textContent = "Editar Promoção";
  document.querySelector("#nome").value = promocao.nome;
  document.querySelector("#pais").value = promocao.pais;
  document.querySelector("#regiao").value = promocao.regiao || "";
  document.querySelector("#categoria").value = promocao.categoria || "Praia";
  inputPreco.value = promocao.preco;
  inputDesconto.value = promocao.desconto;
  inputPrecoPromocional.value = promocao.preco_promocional;
  document.querySelector("#inicio").value = promocao.inicio?.slice(0, 10) || "";
  document.querySelector("#fim").value = promocao.fim?.slice(0, 10) || "";
  document.querySelector("#destaque").value = String(promocao.destaque);
  document.querySelector("#status").value = promocao.status;
  document.querySelector("#descricao").value = promocao.descricao || "";
  inputImagem.value = promocao.imagem || "";
  inputImagem.dispatchEvent(new Event("input"));
  abrirModal();
}

async function confirmarExclusao() {
  if (!promocaoExcluir) return;

  try {
    const resposta = await fetch(`${API_URL}/${promocaoExcluir}`, {
      method: "DELETE",
    });

    await lerResposta(resposta);
    fecharModalExcluir();
    await carregarPromocoes();
  } catch (erro) {
    console.error(erro);
    alert(erro.message);
  }
}

carregarPromocoes();

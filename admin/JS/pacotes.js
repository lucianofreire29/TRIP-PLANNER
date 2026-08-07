const API_URL = "http://localhost:3000/pacotes";

const modal = document.querySelector("#modalPacotes");
const modalExcluir = document.querySelector("#modalExcluir");
const form = document.querySelector("#form");
const tbody = document.querySelector("#tbodyPacotes");
const btnNovo = document.querySelector("#btnNovo");
const btnFechar = document.querySelector("#fecharModal");
const btnCancelarExcluir = document.querySelector("#cancelarExcluir");
const btnConfirmarExcluir = document.querySelector("#confirmarExcluir");

let pacoteEditando = null;
let pacoteExcluir = null;
let pacotes = [];

btnNovo.addEventListener("click", abrirModal);
btnFechar.addEventListener("click", fecharModal);
btnCancelarExcluir.addEventListener("click", fecharModalExcluir);
btnConfirmarExcluir.addEventListener("click", confirmarExclusao);
form.addEventListener("submit", salvarPacote);

function abrirModal() {
  if (!pacoteEditando) {
    form.reset();
    document.querySelector(".modal-header h2").textContent = "Novo Pacote";
  }

  modal.classList.add("ativo");
}

function fecharModal() {
  modal.classList.remove("ativo");
  form.reset();
  pacoteEditando = null;
}

function fecharModalExcluir() {
  modalExcluir.classList.remove("ativo");
  pacoteExcluir = null;
}

function obterDadosFormulario() {
  return {
    titulo: document.querySelector("#titulo").value,
    descricao: document.querySelector("#descricao").value,
    preco: Number(document.querySelector("#preco").value),
    dias: Number(document.querySelector("#dias").value),
    imagem: document.querySelector("#imagem").value,
  };
}

async function lerResposta(resposta) {
  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(dados.erro || "Não foi possível concluir a operação.");
  }

  return dados;
}

async function salvarPacote(evento) {
  evento.preventDefault();

  const pacote = obterDadosFormulario();
  const url = pacoteEditando ? `${API_URL}/${pacoteEditando}` : API_URL;

  try {
    const resposta = await fetch(url, {
      method: pacoteEditando ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pacote),
    });

    await lerResposta(resposta);
    fecharModal();
    await carregarPacotes();
  } catch (erro) {
    console.error(erro);
    alert(erro.message);
  }
}

async function carregarPacotes() {
  try {
    const resposta = await fetch(API_URL);
    pacotes = await lerResposta(resposta);
    renderizarPacotes();
  } catch (erro) {
    console.error(erro);
    tbody.innerHTML =
      '<tr><td colspan="7">Não foi possível carregar os pacotes.</td></tr>';
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
  return new Date(data).toLocaleDateString("pt-BR");
}

function escaparHTML(valor) {
  const elemento = document.createElement("div");
  elemento.textContent = valor ?? "";
  return elemento.innerHTML;
}

function renderizarPacotes() {
  tbody.innerHTML = "";

  if (!pacotes.length) {
    tbody.innerHTML =
      '<tr><td colspan="7">Nenhum pacote cadastrado.</td></tr>';
    return;
  }

  pacotes.forEach((pacote) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>
        ${pacote.imagem
          ? `<img src="${escaparHTML(pacote.imagem)}" class="thumb" alt="">`
          : "-"}
      </td>
      <td>${escaparHTML(pacote.titulo)}</td>
      <td>${escaparHTML(pacote.descricao) || "-"}</td>
      <td>${formatarMoeda(pacote.preco)}</td>
      <td>${Number(pacote.dias)} dias</td>
      <td>${formatarData(pacote.created_at)}</td>
      <td>
        <button class="btn-editar" data-acao="editar" data-id="${pacote.id}">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn-excluir" data-acao="excluir" data-id="${pacote.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;

    tbody.appendChild(linha);
  });
}

tbody.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;

  const id = Number(botao.dataset.id);
  const pacote = pacotes.find((item) => Number(item.id) === id);
  if (!pacote) return;

  if (botao.dataset.acao === "editar") {
    editarPacote(pacote);
  } else {
    pacoteExcluir = id;
    modalExcluir.classList.add("ativo");
  }
});

function editarPacote(pacote) {
  pacoteEditando = pacote.id;
  document.querySelector(".modal-header h2").textContent = "Editar Pacote";
  document.querySelector("#titulo").value = pacote.titulo || "";
  document.querySelector("#descricao").value = pacote.descricao || "";
  document.querySelector("#preco").value = pacote.preco;
  document.querySelector("#dias").value = pacote.dias;
  document.querySelector("#imagem").value = pacote.imagem || "";
  abrirModal();
}

async function confirmarExclusao() {
  if (!pacoteExcluir) return;

  try {
    const resposta = await fetch(`${API_URL}/${pacoteExcluir}`, {
      method: "DELETE",
    });

    await lerResposta(resposta);
    fecharModalExcluir();
    await carregarPacotes();
  } catch (erro) {
    console.error(erro);
    alert(erro.message);
  }
}

carregarPacotes();

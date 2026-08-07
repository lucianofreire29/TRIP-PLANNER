import { db } from "../../user/JS/firebase.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const modal = document.querySelector("#modalContatos");
const modalExcluir = document.querySelector("#modalExcluir");
const form = document.querySelector("#formContato");
const tbody = document.querySelector("#tbodyContatos");
const btnFechar = document.querySelector("#fecharModal");
const btnCancelarExcluir = document.querySelector("#cancelarExcluir");
const btnConfirmarExcluir = document.querySelector("#confirmarExcluir");
const pesquisa = document.querySelector("#pesquisaContato");
const botoesFiltro = document.querySelectorAll(".filtro-btn");

let contatos = [];
let statusSelecionado = "todos";
let contatoSelecionado = null;
let contatoExcluir = null;

const nomesStatus = {
  "nao-lida": "Não lida",
  andamento: "Em andamento",
  atendida: "Atendida",
};

btnFechar.addEventListener("click", fecharModal);
btnCancelarExcluir.addEventListener("click", fecharModalExcluir);
btnConfirmarExcluir.addEventListener("click", confirmarExclusao);
form.addEventListener("submit", salvarStatus);
pesquisa.addEventListener("input", renderizarContatos);

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesFiltro.forEach((item) => item.classList.remove("ativo"));
    botao.classList.add("ativo");
    statusSelecionado = botao.dataset.status;
    renderizarContatos();
  });
});

function normalizarStatus(status) {
  return nomesStatus[status] ? status : "nao-lida";
}

function escaparHTML(valor) {
  const elemento = document.createElement("div");
  elemento.textContent = valor ?? "";
  return elemento.innerHTML;
}

function obterData(contato) {
  if (!contato.criadoEm) return null;
  if (typeof contato.criadoEm.toDate === "function") {
    return contato.criadoEm.toDate();
  }

  return new Date(contato.criadoEm);
}

function formatarData(contato) {
  const data = obterData(contato);
  if (!data || Number.isNaN(data.getTime())) return "-";

  return data.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function atualizarContadores() {
  const quantidades = {
    todos: contatos.length,
    "nao-lida": 0,
    andamento: 0,
    atendida: 0,
  };

  contatos.forEach((contato) => {
    quantidades[normalizarStatus(contato.status)] += 1;
  });

  document.querySelector("#totalSolicitacoes").textContent = quantidades.todos;
  document.querySelector("#naoLidas").textContent = quantidades["nao-lida"];
  document.querySelector("#emAndamento").textContent = quantidades.andamento;
  document.querySelector("#atendidas").textContent = quantidades.atendida;

  botoesFiltro.forEach((botao) => {
    botao.querySelector("span").textContent = quantidades[botao.dataset.status];
  });
}

function contatosFiltrados() {
  const texto = pesquisa.value.trim().toLowerCase();

  return contatos.filter((contato) => {
    const status = normalizarStatus(contato.status);
    const correspondeStatus =
      statusSelecionado === "todos" || status === statusSelecionado;

    const conteudo = [
      contato.nome,
      contato.email,
      contato.telefone,
      contato.assunto,
      contato.reserva,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return correspondeStatus && conteudo.includes(texto);
  });
}

function renderizarContatos() {
  const lista = contatosFiltrados();
  tbody.innerHTML = "";
  document.querySelector("#contadorResultados").textContent = lista.length;

  if (!lista.length) {
    tbody.innerHTML =
      '<tr><td colspan="9">Nenhuma solicitação encontrada.</td></tr>';
    return;
  }

  lista.forEach((contato, indice) => {
    const status = normalizarStatus(contato.status);
    const linha = document.createElement("tr");
    linha.dataset.status = status;

    linha.innerHTML = `
      <td>#${String(indice + 1).padStart(3, "0")}</td>
      <td>${escaparHTML(contato.nome) || "-"}</td>
      <td>${escaparHTML(contato.email) || "-"}</td>
      <td>${escaparHTML(contato.telefone) || "-"}</td>
      <td>${escaparHTML(contato.assunto) || "-"}</td>
      <td>${escaparHTML(contato.reserva) || "-"}</td>
      <td>${formatarData(contato)}</td>
      <td><span class="status ${status}">${nomesStatus[status]}</span></td>
      <td>
        <button class="btn-visualizar" data-acao="visualizar" data-id="${contato.id}" title="Visualizar">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button class="btn-excluir" data-acao="excluir" data-id="${contato.id}" title="Excluir">
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

  const contato = contatos.find((item) => item.id === botao.dataset.id);
  if (!contato) return;

  if (botao.dataset.acao === "visualizar") {
    abrirContato(contato);
  } else {
    contatoExcluir = contato.id;
    modalExcluir.classList.add("ativo");
  }
});

function abrirContato(contato) {
  contatoSelecionado = contato.id;
  document.querySelector("#nome").value = contato.nome || "";
  document.querySelector("#email").value = contato.email || "";
  document.querySelector("#telefone").value = contato.telefone || "";
  document.querySelector("#reserva").value = contato.reserva || "";
  document.querySelector("#assunto").value = contato.assunto || "";
  document.querySelector("#data").value = formatarData(contato);
  document.querySelector("#mensagem").value = contato.mensagem || "";
  document.querySelector("#statusContato").value = normalizarStatus(contato.status);
  modal.classList.add("ativo");
}

function fecharModal() {
  modal.classList.remove("ativo");
  contatoSelecionado = null;
}

function fecharModalExcluir() {
  modalExcluir.classList.remove("ativo");
  contatoExcluir = null;
}

async function salvarStatus(evento) {
  evento.preventDefault();
  if (!contatoSelecionado) return;

  const botaoSalvar = form.querySelector('button[type="submit"]');
  botaoSalvar.disabled = true;

  try {
    await updateDoc(doc(db, "mensagens", contatoSelecionado), {
      status: document.querySelector("#statusContato").value,
    });
    fecharModal();
  } catch (erro) {
    console.error("Erro ao atualizar contato:", erro);
    alert("Não foi possível atualizar o status.");
  } finally {
    botaoSalvar.disabled = false;
  }
}

async function confirmarExclusao() {
  if (!contatoExcluir) return;
  btnConfirmarExcluir.disabled = true;

  try {
    await deleteDoc(doc(db, "mensagens", contatoExcluir));
    fecharModalExcluir();
  } catch (erro) {
    console.error("Erro ao excluir contato:", erro);
    alert("Não foi possível excluir a solicitação.");
  } finally {
    btnConfirmarExcluir.disabled = false;
  }
}

const consulta = query(
  collection(db, "mensagens"),
  orderBy("criadoEm", "desc"),
);

onSnapshot(
  consulta,
  (resultado) => {
    contatos = resultado.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }));

    atualizarContadores();
    renderizarContatos();
  },
  (erro) => {
    console.error("Erro ao carregar contatos:", erro);
    tbody.innerHTML =
      '<tr><td colspan="9">Não foi possível carregar os contatos do Firebase.</td></tr>';
  },
);

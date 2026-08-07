import {
  ativarPreviewImagem,
  configurarImagem,
  normalizarUrlImagem,
} from "./imagens.js";

// =========================================
// ELEMENTOS DA PÁGINA
// =========================================

const modal = document.querySelector("#modalDestino");
const form = document.querySelector("#form");
const tbody = document.querySelector("#tbodyDestinos");
const inputImagem = document.querySelector("#imagem");

ativarPreviewImagem(inputImagem);

const btnNovo = document.querySelector("#btnNovo");
const btnFechar = document.querySelector("#fecharModal");

// Modal de exclusão
const modalExcluir = document.querySelector("#modalExcluir");

const btnCancelarExcluir = document.querySelector("#cancelarExcluir");

const btnConfirmarExcluir = document.querySelector("#confirmarExcluir");

let destinoExcluir = null;

// =========================================
// VARIÁVEIS
// =========================================

let destinoEditando = null;

// =========================================
// EVENTOS
// =========================================

btnNovo.addEventListener("click", abrirModal);
btnFechar.addEventListener("click", fecharModal);
form.addEventListener("submit", salvarDestino);

// =========================================
// MODAL
// =========================================

function abrirModal() {
  if (!destinoEditando) {
    form.reset();
    document.querySelector(".modal-header h2").textContent = "Novo Destino";
  }
  modal.classList.add("ativo");
}

function fecharModal() {
  modal.classList.remove("ativo");
  limparFormulario();
}

// =========================================
// UTILIDADES
// =========================================

function limparFormulario() {
  form.reset();
  destinoEditando = null;
}

function obterDadosFormulario() {
  return {
    nome: document.querySelector("#nome").value,
    pais: document.querySelector("#pais").value,
    regiao: document.querySelector("#regiao").value,
    categoria: document.querySelector("#categoria").value,
    preco: Number(document.querySelector("#preco").value),
    estrelas: Number(document.querySelector("#estrelas").value),
    descricao: document.querySelector("#descricao").value,
    imagem: normalizarUrlImagem(inputImagem.value),
  };
}

// =========================================
// CADASTRAR DESTINO
// =========================================

async function salvarDestino(e) {
  e.preventDefault();

  const destino = obterDadosFormulario();

  try {
    let url = "http://localhost:3000/destinos";

    let metodo = "POST";

    if (destinoEditando) {
      url = `http://localhost:3000/destinos/${destinoEditando}`;

      metodo = "PUT";
    }

    const resposta = await fetch(url, {
      method: metodo,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(destino),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao salvar.");
    }

    alert(
      destinoEditando
        ? "Destino atualizado com sucesso!"
        : "Destino cadastrado com sucesso!",
    );
    fecharModal();
    carregarDestinos();
  } catch (erro) {
    console.error(erro);
    alert("Erro ao salvar.");
  }
}
// =========================================
// LISTAR DESTINOS
// =========================================

async function carregarDestinos() {
  try {
    const resposta = await fetch("http://localhost:3000/destinos");

    const destinos = await resposta.json();

    tbody.innerHTML = "";

    destinos.forEach((destino) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>
            <img class="thumb">
        </td>

        <td>${destino.nome}</td>

        <td>${destino.pais}</td>

        <td>
            R$ ${Number(destino.preco).toLocaleString("pt-BR")}
        </td>

        <td>${destino.categoria}</td>

        <td>

            <button
                class="btn-editar"
                data-id="${destino.id}">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                class="btn-excluir"
                data-id="${destino.id}">

                <i class="fa-solid fa-trash"></i>

            </button>

        </td>

      `;

      configurarImagem(tr.querySelector(".thumb"), destino.imagem, destino.nome);

      tbody.appendChild(tr);

      tr.querySelector(".btn-excluir").addEventListener("click", () => {
        excluirDestino(destino.id);
      });

      // Será usado na próxima etapa
      tr.querySelector(".btn-editar").addEventListener("click", () => {
        editarDestino(destino);
      });
    });
  } catch (erro) {
    console.error(erro);
  }
}

// =========================================
// EXCLUIR DESTINO
// =========================================

function excluirDestino(id) {
  destinoExcluir = id;

  modalExcluir.classList.add("ativo");
}

// =========================================
// EDITAR DESTINO
// (Próxima etapa)
// =========================================

function editarDestino(destino) {
  destinoEditando = destino.id;

  document.querySelector("#nome").value = destino.nome;

  document.querySelector("#pais").value = destino.pais;

  document.querySelector("#regiao").value = destino.regiao;

  document.querySelector("#categoria").value = destino.categoria;

  document.querySelector("#preco").value = destino.preco;

  document.querySelector("#estrelas").value = destino.estrelas;

  document.querySelector("#descricao").value = destino.descricao;

  inputImagem.value = destino.imagem || "";
  inputImagem.dispatchEvent(new Event("input"));

  document.querySelector(".modal-header h2").textContent = "Editar Destino";

  abrirModal();
}

btnCancelarExcluir.addEventListener("click", () => {
  modalExcluir.classList.remove("ativo");

  destinoExcluir = null;
});

btnConfirmarExcluir.addEventListener("click", confirmarExclusao);

async function confirmarExclusao() {
  try {
    await fetch(`http://localhost:3000/destinos/${destinoExcluir}`, {
      method: "DELETE",
    });

    modalExcluir.classList.remove("ativo");

    destinoExcluir = null;

    carregarDestinos();
  } catch (erro) {
    console.error(erro);

    alert("Erro ao excluir.");
  }
}

carregarDestinos();

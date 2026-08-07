import { db } from "../../user/JS/firebase.js";

import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const API_URL = "http://localhost:3000";
const btnAtualizar = document.querySelector("#btnAtualizar");
const statusDashboard = document.querySelector("#statusDashboard");
const tbody = document.querySelector("#tbodyUltimosContatos");

btnAtualizar.addEventListener("click", carregarTotaisNeon);

async function buscarTotal(recurso, elementoId) {
  const elemento = document.querySelector(elementoId);

  try {
    const resposta = await fetch(`${API_URL}/${recurso}`);
    if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);

    const dados = await resposta.json();
    elemento.textContent = Array.isArray(dados) ? dados.length : 0;
    elemento.closest(".card").classList.remove("card-erro");
    return true;
  } catch (erro) {
    console.error(`Erro ao carregar ${recurso}:`, erro);
    elemento.textContent = "--";
    elemento.closest(".card").classList.add("card-erro");
    return false;
  }
}

async function carregarTotaisNeon() {
  btnAtualizar.disabled = true;
  statusDashboard.textContent = "Atualizando dados...";

  const resultados = await Promise.all([
    buscarTotal("destinos", "#totalDestinos"),
    buscarTotal("promocoes", "#totalPromocoes"),
    buscarTotal("pacotes", "#totalPacotes"),
  ]);

  const falhas = resultados.filter((resultado) => !resultado).length;
  statusDashboard.textContent = falhas
    ? `${falhas} indicador(es) não puderam ser carregados. Verifique se a API está rodando.`
    : `Dados atualizados às ${new Date().toLocaleTimeString("pt-BR")}. `;

  btnAtualizar.disabled = false;
}

function escaparHTML(valor) {
  const elemento = document.createElement("div");
  elemento.textContent = valor ?? "";
  return elemento.innerHTML;
}

function normalizarStatus(status) {
  const permitidos = ["nao-lida", "andamento", "atendida"];
  return permitidos.includes(status) ? status : "nao-lida";
}

function nomeStatus(status) {
  return {
    "nao-lida": "Não lida",
    andamento: "Em andamento",
    atendida: "Atendida",
  }[normalizarStatus(status)];
}

function formatarData(timestamp) {
  if (!timestamp) return "-";
  const data =
    typeof timestamp.toDate === "function"
      ? timestamp.toDate()
      : new Date(timestamp);

  if (Number.isNaN(data.getTime())) return "-";

  return data.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

const consultaContatos = query(
  collection(db, "mensagens"),
  orderBy("criadoEm", "desc"),
  limit(5),
);

onSnapshot(
  collection(db, "mensagens"),
  (resultado) => {
    document.querySelector("#totalContatos").textContent = resultado.size;
    document
      .querySelector("#totalContatos")
      .closest(".card")
      .classList.remove("card-erro");
  },
  (erro) => {
    console.error("Erro ao contar contatos:", erro);
    document.querySelector("#totalContatos").textContent = "--";
    document
      .querySelector("#totalContatos")
      .closest(".card")
      .classList.add("card-erro");
  },
);

onSnapshot(
  consultaContatos,
  (resultado) => {
    tbody.innerHTML = "";

    if (resultado.empty) {
      tbody.innerHTML =
        '<tr><td colspan="5">Nenhuma mensagem recebida.</td></tr>';
      return;
    }

    resultado.docs.forEach((documento) => {
      const contato = documento.data();
      const status = normalizarStatus(contato.status);
      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${escaparHTML(contato.nome) || "-"}</td>
        <td>${escaparHTML(contato.email) || "-"}</td>
        <td>${escaparHTML(contato.assunto) || "-"}</td>
        <td>${formatarData(contato.criadoEm)}</td>
        <td><span class="status ${status}">${nomeStatus(status)}</span></td>
      `;

      tbody.appendChild(linha);
    });
  },
  (erro) => {
    console.error("Erro ao carregar mensagens recentes:", erro);
    tbody.innerHTML =
      '<tr><td colspan="5">Não foi possível carregar as mensagens recentes.</td></tr>';
  },
);

carregarTotaisNeon();

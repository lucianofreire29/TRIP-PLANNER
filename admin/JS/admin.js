import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const linksMenu = document.querySelectorAll(".sidebar a");
const paginaAtual = window.location.pathname.split("/").pop();
const btnSair = document.querySelector("#btnSair");

linksMenu.forEach((link) => {
  if (link.getAttribute("href") === paginaAtual) {
    link.classList.add("ativo");
  }
});

onAuthStateChanged(auth, (usuario) => {
  if (!usuario) {
    window.location.replace("login.html");
  }
});

btnSair?.addEventListener("click", async () => {
  btnSair.disabled = true;
  btnSair.textContent = "Saindo...";

  try {
    await signOut(auth);
    window.location.replace("login.html");
  } catch (error) {
    console.error("Erro ao sair:", error);
    btnSair.disabled = false;
    btnSair.textContent = "Sair";
    alert("Não foi possível encerrar a sessão. Tente novamente.");
  }
});

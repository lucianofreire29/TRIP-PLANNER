import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const icone = document.querySelector("#iconeSenha");
const erro = document.querySelector("#erroLogin");
const btn = document.querySelector("#btnEntrar");

onAuthStateChanged(auth, (usuario) => {
  if (usuario) {
    window.location.replace("dashboard.html");
  }
});

icone.addEventListener("click", () => {
  const mostrarSenha = senha.type === "password";
  senha.type = mostrarSenha ? "text" : "password";
  icone.classList.toggle("fa-eye", !mostrarSenha);
  icone.classList.toggle("fa-eye-slash", mostrarSenha);
});

function mensagemErro(codigo) {
  const mensagens = {
    "auth/invalid-email": "Digite um e-mail válido.",
    "auth/invalid-credential": "E-mail ou senha inválidos.",
    "auth/user-disabled": "Este usuário está desativado.",
    "auth/too-many-requests":
      "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
    "auth/network-request-failed":
      "Não foi possível conectar ao Firebase. Verifique sua internet.",
  };

  return mensagens[codigo] || "Não foi possível entrar. Tente novamente.";
}

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  erro.textContent = "";
  btn.disabled = true;
  btn.textContent = "Entrando...";

  try {
    await signInWithEmailAndPassword(
      auth,
      email.value.trim(),
      senha.value,
    );
  } catch (error) {
    console.error("Erro no login:", error.code);
    erro.textContent = mensagemErro(error.code);
    senha.focus();
  } finally {
    btn.disabled = false;
    btn.textContent = "Entrar";
  }
});

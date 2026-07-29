import { auth } from "./firebase.js";

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const senha = document.querySelector("#senha");
const icone = document.querySelector("#iconeSenha");

icone.addEventListener("click", () => {
  if (senha.type === "password") {
    senha.type = "text";
    icone.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    senha.type = "password";
    icone.classList.replace("fa-eye-slash", "fa-eye");
  }
});

// Login
const form = document.querySelector("#loginForm");
const erro = document.querySelector("#erroLogin");
const btn = document.querySelector("#btnEntrar");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  erro.textContent = "";
  btn.disabled = true;
  btn.textContent = "Entrando...";

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    erro.textContent = "Email ou senha inválidos.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Entrar";
  }
});

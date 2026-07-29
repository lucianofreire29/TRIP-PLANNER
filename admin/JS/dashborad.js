import { auth } from "../../firebase.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const info = document.querySelector("#usuarioLogado");
const btnSair = document.querySelector("#btnSair");

// Verifica se está logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    info.textContent = `Logado como: ${user.email}`;
  } else {
    window.location.href = "login.html";
  }
});

// Logout
btnSair.addEventListener("click", async () => {
  await signOut(auth);

  window.location.href = "login.html";
});

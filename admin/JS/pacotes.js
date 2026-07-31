const modal = document.querySelector("#modalPacotes");

const btnNovo = document.querySelector("#btnNovo");

const fechar = document.querySelector("#fecharModal");

btnNovo.addEventListener("click", () => {
  modal.classList.add("ativo");
});

fechar.addEventListener("click", () => {
  modal.classList.remove("ativo");
});

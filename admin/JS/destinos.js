const modal = document.querySelector("#modalDestino");

const btnNovo = document.querySelector("#btnNovoDestino");

const fechar = document.querySelector("#fecharModal");

btnNovo.addEventListener("click", () => {
  modal.classList.add("ativo");
});

fechar.addEventListener("click", () => {
  modal.classList.remove("ativo");
});

const modal = document.querySelector("#modalPacotes");
const btnNovo = document.querySelector("#btnNovo");
const fechar = document.querySelector("#fecharModal");

btnNovo.addEventListener("click", () => {
  modal.classList.add("ativo");
});

fechar.addEventListener("click", () => {
  modal.classList.remove("ativo");
});

const botoesFiltro = document.querySelectorAll(".filtro-btn");
const linhasTabela = document.querySelectorAll("#tbodyContatos tr");

botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        // remove ativo dos outros botões
        botoesFiltro.forEach(btn => {
            btn.classList.remove("ativo");
        });

        // adiciona ativo no clicado
        botao.classList.add("ativo");


        const statusSelecionado = botao.dataset.status;


        linhasTabela.forEach(linha => {

            const statusLinha = linha.dataset.status;


            if (
                statusSelecionado === "todos" ||
                statusLinha === statusSelecionado
            ) {

                linha.style.display = "";

            } else {

                linha.style.display = "none";

            }

        });

    });

});
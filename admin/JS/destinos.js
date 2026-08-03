const modal = document.querySelector("#modalDestino");

const btnNovo = document.querySelector("#btnNovo");

const fechar = document.querySelector("#fecharModal");

btnNovo.addEventListener("click", () => {
  modal.classList.add("ativo");
});

fechar.addEventListener("click", () => {
  modal.classList.remove("ativo");
});

const form = document.querySelector("#form");

form.addEventListener("submit", salvarDestino);

async function salvarDestino(e) {
  e.preventDefault();

  const destino = {
    nome: document.querySelector("#nome").value,

    pais: document.querySelector("#pais").value,

    regiao: document.querySelector("#regiao").value,

    categoria: document.querySelector("#categoria").value,

    preco: Number(document.querySelector("#preco").value),

    estrelas: Number(document.querySelector("#estrelas").value),

    descricao: document.querySelector("#descricao").value,

    imagem: document.querySelector("#imagem").value,
  };
  try {
    const resposta = await fetch("http://localhost:3000/destinos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(destino),
    });
    if (!resposta.ok) {
      throw new Error("Erro ao salvar.");
    }
    alert("Destino cadastrado com sucesso!");
    form.reset();
    document.querySelector("#modalDestino").classList.remove("ativo");
  } catch (erro) {
    console.error(erro);

    alert("Erro ao cadastrar.");
  }
}

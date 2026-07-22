const pacotes = [
  {
    destino: "Fernando de Noronha",
    pais: "Brasil",
    imagem: "img/banner 1.jpg",
    dias: "5 dias / 4 noites",
    preco: "R$ 2.990",
    estrelas: 5,
    inclui: [
      "Passagem aérea",
      "Hotel 5 estrelas",
      "Café da manhã",
      "Transfer"
    ]
  },

  {
    destino: "Paris",
    pais: "França",
    imagem: "img/banner 2.jpg",
    dias: "7 dias / 6 noites",
    preco: "R$ 5.490",
    estrelas: 5,
    inclui: [
      "Passagem aérea",
      "Hotel 4 estrelas",
      "City Tour",
      "Seguro viagem"
    ]
  },

  {
    destino: "Suíça",
    pais: "Suíça",
    imagem: "img/banner 3.jpg",
    dias: "8 dias / 7 noites",
    preco: "R$ 7.990",
    estrelas: 5,
    inclui: [
      "Passagem aérea",
      "Hotel Premium",
      "Passeios",
      "Transfer"
    ]
  },
  {
    destino: "Fortaleza",
    pais: "Brasil",
    imagem: "img/fortaleza.jpg",
    dias: "8 dias / 7 noites",
    preco: "R$ 10.990",
    estrelas: 5,
    inclui: [
      "Passagem aérea",
      "Hotel Premium",
      "Passeios",
      "Transfer"
    ]
  },

  {
    destino: "Seul",
    pais: "Coreia do Sul",
    imagem: "img/seul.jpg",
    dias: "8 dias / 7 noites",
    preco: "R$ 25.990",
    estrelas: 5,
    inclui: [
      "Passagem aérea",
      "Hotel Premium",
      "Passeios",
      "Transfer"
    ]
  },

  {
    destino: "Las vegas",
    pais: "Estados unidos",
    imagem: "img/lasvegas.jpg",
    dias: "5 dias / 4 noites",
    preco: "R$ 7.990",
    estrelas: 5,
    inclui: [
      "Passagem aérea",
      "Hotel Premium",
      "Passeios",
      "Transfer"
    ]
  }
];

const container = document.querySelector(".cards-pacotes");
const pesquisa = document.querySelector("#searchPacote");
const filtroPais = document.querySelector("#filtroPais");
const filtroPreco = document.querySelector("#filtroPreco");

const paises = [...new Set(pacotes.map(p => p.pais))];

paises.forEach(pais => {
    filtroPais.innerHTML += `
        <option value="${pais}">
            ${pais}
        </option>
    `;
});

function criarEstrelas(qtd) {

    let estrelas = "";

    for (let i = 0; i < qtd; i++) {
        estrelas += `<i class="fa-solid fa-star"></i>`;
    }

    return estrelas;
}

function mostrarPacotes(lista) {

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML = `
            <h2>Nenhum pacote encontrado.</h2>
        `;

        return;
    }

    lista.forEach(pacote => {

        container.innerHTML += `

        <div class="card-pacote">

            <img src="${pacote.imagem}" alt="${pacote.destino}">

            <div class="card-content">

                <h3>${pacote.destino}</h3>

                <span class="pais">
                    <i class="fa-solid fa-location-dot"></i>
                    ${pacote.pais}
                </span>

                <div class="estrelas">
                    ${criarEstrelas(pacote.estrelas)}
                </div>

                <span class="dias">
                    <i class="fa-solid fa-calendar-days"></i>
                    ${pacote.dias}
                </span>

                <ul>

                    ${pacote.inclui.map(item => `
                        <li>
                            <i class="fa-solid fa-check"></i>
                            ${item}
                        </li>
                    `).join("")}

                </ul>

                <div class="preco">

                    <small>A partir de</small>

                    <h2>${pacote.preco}</h2>

                </div>

                <button class="btn-reservar">
                    Reservar Agora
                </button>

            </div>

        </div>

        `;
    });

}

mostrarPacotes(pacotes);

function filtrarPacotes() {

    const texto = pesquisa.value.toLowerCase();

    const pais = filtroPais.value;

    const preco = filtroPreco.value;

    const resultado = pacotes.filter(pacote => {

        const buscaDestino =
            pacote.destino.toLowerCase().includes(texto);

        const buscaPais =
            pais === "" || pacote.pais === pais;

        let buscaPreco = true;

        const valor = Number(
            pacote.preco.replace(/[^\d]/g, "")
        );

        if (preco === "3000") {

            buscaPreco = valor <= 3000;

        } else if (preco === "6000") {

            buscaPreco = valor <= 6000;

        } else if (preco === "10000") {

            buscaPreco = valor > 6000;
        }

        return buscaDestino && buscaPais && buscaPreco;

    });

    mostrarPacotes(resultado);

}

pesquisa.addEventListener("input", filtrarPacotes);

filtroPais.addEventListener("change", filtrarPacotes);

filtroPreco.addEventListener("change", filtrarPacotes);
const destinos = [

    {
        id:1,
        nome:"Fernando de Noronha",
        pais:"Brasil",
        regiao:"Nordeste",
        preco:2990,
        imagem:"img/card1.jpg",
        estrelas:5,
        categoria:"Praia",

        descricao:
        "Um dos destinos mais paradisíacos do Brasil, famoso pelas águas cristalinas, praias preservadas e uma natureza incrível."
    },

    {
        id: 2,
        nome: "Paris",
        pais: "França",
        regiao: "Europa",
        preco: 5490,
        imagem: "img/card2.jpg",
        estrelas: 5,
        categoria: "Cidade",

        descricao:
        "A cidade luz encanta com sua arquitetura histórica, gastronomia refinada, museus famosos e o charme inesquecível da Torre Eiffel."
    },

    {
        id: 3,
        nome: "Suíça",
        pais: "Suíça",
        regiao: "Europa",
        preco: 7990,
        imagem: "img/card3.jpg",
        estrelas: 5,
        categoria: "Montanha",

        descricao:
        "Um destino cercado por paisagens deslumbrantes, montanhas nevadas, lagos cristalinos e vilarejos encantadores."
    },

    {
        id: 4,
        nome: "Maldivas",
        pais: "Maldivas",
        regiao: "Ásia",
        preco: 9990,
        imagem: "img/card4.jpg",
        estrelas: 5,
        categoria: "Praia",

        descricao:
        "Um verdadeiro paraíso tropical com praias de areia branca, águas azul-turquesa e resorts exclusivos sobre o oceano."
    },

    {
        id: 5,
        nome: "Cancún",
        pais: "México",
        regiao: "América",
        preco: 4890,
        imagem: "img/card5.jpg",
        estrelas: 5,
        categoria: "Praia",

        descricao:
        "Conhecido pelas praias de águas transparentes, resorts luxuosos, vida noturna animada e rica cultura mexicana."
    },

    {
        id: 6,
        nome: "Tóquio",
        pais: "Japão",
        regiao: "Ásia",
        preco: 8900,
        imagem: "img/card6.jpg",
        estrelas: 5,
        categoria: "Cidade",

        descricao:
        "Uma metrópole fascinante que combina tecnologia avançada, tradições milenares, gastronomia única e uma cultura vibrante."
    },

    {
        id: 7,
        nome: "Dubai",
        pais: "Emirados Árabes Unidos",
        regiao: "Oriente Médio",
        preco: 9800,
        imagem: "img/card7.jpg",
        estrelas: 5,
        categoria: "Cidade",

        descricao:
        "Um destino luxuoso com arranha-céus impressionantes, experiências exclusivas, praias incríveis e muita inovação."
    },

    {
        id: 8,
        nome: "Santorini",
        pais: "Grécia",
        regiao: "Europa",
        preco: 8200,
        imagem: "img/card8.jpg",
        estrelas: 5,
        categoria: "Praia",

        descricao:
        "Uma ilha encantadora conhecida pelas casas brancas, vistas incríveis do mar Egeu, pôr do sol inesquecível e clima romântico."
    },

];



const cardsContainer = document.querySelector(".cards-destinos");
const searchInput = document.querySelector("#searchDestino");
const filtroPais = document.querySelector("#filtroPais");
const filtroPreco = document.querySelector("#filtroPreco");

// ELEMENTOS DO MODAL
const modal = document.querySelector(".modal-overlay");
const modalImagem = document.querySelector(".modal-imagem");
const modalTitulo = document.querySelector(".modal-titulo");
const modalPais = document.querySelector(".modal-pais");
const modalEstrelas = document.querySelector(".modal-estrelas");
const modalDescricao = document.querySelector(".modal-descricao");
const modalPreco = document.querySelector(".modal-preco");
const fecharModal = document.querySelector(".fechar-modal");


let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];




let destinosAtual = destinos;


function carregarPaises(){

    filtroPais.innerHTML = `
        <option value="">
            🌎 Todos os países
        </option>
    `;


    const paises = destinos.map(destino => destino.pais);


    const paisesUnicos = [...new Set(paises)];


    paisesUnicos.sort();


    paisesUnicos.forEach(pais=>{

        const option = document.createElement("option");

        option.value = pais;

        option.textContent = pais;

        filtroPais.appendChild(option);

    });

}


function aplicarFiltros(){

    const texto = searchInput.value.toLowerCase();
    const paisSelecionado = filtroPais.value;
    const precoSelecionado = filtroPreco.value;
    const resultado = destinos.filter(destino=>{

        const correspondePesquisa =

            destino.nome.toLowerCase().includes(texto) ||

            destino.pais.toLowerCase().includes(texto) ||

            destino.regiao.toLowerCase().includes(texto) ||

            destino.categoria.toLowerCase().includes(texto);

        const correspondePais =

            paisSelecionado === "" ||

            destino.pais === paisSelecionado;

        let correspondePreco = true;

        if(precoSelecionado === "3000"){

            correspondePreco = destino.preco <= 3000;

        }

        else if(precoSelecionado === "6000"){

            correspondePreco = destino.preco <= 6000;

        }

        else if(precoSelecionado === "10000"){

            correspondePreco = destino.preco > 6000;

        }

        return correspondePesquisa && correspondePais && correspondePreco;

    });

    carregarDestinos(resultado);

}


function carregarDestinos(listaDestinos){

    destinosAtual = listaDestinos;

    let html = "";

    listaDestinos.forEach(destino=>{

        const estaFavoritado = favoritos.includes(destino.id);

        html += `

        <div class="card-destino">

            <div class="card-image">

                <img src="${destino.imagem}" alt="${destino.nome}">

                <button 
                class="favorite-btn ${estaFavoritado ? "favoritado" : ""}"
                data-id="${destino.id}">

                    <i class="${estaFavoritado ? "fa-solid" : "fa-regular"} fa-heart"></i>

                </button>

            </div>

            <div class="card-info">
                <div class="card-stars">
                    ⭐⭐⭐⭐⭐
                </div>
                <h3>${destino.nome}</h3>
                <span class="card-country">

                    <i class="fa-solid fa-location-dot"></i>

                    ${destino.pais}

                </span>

                <div class="card-price">

                    <small>A partir de</small>

                    <strong>
                        R$ ${destino.preco}
                    </strong>

                </div>

                <button class="details-btn" data-id="${destino.id}">

                    Ver detalhes

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        </div>

        `;


    });

    cardsContainer.innerHTML = html;

    adicionarEventosFavoritos();
    adicionarEventosDetalhes();
}

function adicionarEventosFavoritos(){

    const botoes = document.querySelectorAll(".favorite-btn");

    botoes.forEach(botao=>{

        botao.addEventListener("click",()=>{

            const id = Number(botao.dataset.id);

            if(favoritos.includes(id)){

                favoritos = favoritos.filter(item=> item !== id);

            }else{

                favoritos.push(id);

            }

            localStorage.setItem(

                "favoritos",

                JSON.stringify(favoritos)

            );

            carregarDestinos(destinosAtual);

        });


    });


}

function abrirModal(id){
    const destino = destinos.find(item => item.id === id);

    modalImagem.src = destino.imagem;

    modalImagem.alt = destino.nome;

    modalTitulo.textContent = destino.nome;

    modalPais.innerHTML = `
        <i class="fa-solid fa-location-dot"></i>
        ${destino.pais}
    `;

    modalEstrelas.textContent = "⭐".repeat(destino.estrelas);

    modalDescricao.textContent =
    `Conheça ${destino.nome}, um destino incrível localizado em ${destino.pais}. 
    Viva experiências inesquecíveis e aproveite cada momento da viagem.`;

    modalPreco.textContent =
    `A partir de R$ ${destino.preco}`;

    modal.classList.add("active");
}

function adicionarEventosDetalhes(){

    const botoesDetalhes =
    document.querySelectorAll(".details-btn");

    botoesDetalhes.forEach(botao=>{

        botao.addEventListener("click",()=>{

            const id =
            Number(botao.dataset.id);

            abrirModal(id);
        });
    });
}



carregarPaises();

carregarDestinos(destinos);

searchInput.addEventListener(
    "input",
    aplicarFiltros
);

filtroPais.addEventListener(
    "change",
    aplicarFiltros
);

filtroPreco.addEventListener(
    "change",
    aplicarFiltros
);



fecharModal.addEventListener("click",()=>{

    modal.classList.remove("active");

});

modal.addEventListener("click",(e)=>{

    if(e.target === modal){

        modal.classList.remove("active");
    }
});
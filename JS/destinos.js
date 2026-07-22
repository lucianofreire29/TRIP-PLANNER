const destinos = [

    {
        id:1,
        nome:"Fernando de Noronha",
        pais:"Brasil",
        regiao:"Nordeste",
        preco:2990,
        imagem:"img/card1.jpg",
        estrelas:5,
        categoria:"Praia"
    },

    {
        id:2,
        nome:"Paris",
        pais:"França",
        regiao:"Europa",
        preco:5490,
        imagem:"img/card2.jpg",
        estrelas:5,
        categoria:"Cidade"
    },

    {
        id:3,
        nome:"Suíça",
        pais:"Suíça",
        regiao:"Europa",
        preco:7990,
        imagem:"img/card3.jpg",
        estrelas:5,
        categoria:"Montanha"
    },

    {
        id:4,
        nome:"Maldivas",
        pais:"Maldivas",
        regiao:"Ásia",
        preco:9990,
        imagem:"img/card4.jpg",
        estrelas:5,
        categoria:"Praia"
    },

    {
        id:5,
        nome:"Cancún",
        pais:"México",
        regiao:"América",
        preco:4890,
        imagem:"img/card5.jpg",
        estrelas:5,
        categoria:"Praia"
    },

    {
        id:6,
        nome:"Tóquio",
        pais:"Japão",
        regiao:"Ásia",
        preco:8900,
        imagem:"img/card6.jpg",
        estrelas:5,
        categoria:"Cidade"
    },

    {
    id:7,
    nome:"Dubai",
    pais:"Emirados Árabes Unidos",
    regiao:"Oriente Médio",
    preco:9800,
    imagem:"img/card7.jpg",
    estrelas:5,
    categoria:"Cidade"
    },

    {
        id:8,
        nome:"Santorini",
        pais:"Grécia",
        regiao:"Europa",
        preco:8200,
        imagem:"img/card8.jpg",
        estrelas:5,
        categoria:"Praia"
    }
];

const cardsContainer = document.querySelector(".cards-destinos");


function carregarDestinos() {

    let html = "";
    destinos.forEach((destino) => {
        html += `
        <div class="card-destino">
            <div class="card-image">
                <img src="${destino.imagem}" alt="${destino.nome}">
                <button class="favorite-btn">
                    <i class="fa-regular fa-heart"></i>
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
                    <strong>R$ ${destino.preco}</strong>
                </div>

                <button class="details-btn">
                    Ver detalhes
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
        `;
    });

    cardsContainer.innerHTML = html;
}

carregarDestinos();
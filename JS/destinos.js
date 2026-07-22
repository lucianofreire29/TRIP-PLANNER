import destinos from "./dados.js";



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

                <a href="destino.html?id=${destino.id}" class="details-btn">

                    Ver detalhes

                    <i class="fa-solid fa-arrow-right"></i>

                </a>
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
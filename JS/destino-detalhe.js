import destinos from "./dados.js";


const parametros = new URLSearchParams(window.location.search);

const idDestino = Number(parametros.get("id"));

const imagemPrincipal =
document.querySelector(".imagem-principal");

const miniaturas =
document.querySelector(".galeria-miniaturas");

const destino = destinos.find(
    destino => destino.id === idDestino
);
if(destino){
    document.querySelector(".destino-imagem").src =
    destino.imagem;
    document.querySelector(".destino-imagem").alt =
    destino.nome;
    document.querySelector(".destino-titulo").textContent =
    destino.nome;
    document.querySelector(".destino-pais").innerHTML =
    `
    <i class="fa-solid fa-location-dot"></i>
    ${destino.pais}
    `;
    document.querySelector(".destino-estrelas").textContent =
    "⭐".repeat(destino.estrelas);

    document.querySelector(".destino-descricao").textContent =
    destino.descricao;

    document.querySelector(".destino-preco").textContent =
    destino.preco.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });

    document.querySelector(".info-pais").textContent =
    destino.pais;

    document.querySelector(".info-avaliacao").textContent =
    `${destino.estrelas} estrelas`;

    document.querySelector(".info-categoria").textContent =
    destino.categoria;

    imagemPrincipal.src = destino.imagem;
let imagensHTML = "";
destino.galeria.forEach((imagem)=>{
    imagensHTML += `
        <img 
        src="${imagem}"
        class="miniatura"
        >
    `;
});

miniaturas.innerHTML = imagensHTML;

const imagens =
document.querySelectorAll(".miniatura");

imagens.forEach((imagem)=>{

    imagem.addEventListener("click",()=>{

        imagemPrincipal.src =
        imagem.src;

    });

});

}
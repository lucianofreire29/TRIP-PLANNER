

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
    const imagemHero = document.querySelector(".destino-imagem");

    if(imagemHero){
        imagemHero.src = destino.imagem;
        imagemHero.alt = destino.nome;
    }
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

    const precoDestino = document.querySelector(".destino-preco");

    if(precoDestino){

    precoDestino.textContent =
    destino.preco.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });

}

    document.querySelector(".info-pais").textContent =
    destino.pais;

    document.querySelector(".info-avaliacao").textContent =
    `${destino.estrelas} estrelas`;

    document.querySelector(".info-categoria").textContent =
    destino.categoria;

    imagemPrincipal.src = destino.galeria[0];
    
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




// SIMULADOR DE ORÇAMENTO

const pessoasInput =
document.querySelector("#qtdPessoas");

const diasInput =
document.querySelector("#qtdDias");

const hospedagemInput =
document.querySelector("#tipoHospedagem");

const passagemInput =
document.querySelector("#passagem");

const seguroInput =
document.querySelector("#seguro");

const valorFinal =
document.querySelector("#valorFinal");

function calcularOrcamento(){
    if(!destino) return;

    const pessoas =
    Number(pessoasInput.value);

    const dias =
    Number(diasInput.value);

    const hospedagem =
    Number(hospedagemInput.value);

    let valor = 
    destino.preco *
    pessoas *
    hospedagem;

    valor =
    valor * (dias / 7);

    if(passagemInput.checked){
        valor += 800 * pessoas;
    }


    if(seguroInput.checked){
        valor += 150 * pessoas;
    }

    valorFinal.textContent =
    valor.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });
}

pessoasInput.addEventListener(
"input",
calcularOrcamento
);

diasInput.addEventListener(
"input",
calcularOrcamento
);

hospedagemInput.addEventListener(
"change",
calcularOrcamento
);

passagemInput.addEventListener(
"change",
calcularOrcamento
);

seguroInput.addEventListener(
"change",
calcularOrcamento
);

calcularOrcamento();
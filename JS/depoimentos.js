import {
    buscarDepoimentos,
    adicionarCurtida,
    removerCurtida
} from "./services/comentarios.js";

const slider = document.querySelector(".comentarios-slider");
const btnPrev = document.querySelector(".comentario-prev");
const btnNext = document.querySelector(".comentario-next");

let comentarios = [];
let inicio = 0;

async function carregarComentarios(){
    comentarios = await buscarDepoimentos();

    renderizarComentarios();

}



function renderizarComentarios(){

    slider.innerHTML = "";



    for(let i = inicio; i < inicio + 3; i++){


        const comentario = comentarios[i];


        if(!comentario) break;



        let estrelas = "";


        for(let j = 0; j < comentario.estrelas; j++){

            estrelas += `
                <i class="fa-solid fa-star"></i>
            `;

        }



        slider.innerHTML += `

        <div class="comentario-card">


            <img src="${comentario.foto}" alt="">


            <h3>${comentario.nome}</h3>


            <span>${comentario.destino}</span>


            <div class="cliente-verificado">

                <i class="fa-solid fa-circle-check"></i>

                Cliente Verificado

            </div>


            <div class="stars">

                ${estrelas}

            </div>


            <p>

                ${comentario.texto}

            </p>



            <div class="likes">


                <button 
                    class="like"
                    data-id="${comentario.id}"
                >

                    <i class="fa-regular fa-heart"></i>


                    <span>

                        ${comentario.curtidas}

                    </span>


                </button>


            </div>


        </div>

        `;


    }



    adicionarEventos();

}




function adicionarEventos(){


    const curtidos = JSON.parse(
        localStorage.getItem("curtidos")
    ) || {};



    document.querySelectorAll(".like")
    .forEach((botao)=>{


        const id = botao.dataset.id;


        const comentario = comentarios.find(
            item => item.id === id
        );



        const icone = botao.querySelector("i");

        const numero = botao.querySelector("span");



        if(curtidos[id]){


            icone.classList.remove(
                "fa-regular"
            );


            icone.classList.add(
                "fa-solid"
            );


            botao.classList.add(
                "active"
            );


        }



        botao.onclick = async ()=>{


            if(curtidos[id]){


                await removerCurtida(id);


                comentario.curtidas--;


                delete curtidos[id];



                icone.classList.remove(
                    "fa-solid"
                );


                icone.classList.add(
                    "fa-regular"
                );


                botao.classList.remove(
                    "active"
                );



            }else{


                await adicionarCurtida(id);


                comentario.curtidas++;


                curtidos[id] = true;



                icone.classList.remove(
                    "fa-regular"
                );


                icone.classList.add(
                    "fa-solid"
                );


                botao.classList.add(
                    "active"
                );


            }



            numero.textContent =
                comentario.curtidas;



            localStorage.setItem(
                "curtidos",
                JSON.stringify(curtidos)
            );


        };


    });


}




btnNext.addEventListener("click",()=>{


    inicio++;


    if(inicio > comentarios.length - 3){

        inicio = 0;

    }


    renderizarComentarios();


});




btnPrev.addEventListener("click",()=>{


    inicio--;


    if(inicio < 0){

        inicio = comentarios.length - 3;

    }
    renderizarComentarios();
});
carregarComentarios();
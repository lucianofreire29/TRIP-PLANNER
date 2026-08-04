import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


const depoimentos = [
{
    foto:"img/user-1.jpg",
    nome:"Ana Oliveira",
    destino:"Paris",
    estrelas:5,
    curtidas:348,
    texto:"Foi a melhor viagem da minha vida. Atendimento impecável e organização perfeita."
},

{
    foto:"img/user-5.jpg",
    nome:"Carlos Mendes",
    destino:"Suíça",
    estrelas:5,
    curtidas:271,
    texto:"Tudo ocorreu exatamente como planejado. Recomendo muito a Trip Planner."
},

{
    foto:"img/user-3.jpg",
    nome:"Fernanda Lima",
    destino:"Fernando de Noronha",
    estrelas:5,
    curtidas:415,
    texto:"Hotel maravilhoso, praias incríveis e suporte durante toda a viagem."
}

];

async function cadastrar(){
    const colecao = collection(db,"depoimentos");
    for(let depoimento of depoimentos){
        await addDoc(colecao,depoimento);

    }
    console.log("Depoimentos cadastrados!");
}
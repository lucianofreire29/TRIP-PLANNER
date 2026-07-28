import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// coleção depoimentos

const depoimentosRef = collection(db, "depoimentos");



// Buscar depoimentos

export async function buscarDepoimentos(){

    const dados = await getDocs(depoimentosRef);


    return dados.docs.map((item)=>({

        id: item.id,

        ...item.data()

    }));

}



// Curtir depoimento

export async function adicionarCurtida(id){

    const referencia = doc(
        db,
        "depoimentos",
        id
    );


    await updateDoc(referencia, {

        curtidas: increment(1)

    });

}



// Remover curtida

export async function removerCurtida(id){

    const referencia = doc(
        db,
        "depoimentos",
        id
    );


    await updateDoc(referencia, {

        curtidas: increment(-1)

    });

}
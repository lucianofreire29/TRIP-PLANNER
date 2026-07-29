import { db } from "../firebase.js";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const depoimentosRef = collection(db, "depoimentos");

export async function buscarDepoimentos(){

    const dados = await getDocs(depoimentosRef);
    return dados.docs.map((item)=>({
        id: item.id,
        ...item.data()
    }));
}

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
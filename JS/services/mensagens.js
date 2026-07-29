import { db } from "../firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const mensagens = collection(db, "mensagens");

export async function salvarMensagem(dados) {
    await addDoc(mensagens, {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone || null,
        reserva: dados.reserva || null,
        assunto: dados.assunto || null,
        mensagem: dados.mensagem,
        criadoEm: serverTimestamp()
    });
}
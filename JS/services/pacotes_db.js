import { db } from "../firebase.js";


import {

collection,

addDoc,

getDocs,

doc,

deleteDoc,

updateDoc

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



const pacotesRef = collection(db,"pacotes");



// Buscar pacotes

export async function buscarPacotes(){


const dados = await getDocs(pacotesRef);


return dados.docs.map(item => ({

id:item.id,

...item.data()

}));

}



// Criar pacote

export async function criarPacote(dados){


await addDoc(pacotesRef,{

titulo:dados.titulo,

imagem:dados.imagem,

pais:dados.pais,

descricao:dados.descricao,

preco:dados.preco,

duracao:dados.duracao,

estrelas:dados.estrelas

});


}



// Editar pacote

export async function editarPacote(id,dados){


const referencia = doc(
db,
"pacotes",
id
);


await updateDoc(referencia,dados);


}



// Excluir pacote

export async function excluirPacote(id){


await deleteDoc(
doc(db,"pacotes",id)
);


}
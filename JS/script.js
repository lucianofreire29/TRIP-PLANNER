import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// ===== 2. Configuração do Firebase =====
// ⚠️ SUBSTITUA pelos dados do seu projeto Firebase!
const firebaseConfig = {
  apiKey: "AIzaSyBKMoBZKtW3Mx4whlLTPASg9ql-doKTj0E",
  authDomain: "trip-planner-a1dd7.firebaseapp.com",
  projectId: "trip-planner-a1dd7",
  storageBucket: "trip-planner-a1dd7.firebasestorage.app",
  messagingSenderId: "193019127185",
  appId: "1:193019127185:web:d6cfce57e0e9387d56e630",
  measurementId: "G-VM8Q8K12VK"
};

// ===== 3. Inicialização =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Instância do Firestore

// === Salvamento de dados no banco ===//

const formulario = document.getElementById("formulario");
const btnEnviar = document.getElementById("btnEnviar");
const status = document.getElementById("status");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // Impede o recarregamento da página

    // Pega os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const reserva = document.getElementById("reserva").value.trim();
    const assunto = document.getElementById("assunto").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação simples
    if (!nome || !email || !mensagem) {
        mostrarStatus("Preencha todos os campos obrigatórios!", "erro");
        return;
    }

    if (!regex.test(email)) {
    mostrarStatus("Email Inválido!", "erro");
    return;
    }

    // Desabilita o botão enquanto envia
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";

    try {
        // Salva no Firestore
        await addDoc(colecaoMensagens, {
            nome: nome,
            email: email,
            telefone: telefone || null, // opcional
            reserva: reserva || null, //opicional
            assunto:assunto || null, //opcional
            mensagem: mensagem,
            criadoEm: serverTimestamp() // data/hora do servidor
        });

        formulario.reset(); // Limpa o formulário

    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        mostrarStatus("❌ Erro ao enviar. Verifique a configuração do Firebase.", "erro");
    } finally {
        // Reabilita o botão
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar";
    }
});
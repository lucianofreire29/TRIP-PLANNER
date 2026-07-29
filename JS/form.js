import { salvarMensagem } from "./services/mensagens.js";

const formulario = document.getElementById("formulario");
const status = document.getElementById("status");
const btnEnviar = document.getElementById("btnEnviar");

function mostrarStatus(texto, tipo) {
    status.textContent = texto;
    status.style.color = tipo === "erro"
        ? "red"
        : "green";
}

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = {
        nome: document.getElementById("nome").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        reserva: document.getElementById("reserva").value.trim(),
        assunto: document.getElementById("assunto").value.trim(),
        mensagem: document.getElementById("mensagem").value.trim()
    };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!dados.nome || !dados.email || !dados.mensagem) {
        mostrarStatus(
            "Preencha todos os campos obrigatórios!",
            "erro"
        );
        return;
    }
    if (!regex.test(dados.email)) {
        mostrarStatus(
            "Email Inválido!",
            "erro"
        );
        return;
    }
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";
    try {
        await salvarMensagem(dados);
        mostrarStatus(
            "Mensagem enviada com sucesso!",
            "sucesso"
        );
        formulario.reset();
    } catch (erro) {
        console.error(
            "Erro completo:",
            erro
        );
        mostrarStatus(
            "Erro ao enviar mensagem!",
            "erro"
        );
    } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar";
    }
});
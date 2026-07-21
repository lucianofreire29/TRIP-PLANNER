const formulario = document.getElementById('formulario');
const status = document.getElementById('status');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    status.textContent = 'Formulário enviado com sucesso!';
    status.style.color = 'green';
});

status.addEventListener('submit', function(e) {
    e.preventDefault();
    status.innerHTML = 'Mensagem enviada com sucesso!';
    status.style.color = '#16a34a';
});

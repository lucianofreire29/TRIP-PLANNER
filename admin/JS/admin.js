const linksMenu = document.querySelectorAll(".sidebar a");

const paginaAtual = window.location.pathname.split("/").pop();

linksMenu.forEach(link => {

    const paginaLink = link.getAttribute("href");

    if (paginaLink === paginaAtual) {
        link.classList.add("ativo");
    }

});
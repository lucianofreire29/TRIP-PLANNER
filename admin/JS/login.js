const senha = document.querySelector("#senha");

const icone = document.querySelector("#iconeSenha");

icone.addEventListener("click", () => {
  if (senha.type === "password") {
    senha.type = "text";
    icone.classList.remove("fa-eye");
    icone.classList.add("fa-eye-slash");
  } else {
    senha.type = "password";
    icone.classList.remove("fa-eye-slash");
    icone.classList.add("fa-eye");
  }
});

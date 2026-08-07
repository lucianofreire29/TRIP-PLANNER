const CAMINHO_IMAGENS = "/user/img/";

const IMAGEM_INDISPONIVEL =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420">
      <rect width="640" height="420" fill="#e9eef6"/>
      <path d="M190 300l90-105 62 70 43-48 70 83H190z" fill="#9aa9bf"/>
      <circle cx="406" cy="130" r="34" fill="#9aa9bf"/>
      <text x="320" y="355" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#52627a">
        Imagem indisponível
      </text>
    </svg>
  `);

export function normalizarUrlImagem(valor) {
  let caminho = String(valor || "").trim().replaceAll("\\", "/");

  if (!caminho) return "";

  if (
    caminho.startsWith("data:") ||
    caminho.startsWith("blob:") ||
    /^https?:\/\//i.test(caminho)
  ) {
    return caminho;
  }

  caminho = caminho.replace(/^\.\.\//, "").replace(/^\.\//, "");

  if (caminho.startsWith("/")) return caminho;
  if (caminho.startsWith("user/")) return `/${caminho}`;
  if (caminho.startsWith("img/")) return `/user/${caminho}`;

  return `${CAMINHO_IMAGENS}${caminho}`;
}

function resolverUrlImagem(valor) {
  const caminho = normalizarUrlImagem(valor);

  if (
    !caminho ||
    caminho.startsWith("data:") ||
    caminho.startsWith("blob:") ||
    /^https?:\/\//i.test(caminho)
  ) {
    return caminho;
  }

  const caminhoDoProjeto = caminho.replace(/^\//, "");
  return new URL(`../../${caminhoDoProjeto}`, import.meta.url).href;
}

export function configurarImagem(imagem, valor, textoAlternativo = "") {
  imagem.alt = textoAlternativo;
  imagem.addEventListener(
    "error",
    () => {
      imagem.src = IMAGEM_INDISPONIVEL;
      imagem.classList.add("imagem-indisponivel");
    },
    { once: true },
  );

  imagem.src = resolverUrlImagem(valor) || IMAGEM_INDISPONIVEL;
}

export function ativarPreviewImagem(input) {
  if (!input || input.dataset.previewAtivo) return;

  input.dataset.previewAtivo = "true";

  const ajuda = document.createElement("small");
  ajuda.className = "imagem-ajuda";
  ajuda.textContent =
    "Use o nome do arquivo ou o caminho /user/img/nome-do-arquivo.jpg";

  const preview = document.createElement("img");
  preview.className = "preview-imagem";
  preview.alt = "Pré-visualização da imagem";
  preview.hidden = true;

  input.insertAdjacentElement("afterend", ajuda);
  ajuda.insertAdjacentElement("afterend", preview);

  const atualizarPreview = () => {
    const url = normalizarUrlImagem(input.value);

    if (!url) {
      preview.hidden = true;
      preview.removeAttribute("src");
      return;
    }

    preview.hidden = false;
    configurarImagem(preview, url, "Pré-visualização da imagem");
  };

  input.addEventListener("input", atualizarPreview);
  input.addEventListener("change", atualizarPreview);
  atualizarPreview();
}

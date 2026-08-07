export const API_URL =
  window.TRIP_PLANNER_API_URL || "http://localhost:3000";

const IMAGEM_INDISPONIVEL =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
      <rect width="800" height="520" fill="#e9eef6"/>
      <path d="M220 365l110-130 78 88 55-62 90 104H220z" fill="#9aa9bf"/>
      <circle cx="510" cy="165" r="42" fill="#9aa9bf"/>
      <text x="400" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#52627a">
        Imagem indisponível
      </text>
    </svg>
  `);

export async function buscarJSON(caminho) {
  const resposta = await fetch(`${API_URL}${caminho}`);
  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(dados.erro || "Não foi possível carregar os dados.");
  }

  return dados;
}

export function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function escaparHTML(valor) {
  const elemento = document.createElement("div");
  elemento.textContent = valor ?? "";
  return elemento.innerHTML;
}

export function resolverImagem(valor) {
  let caminho = String(valor || "").trim().replaceAll("\\", "/");

  if (!caminho) return IMAGEM_INDISPONIVEL;

  if (
    caminho.startsWith("data:") ||
    caminho.startsWith("blob:") ||
    /^https?:\/\//i.test(caminho)
  ) {
    return caminho;
  }

  caminho = caminho
    .replace(/^(\.\.\/)+/, "")
    .replace(/^\.\//, "")
    .replace(/^\/+/, "")
    .replace(/^user\//, "");

  if (!caminho.startsWith("img/")) {
    caminho = `img/${caminho}`;
  }

  return new URL(`../${caminho}`, import.meta.url).href;
}

export function configurarImagem(imagem, valor, alt = "") {
  imagem.alt = alt;
  imagem.addEventListener(
    "error",
    () => {
      imagem.src = IMAGEM_INDISPONIVEL;
    },
    { once: true },
  );
  imagem.src = resolverImagem(valor);
}

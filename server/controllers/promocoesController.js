import { pool } from "../config/db.js";

function obterDadosPromocao(body) {
  const preco = Number(body.preco);
  const desconto = Number(body.desconto ?? 0);
  const precoPromocional =
    body.precoPromocional === undefined || body.precoPromocional === ""
      ? preco * (1 - desconto / 100)
      : Number(body.precoPromocional);

  return {
    nome: body.nome?.trim(),
    pais: body.pais?.trim(),
    regiao: body.regiao?.trim() || null,
    categoria: body.categoria?.trim() || null,
    preco,
    desconto,
    precoPromocional,
    inicio: body.inicio || null,
    fim: body.fim || null,
    destaque: body.destaque === true || body.destaque === "true",
    status: body.status || "ativa",
    descricao: body.descricao?.trim() || null,
    imagem: body.imagem?.trim() || null,
  };
}

function validarPromocao(promocao) {
  if (!promocao.nome || !promocao.pais) {
    return "Nome e país são obrigatórios.";
  }

  if (!Number.isFinite(promocao.preco) || promocao.preco < 0) {
    return "O preço original deve ser um número maior ou igual a zero.";
  }

  if (
    !Number.isFinite(promocao.desconto) ||
    promocao.desconto < 0 ||
    promocao.desconto > 100
  ) {
    return "O desconto deve estar entre 0 e 100.";
  }

  if (
    !Number.isFinite(promocao.precoPromocional) ||
    promocao.precoPromocional < 0 ||
    promocao.precoPromocional > promocao.preco
  ) {
    return "O preço promocional deve ser válido e não pode superar o original.";
  }

  if (promocao.inicio && promocao.fim && promocao.fim < promocao.inicio) {
    return "A data final não pode ser anterior à data inicial.";
  }

  if (!["ativa", "inativa"].includes(promocao.status)) {
    return "Status inválido.";
  }

  return null;
}

const campos = `
  nome, pais, regiao, categoria, preco, desconto,
  preco_promocional, inicio, fim, destaque, status, descricao, imagem
`;

function valores(promocao) {
  return [
    promocao.nome,
    promocao.pais,
    promocao.regiao,
    promocao.categoria,
    promocao.preco,
    promocao.desconto,
    promocao.precoPromocional,
    promocao.inicio,
    promocao.fim,
    promocao.destaque,
    promocao.status,
    promocao.descricao,
    promocao.imagem,
  ];
}

export async function criarPromocao(req, res) {
  try {
    const promocao = obterDadosPromocao(req.body);
    const erroValidacao = validarPromocao(promocao);

    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    const resultado = await pool.query(
      `INSERT INTO promocoes (${campos})
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      valores(promocao),
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro ao cadastrar promoção:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar promoção." });
  }
}

export async function listarPromocoes(req, res) {
  try {
    const resultado = await pool.query(
      "SELECT * FROM promocoes ORDER BY id DESC",
    );

    res.json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao buscar promoções:", erro);
    res.status(500).json({ erro: "Erro ao buscar promoções." });
  }
}

export async function atualizarPromocao(req, res) {
  try {
    const { id } = req.params;
    const promocao = obterDadosPromocao(req.body);
    const erroValidacao = validarPromocao(promocao);

    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    const resultado = await pool.query(
      `UPDATE promocoes
       SET nome = $1,
           pais = $2,
           regiao = $3,
           categoria = $4,
           preco = $5,
           desconto = $6,
           preco_promocional = $7,
           inicio = $8,
           fim = $9,
           destaque = $10,
           status = $11,
           descricao = $12,
           imagem = $13,
           atualizado_em = NOW()
       WHERE id = $14
       RETURNING *`,
      [...valores(promocao), id],
    );

    if (!resultado.rows[0]) {
      return res.status(404).json({ erro: "Promoção não encontrada." });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro ao atualizar promoção:", erro);
    res.status(500).json({ erro: "Erro ao atualizar promoção." });
  }
}

export async function excluirPromocao(req, res) {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      "DELETE FROM promocoes WHERE id = $1 RETURNING id",
      [id],
    );

    if (!resultado.rows[0]) {
      return res.status(404).json({ erro: "Promoção não encontrada." });
    }

    res.json({ mensagem: "Promoção excluída com sucesso." });
  } catch (erro) {
    console.error("Erro ao excluir promoção:", erro);
    res.status(500).json({ erro: "Erro ao excluir promoção." });
  }
}

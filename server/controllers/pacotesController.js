import { pool } from "../config/db.js";

function obterDadosPacote(body) {
  return {
    nome: body.nome?.trim(),
    pais: body.pais?.trim(),
    regiao: body.regiao?.trim() || null,
    categoria: body.categoria?.trim() || null,
    duracao: body.duracao?.trim() || null,
    preco: Number(body.preco),
    parcelamento: body.parcelamento?.trim() || null,
    hotel: body.hotel?.trim() || null,
    passagem: body.passagem === true || body.passagem === "true",
    seguro: body.seguro === true || body.seguro === "true",
    cafe: body.cafe === true || body.cafe === "true",
    status: body.status || "ativo",
    descricao: body.descricao?.trim() || null,
    imagem: body.imagem?.trim() || null,
  };
}

function validarPacote(pacote) {
  if (!pacote.nome || !pacote.pais) {
    return "Nome do destino e país são obrigatórios.";
  }

  if (!Number.isFinite(pacote.preco) || pacote.preco < 0) {
    return "O preço deve ser um número maior ou igual a zero.";
  }

  if (!["ativo", "inativo"].includes(pacote.status)) {
    return "Status inválido.";
  }

  return null;
}

function valores(pacote) {
  return [
    pacote.nome,
    pacote.pais,
    pacote.regiao,
    pacote.categoria,
    pacote.duracao,
    pacote.preco,
    pacote.parcelamento,
    pacote.hotel,
    pacote.passagem,
    pacote.seguro,
    pacote.cafe,
    pacote.status,
    pacote.descricao,
    pacote.imagem,
  ];
}

export async function criarPacote(req, res) {
  try {
    const pacote = obterDadosPacote(req.body);
    const erroValidacao = validarPacote(pacote);

    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    const resultado = await pool.query(
      `INSERT INTO pacotes (
        nome, pais, regiao, categoria, duracao, preco, parcelamento,
        hotel, passagem, seguro, cafe, status, descricao, imagem
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      valores(pacote),
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro ao cadastrar pacote:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar pacote." });
  }
}

export async function listarPacotes(req, res) {
  try {
    const resultado = await pool.query(
      "SELECT * FROM pacotes ORDER BY id DESC",
    );

    res.json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao buscar pacotes:", erro);
    res.status(500).json({ erro: "Erro ao buscar pacotes." });
  }
}

export async function atualizarPacote(req, res) {
  try {
    const { id } = req.params;
    const pacote = obterDadosPacote(req.body);
    const erroValidacao = validarPacote(pacote);

    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    const resultado = await pool.query(
      `UPDATE pacotes
       SET nome = $1,
           pais = $2,
           regiao = $3,
           categoria = $4,
           duracao = $5,
           preco = $6,
           parcelamento = $7,
           hotel = $8,
           passagem = $9,
           seguro = $10,
           cafe = $11,
           status = $12,
           descricao = $13,
           imagem = $14
       WHERE id = $15
       RETURNING *`,
      [...valores(pacote), id],
    );

    if (!resultado.rows[0]) {
      return res.status(404).json({ erro: "Pacote não encontrado." });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro ao atualizar pacote:", erro);
    res.status(500).json({ erro: "Erro ao atualizar pacote." });
  }
}

export async function excluirPacote(req, res) {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      "DELETE FROM pacotes WHERE id = $1 RETURNING id",
      [id],
    );

    if (!resultado.rows[0]) {
      return res.status(404).json({ erro: "Pacote não encontrado." });
    }

    res.json({ mensagem: "Pacote excluído com sucesso." });
  } catch (erro) {
    console.error("Erro ao excluir pacote:", erro);
    res.status(500).json({ erro: "Erro ao excluir pacote." });
  }
}

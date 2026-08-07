import { pool } from "../config/db.js";

function obterDadosPacote(body) {
  return {
    titulo: body.titulo?.trim(),
    descricao: body.descricao?.trim() || null,
    preco: Number(body.preco),
    dias: Number(body.dias),
    imagem: body.imagem?.trim() || null,
  };
}

function validarPacote(pacote) {
  if (!pacote.titulo) {
    return "O título é obrigatório.";
  }

  if (!Number.isFinite(pacote.preco) || pacote.preco < 0) {
    return "O preço deve ser um número maior ou igual a zero.";
  }

  if (!Number.isInteger(pacote.dias) || pacote.dias < 1) {
    return "A quantidade de dias deve ser um número inteiro maior que zero.";
  }

  return null;
}

function valores(pacote) {
  return [
    pacote.titulo,
    pacote.descricao,
    pacote.preco,
    pacote.dias,
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
      `INSERT INTO pacotes (titulo, descricao, preco, dias, imagem)
       VALUES ($1, $2, $3, $4, $5)
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
       SET titulo = $1,
           descricao = $2,
           preco = $3,
           dias = $4,
           imagem = $5
       WHERE id = $6
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

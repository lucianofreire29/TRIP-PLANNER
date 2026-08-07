import { pool } from "../config/db.js";

export async function criarDestino(req, res) {
  try {
    const {
      nome,
      pais,
      regiao,
      categoria,
      preco,
      estrelas,
      descricao,
      imagem,
    } = req.body;

    const resultado = await pool.query(
      `INSERT INTO destinos
            (nome,pais,regiao,categoria,preco,estrelas,descricao,imagem)

            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)

            RETURNING *`,

      [nome, pais, regiao, categoria, preco, estrelas, descricao, imagem],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao cadastrar destino.",
    });
  }
}

export async function listarDestinos(req, res) {
  try {
    const resultado = await pool.query(
      "SELECT * FROM destinos ORDER BY id DESC",
    );

    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao buscar destinos",
    });
  }
}

export async function excluirDestino(req, res) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM destinos WHERE id = $1", [id]);

    res.json({
      mensagem: "Destino excluído com sucesso.",
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao excluir destino.",
    });
  }
}

export async function atualizarDestino(req, res) {
  try {
    const { id } = req.params;

    const {
      nome,
      pais,
      regiao,
      categoria,
      preco,
      estrelas,
      descricao,
      imagem,
    } = req.body;

    const resultado = await pool.query(
      `UPDATE destinos
             SET
                nome=$1,
                pais=$2,
                regiao=$3,
                categoria=$4,
                preco=$5,
                estrelas=$6,
                descricao=$7,
                imagem=$8
             WHERE id=$9
             RETURNING *`,
      [nome, pais, regiao, categoria, preco, estrelas, descricao, imagem, id],
    );
    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao atualizar destino.",
    });
  }
}


export async function buscarDestinoPorId(req, res) {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      "SELECT * FROM destinos WHERE id = $1",
      [id],
    );

    if (!resultado.rows.length) {
      return res.status(404).json({
        erro: "Destino não encontrado.",
      });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao buscar destino.",
    });
  }
}

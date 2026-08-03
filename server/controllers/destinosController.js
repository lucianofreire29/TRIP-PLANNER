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

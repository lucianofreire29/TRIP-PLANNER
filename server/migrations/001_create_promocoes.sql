CREATE TABLE IF NOT EXISTS promocoes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  pais VARCHAR(100),
  regiao VARCHAR(100),
  categoria VARCHAR(80),
  preco NUMERIC(10, 2),
  desconto INTEGER,
  preco_promocional NUMERIC(10, 2),
  inicio DATE,
  fim DATE,
  destaque BOOLEAN DEFAULT FALSE,
  status VARCHAR(20),
  descricao TEXT,
  imagem TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

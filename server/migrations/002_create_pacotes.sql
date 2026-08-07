CREATE TABLE IF NOT EXISTS pacotes (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(150),
  descricao TEXT,
  preco NUMERIC,
  dias INT,
  imagem TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

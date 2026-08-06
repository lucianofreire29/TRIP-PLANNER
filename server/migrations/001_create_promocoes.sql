CREATE TABLE IF NOT EXISTS promocoes (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  pais VARCHAR(100) NOT NULL,
  regiao VARCHAR(100),
  categoria VARCHAR(80),
  preco NUMERIC(12, 2) NOT NULL CHECK (preco >= 0),
  desconto NUMERIC(5, 2) NOT NULL DEFAULT 0 CHECK (desconto BETWEEN 0 AND 100),
  preco_promocional NUMERIC(12, 2) NOT NULL CHECK (
    preco_promocional >= 0 AND preco_promocional <= preco
  ),
  inicio DATE,
  fim DATE,
  destaque BOOLEAN NOT NULL DEFAULT FALSE,
  status VARCHAR(10) NOT NULL DEFAULT 'ativa' CHECK (status IN ('ativa', 'inativa')),
  descricao TEXT,
  imagem TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (fim IS NULL OR inicio IS NULL OR fim >= inicio)
);

CREATE INDEX IF NOT EXISTS idx_promocoes_status ON promocoes (status);
CREATE INDEX IF NOT EXISTS idx_promocoes_periodo ON promocoes (inicio, fim);

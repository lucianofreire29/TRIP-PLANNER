ALTER TABLE destinos
ADD COLUMN IF NOT EXISTS descricao_banner VARCHAR(180);

COMMENT ON COLUMN destinos.descricao_banner IS
  'Texto curto exibido no banner da página inicial.';

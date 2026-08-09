# Trip Planner

Aplicação web para consulta e gerenciamento de destinos, pacotes e promoções de viagem.

O projeto possui uma área voltada aos usuários, uma área administrativa e uma API integrada a um banco de dados PostgreSQL.

## Funcionalidades

### Área do usuário

- Consulta de destinos, pacotes e promoções.
- Autenticação de usuários com Firebase.
- Envio de mensagens, comentários e depoimentos.
- Interface responsiva desenvolvida com HTML, CSS e JavaScript.

### Área administrativa

- Autenticação de administradores.
- Dashboard administrativo.
- Gerenciamento dos conteúdos apresentados no site.
- Integração com a API e o Firebase.

### Backend

- API REST desenvolvida com Node.js e Express.
- Conexão com banco de dados PostgreSQL.
- Rotas separadas para destinos, pacotes e promoções.
- Configuração por variáveis de ambiente.

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js
- Express
- PostgreSQL
- Firebase
- Git e GitHub

## Estrutura atual do projeto

```text
TRIP-PLANNER/
├── admin/             # Área administrativa
├── server/            # API e conexão com o banco de dados
│   ├── config/        # Configuração do PostgreSQL
│   ├── routes/        # Rotas da API
│   ├── package.json
│   └── server.js
└── user/              # Área destinada aos usuários
```

## Como executar o projeto

### Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/)
- Um banco de dados PostgreSQL
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/lucianofreire29/TRIP-PLANNER.git
cd TRIP-PLANNER
```

### 2. Instale as dependências do backend

```bash
cd server
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `server`:

```env
PORT=3000
DATABASE_URL=sua_url_de_conexao_com_o_postgresql
```

Não publique o arquivo `.env` ou credenciais reais no GitHub.

### 4. Inicie a API

Para executar normalmente:

```bash
npm start
```

Para executar em modo de desenvolvimento:

```bash
npm run dev
```

Por padrão, a API estará disponível em `http://localhost:3000`.

### 5. Abra o frontend

Abra a página inicial da pasta `user` utilizando o navegador ou uma extensão de servidor local, como o Live Server do VS Code.

## Endpoints principais

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/` | Verifica se a API está funcionando |
| Diversos | `/destinos` | Operações relacionadas aos destinos |
| Diversos | `/pacotes` | Operações relacionadas aos pacotes |
| Diversos | `/promocoes` | Operações relacionadas às promoções |

## Próximas melhorias

- Padronizar os nomes de arquivos e pastas.
- Separar controllers, services e routes no backend.
- Acrescentar validação dos dados recebidos pela API.
- Adicionar testes automatizados.
- Documentar todos os endpoints.
- Adicionar capturas de tela do sistema.
- Configurar uma rotina de integração contínua.

## Autor

Desenvolvido por **Luciano Freire e Karla Bianca**.

- [GitHub](https://github.com/lucianofreire29)
- [LinkedIn](https://www.linkedin.com/in/luciano-alves-391701233/)
- [E-mail](mailto:lucianofreiredigital29@gmail.com)


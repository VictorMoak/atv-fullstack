# Atividade Fullstack — CRUD de Produtos

Projeto didático de CRUD de produtos desenvolvido em sala de aula. O repositório é um **monorepo** com front-end em JavaScript vanilla e back-end em NestJS, persistindo dados no MongoDB.

## Stack


| Camada         | Tecnologia                         |
| -------------- | ---------------------------------- |
| Front-end      | HTML, CSS, JavaScript (ES Modules) |
| Back-end       | NestJS, TypeScript                 |
| Banco de dados | MongoDB (Mongoose)                 |


## Estrutura do projeto

```
atv-fullstack/
├── api/          # API REST (NestJS)
├── front/        # Interface web (HTML/CSS/JS)
└── docs/         # Documentação complementar
```

## Funcionalidades

- Listar produtos
- Criar produto
- Editar produto
- Excluir produto

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cluster gratuito M0)

## Desenvolvimento local

### 1. API

```bash
cd api
cp .env.example .env
```

Edite o `.env` com sua connection string do MongoDB:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco
FRONTEND_URL=http://localhost:5500
PORT=3000
```

Instale as dependências e inicie a API:

```bash
npm install
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

### 2. Front-end

Em outro terminal:

```bash
cd front
npm run dev
```

Acesse `http://localhost:5500`. O front chama a API em `http://localhost:3000` (configurado em `front/config.js`).

## Endpoints da API


| Método   | Rota            | Descrição               |
| -------- | --------------- | ----------------------- |
| `GET`    | `/health`       | Health check            |
| `GET`    | `/produtos`     | Lista todos os produtos |
| `GET`    | `/produtos/:id` | Busca um produto        |
| `POST`   | `/produtos`     | Cria um produto         |
| `PUT`    | `/produtos/:id` | Atualiza um produto     |
| `DELETE` | `/produtos/:id` | Remove um produto       |


Exemplo de criação:

```bash
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Coxinha","preco":12.5}'
```

## Variáveis de ambiente

### API (`api/.env`)


| Variável       | Descrição                          |
| -------------- | ---------------------------------- |
| `MONGODB_URI`  | Connection string do MongoDB Atlas |
| `FRONTEND_URL` | URL do front (usada no CORS)       |
| `PORT`         | Porta da API (padrão: `3000`)      |


### Front (`front/.env` — usado no deploy)


| Variável  | Descrição                                   |
| --------- | ------------------------------------------- |
| `API_URL` | URL base da API publicada (sem `/produtos`) |


## Publicação na nuvem

O deploy usa plataformas gratuitas:

- **API** → [Render](https://render.com) (Root Directory: `api`)
- **Front** → [Netlify](https://www.netlify.com) (Base directory: `front`)
- **Banco** → [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Guia completo passo a passo: [docs/publicacao-na-nuvem.md](docs/publicacao-na-nuvem.md)

## Scripts úteis

### API


| Comando              | Descrição                              |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Inicia em modo desenvolvimento (watch) |
| `npm run build`      | Compila para produção                  |
| `npm run start:prod` | Executa a versão compilada             |


### Front


| Comando         | Descrição                                  |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Serve os arquivos estáticos na porta 5500  |
| `npm run build` | Gera `config.js` com a URL da API (deploy) |


## Autor

Vitor Moak
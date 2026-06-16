# Publicação na nuvem — passo a passo prático

Guia para a aula prática de deploy do **front** (HTML/JS estático) e do **back** (NestJS + MongoDB).

O projeto é um **monorepo** com as pastas `api/` e `front/` no mesmo repositório Git. No deploy, o Render usa `api/` como Root Directory e o Netlify usa `front/` como Base directory.

## Arquitetura da solução

| Camada | Tecnologia | Plataforma gratuita |
|--------|------------|---------------------|
| Front-end | HTML, CSS, JS (módulos ES) | [Netlify](https://www.netlify.com) |
| Back-end | NestJS (Node.js) | [Render](https://render.com) |
| Banco de dados | MongoDB | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| Código-fonte | Git | [GitHub](https://github.com) |

Fluxo final:

```
Usuário → Netlify (front) → Render (API) → MongoDB Atlas
```

---

## Pré-requisitos

- Conta no GitHub
- Conta no MongoDB Atlas (grátis)
- Conta no Render (grátis)
- Conta no Netlify (grátis)
- Node.js 20+ instalado na máquina local

---

## Parte 1 — Banco de dados (MongoDB Atlas)

1. Acesse [MongoDB Atlas](https://cloud.mongodb.com) e crie um cluster **M0 (Free)**.
2. Em **Database Access**, crie um usuário com senha forte.
3. Em **Network Access**, adicione `0.0.0.0/0` (permite acesso de qualquer IP — adequado para aula; em produção real, restrinja).
4. Em **Database** → **Connect** → **Drivers**, copie a connection string:

```
mongodb+srv://usuario:senha@cluster.xxxxx.mongodb.net/nome-do-banco
```

5. Substitua `<password>` pela senha real e defina o nome do banco (ex.: `aula-produtos`).

> **Importante:** nunca commite a URI no código. Use variável de ambiente `MONGODB_URI`.

---

## Parte 2 — API no Render

### 2.1 Testar localmente antes do deploy

```bash
cd api
cp .env.example .env
# Edite .env com sua MONGODB_URI real
npm install
npm run dev
```

Teste no navegador ou no terminal:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/produtos
```

### 2.2 Criar o Web Service no Render

1. Acesse [render.com](https://render.com) → **New** → **Web Service**.
2. Conecte o repositório do monorepo no GitHub.
3. Configure:

| Campo | Valor |
|-------|-------|
| **Name** | `atv-produtos-api` |
| **Region** | Oregon (ou mais próximo) |
| **Branch** | `main` |
| **Root Directory** | `api` |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start:prod` |
| **Instance Type** | Free |

4. Em **Environment Variables**, adicione:

| Variável | Valor |
|----------|-------|
| `MONGODB_URI` | sua connection string do Atlas |
| `FRONTEND_URL` | `https://SEU-SITE.netlify.app` *(preencha depois do deploy do front)* |
| `NODE_ENV` | `production` |

5. Clique em **Create Web Service** e aguarde o deploy.

6. Anote a URL gerada, por exemplo:

```
https://atv-produtos-api.onrender.com
```

7. Valide:

```bash
curl https://atv-produtos-api.onrender.com/health
curl https://atv-produtos-api.onrender.com/produtos
```

> **Plano free do Render:** o serviço "dorme" após ~15 min sem uso. A primeira requisição pode levar 30–60 segundos (cold start).

### Deploy alternativo com Blueprint

O arquivo `api/render.yaml` já está configurado. No Render: **New** → **Blueprint** → selecione o repositório e confirme as variáveis.

---

## Parte 3 — Front no Netlify

### 3.1 Testar localmente

```bash
cd front
npm run dev
# Abra http://localhost:5500
```

O `config.js` aponta para `http://localhost:3000` por padrão. Com a API rodando localmente, o CRUD deve funcionar.

### 3.2 Publicar no Netlify

1. Acesse [netlify.com](https://www.netlify.com) → **Add new site** → **Import an existing project**.
2. Conecte o GitHub e selecione o **mesmo repositório** do monorepo.
3. Configure o build:

| Campo | Valor |
|-------|-------|
| **Branch** | `main` |
| **Base directory** | `front` |
| **Build command** | `npm run build` |
| **Publish directory** | `.` |

4. Em **Environment variables**, adicione:

| Variável | Valor |
|----------|-------|
| `API_URL` | `https://atv-produtos-api.onrender.com` *(sem `/produtos` no final)* |

5. Clique em **Deploy site**.

O script `scripts/generate-config.js` gera o `config.js` automaticamente com a URL da API.

6. Anote a URL do site, por exemplo:

```
https://atv-produtos-front.netlify.app
```

### 3.3 Atualizar o CORS da API

Volte ao Render e atualize a variável:

```
FRONTEND_URL=https://atv-produtos-front.netlify.app
```

Salve para forçar um novo deploy da API.

---

## Parte 4 — Checklist de validação em produção

Abra o site publicado no Netlify e teste:

- [ ] Lista de produtos carrega
- [ ] Criar produto funciona
- [ ] Editar produto funciona
- [ ] Excluir produto funciona
- [ ] Dados persistem após recarregar a página (MongoDB Atlas)

Testes via API direta:

```bash
# Listar
curl https://SUA-API.onrender.com/produtos

# Criar
curl -X POST https://SUA-API.onrender.com/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Coxinha","preco":12.5}'
```

---

## Variáveis de ambiente — resumo

### API (`api/.env`)

```env
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://seu-front.netlify.app
PORT=3000
```

### Front (Netlify)

```env
API_URL=https://sua-api.onrender.com
```

---

## Desenvolvimento local — fluxo completo

Terminal 1 — API:

```bash
cd api
cp .env.example .env   # configure MONGODB_URI
npm install
npm run dev
```

Terminal 2 — Front:

```bash
cd front
npm run dev
```

Acesse `http://localhost:5500`. O front chama a API em `http://localhost:3000`.

---

## Problemas comuns

### Erro de CORS no navegador

- Confirme que `FRONTEND_URL` no Render é **exatamente** a URL do Netlify (com `https://`, sem barra no final).
- Após alterar, aguarde o redeploy da API.

### `Failed to fetch` / API não responde

- Plano free do Render: espere o cold start (até ~1 min).
- Teste `https://SUA-API.onrender.com/health` direto no navegador.

### Produtos não aparecem

- Verifique `MONGODB_URI` no Render.
- No Atlas, confira se o IP `0.0.0.0/0` está liberado em Network Access.

### Erro 400 ao salvar produto

- O preço deve ser numérico. O front já envia `Number(preco)`; confira no DevTools → Network o body da requisição.

### Front aponta para localhost em produção

- Confirme a variável `API_URL` no Netlify.
- Confira se o build rodou: em **Deploys** → **Deploy log**, deve aparecer `config.js gerado com API_BASE_URL=...`.

---

## Segurança (pontos para discutir em aula)

1. **Nunca** commitar `.env` ou credenciais no código.
2. Rotacionar senha do MongoDB se ela já foi exposta em algum commit anterior.
3. `0.0.0.0/0` no Atlas é prático para aula, mas em produção use IPs fixos ou VPC.
4. O plano free do Render não é adequado para tráfego real de produção.

---

## Estrutura de arquivos relevantes para deploy

```
.gitignore          # ignorados do monorepo (raiz)

api/
  .env.example      # modelo de variáveis
  render.yaml       # blueprint opcional do Render
  package.json      # scripts build e start:prod

front/
  .env.example
  config.js         # URL da API (gerado no build)
  config.example.js # modelo manual
  netlify.toml      # config do Netlify
  scripts/generate-config.js
  package.json      # script build para Netlify
```

---

## Ordem sugerida para a aula (≈ 90 min)

| Tempo | Atividade |
|-------|-----------|
| 10 min | Explicar arquitetura e criar contas |
| 15 min | MongoDB Atlas + connection string |
| 15 min | Push do monorepo no GitHub + deploy da API no Render |
| 15 min | Deploy do front no Netlify (mesmo repositório) |
| 10 min | Ajustar `FRONTEND_URL` e `API_URL` |
| 15 min | Testar CRUD em produção e troubleshooting |
| 5 min | Revisão: CORS, env vars, cold start |

---

## Referências

- [Render — Deploy Node](https://render.com/docs/deploy-node-express-app)
- [Netlify — Environment variables](https://docs.netlify.com/environment-variables/overview/)
- [MongoDB Atlas — Get Started](https://www.mongodb.com/docs/atlas/getting-started/)

# BookBridge API

Uma API para gerenciar clubes de leitura, livros e avaliações, construída com Node.js e Express.js.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: 16 ou superior)
- [NPM](https://www.npmjs.com/) (geralmente incluído com o Node.js)
- [Redis](https://redis.io/) (se o projeto utiliza Redis para cache)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url_do_repositorio>
cd bookbridge-api
npm install
```

## Configuração do Ambiente

Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

```bash
# .env.example
DB_HOST=localhost
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_DB_NAME
DB_DIALECT=postgres
DB_PORT=5432
TEST_PORT=YOUR_TEST_PORT
JWT_SECRET=YOUR_JWT_SECRET
```

## Execução do Projeto

Para iniciar o servidor em ambiente de desenvolvimento:
```bash
npm run dev
```
O servidor estará disponível em http://localhost:3000 (ou a porta configurada em .env).

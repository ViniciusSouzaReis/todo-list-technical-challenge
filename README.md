# todo-list-technical-challenge

## Objetivo do projeto:
- O projeto foi desenvolvido por Vinicius Souza como desafio tecnico para processo seletivo.
- O objetivo foi criar uma lista de tarefas(todo list) com criacao de um banco de dados resposavel por armazenar todas informacoes de usuarios e tarefas.
Com uma estrutura de CRUD(Create - Read - Update - Delete) de uma API, retornados e recebidos atraves de endpoints.

## Tecnologias:
#### - Front-end:
**React** -
**Hooks** -
**axios** -
**RTL** -
**Bootstrap**
#### - Back-end:
**Node.js** -
**Express** -
**Sequelize** -
**MySQL** -
**JWT** -
**md5**

## Como Rodar:
- Entre na past `/app` e execute o comando `npm install` para instalacao das dependencias do back-end.
- Apos a instalacao, execute o comando `npm run db:start` para inicio do banco de dados.
- Em outro terminal, entre na pasta `/app/front-end` e execute o comando `npm install`.
- Apos a instalacao, execute o comando `npm start` para inicio da aplicacao no front-end.

## Comando axiliares:
 #### /app/front-end:
 - `npm test` - executa os testes de front end.
 - `npm run test:coverage` - executa os teste mostrando o % de cobertura total.
 #### /app/back-end ou /app:
 - `npm test` - executa os testes de retorno da api
 - `npm run db:reset` - reseta o banco de dados para dados mocados na pasta /app/back-end/src/database/seeders.
 - `npm run dev` - executa o banco de dados com o nodemon.
 - `npm run lint` - correcoes de lint no backend.

## Arquitetura:

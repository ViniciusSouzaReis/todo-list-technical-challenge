# todo-list-technical-challenge

## Objetivo do projeto:
- O projeto foi desenvolvido por Vinicius Souza como desafio técnico para processo seletivo.
- O objetivo foi criar uma lista de tarefas(todo list) com criação de um banco de dados resposável por armazenar todas informações de usuários e tarefas.
Com uma estrutura de CRUD(Create - Read - Update - Delete) de uma API, retornados e recebidos através de endpoints.

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
**md5** -
**TypeScript**

*Arquitetura baseada em camadas MSC(Model, Service, Controller).*

## Como Rodar:
- Entre na past `/app/back-end` e execute o comando `npm install` para instalação das dependências do back-end.
- Apos a instalação, execute o comando `npm start` para início do banco de dados.
- Em outro terminal, entre na pasta `/app/front-end` e execute o comando `npm install`.
- Apos a instalação, execute o comando `npm start` para início da aplicação no front-end.

*Certifique se que o MySQL esteja rodando localmente.

Se tudo aconteceu conforme o esperado, no terminal deve aparecer uma mensagem dizendo que a aplicação foi iniciada na porta `Running on port 3001`.

## Comandos axiliares:
 #### /app/front-end:
 - `npm test` - executa os testes de front end.
 - `npm run test:coverage` - executa os teste mostrando o % de cobertura total.
 #### /app/back-end:
 - `npm test` - executa os testes de retorno da api.
 - `npm run db:reset` - reseta o banco de dados para dados mocados na pasta /app/back-end/src/database/seeders.
 - `npm run dev` - executa o banco de dados com o nodemon.
 - `npm run lint` - correções de lint no backend.

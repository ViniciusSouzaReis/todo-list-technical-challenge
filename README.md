# todo-list-technical-challenge

## Objetivo do projeto:
- O projeto foi desenvolvido por Vinicius Souza como desafio tecnico para processo seletivo.
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

## Comandos axiliares:
 #### /app/front-end:
 - `npm test` - executa os testes de front end.
 - `npm run test:coverage` - executa os teste mostrando o % de cobertura total.
 #### /app/back-end:
 - `npm test` - executa os testes de retorno da api.
 - `npm run db:reset` - reseta o banco de dados para dados mocados na pasta /app/back-end/src/database/seeders.
 - `npm run dev` - executa o banco de dados com o nodemon.
 - `npm run lint` - correções de lint no backend.

## Documentação da API

#### Retorna o usuário com id, nome, email e token

```http
  POST http://localhost:3001/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**.  |
| `senha` | `string` | **Obrigatório**.  |

#### Registra o usuário no banco de dados

```http
  POST http://localhost:3001/register
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**.  |
| `email`      | `string` | **Obrigatório**.  |
| `password`      | `string` | **Obrigatório**.  |

#### Faz a verificação de autenticação do usuário pelo token quando recarregar a página

```http
  POST http://localhost:3001/token
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token`      | `string` | **Obrigatório**.  |

#### Retorna todas as tarefas do usuário pelo id

```http
  GET http://localhost:3001/tasks/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer |

#### Adiciona uma nova tarefa ao usuário no banco de dados

```http
  POST http://localhost:3001/tasks/register/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer |
| `data`      | `string` | **Obrigatório**. A tarefa que será salva |

#### Deleta uma tarefa do banco de dados

```http
  DELETE http://localhost:3001/tasks/delete/${id}/${data}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer deletar |
| `data`      | `string` | **Obrigatório**. Informação da tarefa que será deletada |

#### Atualiza o status da tarefa desejada

```http 
  PATCH http://localhost:3001/tasks/update/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer atualizar |
| `data`      | `string` | **Obrigatório**. Chave { value, task } |



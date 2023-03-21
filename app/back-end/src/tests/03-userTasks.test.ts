import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import LoginMock from './mocks/LoginMocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /tasks', function () {
  afterEach(sinon.restore);

  it('Teste para testar rota get tasks', async () => {
    const result = await chai.request(app).get('/tasks/1').set('Authorization', LoginMock.token);
    expect(result.status).to.be.equal(200);
  });

  it('Teste para testar registro de tarefas feito com dados validos', async () => {
    const result = await chai.request(app).post('/tasks/register/1').set('Authorization', LoginMock.token).send({ data: 'Fazer reuniao as 20h' });
    expect(result.status).to.be.equal(201);
  });

  it('Teste para testar update de tarefas com sucesso', async () => {
    const result = await chai.request(app).patch('/tasks/update/1').set('Authorization', LoginMock.token).send({ data: { task:'Fazer trabalho de casa', value: 'Em progresso'} });
    expect(result.status).to.be.equal(200);
  });
});
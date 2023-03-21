import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginMock from './mocks/LoginMocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /register', function () {
  afterEach(sinon.restore);

  it('Teste para testar registro feito com sucesso', async () => {
    const result = await chai.request(app).post('/register').send({ name: 'Braulio da Silva Santos', email: 'bralinho@email.com',password: "123456"});
    expect(result.status).to.be.equal(201);
  });

  it('Teste para testar registro feito com dados existentes', async () => {
    const result = await chai.request(app).post('/register').send({ name: 'Braulio da Silva Santos', email: LoginMock.user.email, password: "123456"});
    expect(result.status).to.be.equal(409);
  });
});
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testando a rota /register', function () {
  afterEach(sinon.restore);

  it('Teste para testar registro feito com sucesso', async () => {
    const result = await chai.request(app).post('/register').send({ name: 'Braulio da Silva Santos', email: 'bralinho@email.com',password: "123456"});
    expect(result.status).to.be.equal(201);
  });

  it('Teste para testar registro feito com dados existentes', async () => {
    const result = await chai.request(app).post('/register').send({ name: 'Braulio da Silva Santos', email: 'vini@email.com',password: "123456"});
    expect(result.status).to.be.equal(409);
  });
});
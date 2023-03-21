const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const { Users } = require('../database/models');

const { expect } = chai;

chai.use(chaiHttp);

const mockUser = {
  id: 1,
  name: 'Vinicius Souza',
  email: 'vini@email.com',
  password: 'e10adc3949ba59abbe56e057f20f883e',
  // senha: md5('123456')
}

describe('Testando a rota /login', function () {

  beforeEach( async() => {
    sinon
      .stub(Users, "findOne")
      .resolves(mockUser);
  })

  afterEach(()=>{
    Users.findOne.restore();
  })

  it('Teste para testar login feito com sucesso', async () => {
    const mockLogin = {
      email: 'vini@email.com',
      password: '123456',
    }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockLogin)

    expect(chaiHttpResponse.status).to.have.equal(200);
  });

  it('Teste para testar login feito com dados errada', async () => {
    const mockLogin = {
      email: 'user@user.com',
      password: 'potato',
    }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockLogin)

    expect(chaiHttpResponse.status).to.have.equal(404);
  });

  it('Teste para testar login feito sem email', async () => {
    const mockLogin = {
      password: 'potato',
    }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockLogin)

    expect(chaiHttpResponse.status).to.have.equal(404);
  });

});

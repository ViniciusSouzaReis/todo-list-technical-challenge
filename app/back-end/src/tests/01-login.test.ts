import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginMock from './mocks/LoginMocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Cobertura dos requisitos de Login', () => {
  afterEach(sinon.restore);

  it('Login com dados validos', async () => {
    const result = await chai.request(app).post('/login').send({ email: LoginMock.user.email, password: "123456"});
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property('token');
  });

  it('Tentativa de login com usuario incorreto', async () => {
    const result = await chai.request(app).post('/login').send({ email: LoginMock.fakeUser.email, password: "123456"});
    expect(result.status).to.be.equal(404);
    expect(result.body).to.be.equal('User not found');
  });
});
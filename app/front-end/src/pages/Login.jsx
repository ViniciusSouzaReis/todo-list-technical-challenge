import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import httpRequestAxios from '../services/httpRequestAxios';
import httpCodeHandler from '../assets/httpCodeHandler';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { writeStorage, readStorage, removeKey } from '../utils/localStorage';

import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);
  const navigate = useNavigate();

  function emailHandler(inputemail) {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(inputemail);
  }

  const verifyemail = emailHandler(email);

  const login = async (event, userData) => {
    event.preventDefault();
    const { status, data } = await httpRequestAxios('post', 'http://localhost:3001/login', userData);

    if (httpCodeHandler.notFound(status)) setInvalidUser(true);
    if (httpCodeHandler.success(status)) {
      setInvalidUser(false);
      writeStorage(data);
      navigate(`/${data.name}/tasks`);
    };
  };

  useEffect(() => {
    const user = readStorage();

    async function verifyToken() {
      const { status } = await httpRequestAxios('post', 'http://localhost:3001/token', {}, { headers: { Authorization: user.token } });
      if (httpCodeHandler.notFound(status)) {
        removeKey();
      } else {
        navigate(`/${user.name}/tasks`);
      }
    }

    if (user.token) verifyToken();
  });

  return (
    <section className='main-container-login'>
      <Form
        onSubmit={ (event) => login(event, { email, password })}
      >
        <h1>Área do usuário</h1>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Endereco de e-mail</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="email"
            name="email"
            data-testid="common_login__input-email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
          <Form.Text className="text-muted">
            Nunca compartilharemos suas informações.
          </Form.Text>
        </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control 
            type="password"
            placeholder="Senha" 
            name="password"
            data-testid="common_login__input-password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            />
        </Form.Group>
          {
            (invalidUser)
              ? (
                <Form.Text className="text-muted">
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }
                </Form.Text>
              )
              : null
          }
          <br></br>
          <Button
            variant="success"
            type="submit"
            data-testid="common_login__button-login"
            disabled={ !(verifyemail) }
          >
            Entrar
          </Button>
          <Button
            data-testid="common_login__button-register"
            variant="primary"
            type="button"
            onClick={ () => navigate('/register') }
          >
            Ainda não tenho conta
          </Button>
      </Form>
    </section>
  )
}

export default Login;
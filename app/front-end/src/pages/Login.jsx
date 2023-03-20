import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import httpRequestAxios from '../services/httpRequestAxios';
import httpCodeHandler from '../assets/httpCodeHandler';

import { writeStorage, readStorage, removeKey } from '../utils/localStorage';

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
    <section>
      <form
        onSubmit={ (event) => login(event, { email, password })}
      >
        <h1>Área do usuário</h1>
        <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              placeholder="E-mail"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              placeholder="Senha"
            />
          </label>
          {
            (invalidUser)
              ? (
                <p>
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
          <button
            data-testid="login__login_btn"
            type="submit"
            disabled={ !(verifyemail) }
          >
            Entrar
          </button>
          <button
            data-testid="common_register__button-register"
            type="button"
            onClick={ () => navigate('/register') }
          >
            Ainda não tenho conta
          </button>
      </form>
    </section>
  )
}

export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import httpRequestAxios from '../services/httpRequestAxios';
import httpCodeHandler from '../assets/httpCodeHandler';

const NAME_MINIMAL_LENGTH = 10;
const PASSWORD_MINIMAL_LENGTH = 6;

function Register() {
  const [invalidUser, setInvalidUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function nameHandler(inputName) {
    return inputName.length >= NAME_MINIMAL_LENGTH;
  }

  function emailHandler(inputemail) {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(inputemail);
  }

  function passwordHandler(inputPassowrd) {
    return inputPassowrd.length >= PASSWORD_MINIMAL_LENGTH;
  }

  const verifyName = nameHandler(name);
  const verifyemail = emailHandler(email);
  const verifyPassword = passwordHandler(password);

  const registerDBUser = async (event, userData) => {
    event.preventDefault();

    const { status } = await httpRequestAxios('post', 'http://localhost:3001/register', userData);

    if (httpCodeHandler.conflict(status)) setInvalidUser(true);
    if (httpCodeHandler.created(status)) {
      setInvalidUser(false);
      setUserCreated(true);
    }
  };

  return (
    <section>
      <form
        onSubmit={ (event) => registerDBUser(event, { name, email, password }) }
      >
      <label htmlFor="name">
          {' '}
          Nome
          <input
            type="text"
            name="name"
            id="name"
            data-testid="common_register__input-name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
            placeholder="Nome e sobrenome"
          />
        </label>
        <label
          htmlFor="email"
          className="registerEmailLabel"
        >
          {' '}
          Email
          <input
            type="email"
            name="email"
            id="email"
            data-testid="common_register__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label
          htmlFor="password"
          className="registerPasswordLabel"
        >
          {' '}
          Senha
          <input
            type="password"
            name="password"
            id="password"
            data-testid="common_register__input-password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="Minimo 6 caracteres"
          />
        </label>
        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ !(verifyemail && verifyName && verifyPassword) }
        >
          Registrar
        </button>
        <button
          type="button"
          onClick={ () => navigate('/login') }
        >
          Voltar
        </button>
        {
          (invalidUser)
            ? (
              <p>
                {
                  `Usuario ja cadatrado. Tente um novo e-mail.`
                }
              </p>
            )
            : null
          }
          {
          (userCreated)
            ? (
              <p>
                {
                  `Usuario registrado!`
                }
              </p>
            )
            : null
          }
      </form>
    </section>
  );
};

export default Register;